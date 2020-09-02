import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FriendshipInvitationRequestDto } from '@store/friendship-invitation-state/friendship-invitation.models';
import {
    PendingFriendshipInvitationDto,
    FriendshipRequestApprovalDto,
    FriendshipDto,
    FriendshipListDto
} from '@store/friendship-state/friendship.models';

@Injectable({
    providedIn: 'root'
})
export class FriendshipsService {
    private backendApi: string;

    constructor(private http: HttpClient) {
        this.backendApi = environment.backendApi;
    }

    public list(): Observable<Array<FriendshipListDto>> {
        const url = `${this.backendApi}/api/friendships`;
        return this.http.get<Array<FriendshipListDto>>(url);
    }

    public listInvitations(): Observable<
        Array<PendingFriendshipInvitationDto>
    > {
        const url = `${this.backendApi}/api/friendships/invitations`;
        return this.http.get<Array<PendingFriendshipInvitationDto>>(url);
    }

    public post(
        dto: FriendshipInvitationRequestDto
    ): Observable<HttpResponse<{}>> {
        const url = `${this.backendApi}/api/friendships`;
        return this.http.post(url, dto, {
            observe: 'response'
        });
    }
    public put(
        dto: FriendshipRequestApprovalDto
    ): Observable<FriendshipRequestApprovalDto> {
        const url = `${this.backendApi}/api/friendships/${dto.id}`;
        return this.http.put<FriendshipRequestApprovalDto>(url, dto);
    }
}
