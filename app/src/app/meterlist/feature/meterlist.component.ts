import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Store } from '@ngrx/store';
import * as fromMeter from '../state/meter.reducer'

import { MeterList } from '../meter-list.model'
import { MeterService } from '../meter.service'

@Component({
  selector: 'meterlist',
  templateUrl: './meterlist.component.html',
  styleUrls: ['./meterlist.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MeterlistComponent implements OnInit {

  displayedColumns = ['active', 'location', 'name', 'active1', 'delete']

  item$: Observable<MeterList[]>;

  expandedElement: MeterList;
  
  isPanelOpened: boolean = false;

  constructor(private store: Store<fromMeter.MeterDataState>,
    private meterService: MeterService,
    ) {}

  ngOnInit() {
    this.item$ = this.store.select(fromMeter.getMeterData);
    this.meterService.getMeterList();
  }

  updateElement(element, enable: boolean) {
    if (_.isNil(element)) {
      element = {}
    }
    element.active = enable;
  }

  addElement() {
    let newData: MeterList = {
      name: 'konstanz',
      location: 'Bavaria',
      active: true,
      active1: false,
    }
    this.meterService.addNewMeterData(newData);
  }

  delete(data: MeterList) {
    console.error("element: ", data);
    this.meterService.deleteMeterData(data);
  }

  openPanel(open: boolean) {
    this.isPanelOpened = open;
  }

}
