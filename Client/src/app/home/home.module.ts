import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { RecordsComponent } from './components/records/records.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/records/dialog/dialog.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    PublisherComponent,
    RecordsComponent,
    HomeComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class HomeModule { }
