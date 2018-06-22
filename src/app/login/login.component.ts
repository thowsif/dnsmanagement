import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the DataService
import { DataserviceService } from './../services/dataservice.service';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[DataserviceService],
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataserviceService) { }
  users:any = [];
  message :String;
  email : String;
  password : any;

  ngOnInit() {
    this.dataService.getUsers().subscribe((response) =>{
      if(response){
        if(response.response != undefined && response.response.length != 0){
        console.log("it is success");          
          this.users = response.response;
          this.message = response.message;          
        }else{
        console.log("it is getting error at second else");          
          this.users = ["thowsif","sayed","nowshad","way2"];
          this.message = response.message;
        }
      }else{
        console.log("it is getting error");
        this.users = ["thowsif","sayed","nowshad","way2"];
        this.message = "Dns thowsifddsfad";
      }
      
    });
    this.users = ["thowsif","sayed","nowshad","way2"];
        this.message = "Dns thowsifddsfad";
  }

  // getdata(){
  //   this.dataService.getUsers().subscribe((response) =>{

  //   });
  }
  


    
  


