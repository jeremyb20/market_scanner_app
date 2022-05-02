import { BarcodeFormat } from '@zxing/library';
export const BootstrapBreakpoints = [
    { Id: 0, Name: 'xs', MediaQuery: "(max-width: 575.98px)" },
    { Id: 1, Name: 'sm', MediaQuery: "(min-width: 576px) and (max-width: 767.98px)" },
    { Id: 2, Name: 'md', MediaQuery: "(min-width: 768px) and (max-width: 991.98px)" },
    { Id: 3, Name: 'lg', MediaQuery: "(min-width: 992px) and (max-width: 1199.98px)" },
    { Id: 4, Name: 'xl', MediaQuery: "(min-width: 1200px)" },
    { Id: 5, Name: 'landscape', MediaQuery: "(orientation: landscape)" }
 ];

 export const Options = {
  rowClickEvent: true,
  rowPerPageMenu: [5, 15, 20, 30],
  rowPerPage : 15,
  emptyDataMessage : 'No hay datos disponibles'
}

 export class Notification {

    constructor(
      public id: number,
      public type: NotificationType,
      public title: string,
      public message: string,
      public timeout: number,
    ) { }
}

export interface Navigation {
  Id: number;
  routerLink: string;
  iconClass: string;
  translate: string;
  hasPermission: Boolean;
  EISubMenu: any;
}

export const formatsAvailable = [
  BarcodeFormat.CODE_128,
  BarcodeFormat.DATA_MATRIX,
  BarcodeFormat.EAN_13,
  BarcodeFormat.EAN_8,
  BarcodeFormat.ITF,
  BarcodeFormat.QR_CODE,
  BarcodeFormat.RSS_14,
];

export const formatNames = [
  'Aztec 2D barcode format.',
  'CODABAR 1D format.',
  'Code 39 1D format.',
  'Code 93 1D format.',
  'Code 128 1D format.',
  'Data Matrix 2D barcode format.',
  'EAN-8 1D format.',
  'EAN-13 1D format.',
  'ITF (Interleaved Two of Five) 1D format.',
  'MaxiCode 2D barcode format.',
  'PDF417 format.',
  'QR Code 2D barcode format.',
  'RSS 14',
  'RSS EXPANDED',
  'UPC-A 1D format.',
  'UPC-E 1D format.',
  'UPC/EAN extension format. Not a stand-alone format.',
];


export const NAVIGATION: Navigation[] = [
  {
      Id:1,
      routerLink: '/dashboard',
      iconClass: 'fas fa-th',
      translate: 'USER.NAVBAR.DASHBOARD',
      hasPermission: true,
      EISubMenu: []
  },
  {
    Id:2,
    routerLink: '/scanner',
    iconClass: 'fas fa-qrcode',
    translate: 'USER.NAVBAR.SCANNER',
    hasPermission: true,
    EISubMenu: []
  },
  {
    Id:13,
    routerLink: '',
    iconClass: 'fas fa-industry',
    translate: 'USER.NAVBAR.STRUCTURES.TEXT',
    hasPermission: true,
    EISubMenu: [
      {
        Id:18,
        routerLink: '/structures/inventory',
        iconClass: 'fas fa-truck-moving',
        translate: 'USER.NAVBAR.STRUCTURES.INVENTORY',
        hasPermission: true
      },
      {
        Id:18,
        routerLink: '/structures/users',
        iconClass: 'fas fa-users',
        translate: 'USER.NAVBAR.STRUCTURES.USERS',
        hasPermission: true
      }
    ]
  }
];

export interface Country {
  id: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}
