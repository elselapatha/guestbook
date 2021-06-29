import { RecordsService } from './../../../home/records.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private recService: RecordsService) { }

  ngOnInit (): void {
  }

  onLogout () {
    this.authService.logout()
    this.recService.clearData()
  }

}
