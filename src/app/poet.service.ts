import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Poet } from './poets/poet';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PoetService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  private poetsUrl = 'api/poets';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET heroes from the server */
  getPoets(): Observable<Poet[]> {
    return this.http.get<Poet[]>(this.poetsUrl)
      .pipe(
        tap(_ => this.log('fetched poets')),
        catchError(this.handleError<Poet[]>('getPoets', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPoet(id: number): Observable<Poet> {
    const url = `${this.poetsUrl}/${id}`;
    return this.http.get<Poet>(url).pipe(
      tap(_ => this.log(`fetched poet id=${id}`)),
      catchError(this.handleError<Poet>(`getPoet id=${id}`))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PoetService: ${message}`);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** PUT: update the hero on the server */
  updatePoet(poet: Poet): Observable<any> {
    return this.http.put(this.poetsUrl, poet, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${poet.id}`)),
      catchError(this.handleError<any>('updatePoet'))
    );
  }
  /** POST: add a new hero to the server */
  addPoet(poet: Poet): Observable<Poet> {
    return this.http.post<Poet>(this.poetsUrl, poet, this.httpOptions).pipe(
      tap((newPoet: Poet) => this.log(`added poet w/ id=${newPoet.id}`)),
      catchError(this.handleError<Poet>('addPoet'))
    );
  }
  /** DELETE: delete the hero from the server */
  deletePoet(id: number): Observable<Poet> {
    const url = `${this.poetsUrl}/${id}`;

    return this.http.delete<Poet>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted poet id=${id}`)),
      catchError(this.handleError<Poet>('deletePoet'))
    );
  }
  /* GET poets whose name contains search term */
  searchPoets(term: string): Observable<Poet[]> {
    if (!term.trim()) {
      // if not search term, return empty poet array.
      return of([]);
    }
    return this.http.get<Poet[]>(`${this.poetsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found poets matching "${term}"`) :
        this.log(`no poets matching "${term}"`)),
      catchError(this.handleError<Poet[]>('searchPoets', []))
    );
  }
}
