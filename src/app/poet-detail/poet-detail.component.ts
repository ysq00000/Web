import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Poet } from '../poets/poet';
import { PoetService } from '../poet.service';

@Component({
  selector: 'app-poet-detail',
  templateUrl: './poet-detail.component.html',
  styleUrls: [ './poet-detail.component.css' ]
})
export class PoetDetailComponent implements OnInit {
  poet: Poet;

  constructor(
    private route: ActivatedRoute,
    private poetService: PoetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPoet();
  }

  getPoet(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.poetService.getPoet(id)
      .subscribe(poet => this.poet = poet);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.poet) {
      this.poetService.updatePoet(this.poet)
        .subscribe(() => this.goBack());
    }
  }
}