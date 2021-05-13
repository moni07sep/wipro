import { Component, OnInit } from '@angular/core';
import {Validators,FormBuilder,FormGroup}from '@angular/forms'
import { Router } from '@angular/router';
import {UserService} from '../../shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showErrorMessage:string;
  public userForm:FormGroup;
  public submitted:boolean=false;

  email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  constructor( private userService:UserService ,private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      "userLogin":this.fb.group({
        "emailId":["", [Validators.required, Validators.pattern(this.email)]],
        "password":["",[Validators.required]]
      })
    })
  }
  loginUser(data:any[]){
    
    this.submitted=true;
    if(!this.userForm.valid){
      return;
    }
    
    this.userService.userLogin(data).subscribe(item=>{
      localStorage.setItem("usertoken", JSON.stringify(item["token"]));
      alert("login succsesful");
      this.router.navigateByUrl("/chart");   
    },
    (ex:any) => {
      this.showErrorMessage = ex.error.message
      alert(this.showErrorMessage)
    }
    )
  }

}
