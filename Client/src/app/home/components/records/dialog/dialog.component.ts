import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecordResponse } from 'src/app/shared/models/record.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordResponse) { }

  get message () {
    return this.data.message
  }

  set message (e: any) {
    const event: HTMLTextAreaElement = e
    this.data.message = event.value

  }

  onNoClick (): void {
    this.dialogRef.close();
  }

  ngOnInit (): void {
  }

}
