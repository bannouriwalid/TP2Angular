import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import { AbstractControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cv } from "../model/cv";
import {JsonPipe, NgIf} from "@angular/common";
import {APP_ROUTES} from "../../../config/routes.config";
import {DefaultImagePipe} from "../pipes/default-image.pipe";
import {cinAsyncValidator} from "./cinAsyncValidator";
import {cinAgeValidator} from "./cinAgeValidator";

@Component({
    selector: "app-add-cv",
    templateUrl: "./add-cv.component.html",
    styleUrls: ["./add-cv.component.css"],
    standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    DefaultImagePipe
  ],
})
export class AddCvComponent implements OnInit, OnDestroy {
  private cvService = inject(CvService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private defaultImagePipe = inject(DefaultImagePipe);

  form = this.formBuilder.group({
    name: ['', Validators.required],
    firstname: ['', Validators.required],
    path: [{ value: "", disabled: true }],
    job: ['', Validators.required],
    cin: ['', [Validators.required, Validators.pattern('[0-9]{8}')],
         [cinAsyncValidator(this.cvService)],
    ],
    age: [0, Validators.required],
  }, { validators: [cinAgeValidator] });

  ngOnInit(): void {
    const savedForm = localStorage.getItem('cv');
    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

    this.form.valueChanges.subscribe((formData) => {
      localStorage.setItem('cv', JSON.stringify(formData));
    });

    this.form.get('age')?.valueChanges.subscribe((age: number | null) => {
      const pathControl = this.form.get('path');
      if (age !== null && age >= 18) {
        pathControl?.enable();
      } else {
        pathControl?.disable();
        pathControl?.setValue('');
      }
    });
  }

  ngOnDestroy(): void {
    const formData = {
      ...this.form.value,
      path: this.form.get('path')?.value || '',
    };
     localStorage.setItem('cv', JSON.stringify(formData));
  }

  addCv() {
    const formData = {
      ...this.form.value,
      path: this.defaultImagePipe.transform(this.form.get('path')?.value || ''),
    };
    this.cvService.addCv(formData as Cv).subscribe({
      next: (cv) => {
        localStorage.removeItem('cv');
        console.log(localStorage.getItem('cv'));

        this.router.navigate([APP_ROUTES.cv]);
        this.toastr.success(`Le cv ${cv.firstname} ${cv.name} a été ajouté avec succès.`);
      },
      error: (err) => {
        console.error('Error adding CV:', err);
        this.toastr.error(`Une erreur s'est produite. Veuillez réessayer.`);
      },
    });
  }
  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
