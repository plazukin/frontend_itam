import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title = 'Default title'
  @Input() update_button = false
  @Input() add_or_update_button = 'update'
  @Output() update = new  EventEmitter<void>()
  @Output() close = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

}
