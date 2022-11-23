import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmoticonModule } from '@components/emoticon';
import { EmoticonListComponent } from './emoticon-list.component';

@NgModule({
  declarations: [EmoticonListComponent],
  imports: [CommonModule, EmoticonModule],
  exports: [EmoticonListComponent],
})
export class EmoticonListModule {}
