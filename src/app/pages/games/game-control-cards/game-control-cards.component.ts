import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '@store/app.state';
import { Store } from '@ngrx/store';
import { GameCardDto } from '@store/game-cards-store/game-cards.models';
import { GameCardsGetList } from '@store/game-cards-store/game-cards.actions';
import { GameDetailsDto } from '@store/games-state/games.models';
import { UserProfileDto } from '@store/user-state/user.models';
import { GameTurnsSelectCard } from '@store/game-turns-store/game-turns.actions';

@Component({
    selector: 'keez-game-control-cards',
    templateUrl: './game-control-cards.component.html',
    styleUrls: ['./game-control-cards.component.scss']
})
export class GameControlCardsComponent implements OnInit {
    game: GameDetailsDto;
    userProfile: UserProfileDto;
    cards: Array<GameCardDto>;
    loading: boolean;
    selectedCardId: string;

    private gameIdSubscription: Subscription;
    private cardsSubscription: Subscription;
    private loadingSubscription: Subscription;
    private userProfileSubscription: Subscription;
    private selectedCardSubscription: Subscription;

    constructor(private store: Store<AppState>) {}

    getCardImageUrl(card: GameCardDto): string {
        return `/assets/cards/${card.suit}${card.valueInt}.svg`;
    }
    selectCard(card: GameCardDto) {
        if (this.game.playerId === this.game.playerHasTurn) {
            this.store.dispatch(new GameTurnsSelectCard(card));
        }
    }
    ngOnInit(): void {
        this.gameIdSubscription = this.store
            .select((str) => str.gamesState.currentGame)
            .subscribe((val) => {
                this.game = val;
                if (this.game && this.game.isStarted) {
                    this.store.dispatch(new GameCardsGetList(this.game.id));
                }
            });
        this.cardsSubscription = this.store
            .select((str) => str.gameCardsState.cards)
            .subscribe((val) => (this.cards = val));
        this.loadingSubscription = this.store
            .select((str) => str.gameCardsState.isLoading)
            .subscribe((val) => (this.loading = val));
        this.userProfileSubscription = this.store
            .select((str) => str.userState.userProfile)
            .subscribe((val) => (this.userProfile = val));
        this.selectedCardSubscription = this.store
            .select((str) => str.gameTurnsState.selectedCard)
            .subscribe((val) => {
                if (val) {
                    this.selectedCardId = val.id;
                }
            });
    }
    ngOnDestroy(): void {
        this.gameIdSubscription.unsubscribe();
        this.cardsSubscription.unsubscribe();
        this.loadingSubscription.unsubscribe();
        this.userProfileSubscription.unsubscribe();
        this.selectedCardSubscription.unsubscribe();
    }
}
