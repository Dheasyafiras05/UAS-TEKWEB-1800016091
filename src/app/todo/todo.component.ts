import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TambahDataComponent } from '../tambah-data/tambah-data.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public api: ApiService
  ) { 
    this.getData()
  }

  todo: any = []
  getData() {
    this.api.baca().subscribe(res => {
      this.todo = res
    })
  }

  ngOnInit(): void {
  }

  buatKegiatan() {
    const dialogRef = this.dialog.open(TambahDataComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog ditutup');
    });
  }

  editTodo(data) {
    const dialogRef = this.dialog.open(TambahDataComponent, {
      width: '450px',
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getData() // menampilkan data setelah diperbarui
    });
  }

  hapusTodo(id) {
    console.log('data dihapus')
    this.api.hapus(id).subscribe(res => {
      this.getData()
    })
  }
}
