import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Question } from '../_models/question.model';
import { Navigation } from '../_models/navigation.model';

@Component({
  selector: 'app-trivia-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trivia-display.component.html',
  styles: [
    `
     .disable {
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
  ],
})
export class TriviaDisplayComponent implements OnInit {
  @Input() questions: Question[];
  @Input() navigation: Navigation;
  @Output() buttonClick = new EventEmitter<any>();
  @Output() changePageEm = new EventEmitter<number>();
  @Output() finishEm = new EventEmitter<Question[]>();

  constructor() {}

  ngOnInit() {}

  checkAnswer(question, j) {
    this.buttonClick.emit({ question, j });
  }

  changePage(page: number) {
    // console.log('page', page);
    this.changePageEm.emit(page);
  }

  finish() {
    // console.log('this.questions', this.questions);
    this.finishEm.emit(this.questions);
  }
}
