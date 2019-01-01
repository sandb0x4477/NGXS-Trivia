import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { TriviaState } from '../store/trivia.state';
import { UpdateQuery } from '../store/trivia.actions';

import { Query } from '../_models/query.model';
import { CATEGORIES } from './categories';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styles: [],
})
export class QueryFormComponent implements OnInit {
  categories;
  queryForm: FormGroup;

  @Select(TriviaState.query) query$: Observable<Query>;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.categories = CATEGORIES;
    this.createQueryForm();
    // console.log(this.query$);
    this.queryForm.patchValue(this.query$);
  }

  createQueryForm() {
    this.queryForm = this.fb.group({
      numberOfQuests: [5],
      category: ['any'],
      difficulty: ['any'],
      type: ['any']
    });
  }

  onSubmit() {
    console.log(this.queryForm.value);
    this.store.dispatch(new UpdateQuery(this.queryForm.value));
  }
}
