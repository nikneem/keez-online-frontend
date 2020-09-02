import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericMoveDto } from '@store/game-turns-store/game-turns.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MovesService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public post(dto: GenericMoveDto): Observable<HttpResponse<{}>> {
        const url = `${this.backendApi}/api/moves`;
        return this.http.post(url, dto, {
            observe: 'response'
        });
    }
}
