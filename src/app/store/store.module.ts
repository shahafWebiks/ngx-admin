import {NgModule} from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {AppState} from './state.model';
import {rootReducer} from './reducers';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

@NgModule({
  imports: [
    NgReduxModule,
  ],
  declarations: [],
})

export class StoreModule {
  constructor(public store: NgRedux<AppState>) {
    store.configureStore(rootReducer,
      persistedState)
  }
}
