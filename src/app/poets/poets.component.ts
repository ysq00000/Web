import { Component, OnInit } from '@angular/core';
import { Poet } from 'src/app/poets/poet';
import { PoetService } from '../poet.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-poets',
  templateUrl: './poets.component.html',
  styleUrls: ['./poets.component.css']
})
export class PoetsComponent implements OnInit {
  constructor(private poetService: PoetService, private messageService: MessageService) { }

  poets: Poet[] = [];
  // addpoet: Poet;

  ngOnInit(): void {
    this.getPoets();
  }

  // 增加诗人时，将从三个input框中获取到的
  // getaddpoets(name:string,lifetime:string,poetry:string):void{
  //   name = name.trim();
  //   lifetime=lifetime.trim();
  //   poetry=poetry.trim();
  //   this.addpoet.name=name;
  //   this.addpoet.lifetime=lifetime;
  //   this.addpoet.poetry=poetry;
  // }

  // 创建一个方法，以从服务中获取这些诗人数据。
  getPoets(): void {
    this.poetService.getPoets().subscribe(poets => this.poets = poets);
  }
  add(name: string,lifetime:string,poetry:string): void {
    name = name.trim();
    lifetime=lifetime.trim();
    poetry=poetry.trim();
    if (!name) { return; }
    this.poetService.addPoet({ name,lifetime,poetry } as Poet)
      .subscribe(poet => {
        this.poets.push(poet);
      });
  }
  // add(): void {
  //   if (!this.addpoet.name) { return; }
  //   this.poetService.addPoet(this.addpoet as Poet)
  //     .subscribe(poet => {
  //       this.poets.push(poet);
  //     });
  // }
  delete(poet: Poet): void {
    this.poets = this.poets.filter(p => p !== poet);
    this.poetService.deletePoet(poet.id).subscribe();
  }
  
}
