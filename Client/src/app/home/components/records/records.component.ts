import { concatMap, first, map, mergeMap } from 'rxjs/operators';
import { RecordResponse } from 'src/app/shared/models/record.interface';
import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../../records.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.sass']
})
export class RecordsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'message', 'created', 'actions'];
  dataSource: RecordResponse[] = [];
  constructor(private recService: RecordsService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit (): void {
    this.recService.loadData().subscribe(res => { this.dataSource = res as RecordResponse[] })
    this.recService.dataSource.subscribe(res => this.dataSource = res)
  }

  deleteRecord (id: string) {
    this.recService.deleteRecord(id).subscribe(res => this._snackBar.open('Deleted!', 'Dismiss', { duration: 3000 })
    )
  }

  updateRecord (row: RecordResponse) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { id: row._id, message: row.message }
    });

    dialogRef.afterClosed().
      pipe(mergeMap(res => this.recService.patchRecord(res.id, res.message)))
      .subscribe(res => res && this._snackBar.open('Patched!', 'Dismiss', { duration: 3000 }))
  }
}
