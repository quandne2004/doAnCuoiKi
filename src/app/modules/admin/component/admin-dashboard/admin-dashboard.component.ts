import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private admin: AdminService, private msg: NzMessageService) { }

  cars: any = [];
  p: number = 1;

  ngOnInit() {
    this.getAllCar();
  }

  getAllCar() {
    this.admin.getAllCar().subscribe((res) => {
      console.log(res);
      this.cars = res.map((element: { processedImg: string; returnedImage: string; }) => ({
        ...element,
        processedImg: 'data:image/jpeg;base64,' + element.returnedImage
      }));
    });
  }

  deleteCar(id: number) {
    console.log(id);
    this.admin.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter((car: any) => car.id !== id);
      this.msg.success("Car deleted successfully", { nzDuration: 5000 });
    });
  }

  //loại bỏ navbar đi đến luôn phần content

  ngAfterViewInit(): void {
    // Cuộn đến phần nội dung khi component được khởi tạo
    this.scrollToContent();
  }

  scrollToContent(): void {
    setTimeout(() => {
      const content = document.getElementById('content');
      if (content) {
        content.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500); // Thay đổi thời gian tùy theo độ trễ của trang
  }
}
