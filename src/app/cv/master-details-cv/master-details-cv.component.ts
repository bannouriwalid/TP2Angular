import {Component, inject} from '@angular/core';
import { CvService } from "../services/cv.service";
import {Observable, of} from "rxjs";
import { Cv } from "../model/cv";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-master-details-cv',
  templateUrl: './master-details-cv.component.html',
  styleUrl: './master-details-cv.component.css'
})
export class MasterDetailsCvComponent {
  cvs$: Observable<Cv[]>;
  selectedCv: Cv | null = null;

  constructor(
    private router: Router,
    private cvService: CvService,
    private route: ActivatedRoute,
  ) {
    // Fetching the list of CVs
    const resolvedCvs = this.route.snapshot.data['cvs'] as Cv[];
    this.cvs$ = of(resolvedCvs);

    this.cvService.selectCv$.subscribe((cv) => {
      this.selectedCv = cv;
      // this.router.navigate([this.selectedCv.id], { relativeTo: this.activatedRoute });
      const newUrl = `/cv/list/${this.selectedCv.id}`;
      // Force the router to reload the component by navigating to the same route
      this.router.navigateByUrl('/',
        { skipLocationChange: true }).then(() => {this.router.navigate([newUrl]);});
    });
  }
}
