import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo, ToDoService } from '@api';
import { combine, get } from '@core';
import { ToDoStore } from '@core/to-do.store';
import { BehaviorSubject, from, Observable, ObservableInput, of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 't-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDosComponent {

  private readonly _saveSubject: Subject<ToDo> = new Subject();
  private readonly _selectSubject: Subject<ToDo> = new Subject();
  private readonly _createSubject: Subject<void> = new Subject();
  private readonly _deleteSubject: Subject<ToDo> = new Subject();
  private readonly _refreshSubject: BehaviorSubject<null> = new BehaviorSubject(null);

  readonly vm$ = this._refreshSubject
  .pipe(
    switchMap(_ => combine([
      this._toDoStore.get(),
      this._selected$,
      this._toDoStore as unknown as ObservableInput<any>,
      this._createSubject.pipe(switchMap(_ => this._handleCreate())),
      this._saveSubject.pipe(switchMap(toDo => this._handleSave(toDo))),
      this._selectSubject.pipe(switchMap(toDo => this._handleSelect(toDo))),
      this._deleteSubject.pipe(switchMap(toDo => this._handleDelete(toDo)))
    ])),
    map(([toDos, selected, x]) => ({ toDos, selected, x }))
  );

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toDoStore: ToDoStore,
    private readonly _router: Router,  
  ) { 

  }

  private _handleSelect(toDo: ToDo): Observable<boolean> {
    return from(this._router.navigate(["/","to-dos","edit", toDo.toDoId]));
  }

  private _handleCreate(): Observable<boolean> {
    return from(this._router.navigate(["/","to-dos","create"]));
  }

  private _handleSave(toDo: ToDo): Observable<boolean> {
    return (toDo.toDoId ? this._toDoStore.updateToDo({ toDo }) : this._toDoStore.createToDo({ toDo }))
    .pipe(      
      switchMap(_ => this._router.navigate(["/","to-dos"])),
      tap(_ => this._refreshSubject.next(null))
      );    
  }

  private _handleDelete(toDo: ToDo): Observable<boolean> {
    return this._toDoStore.removeToDo({ toDo })
    .pipe(
      switchMap(_ => this._router.navigate(["/","to-dos"])),
      tap(_ => this._refreshSubject.next(null))
    );
  }

  private _selected$: Observable<ToDo> = this._activatedRoute
  .paramMap
  .pipe(
    map(x => x.get("toDoId")),
    switchMap((toDoId: string) => toDoId ? this._toDoStore.getById({ toDoId }) : of({} as ToDo)));

  onSave(toDo: ToDo) {
    this._saveSubject.next(toDo);
  }

  onSelect(toDo: ToDo) {
    this._selectSubject.next(toDo);
  }

  onCreate() {
    this._createSubject.next();
  }

  onDelete(toDo: ToDo) {
    this._deleteSubject.next(toDo);
  }
}
