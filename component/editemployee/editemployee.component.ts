import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {NgbModal,ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  public userForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,private fb: FormBuilder,private modalService: NgbModal) { }

  closeResult = '';
  mobno =  "^[0-9_-]{10,15}";
  email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  
  ngOnInit(): void {
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
  }

  Edit(item){
    alert("fg")

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

}
