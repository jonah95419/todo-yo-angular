import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-psw-olvidada',
  templateUrl: './psw-olvidada.component.html',
  styleUrls: ['./psw-olvidada.component.css']
})
export class PswOlvidadaComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
