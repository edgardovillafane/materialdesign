export interface Listado {
  id: number;
  limit: number;
  page: number;
  contador: number;
  [queryResult: string]: any;
}
