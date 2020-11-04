import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isNewUser = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    this.authService.login(
      this.authForm.value.email,
      this.authForm.value.password,
    );

    console.log(this.authService.getUser());
    console.log('Email', this.authForm.value.email);
    console.log('Password', this.authForm.value.password);
  }

}
