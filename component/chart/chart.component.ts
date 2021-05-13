import { Component,Input , OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {EmoloyeeDetailsService} from '../../shared/services/employeeDetails.service'
import {IemployeeDetails} from '../../shared/model/employeeDetails';
import {UserService} from '../../shared/services/user.service'
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import{EditemployeeComponent} from '../editemployee/editemployee.component'



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @Input() id;
  
  public userForm: FormGroup;
  constructor(private router: Router,private userService:UserService,private fb: FormBuilder,private modalService: NgbModal,private emoloyeeDetailsService:EmoloyeeDetailsService) { }

  val
  employeeList:Array<IemployeeDetails>=[];
  employeeList1:Array<IemployeeDetails>=[];
  distinctEmployeeList
  chartPie
  chartBar
  closeResult = '';
  mobno =  "^[0-9_-]{10,15}";
  email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
  ngOnInit() {

    this.userForm = this.fb.group({
      "name": ['', [Validators.required ]],
      "dob" : ["", [Validators.required]],
      "doj" : ["", [Validators.required]],
      "mobileNo":["",[Validators.required, Validators.pattern(this.mobno)]],
      "experienceYear":["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      "email": ["", [Validators.required, Validators.pattern(this.email)]],
      "projectName": ['', [Validators.required ]],
      "businessUnit": ['', [Validators.required ]],
      "projectManger": ['', [Validators.required ]],
      "location": ['', [Validators.required ]],
    })

    this.load();

  }

  //function for chart grid load
  load(){
    this.emoloyeeDetailsService.fetchAllEmployeeDetails().subscribe(item=>{
      this.employeeList=item["list"];
      //console.log(this.employeeList)
      this.distinctEmployeeList=Array.from(new Set(item["list"].map((item1: any) => item1.businessUnit)))
    })

    // pie chart
    this.emoloyeeDetailsService.fetchPieChartData().subscribe(pieChartData=>{
      this.chartPie = new Chart({
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Pie Chart'
        },
        
        credits: {
          enabled: false
        },
        series: [{
          name: 'Employee Count ',
          type: undefined,
          // colorByPoint: true,
          data: pieChartData
        }]
      });
    })

    // bar chart
    this.emoloyeeDetailsService.fetchBarChartData().subscribe(barChartData=>{
     
      var categories = barChartData.map(item => item._id);
      var data = barChartData.map(item => item.count);
      
      this.chartBar = new Chart({
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Bar Chart'
        },
        xAxis: {
          categories: categories,
      },
        series: [
          {
            name: 'Employee Count',
            data: data,
            type: undefined
          }
        ]
      });
     
    })

  }
  //code for select box
  changeBusinessUnit(item){ 
    if(item!=""){
      this.emoloyeeDetailsService.fetchdataByBusinessUnit(item).subscribe(item=>{
        this.employeeList=item["list"];
      })
    }else{
      this.emoloyeeDetailsService.fetchAllEmployeeDetails().subscribe(item=>{
        this.employeeList=item["list"];
      })
    }
  }

  //code for Add employee details
  Save(item: IemployeeDetails[]) {
    this.val={ 
    "name" : item["name"],
    "dob": this.setDateFormat(item["dob"]),
    "doj": this.setDateFormat(item["doj"]),
    "mobileNo": item["mobileNo"],
    "experienceYear": item["experienceYear"],
    "email": item["email"],
    "projectName": item["projectName"],
    "businessUnit": item["businessUnit"],
    "projectManger": item["projectManger"],
    "location": item["location"],
    }
    
    this.emoloyeeDetailsService.addEmployeeData(this.val).subscribe(item=>{
      this.load();
    })

    this.userForm.reset();
    this.closeModal();
  }
  
  //code for update
  edit(id){
  const ref = this.modalService.open(EditemployeeComponent, { centered: true });
  // ref.componentInstance.selectedUser = id;
  //  ref.result.then((yes) => {
  //    console.log("Yes Click");
  //  },
  //    (cancel) => {
  //      console.log("Cancel Click");
  //    })
  }

  setDateFormat(dt) {
    if (dt != null && dt!='') {
      var dep_year = dt.year;
      var dep_month = dt.month;
      if (dep_month > 0 && dep_month < 10) dep_month = '0' + dep_month;

      var dep_day = dt.day;
      if (dep_day > 0 && dep_day < 10) dep_day = '0' + dep_day;

      var dep_Date = dep_day + "/" + dep_month + "/" + dep_year;
      return dep_Date;
    }
    else
      return "";

  }

  open(content) { 
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private closeModal(): void {
     document.getElementById("closeBtn").click();
    
  }
  
  logout(){
    this.userService.Logout();
    this.router.navigateByUrl("/login");  
  }
 

}
