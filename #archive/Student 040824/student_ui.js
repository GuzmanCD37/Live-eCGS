import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByH0pNuEoNXna4Dj61C2QxIX-AfmFAnq0",
  authDomain: "antipolo-hackathon-project.firebaseapp.com",
  projectId: "antipolo-hackathon-project",
  storageBucket: "antipolo-hackathon-project.appspot.com",
  messagingSenderId: "88056856756",
  appId: "1:88056856756:web:9597da80bb7239996bd7e1"
};

  import {
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  let student_id,tri;
  let subs = [];

  const storedData = localStorage.getItem('UserData');

  try {
    const studentsub =[];
    const userData = JSON.parse(storedData); 
    userData.forEach((studentdata) => {
      student_id = studentdata.student_id;
      tri = studentdata.tri;
      studentsub.push(studentdata.subs);
      studentsub.forEach((subject) => {
        subs = [...subject];
    });
    });
  } catch (error) {
    console.error('Error accessing data:', error);
  }
  


  
  
  function Getalldata() {
    db.collection(student_id).orderBy('createdAt').get().then((querySnapshot) => {
        const firsttrimester = [];
        const secondtrimester = [];
        const thirdtrimester = [];
        const unknowndata =[];

        querySnapshot.forEach((studentdata) => {
            const data = studentdata.data();
            const id = studentdata.id;
            const subject = studentdata.data().COURSE_CODE;
        
            let datasection;
            let intersection = subs.filter((element) => 
                               subject.includes(element));
                               
            intersection.forEach((sectiondata)=>{
                 datasection = (sectiondata);
            })
    if (datasection === id ) {
    
    unknowndata.push({ ...data});
    unknowndata.forEach((studentdata) => {
        // Organize data by trimester
        if (studentdata.TRIMESTER === "1st") {
            firsttrimester.push({ ...data });
            document.getElementById('table').style="display: block";
        } else if (studentdata.TRIMESTER === "2nd") {
            secondtrimester.push({ ...data });
            document.getElementById('table2').style="display: block";
        } else {
            thirdtrimester.push({ ...data });
            document.getElementById('table3').style="display: block";
        }
        
    });
    }
       
            
        });

        // Call a function to display

        FirsttrimesterDisplay(firsttrimester);
        SecondtrimesterDisplay(secondtrimester);
        ThirdtrimesterDisplay(thirdtrimester);

        
    });
}

function FirsttrimesterDisplay(firsttrimester) {
    const tableBody = document.getElementById('firsttrimester');
const uniqueStudentData = [...new Set(firsttrimester)];

// Clear existing table rows (if any)
tableBody.innerHTML = '';

// Keep track of the previously added student data
let prevStudent = null;

// Populate the table
uniqueStudentData.forEach((student) => {
    // Check if the current student data is different from the previous one
    if (!prevStudent || JSON.stringify(student) !== JSON.stringify(prevStudent)) {
        // Check if the student's TRIMESTER matches any existing value in the third column
        const existingRow = Array.from(tableBody.getElementsByTagName('tr')).find((row) => {
            const thirdColumnCell = row.querySelector('td:nth-child(3)');
            return thirdColumnCell && thirdColumnCell.textContent !== student.TRIMESTER;
        });

        if (!existingRow) {
            // Create a new row if no matching row exists
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
            document.getElementById('stname').innerHTML = student.STUDENT_NAME;
            document.getElementById('school_year').innerHTML = student.ACADEMIC_YEAR;
            tableBody.appendChild(row);

            // Update the previous student data
            prevStudent = student;
        }
    }
});
    
}

function SecondtrimesterDisplay(secondtrimester) {
    const tableBody = document.getElementById('secondtrimester');
const uniqueStudentData = [...new Set(secondtrimester)];
if (secondtrimester.length === 0) {
    document.getElementById('table2').style.display = 'none';
} else {
// Clear existing table rows (if any)
tableBody.innerHTML = '';

// Keep track of the previously added student data
let prevStudent = null;

// Populate the table
uniqueStudentData.forEach((student) => {
    // Check if the current student data is different from the previous one
    if (!prevStudent || JSON.stringify(student) !== JSON.stringify(prevStudent)) {
        // Check if the student's TRIMESTER matches any existing value in the third column
        const existingRow = Array.from(tableBody.getElementsByTagName('tr')).find((row) => {
            const thirdColumnCell = row.querySelector('td:nth-child(3)');
            return thirdColumnCell && thirdColumnCell.textContent !== student.TRIMESTER;
        });

        if (!existingRow) {
            // Create a new row if no matching row exists
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
            document.getElementById('stname').innerHTML = student.STUDENT_NAME;
            document.getElementById('school_year').innerHTML = student.ACADEMIC_YEAR;
            tableBody.appendChild(row);

            // Update the previous student data
            prevStudent = student;
        }
    }
});
}
}
function ThirdtrimesterDisplay(thirdtriData) {
    const tableBody = document.getElementById('thirdtrimester');
    const uniqueStudentData = [...new Set(thirdtriData)];
if (thirdtriData.length === 0) {
    document.getElementById('table3').style.display = 'none';
} else {
// Clear existing table rows (if any)
tableBody.innerHTML = '';

// Keep track of the previously added student data
let prevStudent = null;

// Populate the table
uniqueStudentData.forEach((student) => {
    // Check if the current student data is different from the previous one
    if (!prevStudent || JSON.stringify(student) !== JSON.stringify(prevStudent)) {
        // Check if the student's TRIMESTER matches any existing value in the third column
        const existingRow = Array.from(tableBody.getElementsByTagName('tr')).find((row) => {
            const thirdColumnCell = row.querySelector('td:nth-child(3)');
            return thirdColumnCell && thirdColumnCell.textContent !== student.TRIMESTER;
        });

        if (!existingRow) {
            // Create a new row if no matching row exists
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
            document.getElementById('stname').innerHTML = student.STUDENT_NAME;
            document.getElementById('school_year').innerHTML = student.ACADEMIC_YEAR;
            tableBody.appendChild(row);

            // Update the previous student data
            prevStudent = student;
        }
    }
});
}
}
  
  window.onload = Getalldata;

function exitlogout(){
  window.open("index.html");
  window.close();
  }
    
  logout_btn.addEventListener('click',exitlogout); 
  