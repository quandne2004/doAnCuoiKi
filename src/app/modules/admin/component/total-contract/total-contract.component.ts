import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-total-contract',
  templateUrl: './total-contract.component.html',
  styleUrls: ['./total-contract.component.scss']
})
export class TotalContractComponent implements OnInit {


  Contracts:any;
  p: number = 1;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllContract();
  }

  getAllContract(){
    this.sv.getAllRentalContract().subscribe((res)=>{
      console.log(res);
      this.Contracts = res;
    })
  }

}