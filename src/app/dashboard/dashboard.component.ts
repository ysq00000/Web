import { Component, OnInit } from '@angular/core';
import { Poet } from '../poets/poet';
import { PoetService } from '../poet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  poets: Poet[] = [];

  constructor(private poetService: PoetService) { }

  ngOnInit() {
    this.getPoets();
  }

  getPoets(): void {
    this.poetService.getPoets()
      .subscribe(poets => this.poets = poets.slice(0, 20));
  }
}