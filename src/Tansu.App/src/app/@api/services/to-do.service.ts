import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from '@api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '@core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(
    @Inject(BASE_URL) private readonly _baseUrl: string,
    private readonly _client: HttpClient
  ) { }

  public get(): Observable<ToDo[]> {
    return this._client.get<{ toDos: ToDo[] }>(`${this._baseUrl}api/toDo`)
      .pipe(
        map(x => x.toDos)
      );
  }

  public getById(options: { toDoId: string }): Observable<ToDo> {
    return this._client.get<{ toDo: ToDo }>(`${this._baseUrl}api/toDo/${options.toDoId}`)
      .pipe(
        map(x => x.toDo)
      );
  }

  public remove(options: { toDo: ToDo }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/toDo/${options.toDo.toDoId}`);
  }

  public create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return this._client.post<{ toDo: ToDo }>(`${this._baseUrl}api/toDo`, { toDo: options.toDo });
  }
  
  public update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return this._client.put<{ toDo: ToDo }>(`${this._baseUrl}api/toDo`, { toDo: options.toDo });
  }
}
