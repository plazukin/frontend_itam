import {Component, OnInit, ViewChild} from '@angular/core';
import moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Globals} from '../globals';
import {FullCalendarComponent} from '@fullcalendar/angular';

interface Event {
  id?: string,
  title?: string,
  start?: string,
  timeS?: string,
  end?: string,
  timeE?: string,
  allDay?: boolean,
  extendedProps?: {
    description?: string,
    ticket?: string,
    responsible?: string
  },
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: FullCalendarComponent
  events: Event[] = []
  event: Event = {
    title: undefined,
    start: undefined,
    end: undefined,
    allDay: undefined,
    extendedProps: {
      description: undefined,
      ticket: undefined,
      responsible: undefined
    },
  }
  modalOpen: boolean
  newEvent: boolean

  newEventInfo: Event = {
    title: undefined,
    start: undefined,
    end: undefined,
    allDay: undefined,
    extendedProps: {
      description: undefined,
      ticket: undefined,
      responsible: undefined
    },
  }

  calendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    views: {
      dayGrid: {
        eventTimeFormat: {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        },
        dayHeaderFormat: { weekday: 'long' },
        displayEventTime: true,
      },
      timeGrid: {
        slotLabelFormat: [
          { hour: 'numeric', minute: 'numeric', hour12: false }
        ],
        scrollTime: '10:00:00',
      },
      timeGridWeek: {
        dayHeaderFormat: { weekday: 'long', day: 'numeric', omitCommas: true },
      },
      list: {
        slotLabelFormat: [
          { hour: 'numeric', minute: 'numeric', hour12: false }
        ],
      },
    },
    firstDay: 1,
    aspectRatio: 1.9,
    selectable: true,
    weekends: false,
    editable: false,
    fixedWeekCount: false,
    initialView: 'dayGridMonth',
    events: `${this.globals.backendUrl}/calendar/event/GetRange`,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  updateEvent() {
    this.modalOpen = !this.modalOpen
    const calendarAPI = this.calendar.getApi()
    const timeStart = moment(this.newEventInfo.timeS, 'HH:mm')
    const timeEnd = moment(this.newEventInfo.timeE, 'HH:mm')
    this.newEventInfo.start = moment(this.newEventInfo.start).hour(timeStart.hour()).minute(timeStart.minute()).toISOString()
    this.newEventInfo.end = moment(this.newEventInfo.end).hour(timeEnd.hour()).minute(timeEnd.minute()).toISOString()
    this.http.post<Event>(`${this.globals.backendUrl}/calendar/event/AddOne`, this.newEventInfo)
        .subscribe(event => {
          calendarAPI.addEvent(event)
        })
    this.newEventInfo = {
      title: undefined,
      start: undefined,
      end: undefined,
      allDay: undefined,
      extendedProps: {
        description: undefined,
        ticket: undefined,
        responsible: undefined
      }
    }
  }

  deleteEvent() {
    this.modalOpen = !this.modalOpen
    this.http.delete(`${this.globals.backendUrl}/calendar/event/${this.event.id}`)
        .subscribe()
    const calendarAPI = this.calendar.getApi()
    calendarAPI.getEventById(this.event.id).remove()
  }

  fixDateTime () {
    this.newEventInfo.allDay = !this.newEventInfo.allDay
    this.fixTime()
    this.fixDate('start')
  }

  fixDate (effect) {
    if (this.newEventInfo.allDay === true) {
        this.newEventInfo.end = moment(this.newEventInfo.start).add(1, 'days').format()
    } else {
      switch (effect) {
        case 'start':
          if (moment(this.newEventInfo.start).isAfter(moment(this.newEventInfo.end))) {
            this.newEventInfo.end = moment(this.newEventInfo.start).add(1, 'days').format()
          }
          break
        case 'end':
          if (moment(this.newEventInfo.start).isAfter(moment(this.newEventInfo.end))) {
            this.newEventInfo.start = moment(this.newEventInfo.end).subtract(1, 'days').format()
          }
          break
      }
    }
  }

  fixTime (effect?) {
    if (this.newEventInfo.allDay === true) {
      this.newEventInfo.timeS = '0:00'
      this.newEventInfo.timeE = '0:00'

    } else {

      const momentTimeStart = moment(this.newEventInfo.timeS, 'HH:mm')
      const momentTimeEnd = moment(this.newEventInfo.timeE, 'HH:mm')

      if (moment(this.newEventInfo.start).isSame(moment(this.newEventInfo.end))) {

        switch (effect) {
          case 'start':
            if (momentTimeStart.isAfter(momentTimeEnd)) {
              const newTime = momentTimeStart.add(30, 'minutes')
              this.newEventInfo.timeE = newTime.format('HH:mm')
            }
            break
          case 'end':
            if (momentTimeEnd.isBefore(momentTimeStart)) {
              const newTime = momentTimeEnd.subtract(30, 'minutes')
              this.newEventInfo.timeS = newTime.format('HH:mm')
            }
            break
        }
      }
    }
  }

  handleDateSelect(arg) {
    this.newEvent = true
    this.modalOpen = true
    this.newEventInfo.start = moment(arg.start).format('YYYY-MM-DD')
    this.newEventInfo.timeS = moment(arg.start).format('HH:mm')
    this.newEventInfo.end = moment(arg.end).format('YYYY-MM-DD')
    this.newEventInfo.timeE = moment(arg.end).format('HH:mm')
    this.newEventInfo.allDay = arg.allDay
  }

  handleEventClick(arg) {
    this.newEvent = false
    this.modalOpen = true
    const start = moment(arg.event.start).format('YYYY-MM-DD')
    const timeS = moment(arg.event.start).format('HH:mm')
    const end = moment(arg.event.end).format('YYYY-MM-DD')
    const timeE = moment(arg.event.end).format('HH:mm')
    this.event = {
      id: arg.event.id,
      title: arg.event.title,
      start: start,
      timeS: timeS,
      end: end,
      timeE: timeE,
      allDay: arg.event.allDay,
      extendedProps: arg.event.extendedProps,
    }
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  constructor(private http: HttpClient, private globals: Globals) {
    this.globals = globals
}

  ngOnInit(): void {
  }
}
