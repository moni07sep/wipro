import { Observable } from 'rxjs';
import { IemployeeDetails } from './../model/employeeDetails';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({providedIn:"root"})
export class EmoloyeeDetailsService{
    public headers:HttpHeaders
    private employeeList_endpoint="http://localhost:4600/api/fetchAllEmployeeDetails";
    private pieChart_endpoint="http://localhost:4600/api/PieChart";
    private barChart_endpoint="http://localhost:4600/api/BarChart";
    private businessUnit_endpoint="http://localhost:4600/api/findBusinessUnit/"
    private addEmployeeData_endpoint="http://localhost:4600/api/addEmployeeDetails"


    constructor(private http:HttpClient){

        let token = JSON.parse(localStorage.getItem("usertoken"));
        
        this.headers = new HttpHeaders({ "Content-Type": "application/json",
        "x-auth-token": token
          });
    }
    
    fetchAllEmployeeDetails():Observable<any[]>{
        return this.http.get<IemployeeDetails[]>(this.employeeList_endpoint, {headers:this.headers})
    }
    fetchPieChartData():Observable<any[]>{
        return this.http.get<any[]>(this.pieChart_endpoint, {headers:this.headers})
    }
    fetchBarChartData():Observable<any[]>{
        return this.http.get<any[]>(this.barChart_endpoint, {headers:this.headers})
    }
    fetchdataByBusinessUnit(businessUnit):Observable<any[]>{
        return this.http.get<IemployeeDetails[]>(this.businessUnit_endpoint+businessUnit, { headers: this.headers });
    }
    addEmployeeData(data:IemployeeDetails[]):Observable<IemployeeDetails[]>{
        return this.http.post<IemployeeDetails[]>(this.addEmployeeData_endpoint,JSON.stringify(data), { headers: this.headers });
    }
}