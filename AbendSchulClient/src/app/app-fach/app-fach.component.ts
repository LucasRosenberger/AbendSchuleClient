import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Facher } from '../Facher';

@Component({
  selector: 'app-fach',
  templateUrl: './app-fach.component.html',
  styleUrls: ['./app-fach.component.css']
})
export class AppFachComponent implements OnInit {

  @Input() fach : Facher;
  @Output() num : EventEmitter<number> = new EventEmitter<number>();
  toggle : boolean;

  constructor() {
    this.toggle = false;
   }

  ngOnInit() {
  }

  send(){
    this.num.emit(this.fach.id);
  }
}
