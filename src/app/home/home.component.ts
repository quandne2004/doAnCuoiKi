import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  cars: any[] = []; // Danh sách tất cả các xe
  filteredCars: any[] = []; // Danh sách xe sau khi tìm kiếm/lọc
  p: number = 1; // Trang hiện tại trong phân trang
  isSpinning: boolean = false; // Trạng thái loading
  typingTimer: any; // Biến để lưu timeout
  readonly doneTypingInterval: number = 500; // Thời gian chờ sau khi gõ (500ms)

  constructor(private sv: HomeService) {}

  ngOnInit(): void {
    this.loadAllCars();
  }

  /**
   * Lấy danh sách tất cả các xe từ API và hiển thị.
   */
  loadAllCars(): void {
    this.isSpinning = true;
    this.sv.getAllCar().subscribe(
      (res) => {
        console.log('Tất cả xe:', res);
        this.cars = res.map((car: any) => ({
          ...car,
          processedImg: car.returnedImage
            ? `data:image/jpeg;base64,${car.returnedImage}`
            : 'default-image-url.jpg', // Hình ảnh mặc định nếu không có ảnh
        }));
        this.filteredCars = [...this.cars]; // Sao chép danh sách ban đầu để hiển thị
        this.isSpinning = false;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách xe:', error);
        this.isSpinning = false;
      }
    );
  }

  /**
   * Xử lý khi người dùng nhập vào ô tìm kiếm.
   * @param event Sự kiện gõ phím
   */
  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.trim();

    // Hủy bỏ timeout trước đó
    clearTimeout(this.typingTimer);

    // Đặt timeout mới
    this.typingTimer = setTimeout(() => {
      this.applySearchFilter(searchValue); // Thực hiện tìm kiếm
    }, this.doneTypingInterval);
  }

  /**
   * Lọc danh sách xe dựa trên giá trị tìm kiếm.
   * @param searchValue Giá trị nhập từ ô tìm kiếm
   */
  applySearchFilter(searchValue: string): void {
    if (!searchValue) {
      // Nếu ô tìm kiếm trống, hiển thị tất cả xe
      this.filteredCars = [...this.cars];
    } else {
      // Lọc xe có tên chứa từ khóa tìm kiếm
      this.filteredCars = this.cars.filter((car: any) =>
        car.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  /**
   * Xử lý khi chuyển trang.
   * @param page Trang được chuyển đến
   */
  onPageChange(page: number): void {
    this.p = page; // Gán số trang hiện tại
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }
  
}
