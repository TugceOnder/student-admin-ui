import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/api-models/student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId!: string;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateofBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: { id: '', description: '' },
    address: { id: '', physicalAddress: '', postalAddress: '' }
  };

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        console.log('Route param id bulunamadı');
        return;
      }

      this.studentId = id;

      this.studentService.getStudent(this.studentId).subscribe({
        next: (res) => {
          this.student = res;
        },
        error: (err) => {
          console.error('getStudent hata:', err);
        }
      });
    });
  }
}
