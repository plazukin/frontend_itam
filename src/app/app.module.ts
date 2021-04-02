import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
// Fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

// Material plugin
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Globals } from './globals'

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin,
    timeGridPlugin,
    listPlugin
]);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CalendarComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
