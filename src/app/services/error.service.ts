import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ErrorCodeDto } from '../shared/models/error-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    constructor(private translate: TranslateService) {}

    getErrorMessage(dto: ErrorCodeDto): Observable<string> {
        return this.translate.get(`ErrorCode.${dto.errorCode}`);
    }
}
