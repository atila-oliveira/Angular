import { Routes, RouterModule } from '@angular/router';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';

const routes: Routes = [
  { path: '', component: UnsubscribePocComponent },
];

export const UnsubscribeRxjsRoutes = RouterModule.forChild(routes);
