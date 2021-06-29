import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    name: [''],
    username: [''],
    password: [''],
    confPassword: ['']
  })
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit (): void {
  }

  onRegister () {
    const payload = this.registerForm.value
    if (payload.password !== payload.confPassword) {
      window.alert('Password Not Match!')
    } else {
      delete payload.confPassword
      this.authService.register(payload).subscribe((res) => {
        if (res) {
          this.router.navigate(['home'])
        }
      })
    }
  }

}
