import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Globales} from '../classes/globales';

@Injectable()
export class DataSharingService {
  constructor(public globales: Globales) {}
  public nodeSelId: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
}
