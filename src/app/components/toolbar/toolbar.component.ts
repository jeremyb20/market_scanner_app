import {Component, EventEmitter, OnInit, Output, OnDestroy, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MustMatch } from 'src/app/common/confirm-password.validator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MediaResponse, MediaService } from 'src/app/services/media.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closebutton:any;
  public showPasswordEmailSent: boolean;
  public showNewPassword: boolean;
  public showConfirmPassword: boolean;
  private mediaSubscription: Subscription;
  Media: MediaResponse;

  resetForm: FormGroup;
  addressForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  hideMsg: boolean = false;
  ShowMsg: string;
  companyName: any;
  idUser: any;
  companySelected: string= '...';
  companies: any = [];
  userName: any = '';
  companyInfoSelected: any = []
  disabledButton: any = false;

  constructor(private _media: MediaService, private _authService: AuthService, private formBuilder: FormBuilder,private router: Router, private _notificationService: NotificationService) {
    this.companyName = this._authService.getCompanyDefault();
    this.idUser = this._authService.getUserIdLocal();
    this.userName = this._authService.getUserNameLocal();
    this.mediaSubscription = this._media.subscribeMedia().subscribe(media => {
      this.Media = media;
    });

    setInterval(() => {
      this.getDetection();
    }, 1000)
  }

  @Output() navbarEventEmitter: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    this.resetForm = this.formBuilder.group(
      {
        password: ["",Validators.required],
        newPassword: ["", [Validators.required,Validators.pattern(regularExpression), Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ["",Validators.required]
      }, {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  getDetection() {
    this.disabledButton = this._authService.getDetectionChanges();
    this.disabledButton = (this.disabledButton == 'true')?true: false;
  }

  get f() { return this.resetForm.controls; }

  logout(){
    this._authService.logout();
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return;
    }

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
        this.submitted = false;
        this.resetForm.reset();
        this._notificationService.success('Información del sistema' , data.msg , 6000);

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
        this.ShowMsg = error;
        setTimeout(() => { this.hideMsg = false }, 6000);

    });
  }

  companySelect(company:any) {
    this.companySelected = company.DescripcionCompania;
    this.companyInfoSelected = company;
  }

  changeCompany() {
    this._authService.setTabSelected(1);
    localStorage.setItem('idCompany',this.companyInfoSelected.IdCompania);
    localStorage.setItem('empresaDefault',this.companyInfoSelected.DescripcionCompania);
    location.reload();
  }

  public toggleNavbar() {
    this.navbarEventEmitter.emit(null);
  }

  ngOnDestroy () {
    if(this.mediaSubscription){
      this.mediaSubscription.unsubscribe();
    }
  }
}
