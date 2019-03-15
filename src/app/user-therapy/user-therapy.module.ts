import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  componentDeclarations,
  providerDeclarations,
  routes,
} from './user-therapy.common';
import { BookSessionComponent } from './book-session/book-session.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ...componentDeclarations,
    BookSessionComponent
  ],
  providers: [
    ...providerDeclarations
  ]
})
export class UserTherapyModule { }
