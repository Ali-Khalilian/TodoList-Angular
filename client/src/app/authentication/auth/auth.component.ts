import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RegisterComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  registerMode = false;


  RegisterMode(event: boolean) {
    this.registerMode = event;
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
