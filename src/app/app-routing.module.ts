import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";


const routes: Route[] = [
  {
    path: "login",
    loadChildren: () =>
      import("./auth/login/login.module").then((m) => m.AuthRoutingModule),
  },
  { path: "login", component: LoginComponent },
  {
    path: "rh",
    loadChildren: () => import("./optimizationPattern/rh/rh.module").then((m) => m.RhModule),
  },
  {
    path: "ttc",
    loadChildren: () => import("./components/ttc/ttc.module").then((m) => m.TtcModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: "",
    loadChildren: () =>
      import("./templates/front/front.module").then((m) => m.FrontRoutingModule),
  },
  {
    path: "admin",
    loadChildren: () => import("./templates/admin/admin.module").then((m) => m.AdminRoutingModule),
  },

  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
