import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-total-car',
  templateUrl: './total-car.component.html',
  styleUrls: ['./total-car.component.scss']
})
export class TotalCarComponent implements OnInit {


  name: string = '';   

  listOfName: any;
  cars:any[]=[];
  p: number = 1;
  constructor(private sv:AdminService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCars();

  }

  getAllCars() {
    this.sv.getAllCar().subscribe(
      (res) => {
        console.log('Danh sách tất cả xe:', res);
        this.cars = res.map((car: any) => ({
          ...car,
          processedImg: car.returnedImage
            ? `data:image/jpeg;base64,${car.returnedImage}`
            : 'default-image-url.jpg',
        }));
      },
      (error) => {
        console.error('Lỗi khi tải danh sách xe:', error);
      }
    );
  }
  


  searchCarByName(name: string) {
    const trimmedName = name.trim();
  
    if (trimmedName === '') {
      this.getAllCars();
      return;
    }
  
    this.sv.searchCarByName(trimmedName).subscribe(
      (res) => {
        console.log('Kết quả tìm kiếm:', res);
        this.cars = res.map((car: any) => ({
          ...car,
          processedImg: car.returnedImage
            ? `data:image/jpeg;base64,${car.returnedImage}`
            : 'default-image-url.jpg',
        }));
      },
      (error) => {
        console.error('Lỗi khi tìm kiếm:', error);
      }
    );
  }
  

}