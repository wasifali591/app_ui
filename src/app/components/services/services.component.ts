import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/store/services';
import { ServicesService } from 'src/app/directives/services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  public services!: Services[];
  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }

  public getServices():void{
    this.servicesService.getServices().subscribe(
      (rsponse: Services[]) => {
        this.services = rsponse;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
