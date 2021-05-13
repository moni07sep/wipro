import { Observable } from 'rxjs';
// import { ILogin } from './../model/login';//need to create
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({providedIn:"root"})
export class UserService{

    public headers:HttpHeaders
    private login_endpoint="http://localhost:4600/api/auth";

    constructor(private http:HttpClient){
        this.headers = new HttpHeaders({ "Content-Type": "application/json",
          });
    }

    userLogin(data:any[]):Observable<any[]>{
        return this.http.post<any[]>(this.login_endpoint,JSON.stringify(data), { headers: this.headers });
    }
    Logout() {  
        localStorage.removeItem("usertoken");
   }
}