import { UtilityService } from './../utility.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  textDisplay: string[];

  constructor(private utilityService: UtilityService) {
    this.textDisplay =  this.utilityService.overlayText;
  }

  ngOnInit() {
  }
  
}
