import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PostingService } from '../posting-service.service';
import { IPostingContent } from '../posting.model';

@Component({
  selector: 'app-posting-description',
  templateUrl: './posting-description.component.html',
  styleUrls: ['./posting-description.component.scss'],
  providers: [PostingService],
})
export class PostingDescriptionComponent implements OnInit {
  private _unsubscribe = new Subject<void>();

  postingDescription$: Observable<any | IPostingContent>;

  constructor(private postingService: PostingService, private _route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.postingDescription$ = this.postingService.getPostingDescription(this._route.snapshot.params.id).pipe(
      takeUntil(this._unsubscribe),
      catchError((error) => {
        this.openSnackBar(error);
        return of();
      })
    );
  }

  ngOnDestroy() {
    this._unsubscribe.unsubscribe();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
