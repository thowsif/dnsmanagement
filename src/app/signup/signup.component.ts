import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataserviceService } from './../services/dataservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [DataserviceService]
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private dataService: DataserviceService, private cd: ChangeDetectorRef) {

  }
  userName: string;
  email: string;
  password: string;
  rePassword: string;
  params: any = {};
  toasterShow: boolean;
  message: string;
  ngOnInit() {
    this.params = {};
    this.toasterShow = false;
    this.message = '';
  }
  Onsubmit() {
    console.log("name::", this.userName, "email::", this.email, "password::", this.password, "rePassword::", this.rePassword);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.userName !== undefined && this.userName !== null && this.userName !== '') {
      if (this.email !== undefined && this.email !== null && this.email !== '') {
        if (this.email.match(mailformat)) {
          if (this.password !== undefined && this.password !== null && this.password !== '') {
            if (this.password.length >= 5) {
              if (this.rePassword !== undefined && this.rePassword !== null && this.rePassword !== '') {
                if (this.password === this.rePassword) {
                  this.params.name = this.userName;
                  this.params.email = this.email;
                  this.params.password = this.password;
                  console.log("Data sending is::", this.params);
                  this.dataService.post('api/addUser', this.params)
                    .subscribe((response) => {
                      console.log("Response at sign up", response);
                      if (response.status) {
                        if (response.type) {
                          this.showToster("Successfully registered, Please login now");
                          this.router.navigate(["/login"]);
                          // this.toastr.succes('Successfully registered, Please login now');
                        } else {
                          this.showToster("Email already exists.");
                          // this.toastr.error('Email already exists.', 'Oops!');
                        }
                      } else {
                        this.showToster("Something wrong with our systems, Please try agin.");
                        // this.toastr.error('Something wrong with our systems.', 'Oops!');
                      }
                    });
                } else {
                  this.showToster("Passwords are matching.");
                  // this.toastr.error('Passwords are matching.', 'Oops!');
                }
              } else {
                this.showToster("Repeat Password should not be empty.");
                // this.toastr.error('Repeat Password should not be empty.', 'Oops!');
              }
            } else {
              this.showToster("Password should have minimum 5 characters.");
              // this.toastr.error('Password should have minimum 5 characters.', 'Oops!');
            }
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
    } else {
      this.showToster("Name should not empty.");
      // console.log("name should not empty");
      // this.toastr.error('Name should not be empty.', 'Oops!');
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
