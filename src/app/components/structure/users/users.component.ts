import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MediaResponse, MediaService } from 'src/app/services/media.service';
import { Options } from 'src/app/common/constants';
declare var bootstrap :any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private mediaSubscription: Subscription;
  Media: MediaResponse;
  @ViewChild('actionEditAndDelete', { static: true }) actionEditAndDelete: TemplateRef<any>;
  @ViewChild('actionBorrar', { static: true }) actionBorrar: TemplateRef<any>;

  columns:any
  columnsListByCompany:any;
  data: any = [];
  options: any = Options;

  brandsForm: FormGroup;
  currentTheme: any;
  submitted: boolean = false;
  hideMsg: boolean = false;
  showCardBrand: boolean = false;
  showCardRightUser: boolean = false;
  ShowMsg: string = '';
  newInventoryModal: any;
  title: any =  '';
  buttonText: any = '';
  editOrNewOption: boolean;

  constructor(private _media: MediaService, private titleService: Title, private formBuilder: FormBuilder, private themeService: ThemeService, private http: HttpClient, private _authService: AuthService, private _notificationService: NotificationService) {
    this.titleService.setTitle('Inventario  | Smart Shop');
    this.currentTheme = this.themeService.getThemeSelected();
    this.getUserByCatalog();

    this.mediaSubscription = this._media.subscribeMedia().subscribe(media => {
      this.Media = media;
      if(this.Media.IsMobile){
        this.showCardBrand = false;
        this.showCardRightUser = false;
      }
    });
  }

  get f() { return this.brandsForm.controls; }

  ngOnInit() {
    this.brandsForm = this.formBuilder.group(
      {
        idMarca: ['0',Validators.required],
        codigoMarca: ['',Validators.required],
        descripcionMarca: ['',Validators.required]
      }
    );

    this.columns = [
      { key: 'username', title: 'Nombre', width: 100,pinned: false, sorting: true },
      { key: 'email', title: 'Correo', align: { head: 'center', body: 'center' }, width: 100, sorting: true },
      { key: 'createdAt', title: 'Fecha Creación', align: { head: 'center', body: 'center' }, width: 100, sorting: true },
      { key: 'updatedAt', title: 'Fecha actualización', align: { head: 'center', body: 'center' }, width: 100, sorting: true },
      { key: 'accion', title: '<div class="blue">Acción</div>', align: { head: 'center', body:  'center' }, sorting: false, width: 80, cellTemplate: this.actionEditAndDelete }
    ];

    this.getModalInit();
  }

  getUserByCatalog(){
    this._authService.getUserAll().subscribe({
      next: (result: any) => {
        if(result.success) {
          this.data = result.listaUsuarios;
        }else{
          this.options.emptyDataMessage = result.message;
        }
      },
      error: (error: any) => {
        this._notificationService.warning('Información de sistema nº: '+ error.status , 'Mensaje: ' + error.error.message, 6000);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  createOrEditModalUser(item:any,title:any, isNewBrand:boolean){
    this.title = title;
    this.buttonText = (isNewBrand)? 'Crear Nueva Marca': 'Editar Marca';
    this.editOrNewOption = isNewBrand;
    this.hideMsg = false;
    this.brandsForm = this.formBuilder.group(
      {
        idMarca : [(isNewBrand)? '0': item.IdMarca ,Validators.required],
        codigoMarca : [(isNewBrand)? '': item.CodigoMarca, Validators.required],
        descripcionMarca: [(isNewBrand)? '': item.DescripcionMarca, Validators.required]
      }
    );

    if(!this.Media.IsMobile){
      this.showCardBrand = true;
      if(this.showCardBrand){
        setTimeout(() => {
          this.showCardRightUser = true;
        }, 510);
      }else{
        this.showCardBrand  = false;
        this.showCardRightUser = false;
      }
    }else{
      this.newInventoryModal.show();
    }
  }

  deleteUser(item: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No serás capaz de revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, elimínelo!'
    }).then((result) => {
      if (result.isConfirmed) {
        var cost = {
          IdCompania: item.IdCompania,
          IdMarca: item.IdMarca
        }

        this._authService.deleteUser(cost).subscribe((data:any) => {
          if(data.success) {
            this.swalMessageResponseByservice('Eliminado!',data.msg,'success');
            this.getUserByCatalog();
          } else {
            this.swalMessageResponseByservice('Cancelado!',data.msg,'error');
          }
        },
        error => {
          this._notificationService.warning('Información de sistema nº: '+ error.status , 'Mensaje: ' + error.error.msg, 6000);
        });
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.brandsForm.invalid) {
      return;
    }

    const brand = {
      IdMarca: this.editOrNewOption ? 0: this.f.idMarca.value,
      CodigoMarca: this.f.codigoMarca.value,
      DescripcionMarca: this.f.descripcionMarca.value
    }
    this._authService.postCreateOrEditUser(this.editOrNewOption, brand).subscribe((response:any) => {
      if(response.success) {
        this.submitted = false;
        this.getResponseByService(false, '');
        this.getUserByCatalog();
        this.close();
        this._notificationService.success('Información del sistema' , response.msg , 6000);
      } else {
        this.getResponseByService(true, response.msg);
      }
    },
    error => {
      this._notificationService.warning('Información de sistema nº: '+ error.status , 'Mensaje: ' + error.error.msg, 6000);
    });
  }

  hideCard(){
    this.showCardBrand = false;
    this.showCardRightUser = false;
  }

  close(){
    this.brandsForm.reset();
    for (let name in this.brandsForm.controls) {
      this.brandsForm.controls[name].setErrors(null);
    }
    this.newInventoryModal.hide();
  }

  getResponseByService(hideMsg:any, responseMsg:any){
    this.hideMsg = hideMsg;
    this.ShowMsg = responseMsg;
    if(this.hideMsg){
      setTimeout(() => { this.hideMsg = false }, 6000);
    }
  }

  swalMessageResponseByservice(title:any, message:any, status:any){
    Swal.fire(title,message,status);
  }

  getModalInit(){
    this.newInventoryModal = new bootstrap.Modal((<HTMLInputElement>document.getElementById("newInventoryModal")), {
      keyboard: false
    });

    setTimeout(() =>{
      const search_marcas = document.getElementById("search_marcas") as HTMLInputElement;
      if(search_marcas)
      search_marcas.setAttribute('placeholder',"Buscar");
    },1);
  }
}
