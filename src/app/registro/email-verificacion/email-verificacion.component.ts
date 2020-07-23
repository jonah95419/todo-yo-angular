import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-email-verificacion',
  templateUrl: './email-verificacion.component.html',
  styleUrls: ['./email-verificacion.component.css']
})
export class EmailVerificacionComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
