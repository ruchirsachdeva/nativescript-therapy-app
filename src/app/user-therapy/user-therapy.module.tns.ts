import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import {
  componentDeclarations,
  providerDeclarations,
  routes,
} from './user-therapy.common';
import { BookSessionComponent } from './book-session/book-session.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes)
  ],
  exports: [
    NativeScriptRouterModule
  ],
  declarations: [
    ...componentDeclarations,
    BookSessionComponent
  ],
  providers: [
    ...providerDeclarations
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class UserTherapyModule { }
