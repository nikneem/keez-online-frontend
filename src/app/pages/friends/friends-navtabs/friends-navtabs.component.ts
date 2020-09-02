import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteFriendComponent } from 'src/app/shared/components/invite-friend/invite-friend.component';

@Component({
    selector: 'keez-friends-navtabs',
    templateUrl: './friends-navtabs.component.html',
    styleUrls: ['./friends-navtabs.component.scss']
})
export class FriendsNavtabsComponent implements OnInit {
    constructor(private dialog: MatDialog) {}

    inviteFriend() {
        let dialogRef = this.dialog.open(InviteFriendComponent, {
            width: '600px',
            closeOnNavigation: false,
            disableClose: true
        });
    }

    ngOnInit(): void {}
}
