import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './component/post-car/post-car.component';
import { HttpClientModule } from '@angular/common/http';


import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message'; // Import module này
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCarComponent } from './component/update-car/update-car.component';
import { GetBookingsComponent } from './component/get-bookings/get-bookings.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import { SearchCarComponent } from './component/search-car/search-car.component';
import { GetALlCommentComponent } from './component/get-all-comment/get-all-comment.component';
import { CarStatusComponent } from './component/car-status/car-status.component';
import { CarFixComponent } from './component/car-fix/car-fix.component';
import { ContractComponent } from './component/contract/contract.component';
import { PostContractComponent } from './component/post-contract/post-contract.component';
import { RentalContractComponent } from './component/rental-contract/rental-contract.component';
import { PostRentalContractComponent } from './component/post-rental-contract/post-rental-contract.component';
import { ShowPaymentComponent } from './component/show-payment/show-payment.component';
import { DataDashboardComponent } from './component/data-dashboard/data-dashboard.component';
import { TotalCarComponent } from './component/total-car/total-car.component';
import { TotalBookingsComponent } from './component/total-bookings/total-bookings.component';
import { TotalContractComponent } from './component/total-contract/total-contract.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    UpdateCarComponent,
    GetBookingsComponent,
    SearchCarComponent,
    GetALlCommentComponent,
    CarStatusComponent,
    CarFixComponent,
    ContractComponent,
    PostContractComponent,
    RentalContractComponent,
    PostRentalContractComponent,
    ShowPaymentComponent,
    DataDashboardComponent,
    TotalCarComponent,
    TotalBookingsComponent,
    TotalContractComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzMessageModule,
    NzSelectModule,
    NzDatePickerModule,NzTimePickerModule,NzTableModule,NgChartsModule,NgxPaginationModule
  ]
})
export class AdminModule { }