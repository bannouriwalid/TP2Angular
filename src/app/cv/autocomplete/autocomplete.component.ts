import { Component} from "@angular/core";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, tap} from "rxjs";
import { CvService } from "../services/cv.service";
import {Router} from "@angular/router";
import {Cv} from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  searchControl = new FormControl('');
  filteredCvs$: Observable<Cv[]> = of([]);

  constructor(
    private router: Router,
    private cvService: CvService,
  ) {
    this.filteredCvs$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value): value is string => typeof value === 'string' && value.length > 0),
      switchMap(value => this.searchCvs(value)),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  searchCvs(query: string): Observable<Cv[]> {
    const filter = {
      where: {
        name: {
          like: `%${query}%`
        }
      }
    };
    const filterString = JSON.stringify(filter);
    return this.cvService.getCvs(filterString);
  }

  onSelectCv(cv: Cv) {
    this.router.navigate(['/cv', cv.id]);
  }
}
