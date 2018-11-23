export interface Companies {

  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  parentId: number;
  typeCompanyId: number;
  createdAt?: Date;
  deletedAt?: any;
  updatedAt?: Date;

}
