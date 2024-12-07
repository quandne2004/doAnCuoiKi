import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-comment',
  templateUrl: './my-comment.component.html',
  styleUrls: ['./my-comment.component.scss']
})
export class MyCommentComponent implements OnInit {


  isSpinning:boolean = false;
  comments:any;
  p:number=1;
  constructor(private sv:CustomerService) { }

  ngOnInit(): void {
    this.getCommentByUserId();
  }

  getCommentByUserId(){
    this.sv.getCommentByUserId().subscribe((res)=>{
      console.log(res);
      this.comments = res;
    })
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
