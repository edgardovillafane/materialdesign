
export interface Machine {
  id?: number;
  distributionName?: string;
  typeDeviceId?: string;
  electronicId?: number;
  familyMachineId?: number;
  familyMachineName?: string;
  latitude?: number;
  longitude?: number;
  mac?: string;
  serviceCompanyId?: number;
  ownerCompanyId?: number;
  shopId?: number;
  startup?: string;
  status?: string;
  createdAt?: Date;
  deletedAt?: any;
  updatedAt?: Date;

}

export interface BuscarMachine {
  Id: number;
  distributionName: string;

}
