import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
  constructor(
    // private profilesService: ProfilesService,
    private router: Router,
    // private userService: UserService
  ) {}

  // @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
  }
}
