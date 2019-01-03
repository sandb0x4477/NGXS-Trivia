import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OpenTriviaService } from './_services/open-trivia.service';

import { TriviaState } from './store/trivia.state';
import { environment } from '../environments/environment';
import { QueryFormComponent } from './components/query-form.component';
import { QfContainerComponent } from './containers/query-form.cont.component';
import { TriviaComponent } from './containers/trivia.component';
import { TriviaDisplayComponent } from './components/trivia-display.component';
import { HomeComponent } from './containers/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QueryFormComponent,
    QfContainerComponent,
    TriviaComponent,
    TriviaDisplayComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([TriviaState], {
      developmentMode: !environment.production,
    }),
    // NgxsStoragePluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Ngxs Trivia DevTools',
    }),
  ],
  providers: [OpenTriviaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
