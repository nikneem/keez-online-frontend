import { Injectable } from '@angular/core';
import {
    CreateGameDto,
    GameListItemDto,
    GamePlayersDto,
    GamePawnDto,
    GameDetailsDto
} from '@store/games-state/games.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GameCardDto } from '@store/game-cards-store/game-cards.models';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public get(): Observable<Array<GameListItemDto>> {
        const url = `${this.backendApi}/api/games`;
        return this.http.get<Array<GameListItemDto>>(url);
    }
    public getDetails(id: string): Observable<GameDetailsDto> {
        const url = `${this.backendApi}/api/games/${id}`;
        return this.http.get<GameDetailsDto>(url);
    }
    public getPlayers(gameId: string): Observable<GamePlayersDto> {
        const url = `${this.backendApi}/api/players/${gameId}`;
        return this.http.get<GamePlayersDto>(url);
    }
    public getPawns(gameId: string): Observable<Array<GamePawnDto>> {
        const url = `${this.backendApi}/api/games/${gameId}/pawns`;
        return this.http.get<Array<GamePawnDto>>(url);
    }
    public getCards(gameId: string): Observable<Array<GameCardDto>> {
        const url = `${this.backendApi}/api/games/${gameId}/cards`;
        return this.http.get<Array<GameCardDto>>(url);
    }
    public post(dto: CreateGameDto): Observable<GameListItemDto> {
        const url = `${this.backendApi}/api/games`;
        return this.http.post<GameListItemDto>(url, dto);
    }
}
