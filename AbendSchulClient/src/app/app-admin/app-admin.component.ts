import { Component, OnInit, ElementRef } from '@angular/core';
import { Person } from '../Person';
import { Facher } from '../Facher';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.css']
})
export class AppAdminComponent implements OnInit {

  HTTPService : HttpService;
  id : string;
  peoples : Person[] = [];
  facher : Facher[] = [];
  displayedColumns = ['Fach', 'Kolleg', 'Sem', 'Del'];
  dataSource = new MatTableDataSource<Facher>(this.facher);
  displayedColumnsPupils = ['klasse', 'firstname', 'lastname', 'Del'];
  dataSourcePupils = new MatTableDataSource<Person>(this.peoples);
  
  constructor(private elem : ElementRef, private router: Router, http : HttpService, private route: ActivatedRoute, public snackBar: MatSnackBar) {  
    this.HTTPService = http;
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
  }

  public getpupils(){
    let persons : Person[] = this.peoples;
    let content : string;
    let files = this.elem.nativeElement.querySelector('#pupilfile').files;
    var myReader:FileReader = new FileReader();
    myReader.onloadend = function(e){
      content = myReader.result;
      let stringarr : string[] = content.split("\n");
      stringarr.forEach(b => {
        let pupil : string[] = b.split(';');
        persons.push(new Person(0 , pupil[0], pupil[1], pupil[2]));
      });
    }
    myReader.readAsText(files[0]);
  }

  public getFacher(){
    let facher = this.facher = [];
    let content : string;
    let files = this.elem.nativeElement.querySelector('#fachfile').files;
    var myReader:FileReader = new FileReader();
    myReader.onloadend = function(e){
      content = myReader.result;
      let stringarr : string[] = content.split("\n");
      stringarr.forEach(b => {
        let gegen : string[] = b.split(';');
        facher.push(new Facher(0 , gegen[0], gegen[1],parseInt(gegen[2]), false));
      });
    }
    myReader.readAsText(files[0]);
  }

  deleteItem(index : number){
    this.facher.splice(index, 1);
    this.showFacher();
  }

  deleteItemPupils(index : number){
    this.facher.splice(index, 1);
    this.showPupils();
  }

  public showFacher(){
    this.dataSource = new MatTableDataSource<Facher>(this.facher);
  }

  public showPupils(){
    this.dataSourcePupils = new MatTableDataSource<Person>(this.peoples);
  }

  public sendPupils(){
    this.HTTPService.sendNewPupils(this.peoples, this.id).subscribe(result =>{ 
      var x = result;
      this.snackBar.open("Daten wurden gesendet.", "OK",{
        duration: 5000,
      });
    });
  }

  public sendFacher(){
    this.HTTPService.sendNewFächer(this.facher, this.id).subscribe(result =>{ 
      var x = result;
      this.snackBar.open("Daten wurden gesendet.", "OK",{
        duration: 5000,
      });
    });
  }
}
