import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the DataService
import { DataserviceService } from './../services/dataservice.service';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataserviceService],
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataserviceService,
    private router: Router ,private cd: ChangeDetectorRef) { }
  email: string;
  password: any;
  params: any = {};
  toasterShow: boolean;
  message: string;
  ngOnInit() {
    this.params = {};
    this.message = '';
    this.toasterShow = false;
  }
  Onsubmit() {
    console.log("email::", this.email, "password::", this.password);

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email !== undefined && this.email !== null && this.email !== '') {
      if (this.email.match(mailformat)) {
        if (this.password !== undefined && this.password !== null && this.password !== '') {
          this.params.email = this.email;
          this.params.password = this.password;
          console.log("Data sending is::", this.params);
          this.dataService.post('api/loginUser', this.params)
            .subscribe((user_response) => {
              if (user_response.status) {
                let userData = user_response.data;
                var name = this.email;
                localStorage.setItem('userName', name );
                this.router.navigate(["/dashboard"]);
              } else {
                this.showToster("Something wrong with our systems, Please try agin.");
                // this.toastr.error('Something wrong with our systems.', 'Oops!');
              }
            });
        } else {
          this.showToster("Password should not be empty.");
          // this.toastr.error('Password should not be empty.', 'Oops!');
        }
      } else {
        this.showToster("Email should be valid one.");
        // this.toastr.error('Email should be valid one.', 'Oops!');
      }
    } else {
      this.showToster("Email should not be empty.");
      // this.toastr.error('Email should not be empty.', 'Oops!');
    }
  }
  showToster(msg) {
    this.toasterShow = true;
    this.message = msg;
    setTimeout(() => {
      this.toasterShow = false;
      this.cd.detectChanges()
    }, 2000);
  }
}