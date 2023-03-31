import { Component, OnInit } from '@angular/core';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit{

  news: any;

  constructor(private widgetService: WidgetsService) {}

  ngOnInit(): void {
    this.widgetService.getLatestNews().subscribe(newsData => {
      this.news = newsData
    })
  }

  redirectUrl(url: string){
    window.open(url, '_blank');
  }

}
