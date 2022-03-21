import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm!: FormGroup;

  error: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private toast: HotToastService, private router: Router,) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],      
      password: ['',[Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[~`!@#$%^&*()--+={}[]|\\:;"\'<>,.?/_₹]).{8,}$')]],
      confirmPassword: ['',[Validators.required]]
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
  
  get passwordMatchValidator() {
    return this.password?.value === this.confirmPassword?.value;
  }
  
  onSubmit() {
    this.authService.createUser(this.name?.value, this.email?.value, this.password?.value)
    .pipe(
      switchMap(({ user: { uid } }) => this.authService.signIn(this.email?.value, this.password?.value)),
      this.toast.observe({
        success: 'User created successfully',
        loading: 'Creating user...',
        error: ({message}) => `Error: ${message}`
      })
    )
    .subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );
  }

}