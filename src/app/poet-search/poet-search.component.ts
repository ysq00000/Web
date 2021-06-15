import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Poet } from '../poets/poet';
import { PoetService } from '../poet.service';

@Component({
  selector: 'app-poet-search',
  templateUrl: './poet-search.component.html',
  styleUrls: [ './poet-search.component.css' ]
})
export class PoetSearchComponent implements OnInit {
  poets$!: Observable<Poet[]>;
  private searchTerms = new Subject<string>();

  constructor(private poetService: PoetService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.poets$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.poetService.searchPoets(term)),
    );
  }
}