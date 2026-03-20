import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService } from '../student.service';
import { GenderService } from '../services/gender.service';

import { Student } from 'src/app/models/api-models/student.model';
import { Gender } from 'src/app/models/api-models/gender.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null = null;

  // ✅ Datepicker buna bağlanacak
  birthDate: Date | null = null;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',          // ✅ '' değil, null/Date tut
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: { id: '', description: '' },
    address: { id: '', physicalAddress: '', postalAddress: '' }
  };

  genderList: Gender[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly genderService: GenderService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private router : Router
  ) {}

  ngOnInit(): void {

    // ✅ Gender listesi
    this.genderService.getGenderList().subscribe({
      next: (genders: Gender[]) => (this.genderList = genders),
      error: (err: unknown) => console.error(err)
    });

    // ✅ Student getir
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      if (!this.studentId) return;

      // ⚠️ getStudent parametresi string istiyor, null gönderme!
      this.studentService.getStudent(this.studentId).subscribe({
        next: (data: Student) => {
          this.student = data;

          // ✅ dateOfBirth string/date olabilir → Date'e çevir
          const raw = data.dateOfBirth;
          this.birthDate = raw ? new Date(raw as any) : null;
        },
        error: (err: unknown) => console.error(err)
      });
    });
  }
onUpdate():void{
  this.studentService.updateStudent(this.student.id,this.student)
  .subscribe(
    (success)=>{
      this.router.navigateByUrl('')
    })
}
  goBack(): void {
    this.location.back();
  }
}
