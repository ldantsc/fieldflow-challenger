import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Project } from '../../models/kanban.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ButtonComponent, RouterLink, MatIconModule, ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SideMenuComponent implements OnInit {
  @Output() projectIdValue = new EventEmitter<string>();
  projects!: Project[];
  projectTitle = new FormControl('');
  project_id!: string;
  modal: boolean = false;

  constructor(private icon: MatIconRegistry, sanitizer: DomSanitizer, private apiService: ApiService) {
    this.icon.addSvgIcon('custom-svg-list', sanitizer.bypassSecurityTrustResourceUrl('assets/list-icon.svg'));
    this.icon.addSvgIcon('logo-custom', sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg'));
  }

  ngOnInit(): void {
    this.apiService.getAllProjects().subscribe((projectsData) => {
      if (projectsData.length) {
        this.projects = projectsData;
        this.project_id = this.projects[0]._id;
        this.projectIdValue.emit(this.projects[0]._id);
      } else {
        this.createProject();
      }
    });
  }

  updateList() {
    this.apiService.getAllProjects().subscribe((projectsData) => {
      this.projects = projectsData;
    });
  }

  getProjectId(projectId: string) {
    this.projectIdValue.emit(projectId);
  }

  createProject() {
    if (this.projectTitle.value === '') {
      this.apiService.createProject('New project').subscribe((res) => {
        console.log('Projeto criado'), res;
        this.apiService.getAllProjects().subscribe((projectsData) => {
          this.projects = projectsData;
        });
      });
    } else {
      this.apiService.createProject(this.projectTitle.value).subscribe((res) => {
        console.log('Projeto criado'), res;
        this.apiService.getAllProjects().subscribe((projectsData) => {
          this.projects = projectsData;
        });
      });
    }
    this.modal = false;
  }

  modalCreateProject() {
    this.modal = true;
  }
}
