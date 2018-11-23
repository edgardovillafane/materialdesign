export interface ElementosDetail {
  position: number;
  estado: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  licEmail: string;
  user: any;
  tipo: any;
  badge: any;
  restantes: number;
  machineId: number;
  userId: number;
  mobileId: number;
  licMobile: string;
  caducity: string;
  createdAt: string;
  telUser: string;
  emailUser: string;
  icono: string;
  typeLicenseId: number;
  typeLicenseName: string;

}

export interface Elements {
  CompanyId: number;
  CreatedAt: Date;
  DeletedAt?: Date;
  MachineId?: string;
  OwnerId?: number;
  UpdatedAt: Date;
  UserId?: number;
  DateTimeCaducity: Date;
  DateTimeReasing: Date;
  id_user_reasing?: number;
  isDeleted?: boolean;
  name: string;
  type: number;
  }
