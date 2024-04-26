import { Component,OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe,CommonModule } from '@angular/common';
import { ListComponent } from 'src/app/components/list/list.component';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule,AsyncPipe,ListComponent,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  showClientList: boolean = false;

  ngOnInit() {
    console.log('SidebarComponent initialized, showClientList:', this.showClientList);
  }


  toggleClientList() {
    this.showClientList = !this.showClientList;
    console.log('toggleClientList called, showClientList:', this.showClientList);
  }
}

