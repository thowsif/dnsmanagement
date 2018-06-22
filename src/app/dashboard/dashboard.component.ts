import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { DataserviceService } from './../services/dataservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataserviceService]
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataserviceService ,private cd: ChangeDetectorRef ,private router: Router ) { }
  userDomain: string;
  searchDomain: string;
  email: string;
  params: any = {};
  domainCheck : boolean;
  resultDomain : string ;
  toasterShow: boolean;
  message: string;
  ngOnInit() {
    this.domainCheck = false;
    this.resultDomain = '';
    this.toasterShow = false;
  }
  setDomain() {
    this.params = {};
    var domainformat = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/;
    if (this.userDomain !== undefined && this.userDomain !== null && this.userDomain !== '') {
      if (this.userDomain.match(domainformat)) {
        this.email = localStorage.getItem('userName');
        this.params.email = this.email;
        this.params.domainName = this.userDomain;
        console.log("Data sending is::", this.params);
        this.dataService.post('api/setUserDomain', this.params)
          .subscribe((domain_response) => { 
            console.log("set domain_response",domain_response);
            if (domain_response.status) {
              if (domain_response.type) {
              this.showToster("Domain has registered successfully.");                
                // this.toastr.succes('Domain has registered successfully.');
              } else {
              this.showToster(domain_response.message);                
                // this.toastr.error('Domain already exists.', 'Oops!');
              }
            } else {
             this.showToster("Something wrong with our systems.");  
              // this.toastr.error('Something wrong with our systems.', 'Oops!');
            }
          });
      } else {
        this.showToster("Set Domain should be valid one.");          
        // this.toastr.error('Domain should be valid one.', 'Oops!');
      }
    } else {
      this.showToster("Set Domain should not be empty.");      
      // this.toastr.error('Domain should not be empty.', 'Oops!');
    }
  }
  getDomain() {
    this.params = {};
    var domainformat = /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9./]+$/;
    if (this.searchDomain !== undefined && this.searchDomain !== null && this.searchDomain !== '') {
      if (this.searchDomain.match(domainformat)) {
        this.params.domainName = this.searchDomain;
        console.log("Data sending is::", this.params);
        this.dataService.getParams('api/searchDomain', this.params)
          .subscribe((domain_response) => {
            console.log("search domain_response",domain_response)
            if (domain_response.status) {
              if (domain_response.type) {
                this.domainCheck = true ;
                this.resultDomain = "Owner details:"+ domain_response.details.email;
                this.showToster("Got results");
              } else {
                this.domainCheck = true ;
                this.resultDomain = "Domain doen't exists.";
                this.showToster("Domain doen't exists.");
              }
            } else {
              this.showToster("Something wrong with our systems, Please try agin.");
              // this.toastr.error('Something wrong with our systems.', 'Oops!');
            }
          });
      } else {
        this.showToster("Search Domain should be valid one.");
        // this.toastr.error('Domain should be valid one.', 'Oops!');
      }
    } else {
      this.showToster("Search Domain should not be empty.");
      // this.toastr.error('Domain should not be empty.', 'Oops!');
    }
  }
  searchDomainChange(){
    this.domainCheck = false ;
    this.resultDomain = '';
  }
  showToster(msg) {
    this.toasterShow = true;
    this.message = msg;
    setTimeout(() => {
      this.toasterShow = false;
      this.cd.detectChanges()
    }, 2000);
  }
  logOut(){
    localStorage.removeItem('userName');
    this.router.navigate(["/login"]);
  }
}
