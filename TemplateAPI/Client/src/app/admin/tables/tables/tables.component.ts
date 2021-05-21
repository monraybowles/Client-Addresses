import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductService } from 'src/app/shared/product.service';
import { Client } from '../../../shared/product.model'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UsersComponent } from 'src/app/users/users/users.component';
import { TestComponent } from '../../test/test/test.component';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns = ['select','NAME','Surname','Phone','Gender','Email','action'];
  dataSource: MatTableDataSource<Client>;
  //dataSource = null;
  selection: SelectionModel<Client>;
  setting = {element: {dynamicDownload: null as HTMLElement}};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //@ViewChild(MatDialog, { static: true }) dialog: MatDialog;
  isLoadingResults = false;
  
  constructor(private service : ProductService, private dialog: MatDialog) {

  //  this.service.listen().subscribe((m:any)=>{
  //     console.log(m);
  //     this.getUserData();
  //    }
   
  //  )

  }
  

  ngOnInit() {
   //this.isLoadingResults = false;
  //  this.dataSource = new MatTableDataSource(this.service.getAlbum());
  this.getUserData();
  
  }

  getUserData()
  {
    
    //setTimeout(() =>{this.isLoadingResults = true;},5000)
    this.service.getClient().subscribe(res => {
      // Use MatTableDataSource for paginator
      this.isLoadingResults = true;
      this.dataSource = new MatTableDataSource(res);
      this.paginator.pageSize = 5;
      // Assign the paginator *after* dataSource is set
     
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<Client>(true, []);
      setTimeout(() =>{this.isLoadingResults = false;},1000)
    
    });
   //this.isLoadingResults = false;

  }

  delete(action, obj)
  {
    //alert(obj.AlbumId)
    this.service.deleteClient(obj.ClientID).subscribe(res => {
      // Use MatTableDataSource for paginator
     this.getUserData();
    
    });

  }


  openDialogEdit(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(UsersComponent, {
      height: '400px',
      width: '650px',
      data:obj
      
    });
    
    dialogRef.afterClosed().subscribe(result => {
     
      console.log('The dialog was closed');    
      this.getUserData();
     
    });

  }
  openDialog(){
   
    const dialogRef = this.dialog.open(UsersComponent, {
      height: '400px',
      width: '650px',
      
      data: 0,
      
    });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');   
    this.getUserData();

  });
 }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
     
      this.dataSource.paginator.firstPage();
      //this.isLoadingResults = false;
    }
  }

  // /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  excelExport(){

    this.service.getClient().subscribe((res) => {
     
    });
    var text = '';
    var rows="";

    this.dataSource.data.forEach(row => 
      rows += row.NAME + ',' + row.Surname
      
    );

    var JSONData = this.dataSource.data;
   
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';
    //This condition will generate the Label/Header
  
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            //Now convert each value to string and comma-seprated+c
            if (index == 'Phone'){

              row += ''; 
            }else {
              row += index + ',';
            }
           
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    
        console.log(arrData.splice(4,1))
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
     // arrData.splice(4,1);
     
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
          console.log(arrData[i][index])
           
            //delete index[i]
           
            row += '"' + arrData[i][index] + '",';
          
           
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';

             


        
    }

    console.log(CSV)
    this.dyanmicDownloadByHtmlTag({
      fileName: 'Clients',
      text: CSV
    });

  }

  dynamicDownloadJson() {  


    this.service.getClient().subscribe((res) => {
     
     
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report.json',
        text: JSON.stringify(res)
      });
    });

   


  }
  
  

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  
}



