import { Component, OnInit ,ViewChild} from '@angular/core';
import { StudentService } from './student.service';

import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/api-models/student.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students:Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'DateOfBirth', 'email','gender'];
  dataSource:MatTableDataSource<Student> = new MatTableDataSource<Student>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  constructor(private studentService:StudentService){}
ngOnInit(): void {
  this.studentService.getStudents().subscribe({
    next: (students) => {
      this.students = students;
      this.dataSource.data = this.students;
 this.dataSource.paginator=this.paginator
 this.dataSource.sort=this.sort;
    },
    error: (err) => console.error(err)
  });
}


}
