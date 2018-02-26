import { Component, OnInit } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,  ActivatedRouteSnapshot } from '@angular/router';
import { HttpService } from '../http.service';
import { MatSnackBar } from '@angular/material';
import { Session } from '../Facher';

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
  ok : Session;

  constructor(private router: Router, http : HttpService , public snackBar: MatSnackBar) {
    this.HTTPService = http;
  }

  ngOnInit() {
  }

    doSend() : void { 
      this.HTTPService.getOK(this.username, this.password).subscribe(result => {
        this.ok = result;
        if(this.ok.sessionstring != '0'){
          if(this.ok.id == 0){
            this.router.navigate(['/user', this.ok.sessionstring]);
          }
          else if(this.ok.id == 1){
            this.router.navigate(['/admin', this.ok.sessionstring]);
          }
        }
        else{
          this.snackBar.open("Password ist falsch.", "OK",{
            duration: 5000,
          });
        }
      });
    }
  }
