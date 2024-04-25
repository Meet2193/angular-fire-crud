import { Component, inject } from '@angular/core';
import { Student } from '../../model/student';
import { AuthService } from '../../auth.service';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  auth = inject(AuthService);
  studentData = inject(DataService);
  studentList: Student[] = [];

  ngOnInit(): void {}

  register() {
    this.auth.logOut();
  }

  getAllStudents() {
    this.studentData.getAllStudents().subscribe(
      (res) => {
        this.studentList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {}
    );
  }
}
