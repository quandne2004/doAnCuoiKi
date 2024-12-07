import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const BASIC = ["http://localhost:8080"]
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCars():Observable<any>{
    return this.http.get(BASIC + "/api/customer/car",{headers:this.createAuthorizationHeader()});
  }

  getCarById(carId: any):Observable<any>{
    return this.http.get(BASIC +"/api/customer/car/"+carId,{headers:this.createAuthorizationHeader()});
  }

  bookACar(carId:any,bookCarDto: any): Observable<any> {
    return this.http.post<[]>(BASIC +`/api/customer/cars/postACar/${carId}`, bookCarDto,{headers:this.createAuthorizationHeader()});
}

getBookingByUserId():Observable<any>{
  return this.http.get(BASIC+'/api/customer/car/bookings/'+StorageService.getUserId(),{headers:this.createAuthorizationHeader()});
}
searchCar(searchCarDto: any):Observable<any>{
  return this.http.post(BASIC+"/api/customer/car/search",searchCarDto,{headers:this.createAuthorizationHeader()});
}

payment(bookACarId:number,paymentDto:any):Observable<any>{
  return this.http.post(BASIC +`/api/Payment/${bookACarId}`,paymentDto,{headers:this.createAuthorizationHeader()});
}


getBookingById(bookACarId:any):Observable<any>{
  return this.http.get(BASIC + `/api/booking/${bookACarId}`,{headers:this.createAuthorizationHeader()});
}

postComment(commentDto:any,carId:number):Observable<any>{
  commentDto.userId = StorageService.getUserId();
  return this.http.post(BASIC + `/api/customer/comment/${carId}`,commentDto,{headers:this.createAuthorizationHeader()});
}

getCommentByUserId():Observable<any>{
  return this.http.get(BASIC + `/api/customer/comments/${StorageService.getUserId()}`,{headers:this.createAuthorizationHeader()});
}


postCarFix(carFixDto:any):Observable<any>{
  console.log("User ID:", carFixDto.userId);
  return this.http.post(BASIC + `/api/customer/carFix/${StorageService.getUserId()}`,carFixDto,{headers:this.createAuthorizationHeader()});
}

changeRentalCarStatus(rentalContractId:number,status:string):Observable<any>{
  return this.http.get(BASIC + `/api/customer/rentalContract/${rentalContractId}/${status}`,{headers:this.createAuthorizationHeader()});
}

getContractById(id:number):Observable<any>{
  return this.http.get(BASIC + `/api/customer/rentalContract/${id}`,{headers:this.createAuthorizationHeader()});
}

getAllRentalContract():Observable<any>{
  return this.http.get(BASIC + '/api/customer/rental',{headers:this.createAuthorizationHeader()});
}

updateBookACarDetails(bookACarId: number, bookACarDto: any): Observable<any> {
  return this.http.put(`${BASIC}/api/customer/updateBookACar/${bookACarId}`, bookACarDto, {
    headers: this.createAuthorizationHeader()
  });
}

createAuthorizationHeader():HttpHeaders{
  let authHeaders : HttpHeaders = new HttpHeaders();
  return authHeaders.set(
    'Authorization',
    'Bearer ' + StorageService.getToken(),
  );
}

}
