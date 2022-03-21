import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  user :User = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private toast: HotToastService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.signIn(this.user.email, this.user.password).pipe(
      this.toast.observe({
        success: 'User logged in successfully',
        loading: 'Logging in...',
        error: ({message}) => `${message}`
      })
    ).subscribe(
      () => this.router.navigate(['/'])
    );
  }

}
