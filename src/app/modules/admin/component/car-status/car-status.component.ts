import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-car-status',
  templateUrl: './car-status.component.html',
  styleUrls: ['./car-status.component.scss']
})
export class CarStatusComponent implements OnInit {

  cars: any[] = []; // Mảng chứa thông tin xe
  p: number = 1;
  isSpinning: boolean = false; // Biến để quản lý trạng thái loading

  constructor(private sv: AdminService, private notice: NzMessageService) {}

  ngOnInit(): void {
    this.getAllCar(); // Gọi hàm để lấy danh sách xe ngay khi component khởi tạo
  }

  getAllCar() {
    this.isSpinning = true; // Bắt đầu loading
    this.sv.getAllCar().subscribe(
      (res) => {
        console.log(res);
        this.cars = res; // Cập nhật danh sách xe từ response
        this.isSpinning = false; // Kết thúc loading
      },
      (error) => {
        this.notice.error("Failed to load cars", { nzDuration: 5000 }); // Hiển thị thông báo lỗi nếu có
        this.isSpinning = false; // Kết thúc loading ngay cả khi có lỗi
      }
    );
  }

  changeCarStatus(carId: number, status: string) {
    this.sv.changeCarStatus(carId, status).subscribe(
      (res) => {
        console.log(res);
        this.notice.success("Change Success", { nzDuration: 5000 });

        // Cập nhật lại trạng thái của xe trong mảng `cars`
        const carIndex = this.cars.findIndex(car => car.id === carId);
        if (carIndex !== -1) {
          // Nếu xe tồn tại trong danh sách, cập nhật trạng thái
          this.cars[carIndex].carStatus = status; // Cập nhật trạng thái xe
        }
      },
      (error) => {
        this.notice.error("Error", { nzDuration: 5000 }); // Hiển thị thông báo lỗi
      }
    );
  }
}
