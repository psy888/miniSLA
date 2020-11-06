import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isNewUser = false;

  constructor(private authService: AuthService,
              private router: Router,
              private loadingService: LoadingStateService) {
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
      password: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    this.loadingService.startLoadig();
    this.authService.login(
      this.authForm.value.email,
      this.authForm.value.password,
    ).subscribe(response => {
        if (!response.error) {
          localStorage.setItem(this.authService.tokenKey, response.token);
          this.toListPage();
        } else {
          this.updateForm(response.error);
        }
        this.loadingService.endLoading();
      },
    );
  }

  updateForm(error: string): void {
    if (error) {
      this.authForm.controls[error].setErrors({ 'server_error': true });
      this.authForm.controls[error].markAsTouched();
    }
  }

  toListPage(): void {
    this.router.navigate(['/list']);
  }


}
