import { Injectable } from '@angular/core';
import { TextBoxComponent } from './components/text-box/text-box.component';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  generateCompoenetsByMetaData() {
    return [{ component: TextBoxComponent, data: { type: 'text', placeholder: 'username', label: 'UserName', id: 'username' } },
    { component: TextBoxComponent, data: { type: 'password', placeholder: 'password', label: 'Password', id: 'password' } }];
  }
}
