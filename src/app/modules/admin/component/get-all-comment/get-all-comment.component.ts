import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-get-all-comment',
  templateUrl: './get-all-comment.component.html',
  styleUrls: ['./get-all-comment.component.scss']
})
export class GetALlCommentComponent implements OnInit {


  isSpinning:boolean = false;
  comments:any;
  p:number =1;
  constructor(private sv:AdminService) { }

  ngOnInit(): void {
    this.getAllComment();
  }

  getAllComment(){
    this.sv.getAllComment().subscribe((res)=>{
      console.log(res);
      this.comments = res;
    })
  }

  changeStatus(commentId:number,status:string){
    this.sv.changeStatusComment(commentId,status).subscribe((res)=>{
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
