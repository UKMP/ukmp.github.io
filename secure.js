const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Joi = require('joi');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true }));

// Inisialisasi Firebase
const serviceAccount = require('ukmpapps-firebase-adminsdk-ye5jd-5a5fca0e70.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.comhttps://ukmpapps-default-rtdb.firebaseio.com/',
});

// Setelah user login, set session cookie dengan HTTP-only flag
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        const uid = userRecord.uid;

        await admin.auth().signInWithEmailAndPassword(email, password);
        const sessionCookie = await admin.auth().createSessionCookie(req.cookies.session || '', { expiresIn: 3600 });

        res.cookie('session', sessionCookie, { maxAge: 3600000, httpOnly: true, secure: true });
        res.json({ uid });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error });
    }
});

// Contoh validasi input menggunakan library Joi
const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$')).required(),
});

// Tambahkan security policy untuk mencegah XSS
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline'");
    next();
});

// Halaman terproteksi, hanya bisa diakses oleh user yang sudah login dengan session cookie
app.get('/protected', async (req, res) => {
    try {
        const sessionCookie = req.cookies.session || '';
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie);

        res.json({ message: 'Protected page', uid: decodedClaims.uid });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error });
    }
});

// Jalankan server pada port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
