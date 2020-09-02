import { Injectable } from '@angular/core';
import {
    HubConnection,
    HubConnectionBuilder,
    IHttpConnectionOptions,
    HubConnectionState
} from '@aspnet/signalr';
import { Observable } from 'rxjs';
import { ConnectionInfoDto } from '../shared/models/signalr-models';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationDto } from '@store/notifications/notification.models';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { ShowNotification } from '@store/notifications/notification.actions';
import { GamePlayersDto } from '@store/games-state/games.models';
import { GamePlayersGetListComplete } from '@store/game-players-store/game-players.actions';

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    private hubConnection: HubConnection;
    private baseUrl: string;

    constructor(private http: HttpClient, private store: Store<AppState>) {
        this.baseUrl = environment.signalRApi;
    }

    private Negotiate(userId: string): Observable<ConnectionInfoDto> {
        const url = `${this.baseUrl}/api/negotiate`;
        return this.http.post<ConnectionInfoDto>(url, null, {
            headers: { 'x-ms-client-principal-id': userId }
        });
    }

    public createConnection(userId: string) {
        if (
            !this.hubConnection ||
            this.hubConnection.state !== HubConnectionState.Connected
        ) {
            this.Negotiate(userId).subscribe((connectionInfo) => {
                const options = {
                    accessTokenFactory: () => connectionInfo.accessToken
                };
                this.hubConnection = new HubConnectionBuilder()
                    .withUrl(connectionInfo.url, options)
                    .build();

                this.registerOnServerEvents();
                this.startConnection();
            });
        }
    }

    joinGroup(gameId: string, userId: string): Observable<HttpResponse<{}>> {
        const url = `${this.baseUrl}/api/notifications/${gameId}/add/${userId}`;
        return this.http.get(url, { observe: 'response' });
    }
    leaveGroup(gameId: string, userId: string) {
        const url = `${this.baseUrl}/api/notifications/${gameId}/remove/${userId}`;
        return this.http.get(url, { observe: 'response' });
    }

    isConnected(): boolean {
        return (
            this.hubConnection &&
            this.hubConnection.state === HubConnectionState.Connected
        );
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');
            })
            .catch((err) => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(() => this.startConnection(), 5000);
            });
    }
    private registerOnServerEvents(): void {
        this.hubConnection.on(
            'notificationMessage',
            (data: NotificationDto) => {
                this.store.dispatch(new ShowNotification(data));
                console.log('Notification arrived');
            }
        );
        this.hubConnection.on('playersListChanged', (data: GamePlayersDto) => {
            console.log('Game players list is updated');
            this.store.dispatch(new GamePlayersGetListComplete(data));
        });
    }
    private unregisterServerEvents(): void {
        this.hubConnection.off('notificationMessage');
        this.hubConnection.off('playersListChanged');
    }

    disconnect() {
        if (this.hubConnection) {
            this.unregisterServerEvents();
            if (this.hubConnection.state === HubConnectionState.Connected) {
                this.hubConnection.stop().then(() => {
                    console.log('SignalR Disconnected');
                });
            }
        }
    }
}
