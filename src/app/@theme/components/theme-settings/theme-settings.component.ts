import {Component, OnInit} from '@angular/core';
import {StateService} from '../../../@core/data/state.service';
import {AppState} from '../../../store/state.model';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'ngx-theme-settings',
  styleUrls: ['./theme-settings.component.scss'],
  template: `
    <h6>LAYOUTS</h6>
    <div class="settings-row">
      <a *ngFor="let layout of layouts"
         href="#"
         [class.selected]="layout.selected"
         [attr.title]="layout.name"
         (click)="layoutSelect(layout)">
        <i [attr.class]="layout.icon"></i>
      </a>
    </div>
    <h6>SIDEBAR</h6>
    <div class="settings-row">
      <a *ngFor="let sidebar of sidebars"
         href="#"
         [class.selected]="sidebar.selected"
         [attr.title]="sidebar.name"
         (click)="sidebarSelect(sidebar)">
        <i [attr.class]="sidebar.icon"></i>
      </a>
    </div>
    <h6 class="settings">SETTINGS</h6>
    <div class="switcher">
      <ngx-theme-switcher [vertical]="true"></ngx-theme-switcher>
    </div>
    <div class="switcher">
      <ngx-layout-direction-switcher [vertical]="true"></ngx-layout-direction-switcher>
    </div>
  `,
})
export class ThemeSettingsComponent implements OnInit {

  layouts = [];
  sidebars = [];
  layouts$: Observable<any[]>;
  @select('layoutsState') readonly layoutsArr: Observable<number>;

  constructor(private ngRedux: NgRedux<AppState>,
              protected stateService: StateService) {
    // this.layoutsArr.subscribe(newList => console.log(newList));

    this.stateService.getLayoutStates()
      .subscribe((layouts: any[]) => this.layouts = layouts);

    this.stateService.getSidebarStates()
      .subscribe((sidebars: any[]) => this.sidebars = sidebars);
  }

  // ngOnInit() {
  // this.ngRedux.select('layoutsState').subscribe(items => {
  //   const temp = this.layouts.filter(item => item.selected);
  //   this.stateService.setLayoutState(temp);
  //   console.log(temp);
  // });
  // }

  // ngOnInit() {
  //   this.layouts$ = this.ngRedux.select('layoutsState');
  //   this.layouts$.subscribe(items => {
  //     this.stateService.setLayoutState(
  //       items.filter(item => item.selected))
  //   });
  // }

  ngOnInit() {
    // const stateStorage = (localStorage.getItem('reduxState') ?
    //   JSON.parse(localStorage.getItem('reduxState')).layoutsState.filter(item => item.selected)[0] : null
    // );
    this.layouts$ = this.ngRedux.select('layoutsState');
    this.layouts$.subscribe(items => {
      this.stateService.setLayoutState(items.filter(item => item.selected)[0]);
      localStorage.setItem('reduxState', JSON.stringify(this.ngRedux.getState()));
    })
    // this.stateService.setLayoutState(stateStorage);
  }


  // this.stateService.setLayoutState(items.filter(item => {
  //  item.selected

  // this.layout = items.filter(item => item.selected);
  // this.stateService.setLayoutState(this.layout);

  // this.layouts$.subscribe(items => items.filter(item => item.selected));
  //  this.ngRedux.select('layouts').subscribe(items => {
  //
  //   items.console.log("items:" + items);
  //   // this.layouts = this.layouts.map((l: any) => {
  //   //   l.selected = false;
  //   //   return l;
  //   // })
  //   // this.layouts = items;
  //   // items.map(item => {
  //   //   console.log(item);
  //   //   item['selected'] ? this.stateService.setLayoutState(item) : null;
  //   // });
  //   //
  //   // .selected = true;
  //   // this.stateService.setLayoutState(layout);
  // });

  layoutSelect(layout: any): boolean {
    this.ngRedux.dispatch({
      type: 'CHANGE_LAYOUT', payload: layout,
    });
    // this.layouts = this.layouts.map((l: any) => {
    //   l.selected = false;
    //   return l;
    // });
    //
    // layout.selected = true;
    // this.stateService.setLayoutState(layout);
    return false;
  }

  sidebarSelect(sidebars: any): boolean {
    this.sidebars = this.sidebars.map((s: any) => {
      s.selected = false;
      return s;
    });

    sidebars.selected = true;
    this.stateService.setSidebarState(sidebars);
    return false;
  }
}
