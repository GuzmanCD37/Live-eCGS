//remove from the folder
/*

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFWV4k9-XmABgNGmleyXLTcuEn41rMHK8",
    authDomain: "hackathon-26f12.firebaseapp.com",
    databaseURL: "https://hackathon-26f12-default-rtdb.firebaseio.com",
    projectId: "hackathon-26f12",
    storageBucket: "hackathon-26f12.appspot.com",
    messagingSenderId: "1071789540560",
    appId: "1:1071789540560:web:6227da20f3a3a3a9ab0ad5"
  };

  import {
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  function Getalldata() {
    db.collection(localStorage.getItem('student_id')).orderBy('createdAt').get().then((querySnapshot) => {
        const firsttrimester = [];
        const secondtrimester = [];
        const thirdtrimester = [];

        querySnapshot.forEach((studentdata) => {
            const data = studentdata.data();
            const id = studentdata.id;
            
            // condition Statement: If the trimester is not equal to 1st/2nd/3rd
            if (data.TRIMESTER =="1st") {
                firsttrimester.push({ ...data, id });
            } else if (data.TRIMESTER == "2nd") {
                secondtrimester.push({ ...data, id });
            }else{
                thirdtrimester.push({ ...data, id });
            }
        });

        // Call a function to display
        FirsttrimesterDisplay(firsttrimester);
        SecondtrimesterDisplay(secondtrimester);
        ThirdtrimesterDisplay(thirdtrimester);
    });
}

function FirsttrimesterDisplay(studentData) {
    const tableBody = document.getElementById('firsttrimester');

    // Clear existing table rows (if any)
    tableBody.innerHTML = '';

    // Populate the table
    studentData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.COURSE_CODE}</td>
            <td>${student.COURSE_DESCRIPTION}</td>
            <td>${student.TRIMESTER}</td>
            <td>${student.PRELIM}</td>
            <td>${student.MIDTERM}</td>
            <td>${student.FINALS}</td>
            <td>${student.REMARK}</td>
            <td>${student.SECTION}</td>
            <td>${student.FACULTY_NAME}</td>
            <td>${student.CREDIT_UNITS}</td>
        `;
        document.getElementById('stname').innerHTML=student.STUDENT_NAME;
        document.getElementById('school_year').innerHTML=student.ACADEMIC_YEAR;
        tableBody.appendChild(row);
    });
}

function SecondtrimesterDisplay(secondtriData) {
    const nonMatchingTableBody = document.getElementById('secondtrimester');
    if(secondtriData==""){
        document.getElementById('table2').style="display:none";
    }else{
    // Clear existing rows (if any)
    nonMatchingTableBody.innerHTML = '';

    // Populate the non-matching table
    secondtriData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.COURSE_CODE}</td>
        <td>${student.COURSE_DESCRIPTION}</td>
        <td>${student.TRIMESTER}</td>
        <td>${student.PRELIM}</td>
        <td>${student.MIDTERM}</td>
        <td>${student.FINALS}</td>
        <td>${student.REMARK}</td>
        <td>${student.SECTION}</td>
        <td>${student.FACULTY_NAME}</td>
        <td>${student.CREDIT_UNITS}</td>
        `;
        nonMatchingTableBody.appendChild(row);
            });
        }
}
function ThirdtrimesterDisplay(thirdtriData) {
    const nonMatchingTableBody = document.getElementById('thirdtrimester');
    if(thirdtriData==""){
        document.getElementById('table3').style="display:none";
    }else{
    // Clear existing rows (if any)
    nonMatchingTableBody.innerHTML = '';

    // Populate the non-matching table
    thirdtriData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${student.COURSE_CODE}</td>
        <td>${student.COURSE_DESCRIPTION}</td>
        <td>${student.TRIMESTER}</td>
        <td>${student.PRELIM}</td>
        <td>${student.MIDTERM}</td>
        <td>${student.FINALS}</td>
        <td>${student.REMARK}</td>
        <td>${student.SECTION}</td>
        <td>${student.FACULTY_NAME}</td>
        <td>${student.CREDIT_UNITS}</td>
        `;
        nonMatchingTableBody.appendChild(row);
            });
        }
}
  
  window.onload = Getalldata;

function exitlogout(){
  window.open("index.html");
  window.close();
  }
    
  logout_btn.addEventListener('click',exitlogout); 

  */
  
