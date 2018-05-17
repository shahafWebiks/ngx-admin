import {Component, OnInit, Input} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {NbJSThemeOptions} from '@nebular/theme/services/js-themes/theme.options';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {AppState} from '../../../store/state.model';
import {NgRedux} from '@angular-redux/store';

@Component({
  selector: 'ngx-theme-switcher',
  template: `
    <ngx-switcher
      [firstValue]="false"
      [secondValue]="true"
      [firstValueLabel]="'Light'"
      [secondValueLabel]="'Cosmic'"
      [value]="currentBoolTheme()"
      (valueChange)="toggleTheme($event)"
      [vertical]="vertical"
    >
    </ngx-switcher>
  `,
})
export class ThemeSwitcherComponent implements OnInit {
  theme: NbJSThemeOptions;

  firstTheme = 'default';
  secondTheme = 'cosmic';

  @Input() vertical: boolean = false;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private themeService: NbThemeService,
    private analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
    // console.log(JSON.parse(localStorage.getItem('reduxState')).themeColor);
    this.themeService.getJsTheme()
      .subscribe((theme: NbJSThemeOptions) => this.theme = theme);
    this.ngRedux.select('themeColor').subscribe(item => {
        this.themeService.changeTheme(item.toString());
      localStorage.setItem('reduxState', JSON.stringify(this.ngRedux.getState()));
      // console.log(JSON.parse(localStorage.getItem('reduxState')).themeColor);

    });
    // this.themeService.changeTheme(stateStorage);
  }

  toggleTheme(theme: boolean) {
    // console.log('changed');
    const themeName = this.boolToTheme(theme);
    this.ngRedux.dispatch({
      type: 'CHANGE_THEME', payload: themeName,
    });
    this.analyticsService.trackEvent('switchTheme');
  }

  currentBoolTheme() {
    return this.themeToBool(this.theme);
  }

  private themeToBool(theme: NbJSThemeOptions) {
    return theme.name === this.secondTheme;
  }

  private boolToTheme(theme: boolean) {
    return theme ? this.secondTheme : this.firstTheme;
  }
}
