import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Query } from '../_models/query.model';
import { CATEGORIES } from './categories';

@Component({
  selector: 'app-query-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './query-form.component.html',
  styles: [],
})
export class QueryFormComponent implements OnInit {
  @Input() set query(value: Query) {
    this.queryForm.patchValue(value);
  }
  @Output() start = new EventEmitter<Query>();

  categories;
  queryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.queryForm = this.fb.group({
      numberOfQuests: [10],
      category: ['any'],
      difficulty: ['any'],
      type: ['any'],
    });
  }

  ngOnInit() {
    this.categories = CATEGORIES;
  }

  onSubmit() {
    const query: Query = this.queryForm.value;
    this.start.emit(query);
  }
}
