import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent {
  @Input() modalTitle: string;
  // @Input() modalValuesSelected: boolean;
  // @Input() apiFlag: boolean;
  // @Input() pageName: string;
  // @Input() lableName: string;
  // @Input() showError = false;
  // @Input() allowSearch = false;
  @Output() confirmList: EventEmitter<any> = new EventEmitter();
  
  constructor(
    public dialogRef: MatDialogRef<ModalPopupComponent>
  ) { }
  /**
   * On Click of close button closing the dialog box
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /**
   * Close dialogs on confirm button Click
   */
  onConfirm() {
    this.confirmList.emit();
    this.dialogRef.close();
  }
 
}
