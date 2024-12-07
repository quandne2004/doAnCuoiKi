import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-total-bookings',
  templateUrl: './total-bookings.component.html',
  styleUrls: ['./total-bookings.component.scss']
})
export class TotalBookingsComponent implements OnInit {



  id!:number;
  bookACar:any;
  p: number = 1;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllBookACar();
  }

  getAllBookACar(){
    this.sv.getCarBookings().subscribe((res)=>{
      console.log(res);
      this.bookACar = res;
    })
  }

  searchTotal(id: number | null) {
    if (!id) {
      this.getAllBookACar(); 
      return;
    }
  
    this.sv.searchTotalBooking(id).subscribe((res) => {
      this.bookACar = res;
      console.log(res);
    });
  }
  

}