import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecordsService } from './../../records.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.sass']
})
export class PublisherComponent implements OnInit {
  publisherForm = this.fb.group({
    message: ['']
  })
  constructor(private pubService: RecordsService, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit (): void {
  }

  onPublish () {
    const data = this.publisherForm.value
    this.pubService.postRecord(data).subscribe(res => {
      console.log(res)
      this.publisherForm.reset()
      this._snackBar.open('Success!', 'Dismiss', { duration: 3000 })
    })

  }

}
