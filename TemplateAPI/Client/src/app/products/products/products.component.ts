import { UsersComponent } from './../../users/users/users.component';

import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/product.service';
import { NgForm } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Client } from '../../shared/product.model'
import { Observable } from 'rxjs';

class NavLink {
  constructor(public path: string, public label: string) {}
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})



export class ProductsComponent implements OnInit {
prod = null;

  constructor(public dialog: MatDialog, public service : ProductService) { }
  
  displayedColumns: string[] = ['ClientID','NAME','Surname','Email','Phone','Gender'];
  listData = null;


  ngOnInit(): void {
    this.resetForm();
    
    this.service.getAlbum().subscribe(

      (data: Client[]) => this.listData = data,
      (err: any) => console.log(err),
      () => console.log('All done getting products')
    )
   

  }

 

  openDialog(): void{
    let dialogRef = this.dialog.open(UsersComponent, {
       data: {
         
         height: '400px',
         width: '600px',
       }
      // height: '400px',
      //

    });
  }

  resetForm(form? : NgForm){
    if (form!=null)
    form.reset();
    this.service.formData = {
     ClientID : null,
     NAME : '',
     Surname : '',
     Email : '',
     Phone : '',
     Gender : '',
     
    }
  }
  onSubmit(form : NgForm)
  {
    
  this.insertRecord(form);
 
  } 

  insertRecord(form : NgForm){
    this.service.postAlbum(form.value).subscribe(res => {
      this.resetForm(form)
    });
  }
 
  

}
export class ProductDataSource extends DataSource<any> {
constructor(public service : ProductService) {
  super();
}

connect(): Observable<Client[]> {
  return this.service.getAlbum();
}

disconnect() {}
  
}