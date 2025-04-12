import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorBreakdownComponent } from '../vendor-breakdown/vendor-breakdown.component';
import { TeamMembersComponent } from '../team-members/team-members.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, VendorBreakdownComponent, TeamMembersComponent],
  template: '<app-vendor-breakdown></app-vendor-breakdown><app-team-members></app-team-members>'
})
export class DashboardComponent {}