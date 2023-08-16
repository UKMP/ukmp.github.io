#include <stdio.h>

// prosedur untuk menghitung energi potensial
void HitungEnergiPotensial(float massa, float tinggi, float* EnergiPotensial) {
    float gravitasi = 9.8; // konstanta gravitasi bumi
    *EnergiPotensial = massa * gravitasi * tinggi;
}

// prosedur untuk membandingkan energi potensial dari dua benda
void BandingkanEnergiPotensial(float massa1, float tinggi1, float massa2, float tinggi2) {
    float EnergiPotensial1, EnergiPotensial2;
    HitungEnergiPotensial(massa1, tinggi1, &EnergiPotensial1);
    HitungEnergiPotensial(massa2, tinggi2, &EnergiPotensial2);
    
    if (EnergiPotensial2 > EnergiPotensial1) {
        printf("Energi potensial benda 2 lebih besar daripada benda 1\n");
    } else if (EnergiPotensial1 > EnergiPotensial2) {
        printf("Energi potensial benda 1 lebih besar daripada benda 2\n");
    } else {
        printf("Energi potensial benda 1 dan benda 2 sama besar\n");
    }
}

int main() {
    float massa1, tinggi1, massa2, tinggi2;
    
    printf("Massa benda 1 (kg): ");
    scanf("%f", &massa1);
    printf("Tinggi benda 1 : ");
    scanf("%f", &tinggi1);
    
    printf("Massa benda 2 (kg): ");
    scanf("%f", &massa2);
    printf("Tinggi benda 2 : ");
    scanf("%f", &tinggi2);
    
    BandingkanEnergiPotensial(massa1, tinggi1, massa2, tinggi2);
    
    return 0;
}
