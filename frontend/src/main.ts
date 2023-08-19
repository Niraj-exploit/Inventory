import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
