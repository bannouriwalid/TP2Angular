import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomPreloadingStrategy} from "../custom-preloading.strategy";
import {RouterModule, Routes} from "@angular/router";
import {TodoComponent} from "./todo/todo.component";


const routes: Routes = [
  { path: '', component: TodoComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy : CustomPreloadingStrategy,
    })
  ]
})
export class TodoModule { }
