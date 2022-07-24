import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/store/services';
import { ServicesService } from 'src/app/directives/services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BLANK_SERVICE } from 'src/app/constant';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  public services!: Services[];
  public editService!: Services;
  public deleteService!: Services;

  public blankService: Services = BLANK_SERVICE;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }

  public getServices(): void {
    this.servicesService.getServices().subscribe(
      (rsponse: any) => {
        this.services = rsponse.payload;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddServices(addForm: NgForm): void {
    document.getElementById('add-service-form')?.click();
    this.servicesService.addServices(addForm.value).subscribe(
      (response: Services) => {
        // console.log(response);
        this.getServices();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateServices(id: Number, service: Services): void {
    this.servicesService.updateServices(id, service).subscribe(
      (response: Services) => {
        this.getServices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteServices(id: number): void {
    this.servicesService.deleteServices(id).subscribe(
      (response: void) => {
        this.getServices();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal(services: Services, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addServiceModal');
    }
    if (mode === 'edit') {
      this.editService = services;
      button.setAttribute('data-target', '#updateServiceModal');
    }
    if (mode === 'delete') {
      this.deleteService = services;
      button.setAttribute('data-target', '#deleteServiceModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
