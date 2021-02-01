import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  to_do = 10
  made_jobs = 5
  modal_open = false
  new_event: boolean = undefined
  newEventInfo = {
    allDay: undefined,
    end: undefined,
    start: undefined
  }
  templateEvent = {
    id: undefined,
    title: undefined,
    description: undefined,
    ticket: undefined,
    start: undefined,
    end: undefined,
    allDay: undefined,
    responsible: undefined
  }

  calendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    selectable: true,
    weekends: false,
    editable: false,
    initialView: 'dayGridMonth',
    displayEventTime: true,
    events: [
      { id: '1', title: 'event 1', date: '2021-01-29', allDay: true },
      { id: '2', title: 'event 2', start: '2021-01-01', end: '2021-01-05' },
      { id: '3', title: 'event 1', date: '2021-01-29', allDay: true },
      { id: '4', title: 'event 2', start: '2021-01-01', end: '2021-01-05' },
      { id: '5', title: 'testrtt0', start: '2021-02-02T08:30:00+03:00', end: '2021-02-02T09:30:00+03:00' },
      { id: '6', title: 'testrtt1', start: '2021-02-02T08:30:00+03:00', end: '2021-02-02T09:30:00+03:00' },
      { id: '7', title: 'testrtt2', start: '2021-02-02T08:30:00+03:00', end: '2021-02-02T09:30:00+03:00' }
    ],
    select: this.handleDateSelect.bind(this),
    datesSet: this.handleDatesSetClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  closeModal () {
    this.modal_open = !this.modal_open
    this.templateEvent = {
      id: undefined,
      title: undefined,
      description: undefined,
      ticket: undefined,
      start: undefined,
      end: undefined,
      allDay: undefined,
      responsible: undefined
    }
  }

  testVoid(id) {
    if (id === '1') {
      this.templateEvent = {
        id: '1',
        title: 'event 1',
        start: '2021-01-29',
        end: undefined,
        allDay: true,
        description: 'testl jhds',
        ticket: 'C2OPS-1',
        responsible: 'MSizov'
      }
    }
    if (id === '2') {
      this.templateEvent = {id: '2',
        title: 'event 2',
        start: '2021-01-01',
        end: '2021-01-05',
        allDay: false,
        description: 'test event1jgerglgernhk jhersfngerkn',
        ticket: 'C2OPS-2',
        responsible: 'PLazukin'
      }
    }
  }

  handleDatesSetClick(arg?) {
    console.log(arg.endStr, arg.startStr)
  }

  handleDateSelect(arg) {
    this.new_event = true
    this.modal_open = true
    this.newEventInfo.allDay = arg.allDay
    this.newEventInfo.end = arg.end
    this.newEventInfo.start = arg.start
    console.log(arg)
  }

  handleEventClick(arg) {
    this.new_event = false
    this.testVoid(arg.event.id)
    this.modal_open = true
    console.log({'event_click': arg.event})
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
