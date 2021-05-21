import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables/tables.component';
import { DataService } from './data.service';
//import { ProductsComponent } from 'src/app/products/products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule} from '@angular/material/progress-bar'
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  imports: [
    CommonModule,       
    TablesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    
  ],
  declarations: [TablesComponent],
  providers: [DataService]
})
export class TablesModule {}
