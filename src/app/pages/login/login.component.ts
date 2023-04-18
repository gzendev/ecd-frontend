import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/model/mensaje.model';
import { AuthenticateService } from 'src/app/services/login/authenticate.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginInvalid = false;
  form!: FormGroup;
  msgError = "Usuario o clave incorrecta";
  ambiente = environment.title;

  constructor(
    private fb: FormBuilder,
    private msg: MensajesService,
    private auth: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // this.msg.getMensaje(1,15443).subscribe(
    //   (val:Mensaje) => {
    //     this.msgError = val.descripcion;
    //   },
    //   error => {
    //     console.log('no se encontro id 1,15443',error);
    //   }
    // );
    
  }

  onSubmit(){
    this.loginInvalid = false;
    if(!this.form.valid){
      return;
    }
    let username:string = this.form.controls["username"].value;
    let password:string = this.form.controls["password"].value;

    try {
      this.auth.loginTest(username, password).subscribe(
        (val: any) => {
          console.log(val);
          this.router.navigate(['/home']);
        },
        error => {
          this.loginInvalid = true;
          console.log(error);
        }
      );
    } catch (error) {
      this.loginInvalid = true;
    }    
  }
}