import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OnlineStatusModule } from 'ngx-online-status';
import { NgbdSortableHeader } from '../app/common/directives/sortable.directive';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';

import { TokenInterceptor } from './services/auth/token.interceptor'
import { ThemeService } from './services/theme.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { HeaderLayoutComponent } from './components/layouts/header-layout/header-layout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResetComponent } from './components/reset/reset.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StructureComponent } from './components/structure/structure.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotComponent } from './components/forgot/forgot.component';
import { TranslationService } from './services/translate.service';
import { ChartsModule } from 'ng2-charts';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { InventoryComponent } from './components/structure/inventory/inventory.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { UsersComponent } from './components/structure/users/users.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    MainLayoutComponent,
    HeaderLayoutComponent,
    LoginComponent,
    NotFoundComponent,
    ResetComponent,
    AdministratorComponent,
    ProfileComponent,
    SideNavComponent,
    ToolbarComponent,
    StructureComponent,
    AdminLayoutComponent,
    NotificationComponent,
    PermissionsComponent,
    ForgotComponent,
    NgbdSortableHeader,
    ConfigurationComponent,
    InventoryComponent,
    ScannerComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    NgHttpLoaderModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:3001", "foo.com", "bar.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    BrowserAnimationsModule,
    OnlineStatusModule,
    NgbModule,
    ChartsModule,
    ZXingScannerModule,
    QRCodeModule
  ],

  providers: [
    ThemeService,
    NotificationService,
    TranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
