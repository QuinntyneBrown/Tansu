import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { map, Observable, of, switchMap, tap } from "rxjs";
import { Store } from "./store";


type ToDoStoreState = {
    toDos?: ToDo[],
    selected?: ToDo,
}

@Injectable({providedIn: "root"})
export class ToDoStore extends Store<ToDoStoreState> {
    constructor(
        private readonly _toDoService: ToDoService
    ){
        super({
            
        });
    }

    private _reset() { this.set({ }); }

    get(): Observable<ToDo[]> {
        return this.$
        .pipe(
            switchMap(state => {
                return state.toDos != undefined 
                ? of(state.toDos) 
                : this._toDoService.get()
                .pipe(
                    tap(toDos => this.set({ toDos })),
                    map(_ => state.toDos)
                ) 
            })
        )
    }

    updateToDo(options: { toDo: ToDo }) {
        return this._toDoService.update(options)
        .pipe(
            tap(_ => this._reset())
        )
    }

    createToDo(options: { toDo: ToDo }) {
        return this._toDoService.create(options)
        .pipe(
            tap(_ => this._reset())
        )
    }

    removeToDo(options: { toDo: ToDo }) {
        return this._toDoService.remove(options)
        .pipe(
            tap(_ => this._reset())
        )
    }

    getById(options: { toDoId: string }) {
        return this._toDoService.getById(options)
    }
}