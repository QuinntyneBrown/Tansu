import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToDo } from '@api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 't-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss']
})
export class ToDoDetailComponent {

  readonly form: FormGroup = new FormGroup({
    toDoId: new FormControl(null, []),
    name: new FormControl(null, [Validators.required])
  });

  get toDo(): ToDo { return this.form.value as ToDo; }

  @Input("toDo") set toDo(value: ToDo) {
    if(!value?.toDoId) {
      this.form.reset({
        name: null
      })
    } else {
      this.form.patchValue(value);
    }
  }

  @Output() save: EventEmitter<ToDo> = new EventEmitter();

}

@NgModule({
  declarations: [
    ToDoDetailComponent
  ],
  exports: [
    ToDoDetailComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class ToDoDetailModule { }
