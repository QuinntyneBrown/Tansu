import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ToDo } from '@api';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { pageSizeOptions } from '@core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 't-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent {

  @Input() selected: ToDo;

  private _dataSource: MatTableDataSource<ToDo>;

  readonly pageSizeOptions: typeof pageSizeOptions = pageSizeOptions;

  readonly displayedColumns: string[] = ["name", "actions"];

  @ViewChild(MatPaginator, { static: true }) private _paginator: MatPaginator;

  @Input("toDos") set toDos(value: ToDo[]) {
    this._dataSource = new MatTableDataSource(value);
    this.dataSource.paginator = this._paginator;
  }

  get dataSource() { return this._dataSource; }

  @Output() select: EventEmitter<ToDo> = new EventEmitter();

  @Output() create: EventEmitter<void> = new EventEmitter();

  @Output() delete: EventEmitter<ToDo> = new EventEmitter();

}

@NgModule({
  declarations: [
    ToDoListComponent
  ],
  exports: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class ToDoListModule { }
