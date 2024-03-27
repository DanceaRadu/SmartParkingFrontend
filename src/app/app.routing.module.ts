import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {IndexComponent} from "./components/index/index.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
