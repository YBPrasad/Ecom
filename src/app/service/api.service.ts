import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private a:AngularFireDatabase) { }
}
