import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FriendshipListDto } from '@store/friendship-state/friendship.models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { GetFriendshipsList } from '@store/friendship-state/friendship.actions';
import { CreateGameDto } from '@store/games-state/games.models';
import { GamesCreateNew } from '@store/games-state/games.actions';

@Component({
    selector: 'keez-game-create',
    templateUrl: './game-create.component.html',
    styleUrls: ['./game-create.component.scss']
})
export class GameCreateComponent implements OnInit, OnDestroy {
    newGameForm: FormGroup;

    private friendsListIsLoaded = false;

    public friendships: Array<FriendshipListDto>;

    private selectedPlayerTwo: string;
    private selectedPlayerThree: string;
    private selectedPlayerFour: string;

    public playerTwoFriendships: Array<FriendshipListDto>;
    public playerThreeFriendships: Array<FriendshipListDto>;
    public playerFourFriendships: Array<FriendshipListDto>;

    private friendshipsSubscription: Subscription;

    constructor(private store: Store<AppState>) {}

    createNewGame() {
        const dto = new CreateGameDto(this.newGameForm.value);
        this.store.dispatch(new GamesCreateNew(dto));
    }

    private createNewGameForm() {
        this.newGameForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(30)
            ]),
            playerTwo: new FormControl('', [Validators.required]),
            playerThree: new FormControl('', [Validators.required]),
            playerFour: new FormControl('', [Validators.required]),
            randomizeTeams: new FormControl(true)
        });
        this.newGameForm.valueChanges.subscribe((val) => {
            this.updateSelectedPlayers();
        });
    }
    private updateSelectedPlayers() {
        this.selectedPlayerTwo = this.newGameForm.get('playerTwo').value;
        this.selectedPlayerThree = this.newGameForm.get('playerThree').value;
        this.selectedPlayerFour = this.newGameForm.get('playerFour').value;
        this.updateFriendsDropdowns();
    }

    private updateFriendsDropdowns() {
        this.playerTwoFriendships = this.friendships.filter(
            (obj) =>
                obj.friendId !== this.selectedPlayerThree &&
                obj.friendId !== this.selectedPlayerFour
        );
        this.playerThreeFriendships = this.friendships.filter(
            (obj) =>
                obj.friendId !== this.selectedPlayerTwo &&
                obj.friendId !== this.selectedPlayerFour
        );
        this.playerFourFriendships = this.friendships.filter(
            (obj) =>
                obj.friendId !== this.selectedPlayerTwo &&
                obj.friendId !== this.selectedPlayerThree
        );
    }

    private refreshFriendsList() {
        this.store.dispatch(new GetFriendshipsList());
    }

    ngOnInit(): void {
        this.friendshipsSubscription = this.store
            .select((str) => str.friendshipState.friendships)
            .subscribe((val) => {
                this.friendships = val;
                if (!val && !this.friendsListIsLoaded) {
                    this.friendsListIsLoaded = true;
                    this.refreshFriendsList();
                }
                if (this.friendships && this.friendships.length >= 3) {
                    this.updateFriendsDropdowns();
                    this.createNewGameForm();
                }
            });
    }
    ngOnDestroy(): void {
        this.friendshipsSubscription.unsubscribe();
    }
}
