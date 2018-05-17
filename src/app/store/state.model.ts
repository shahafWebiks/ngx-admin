export interface AppState {
  themeColor: string;
  layoutsState: Array<any>;
}

export const INITIAL_STATE = {
  themeColor: 'default',
  layoutsState: [{name: 'One Column', icon: 'nb-layout-default', id: 'one-column', selected: false},
    {name: 'Two Column', icon: 'nb-layout-two-column', id: 'two-column', selected: true},
    {name: 'Center Column', icon: 'nb-layout-center', id: 'center-column', selected: false}]};



