import { Component } from "@angular/core";
import { Cv } from "../model/cv";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import {map, Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;
  juniors$: Observable<Cv[]>;
  seniors$: Observable<Cv[]>;
  selectedCv: Observable<Cv> | null = null;
  date = new Date();

  activeTab: 'juniors' | 'seniors' = 'juniors';

  constructor(
    private toastr: ToastrService,
    private cvService: CvService,
    private route: ActivatedRoute,
  ) {
    const resolvedCvs = this.route.snapshot.data['cvs'] as Cv[];
    this.cvs$ = of(resolvedCvs);

    this.juniors$ = this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age < 40))
    );

    this.seniors$ = this.cvs$.pipe(
      map(cvs => cvs.filter(cv => cv.age >= 40))
    );

    this.toastr.info("Bienvenue dans notre CvTech");
    this.selectedCv = this.cvService.selectCv$;
  }

  setActiveTab(tab: 'juniors' | 'seniors') {
    this.activeTab = tab;
  }
}
