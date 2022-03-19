import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() for: string ='';

  inputText: string = '';

  @Output() addEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.addEvent.emit(this.inputText);
    this.inputText = '';
  }

}
