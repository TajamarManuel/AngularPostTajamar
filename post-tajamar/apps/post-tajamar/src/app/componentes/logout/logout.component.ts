import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'post-tajamar-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }

  si() {
    this.dialogref.close(true)
  }

  no() {
    this.dialogref.close(false)
  }


}
