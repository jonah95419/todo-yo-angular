import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosService } from './service/usuarios.service';
import { AngularModule } from '../angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../chat/service/chat.service';
import { ChatModule } from '../chat/chat.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    UsuariosRoutingModule,
    CommonModule,
    AngularModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ChatModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ]
})
export class UsuariosModule {

  constructor(@Optional() @SkipSelf() parentModule?: UsuariosModule) {

    if (parentModule) {
      throw new Error(
        'UsuariosModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<UsuariosModule> {
    return {
      ngModule: UsuariosModule,
      providers: [
        {provide: UsuariosService },
        {provide: ChatService }
      ]
    };
  }

}

