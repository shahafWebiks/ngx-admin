import {AppState, INITIAL_STATE} from './state.model';
import {Action} from './actions';
import {tassign} from 'tassign';


export const rootReducer = function (state: AppState, action: Action): AppState {

  switch (action.type) {
    case 'CHANGE_THEME': {
      return tassign(state, {themeColor: action.payload});
    }
    case 'CHANGE_LAYOUT': {
      const layouts = [];
      state.layoutsState.map(layout => {
        layout['selected'] ? layout['selected'] = false : null;
      });
      state.layoutsState.filter(layout => {
        action.payload['id'] === layout['id'] ? layout['selected'] = true : null;
      });
      state.layoutsState.forEach(x => layouts.push(x));
      const newLayouts =  Object.assign({}, state, {layoutsState: layouts});
      return newLayouts;
    }
    default:
      return JSON.parse(localStorage.getItem('reduxState'));
  }
}
