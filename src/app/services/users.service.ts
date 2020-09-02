import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfileDto } from '@store/user-state/user.models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public postProfile(
        defaultProfile: UserProfileDto
    ): Observable<HttpResponse<UserProfileDto>> {
        const url = `${this.backendApi}/api/users`;
        return this.http.post<UserProfileDto>(url, defaultProfile, {
            observe: 'response'
        });
    }

    public getProfile(): Observable<UserProfileDto> {
        const url = `${this.backendApi}/api/users`;
        return this.http.get<UserProfileDto>(url);
    }
    public putProfile(dto: UserProfileDto): Observable<UserProfileDto> {
        const url = `${this.backendApi}/api/users/${dto.id}`;
        return this.http.put<UserProfileDto>(url, dto);
    }
}
