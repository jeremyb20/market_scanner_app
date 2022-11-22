import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean;
  loginForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  hideMsg: boolean = false;
  ShowMsg: string;
  user: string= '';

  constructor(private titleService: Title, private _authService: AuthService, private _notificationService: NotificationService, private formBuilder: FormBuilder,private router: Router) {
    this.titleService.setTitle('Bienvenido | Smart Shop');
  }

    ngOnInit() {
      this.loginForm =  this.formBuilder.group({
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[A-Z-a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required]]
      });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      const user = {
        email: this.f.email.value,
        password: this.f.password.value
      }

      this.loading = true;

      this._authService.authenticateUser(user).subscribe({
        next: (result: any) => {
          if (result.success) {
            this._authService.authenticateUserLocal(result.user, result.token);
            if(result.userRol == 'Usuario'){
              this.router.navigate(['/dashboard']);
            }else{
              this.router.navigate(['/admin']);
            }
            
            this.loading = false;
          } else {
            this.loading = false;
            this.getResponseByService(true, result.message); }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      });
    }

    getResponseByService(hideMsg:any, responseMsg:any){
      this.hideMsg = hideMsg;
      this.ShowMsg = responseMsg;
      this.submitted = false;
      if(this.hideMsg){
        setTimeout(() => { this.hideMsg = false }, 6000);
      }
    }
}
