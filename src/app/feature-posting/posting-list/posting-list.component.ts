import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PostingService } from '../posting-service.service';
import { IDepartmentList, IPostingList } from '../posting.model';

@Component({
  selector: 'app-posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.scss'],
  providers: [PostingService],
})
export class PostingListComponent implements OnInit {
  private _unsubscribe = new Subject<void>();
  private _countryFilter: string = '';
  private _departmentFilter: string = '';

  postingList$: Observable<IPostingList[]>;
  departmentList$: Observable<IDepartmentList[]>;
  countryList$: Observable<any[]>;

  set countryFilter(value: string) {
    this._countryFilter = value;
  }

  get countryFilter() {
    return this._countryFilter;
  }

  set departmentFilter(value: string) {
    this._departmentFilter = value;
  }

  get departmentFilter() {
    return this._departmentFilter;
  }

  constructor(private postingService: PostingService, private _route: Router, private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  ngOnInit(): void {
    // call posting list
    this.openPostingList();

    // call department list
    this.departmentList$ = this.postingService.getDepartmentList().pipe(takeUntil(this._unsubscribe));

    // call country list
    this.countryList$ = this.postingService.getCountryList().pipe(takeUntil(this._unsubscribe));
  }

  ngOnDestroy() {
    this._unsubscribe.unsubscribe();
  }

  openPostingList() {
    this.postingList$ = this.postingService
      .getPostingList(this.countryFilter.toLowerCase(), this.departmentFilter)
      .pipe(
        takeUntil(this._unsubscribe),
        catchError((error) => {
          this.openSnackBar(error);
          return of([]);
        })
      );
  }

  openPostingDescription(postingId: string) {
    this._route.navigate([`/description/${postingId}`]);
  }
}
