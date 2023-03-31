import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-local-files',
  templateUrl: './local-files.component.html',
  styleUrls: ['./local-files.component.sass']
})
export class LocalFilesComponent implements OnInit {

  files: any;
  applicationResult: any;
  fileResult: any;
  private delayTime = 1000;

  constructor(private widgetService: WidgetsService) {}

  ngOnInit(): void {
    this.widgetService.getLocalFiles()
    .pipe(
      debounceTime(this.delayTime),
      distinctUntilChanged(),
    )
    .subscribe((data) => {
      this.files = data
    })
  }

}
