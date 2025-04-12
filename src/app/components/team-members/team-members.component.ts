import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { TeamMember, GridColumn, Team, Name } from '../../models/team-member.model';

@Component({
  selector: 'app-team-members',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  columns: GridColumn[] = [];
  loading = true;
  selectedRows: Set<number> = new Set();
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchTeamMembers();
  }

  fetchTeamMembers() {
    this.loading = true;
    this.apiService.getTeamMembers().subscribe({
      next: (response) => {
        console.log('Full API Response:', response);
        if (response && Array.isArray(response.grid_data)) {
          this.teamMembers = response.grid_data.map((member: any): TeamMember => {
            const normalizedTeams: Team[] = typeof member.teams === 'string'
              ? [{ text_color: '', background_color: '', value: member.teams }]
              : (Array.isArray(member.teams) ? member.teams : []);
            return {
              ...member,
              name: typeof member.name === 'string' ? { first_name: member.name, last_name: '', handle: '' } : member.name,
              teams: normalizedTeams
            };
          });
          this.totalPages = Math.ceil(this.teamMembers.length / this.itemsPerPage);
          console.log('teamMembers:', this.teamMembers);
        } else {
          console.error('grid_data is not an array or missing:', response?.grid_data);
          this.teamMembers = [];
        }
        if (response && Array.isArray(response.grid_columns)) {
          this.columns = response.grid_columns;
          console.log('columns:', this.columns);
        } else {
          this.columns = [
            { column_key: 'name', column_name: 'Name', type: 'string', align: 'left' },
            { column_key: 'status', column_name: 'Status', type: 'string', align: 'center' },
            { column_key: 'role', column_name: 'Role', type: 'string', align: 'left' },
            { column_key: 'license_used', column_name: 'License Use', type: 'number', align: 'center' },
            { column_key: 'teams', column_name: 'Teams', type: 'array', align: 'left' }
          ];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('API fetch error:', err);
        this.teamMembers = [];
        this.columns = [];
        this.loading = false;
      }
    });
  }

  getColumnValue(member: TeamMember, column: GridColumn): string {
    let value = member[column.column_key as keyof TeamMember];

    if (typeof value === 'string' && column.column_key === 'name') {
      return value;
    }

    switch (column.column_key) {
      case 'name':
        return typeof member.name === 'string'
          ? member.name
          : `${(member.name as Name).first_name} ${(member.name as Name).last_name} (${(member.name as Name).handle})`;
      case 'license_used':
        return typeof value === 'number' ? `${value}%` : '0%';
      case 'teams':
        return Array.isArray(member.teams) ? member.teams.map((team: Team) => team.value).join(', ') : '';
      default:
        return value?.toString() || '';
    }
  }

  getPaginatedMembers(): TeamMember[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.teamMembers.slice(start, end);
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  addMember(member: TeamMember) {
    this.teamMembers.push(member);
    this.totalPages = Math.ceil(this.teamMembers.length / this.itemsPerPage);
  }

  updateMember(index: number, updated: TeamMember) {
    this.teamMembers[index] = updated;
  }

  deleteMember(index: number) {
    if (confirm(`Delete ${typeof this.teamMembers[index].name === 'string' ? this.teamMembers[index].name : (this.teamMembers[index].name as Name)?.first_name || 'Unknown'}?`)) {
      this.teamMembers.splice(index, 1);
      this.totalPages = Math.ceil(this.teamMembers.length / this.itemsPerPage);
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;
    }
  }

  editMember(index: number) {
    const member = this.teamMembers[index];
    const currentName = typeof member.name === 'string' ? member.name : `${(member.name as Name).first_name} ${(member.name as Name).last_name}`;
    const newName = prompt(`Edit name for ${currentName}`, currentName);
    if (newName) {
      const [firstName, lastName] = newName.split(' ');
      this.teamMembers[index] = {
        ...member,
        name: typeof member.name === 'string'
          ? newName
          : { ...member.name as Name, first_name: firstName || (member.name as Name).first_name, last_name: lastName || (member.name as Name).last_name }
      };
    }
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedRows = checked
      ? new Set(this.getPaginatedMembers().map((_, i) => i))
      : new Set();
  }

  toggleRowSelection(index: number) {
    if (this.selectedRows.has(index)) {
      this.selectedRows.delete(index);
    } else {
      this.selectedRows.add(index);
    }
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}