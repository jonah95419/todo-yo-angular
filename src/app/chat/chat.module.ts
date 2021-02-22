import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent, DialogContentExampleDialog } from './chat/chat.component';
import { AngularModule } from '../angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ChatComponent, DialogContentExampleDialog],
  imports: [
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  exports: [
    ChatComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    DialogContentExampleDialog
  ],
})
export class ChatModule { }
