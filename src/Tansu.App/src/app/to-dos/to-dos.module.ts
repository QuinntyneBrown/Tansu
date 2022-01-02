import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoDetailModule, ToDoListModule, ListDetailModule } from '@shared';
import { ToDosRoutingModule } from './to-dos-routing.module';
import { ToDosComponent } from './to-dos.component';



@NgModule({
  declarations: [
    ToDosComponent
  ],
  imports: [
    CommonModule,
    ToDosRoutingModule,
    ToDoListModule,
    ToDoDetailModule,
    ListDetailModule
  ]
})
export class ToDosModule { }
