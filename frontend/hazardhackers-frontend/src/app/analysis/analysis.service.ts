import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable()
export class AnalysisService{

    constructor(private httpClient: HttpClient) { }

    getImage(imageUrl: string): Observable<Blob> {
        return this.httpClient.get(imageUrl, { responseType: 'blob' })
        .pipe(delay(2000))
        ;
    }

}