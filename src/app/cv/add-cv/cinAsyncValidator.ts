import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { CvService } from '../services/cv.service';

export function cinAsyncValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null); // Skip validation if empty.

    return of(control.value).pipe(
      debounceTime(500),
      switchMap((cin) =>
        cvService.checkCinExists(cin).pipe(
          map((exists) => (exists ? { cinTaken: true } : null)),
          catchError(() => of(null))
        )
      )
    );
  };
}
