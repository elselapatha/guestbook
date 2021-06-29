import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  })
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit (): void {
  }

  onLogin () {
    const payload = this.loginForm.value
    this.authService.login(payload).subscribe((res) => {
      if (res) {
        this.router.navigate(['home'])
      }
    })
  }
}
