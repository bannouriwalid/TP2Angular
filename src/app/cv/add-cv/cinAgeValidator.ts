import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cinAgeValidator(control: AbstractControl): ValidationErrors | null {
  const age = control.get('age')?.value;
  const cin = control.get('cin')?.value;

  if (!age || !cin || cin.length !== 8) {
    return null;
  }

  const firstTwoDigits = parseInt(cin.slice(0, 2), 10);
  if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
    return { cinAgeInvalid: 'Les deux premiers chiffres du Cin doivent être entre 00 et 19 si l\'âge est >= 60' };
  }
  if (age < 60 && firstTwoDigits <= 19) {
    return { cinAgeInvalid: 'Les deux premiers chiffres du Cin doivent être supérieurs à 19 si l\'âge est < 60' };
  }

  return null;
}
