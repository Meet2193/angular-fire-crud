import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  afs = inject(AngularFirestore);

  constructor() {}

  // add Student
  addStudent(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Studnt').add(student);
  }

  // getAll Students
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  // delete student
  deleteStudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete();
  }

  // Update Student
  updateStudent(student: Student) {
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
