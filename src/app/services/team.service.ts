import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../models/player';
import { Schedule } from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(protected http: HttpClient) { }

  public retrievePlayersByGameId(gameId: number) : Observable<HttpResponse<Player[]>> {
    const registerUserURL = environment.bnplAPIRoot + '/players/game/' + gameId
    return this.http.get<Player[]>(registerUserURL, {observe: 'response'})
    .pipe(
      catchError(err => throwError(err))
    )
  }

  public retrieveFutureSchedule() : Observable<HttpResponse<Schedule[]>> {
    const scheduleURL = environment.bnplAPIRoot + '/games/future'
    return this.http.get<Schedule[]>(scheduleURL, {observe: 'response'})
  }

}
