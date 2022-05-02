import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MustMatch } from "../../common/confirm-password.validator";
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public showPasswordEmailSent: boolean;
  public showNewPassword: boolean;
  public showConfirmPassword: boolean;
  resetForm: FormGroup;
  addressForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  hideMsg: boolean = false;
  ShowMsg: string;
  idUser: any;
  password: string;
  rolUser: any;
  //timeSeconds: number =  6000;
  constructor( private _authService: AuthService,private route: ActivatedRoute , private formBuilder: FormBuilder,private router: Router, private _notificationService: NotificationService) { 
    this.route.params.subscribe(params => {
      this.idUser = params.idUser;
      this.password = params.ps;
    });

    this.rolUser = this._authService.getUserRole();

  }

    ngOnInit() {
      var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      this.resetForm = this.formBuilder.group(
        {
          password: [this.password,Validators.required],
          newPassword: ["", [Validators.required,Validators.pattern(regularExpression), Validators.minLength(6), Validators.maxLength(20)]],
          confirmPassword: ["",Validators.required]
        }, {
          validator: MustMatch('newPassword', 'confirmPassword')
        }
      );
    }
    get f() { return this.resetForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.resetForm.invalid) {
        return;
      }
      if(this.password == this.f.newPassword.value){
        this.hideMsg = true;
        this.ShowMsg = 'La contraseña anterior debe ser distinta a la nueva';
        setTimeout(() => { this.hideMsg = false }, 6000);
        return;
      }

      this.loading = true;
      const reset = {
        idUser: parseInt(this.idUser),
        claveActual: this.f.password.value,
        claveUsuario: this.f.newPassword.value,
        binCambiarClaveUsuario: 0,
      }

      this._authService.postModifyPassword(reset).subscribe((data:any) => {
        if(data.success) {
          this.loading = false;
          this.hideMsg = false;
          this._notificationService.success('Información del sistema' , data.msg , 6000);
          const goto = (this.rolUser== 'Administrador')? '/admin': '/dashboard';
          this.router.navigate([goto]);
        } else {
          this.hideMsg = true;
          this.ShowMsg = data.msg;
          this.loading = false;
          setTimeout(() => { this.hideMsg = false }, 6000);
        }
      },
      error => {
        this.loading = false;
        this.hideMsg = true;
        this.ShowMsg = 'Servicio en mantenimiento, favor de iniciar sesión más tarde';
        this._notificationService.warning('Información del sistema' , this.ShowMsg, 6000);
        setTimeout(() => { this.hideMsg = false }, 6000);
      });
    }

    logout() {
      this._authService.logout();
    }

}
