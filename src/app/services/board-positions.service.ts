import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BoardPositionDto } from '@store/games-state/games.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BoardPositionsService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public get(): Observable<Array<BoardPositionDto>> {
        const url = `${this.backendApi}/api/boardpositions`;
        return this.http.get<Array<BoardPositionDto>>(url);
    }
}
