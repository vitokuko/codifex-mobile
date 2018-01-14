import { Component } from '@angular/core';

import { ReserverPage } from '../reserver/reserver';
import { CodifierPage } from '../codifier/codifier';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CodifierPage;
  tab3Root = ReserverPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
