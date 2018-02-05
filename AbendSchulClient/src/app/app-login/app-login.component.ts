import { Component, OnInit } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,  ActivatedRouteSnapshot } from '@angular/router';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

  HTTPService : HttpService;
  username : string = "";
  password : string;
  hide : boolean = true;
  ok : number;

  constructor(private router: Router, http : HttpService , public snackBar: MatSnackBar) {
    this.HTTPService = http;
  }

  ngOnInit() {
  }

    doSend() : void { 
      this.HTTPService.getOK(this.username, this.password).subscribe(result => this.ok = result);
      console.log(this.ok);
      if(this.ok == 1){
        this.router.navigate(['/user', this.username]);
      }
      else{
        this.snackBar.open("Daten wurden gesendet.", "OK",{
          duration: 5000,
        });
      }
  }

}
