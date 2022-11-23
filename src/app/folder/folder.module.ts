import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EmoticonListModule } from '@components/emoticon-list';

import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    EmoticonListModule,
  ],
  declarations: [FolderPage],
})
export class FolderPageModule {}
