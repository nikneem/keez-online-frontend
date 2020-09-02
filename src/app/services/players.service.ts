import { Injectable } from '@angular/core';
import { GamePlayerSetReadyDto } from '@store/games-state/games.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public setReady(dto: GamePlayerSetReadyDto): Observable<HttpResponse<{}>> {
        const gameId = dto.gameId;
        const url = `${this.backendApi}/api/players/${gameId}/ready`;
        return this.http.post(url, dto, {
            observe: 'response'
        });
    }
}
