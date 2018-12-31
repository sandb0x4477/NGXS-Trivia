import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { OpenTriviaService } from './_services/open-trivia.service';

@NgModule({
  declarations: [AppComponent, NavbarComponent, StartPageComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [OpenTriviaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
