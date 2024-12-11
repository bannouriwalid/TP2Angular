import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RhComponent} from "./rh.component";
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';

const routes: Routes = [
  { path: '', component: RhComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class RhModule { }

