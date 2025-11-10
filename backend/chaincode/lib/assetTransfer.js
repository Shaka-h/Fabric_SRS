'use strict';
const stringify = require('json-stringify-deterministic');
const { ClientIdentity } = require('fabric-shim');
const { Contract } = require('fabric-contract-api');
const Student = require('./student');
const Lecturer = require('./lecturer');
const Course = require('./course');
const Enrollment = require('./enrollment');
const CourseResult = require('./courseResult');
const Transcript = require('./transcript');

class SRSContract extends Contract {
  async InitLedger(ctx) {
    const students = [
      {
        "id": 3,
        "uniqueId": "d49fa9ae-290d-454e-bf5d-ff3b91da1a74",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": "102",
        "userId": 10,
        "username": "xonuz",
        "email": "zazagyxen@mailinator.com",
        "program": "Computer engineering",
        "yearOfStudy": 2,
        "enrollmentDate": "2024-11-01",
        "enrollmentStatus": "ACTIVE",
        "phoneNumber": null,
        "dateOfBirth": "1995-11-01"
      },
      {
        "id": 6,
        "uniqueId": "f944bdd1-a485-42ad-84a4-87920a3eecfa",
        "createdDate": "2025-10-22",
        "updatedDate": "2025-10-22",
        "isActive": true,
        "createdBy": null,
        "studentId": "105",
        "userId": 5,
        "username": "admin",
        "email": "admin@example.com",
        "program": "BSc Computer Science",
        "yearOfStudy": 1,
        "enrollmentDate": "2024-09-01",
        "enrollmentStatus": "ACTIVE",
        "phoneNumber": "+1234567890",
        "dateOfBirth": "2003-08-20"
      },
      {
        "id": 4,
        "uniqueId": "3c608245-a282-4350-88d0-fd941432c1c2",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": "103",
        "userId": 13,
        "username": "surejyquq",
        "email": "nuvix@mailinator.com",
        "program": "Computer science",
        "yearOfStudy": 2,
        "enrollmentDate": "2001-11-10",
        "enrollmentStatus": "ACTIVE",
        "phoneNumber": "+1 (191) 588-3483",
        "dateOfBirth": "2014-01-22"
      },
      {
        "id": 5,
        "uniqueId": "2935e1e4-0382-46f9-b814-708770025cde",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": "Rerum temporibus qui",
        "userId": 14,
        "username": "visiqexelo",
        "email": "jaryza@mailinator.com",
        "program": "Computer engineering",
        "yearOfStudy": 3,
        "enrollmentDate": "1990-12-23",
        "enrollmentStatus": "ACTIVE",
        "phoneNumber": "+1 (612) 413-2686",
        "dateOfBirth": "2001-08-18"
      }

    ];
    const lecturers = [
      {
        "id": 6,
        "uniqueId": "c0e22e47-ae59-43db-906e-401a59bfa372",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "lecturerId": "lect-2",
        "userId": 12,
        "username": "makeba",
        "email": "makeba@gmail.com",
        "department": "Programming",
        "specialization": "C++ , C , C#"
      },
      {
        "id": 5,
        "uniqueId": "133588f2-fd1e-4b1b-9389-ecf92d144c9e",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "lecturerId": "lect-1",
        "userId": 11,
        "username": "Muhessin",
        "email": "muhessin@gmail.com",
        "department": "engineering",
        "specialization": "Advanced Mathematics"
      }
    ];
    const courses = [
      {
        "id": 18,
        "uniqueId": "df659054-be1e-474b-b308-5fecea1bc233",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "courseCode": "cs101",
        "courseName": "Recreational Programming",
        "credits": "9.0",
        "department": "Programming",
        "assignedLecturerId": 6,
        "lecturerName": "makeba",
        "description": "Odit eius fuga Sit "
      },
      {
        "id": 19,
        "uniqueId": "562e9bdc-207b-49e8-81b1-da366bc48227",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "courseCode": "mt101",
        "courseName": "Modeling of Cells",
        "credits": "9.0",
        "department": "engineering",
        "assignedLecturerId": 5,
        "lecturerName": "Muhessin",
        "description": "math modeling of cell "
      }

    ];
    const enrollments = [
      {
        "id": 10,
        "uniqueId": "c4867c66-a6a9-4db2-98a2-099aff74a0c3",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": 3,
        "studentName": "xonuz",
        "studentNumber": "102",
        "courseId": 19,
        "courseCode": "mt101",
        "courseName": "Modeling of Cells",
        "semester": "FALL",
        "academicYear": "2024/2025",
        "lecturerId": 5,
        "lecturerName": "Muhessin"
      },
      {
        "id": 12,
        "uniqueId": "5b7568a4-5c4b-41f8-ac77-64ce3fbc51b1",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": 3,
        "studentName": "xonuz",
        "studentNumber": "102",
        "courseId": 18,
        "courseCode": "cs101",
        "courseName": "Recreational Programming",
        "semester": "fall",
        "academicYear": "2024/2025",
        "lecturerId": 6,
        "lecturerName": "makeba"
      },
      {
        "id": 13,
        "uniqueId": "0a246b45-34a4-48ff-a544-f98f7b821661",
        "createdDate": "2025-10-21",
        "updatedDate": "2025-10-21",
        "isActive": true,
        "createdBy": null,
        "studentId": 4,
        "studentName": "surejyquq",
        "studentNumber": "103",
        "courseId": 19,
        "courseCode": "mt101",
        "courseName": "Modeling of Cells",
        "semester": "fall",
        "academicYear": "2024/2025",
        "lecturerId": 5,
        "lecturerName": "Muhessin"
      }

    ];
    const grades = [
      {
        "id": 8,
        "uniqueId": "8fabcb47-8c4b-4ddb-9095-70b63be59686",
        "createdDate": "2025-10-22",
        "updatedDate": "2025-10-22",
        "isActive": true,
        "createdBy": null,
        "enrollmentId": 13,
        "studentName": "surejyquq",
        "studentNumber": "103",
        "courseCode": "mt101",
        "courseName": "Modeling of Cells",
        "semester": "fall",
        "academicYear": "2024/2025",
        "gradeType": "NUMERIC",
        "numericGrade": "33.00",
        "letterGrade": null,
        "courseWorkGrade": "82.00",
        "examGrade": "9.00",
        "remarks": "Proident necessitat",
        "status": "INVALID",
        "submittedById": 5,
        "lecturerName": "Muhessin",
        "submittedAt": "2025-10-22T14:16:57.825Z",
        "verifiedAt": null,
        "isVerified": false,
        "blockchainHash": "16106d4889bf9ca1b713468c3046f1f7da5ae4fa759cd0ca7db25f224ea3062a",
        "blockchainTransactionId": "",
        "ipfsCid": "QM-5417886230298511761142620"
      },
      {
        "id": 7,
        "uniqueId": "80c30335-e7e9-4364-a71c-c763b3219573",
        "createdDate": "2025-10-22",
        "updatedDate": "2025-10-22",
        "isActive": true,
        "createdBy": null,
        "enrollmentId": 10,
        "studentName": "xonuz",
        "studentNumber": "102",
        "courseCode": "mt101",
        "courseName": "Modeling of Cells",
        "semester": "FALL",
        "academicYear": "2024/2025",
        "gradeType": "PASS_FAIL",
        "numericGrade": null,
        "letterGrade": null,
        "courseWorkGrade": "81.00",
        "examGrade": "75.00",
        "remarks": "Sed voluptates excep",
        "status": "INVALID",
        "submittedById": 5,
        "lecturerName": "Muhessin",
        "submittedAt": "2025-10-22T14:12:01.170Z",
        "verifiedAt": null,
        "isVerified": false,
        "blockchainHash": "36292375c11d51d3ba717d3ca3c2830bae249e67ff252d897bfae0de5ffd1fe5",
        "blockchainTransactionId": "",
        "ipfsCid": "QM-9206497595066771761142323"
      },
      {
        "id": 6,
        "uniqueId": "564d3647-d31f-4044-9956-f3fadd26c3af",
        "createdDate": "2025-10-16",
        "updatedDate": "2025-10-16",
        "isActive": true,
        "createdBy": null,
        "enrollmentId": 5,
        "studentName": "hannah",
        "studentNumber": "101",
        "courseCode": "2",
        "courseName": "",
        "semester": "",
        "academicYear": "",
        "gradeType": "NUMERIC",
        "numericGrade": "1.00",
        "letterGrade": "",
        "courseWorkGrade": "1.00",
        "examGrade": "1.00",
        "remarks": "Pass",
        "status": "INVALID",
        "submittedById": 2,
        "lecturerName": "lecturer",
        "submittedAt": "2025-10-16T07:22:25.354Z",
        "verifiedAt": null,
        "isVerified": false,
        "blockchainHash": "a0ef63c8a9e8cca1d351f9bd0742c1468b2e517b309f71b521976f20f90d1fbb",
        "blockchainTransactionId": "1",
        "ipfsCid": "QM54712732452558131760599345"
      },
      {
        "id": 3,
        "uniqueId": "0abe3e23-250a-4a6b-b4f7-089b1b1e8ded",
        "createdDate": "2025-10-15",
        "updatedDate": "2025-10-15",
        "isActive": true,
        "createdBy": null,
        "enrollmentId": 3,
        "studentName": "hannah",
        "studentNumber": "101",
        "courseCode": "",
        "courseName": "",
        "semester": "",
        "academicYear": "",
        "gradeType": "NUMERIC",
        "numericGrade": "1.00",
        "letterGrade": "",
        "courseWorkGrade": "1.00",
        "examGrade": "1.00",
        "remarks": "Pass",
        "status": "INVALID",
        "submittedById": 2,
        "lecturerName": "lecturer",
        "submittedAt": "2025-10-15T16:22:44.444Z",
        "verifiedAt": null,
        "isVerified": false,
        "blockchainHash": "",
        "blockchainTransactionId": "",
        "ipfsCid": ""
      }

    ];
    const transcripts = [];


    await ctx.stub.putState('Students', Buffer.from(stringify(students)));
    await ctx.stub.putState('Lecturers', Buffer.from(stringify(lecturers)));
    await ctx.stub.putState('Courses', Buffer.from(stringify(courses)));
    await ctx.stub.putState('Enrollments', Buffer.from(stringify(enrollments)));
    await ctx.stub.putState('Grades', Buffer.from(stringify(grades)));
    await ctx.stub.putState('Transcripts', Buffer.from(stringify(transcripts)));
    
    for (const student of students) {
      await ctx.stub.putState(student.studentId, Buffer.from(JSON.stringify(student)));
    }
    for (const lecturer of lecturers) {
      await ctx.stub.putState(lecturer.lecturerId, Buffer.from(JSON.stringify(lecturer)));
    }
    for (const course of courses) {
      await ctx.stub.putState(course.courseId, Buffer.from(JSON.stringify(course)));
    }
    for (const enrollment of enrollments) {
      await ctx.stub.putState(enrollment.enrollmentId, Buffer.from(JSON.stringify(enrollment)));
    }
    for (const grade of grades) {
      await ctx.stub.putState(grade.id.toString(), Buffer.from(JSON.stringify(grade)));
    }

    return 'Ledger initialized with SRS domain structure';
  }


  // ========== STUDENTS ==========
  async createStudent(ctx, studentData) {
    return await Student.create(ctx, JSON.parse(studentData));
  }

  async getStudent(ctx, studentId) {
    return await Student.get(ctx, studentId);
  }

  async listStudents(ctx) {
    return await Student.list(ctx);
  }

  async updateStudent(ctx, studentId, updates) {
    return await Student.update(ctx, studentId, JSON.parse(updates));
  }

  async deactivateStudent(ctx, studentId) {
    return await Student.deactivate(ctx, studentId);
  }

  // ========== LECTURERS ==========
  async createLecturer(ctx, data) {
    return await Lecturer.create(ctx, JSON.parse(data));
  }

  async listLecturers(ctx) {
    return await Lecturer.list(ctx);
  }

  // ========== COURSES ==========
  async createCourse(ctx, data) {
    return await Course.create(ctx, JSON.parse(data));
  }

  async listCourses(ctx) {
    return await Course.list(ctx);
  }

  // ========== ENROLLMENTS ==========
  async createEnrollment(ctx, data) {
    return await Enrollment.create(ctx, JSON.parse(data));
  }

  async listEnrollments(ctx) {
    return await Enrollment.list(ctx);
  }

  // ========== COURSE RESULTS ==========
  async submitGrade(ctx, data) {
    return await CourseResult.submit(ctx, JSON.parse(data));
  }


  async getResult(ctx, resultId) {
    return await CourseResult.get(ctx, resultId);
  }

  async listResults(ctx) {
    return await CourseResult.list(ctx);
  }

  async verifyGrade(ctx, resultId) {
    return await CourseResult.verify(ctx, resultId);
  }

  async getGradeAuditTrail(ctx, resultId) {
    return await CourseResult.getAuditTrail(ctx, resultId);
  }

  // ========== TRANSCRIPTS ==========
  async generateTranscript(ctx, data) {
    return await Transcript.generate(ctx, JSON.parse(data));
  }

  async listTranscripts(ctx, studentId) {
    return await Transcript.list(ctx, studentId);
  }
}

module.exports = SRSContract;
