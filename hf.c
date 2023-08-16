#include <stdio.h>
#define PHI 3.14 // konstanta PHI

// fungsi untuk menghitung volume kerucut
float hitung_volume(float JariJari, float tinggi) {
    float volume;
    volume = (PHI * JariJari * JariJari * tinggi) / 3.0;
    return volume;
}

int main() {
    float JariJari, tinggi, volume;
    
    printf("Masukkan jari-jari dari kerucut(cm) : ");
    scanf("%f", &JariJari);
    
    printf("Masukkan tinggi dari kerucut(cm) : ");
    scanf("%f", &tinggi);
    
    // memanggil fungsi hitung_volume dan menyimpan hasilnya pada variabel volume
    volume = hitung_volume(JariJari, tinggi);
    
    printf("Volume kerucut tersebut adalah %.2f cm^3\n", volume);
    
    return 0;
}
