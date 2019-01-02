import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { classToPlain } from 'class-transformer';
import 'reflect-metadata';
import { Question } from '../_models/question.model';

@Component({
  selector: 'app-trivia-display',
  templateUrl: './trivia-display.component.html',
  styles: [],
})
export class TriviaDisplayComponent implements OnInit {
  @Input() questions: Question[];
  @Output() buttonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  checkAnswer(question, i: number, j: number) {
    const payload: any = JSON.parse(JSON.stringify(question));

    payload.clickedButtonIndex = j;

    for (let k = 0; k < payload.buttonClass.length; k++) {
      payload.buttonClass[k] = 'uk-button uk-button-default uk-width-1-1';
    }

    payload.buttonClass.splice(j, 1, 'uk-button uk-button-secondary uk-width-1-1');
    payload.isAnswered = true;

    this.buttonClick.emit(payload);
  }
}
