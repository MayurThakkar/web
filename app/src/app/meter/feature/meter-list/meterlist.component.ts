import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import * as _ from 'lodash';


import * as fromMeter from '../../state/meter.reducer'

import { MeterList } from '../../meter-list.model';
import { MeterService } from '../../meter.service';

@Component({
  selector: 'meterlist',
  templateUrl: './meterlist.component.html',
  styleUrls: ['./meterlist.component.scss'],
})
export class MeterlistComponent implements OnInit, AfterViewInit {

  displayedColumns = ['active', 'location', 'name', 'active1', 'delete'];
  dataSource = new MatTableDataSource<MeterList>();

  item$: Observable<MeterList[]>;

  expandedElement: MeterList;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<fromMeter.MeterDataState>,
    private meterService: MeterService,
    ) {}

  ngOnInit() {
    this.meterService.getMeterList();

    this.store.select(fromMeter.getMeterData).subscribe((meterData: MeterList[]) => {
      this.dataSource.data = meterData;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateActive(element, enable: boolean) {
    if (_.isNil(element)) {
      element = {}
    }
    element.active = enable;
    this.meterService.updateData({
      id: element.id,
      active: enable
    });
  }

  updateActive1(element, enable: boolean) {

    console.error("element", element);

    this.meterService.updateData({
      id: element.id,
      active: enable
    });
  }

  addElement() {
    let newData: MeterList = {
      name: 'stuttgart',
      location: 'baden-wurtternberg',
      active: true,
      active1: true,
    }
    this.meterService.addNewMeterData(newData);
  }

  delete(data: MeterList) {
    console.error("delete", data);
    this.meterService.deleteMeterData(data);
  }
}
