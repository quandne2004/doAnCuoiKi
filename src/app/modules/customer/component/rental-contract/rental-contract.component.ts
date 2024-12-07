import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-rental-contract',
  templateUrl: './rental-contract.component.html',
  styleUrls: ['./rental-contract.component.scss']
})
export class RentalContractComponent implements OnInit {

  id: number = this.active.snapshot.params["id"];
  rentalContracts: any;
  bookACarForm!: FormGroup;
  listOfPayment = ["TechCombank:19036320228013", "Come to Shop and paid"];


  isEditPayment = false; // Biến để theo dõi việc sửa phương thức thanh toán
  isEditFromDate = false; // Biến để theo dõi việc sửa ngày bắt đầu
  isEditToDate = false; // Biến để theo dõi việc sửa ngày kết thúc
  constructor(private active: ActivatedRoute,
              private sv: CustomerService,
              private msg: NzMessageService,
              private fb: FormBuilder,private modal: NzModalService) { }

  ngOnInit(): void {
    this.getRentalContractById();
    console.log("Rental Contract ID from route: ", this.active.snapshot.params["id"]);
    
    // Tạo form với các trường cần sửa đổi của BookACar
    this.bookACarForm = this.fb.group({
      payment: [null, [Validators.required]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]]
    });
  }

  getRentalContractById() {
    this.sv.getContractById(this.id).subscribe((res) => {
      this.rentalContracts = res;
      console.log(res);

      // Cập nhật form với các giá trị của BookACar từ backend
      this.bookACarForm.patchValue({
        payment: this.rentalContracts.paymentMethod,
        fromDate: this.rentalContracts.bookACarfromDate,
        toDate: this.rentalContracts.bookACartoDate
      });
    })
  }

  toggleEditField(field: string): void {
    if (this.rentalContracts?.rentalContractStatus === 'REJECT') {
      this.modal.warning({
        nzTitle: 'Không thể chỉnh sửa',
        nzContent: 'Hợp đồng này đã bị từ chối. Bạn không thể thực hiện thay đổi.',
        nzOkText: 'Đã hiểu'
      });
      return;
    }

    // Nếu hợp đồng không bị từ chối, chuyển sang chế độ chỉnh sửa
    if (field === 'paymentMethod') {
      this.isEditPayment = true;
    } else if (field === 'fromDate') {
      this.isEditFromDate = true;
    } else if (field === 'toDate') {
      this.isEditToDate = true;
    }
  }

  updateBookACar(): void {
    if (this.rentalContracts?.rentalContractStatus === 'REJECT') {
      this.modal.warning({
        nzTitle: 'Không thể cập nhật hợp đồng!',
        nzContent: 'Hợp đồng này bạn đã từ chối và không thể thực hiện thay đổi.',
        nzOkText: 'Đã hiểu',
      });
      return;
    }
  
    if (this.bookACarForm.valid) {
      this.modal.confirm({
        nzTitle: 'Xác nhận cập nhật',
        nzContent: 'Bạn có chắc chắn muốn cập nhật thông tin này không?',
        nzOkText: 'Cập Nhật',
        nzCancelText: 'Hủy',
        nzOnOk: () => {
          const bookACarId = this.rentalContracts?.bookACarId;
          this.sv.updateBookACarDetails(bookACarId, this.bookACarForm.value).subscribe(
            (response: any) => {
              this.msg.success('Cập nhật thành công!');
              this.getRentalContractById();
              window.location.reload();
            },
            (error) => {
              this.msg.error('Cập nhật thất bại!');
              console.error(error);
            }
          );
        }
      });
    } else {
      this.msg.error('Form không hợp lệ!');
    }
  }
  
  
}