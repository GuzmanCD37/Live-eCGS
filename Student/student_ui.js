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
  const app = initializeApp(firebaseConfig);
  const client = getFirestore();

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  let student_id,student_pass,tri;
  let subs = [];

  const storedData = localStorage.getItem('UserData');
  const logout_btn = document.getElementById('logout_btn');
  const prospectus_show = document.getElementById('prospectus_btn');
  const hide_prospectus = document.getElementById('cancel-prospectus');
  const year_level = document.getElementById('select-value');

  try {
    const studentsub =[];
    const userData = JSON.parse(storedData); 
    userData.forEach((studentdata) => {
      student_id = studentdata.student_id;
      student_pass = studentdata.student_pass;
      tri = studentdata.tri;
      studentsub.push(studentdata.subs);
      studentsub.forEach((subject) => {
        subs = [...subject];
    });
    });
  } catch (error) {
    console.error('Error accessing data:', error);
  }
  
  year_level.addEventListener("change", function(){
    Getalldata();
  })
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
        if (studentdata.TRIMESTER === "1st" && studentdata.YEAR_LEVEL === year_level.value) {
            firsttrimester.push({ ...studentdata });
            document.getElementById('table').style="display: block";
        } else if (studentdata.TRIMESTER === "2nd" && studentdata.YEAR_LEVEL === "SECOND YEAR" || studentdata.TRIMESTER === "2nd" && studentdata.YEAR_LEVEL === year_level.value) {
            
            secondtrimester.push({ ...studentdata });
            document.getElementById('table2').style="display: block";
        } else if (studentdata.TRIMESTER === "3rd" && studentdata.YEAR_LEVEL === "THIRD YEAR" || studentdata.TRIMESTER === "3rd" && studentdata.YEAR_LEVEL === year_level.value){
            thirdtrimester.push({ ...studentdata });
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

function prospectusData(){
    db.collection(student_id).orderBy('createdAt').get().then((querySnapshot) => {
        //First Year First Semester
        const FirstYearFirstSem = [];
        const FirstYearSecondSem = [];
        const FirstYearThirdSem = [];

        //First Year First Semester
        const SecondYearFirstSem = [];
        const SecondYearSecondSem = [];
        const SecondYearThirdSem = [];
        
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
        if (studentdata.TRIMESTER === "1st" && studentdata.YEAR_LEVEL === "FIRST YEAR") {
            FirstYearFirstSem.push({ ...studentdata });
        } else if (studentdata.TRIMESTER === "2nd" && studentdata.YEAR_LEVEL === "FIRST YEAR") {
            FirstYearSecondSem.push({ ...studentdata });
        } else if (studentdata.TRIMESTER === "3rd" && studentdata.YEAR_LEVEL === "FIRST YEAR"){
            FirstYearThirdSem.push({ ...studentdata });
        } else if (studentdata.TRIMESTER === "1st" && studentdata.YEAR_LEVEL === "SECOND YEAR") {
            SecondYearFirstSem.push({ ...studentdata });
        } else if (studentdata.TRIMESTER === "2nd" && studentdata.YEAR_LEVEL === "SECOND YEAR") {
            SecondYearSecondSem.push({ ...studentdata });
        } else if (studentdata.TRIMESTER === "3rd" && studentdata.YEAR_LEVEL === "SECOND YEAR"){
            SecondYearThirdSem.push({ ...studentdata });
        }
    });
    }
       
            
        });

        // Call a function to display

        //First Year
        prospectusFirstYearFirstSem(FirstYearFirstSem);
        prospectusFirstYearSecondSem(FirstYearSecondSem);
        prospectusFirstYearThirdSem(FirstYearThirdSem);
        //Second Year
        prospectusSecondYearFirstSem(SecondYearFirstSem);
        prospectusSecondYearSecondSem(SecondYearSecondSem);
        prospectusSecondYearThirdSem(SecondYearThirdSem);

        
    });
}

//First Year First Trimester
function FirsttrimesterDisplay(firsttrimester) {
const tableBody = document.getElementById('firsttrimester');
// Create a new array with unique student data
const uniqueStudentData = Array.from(new Set(firsttrimester.map(student => 
    JSON.stringify(student)))).map(student => JSON.parse(student));
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
            document.getElementById('stnum').innerHTML = student.STUDENT_NUM;
            document.getElementById('school_year').innerHTML = student.ACADEMIC_YEAR;
            document.getElementById('student_id').innerHTML = student.STUDENT_NUM;
            document.getElementById('student_name').innerHTML = student.STUDENT_NAME;
            document.getElementById('academic_year').innerHTML = student.ACADEMIC_YEAR;
            tableBody.appendChild(row);

            // Update the previous student data
            prevStudent = student;
        }
    }
});
    
}

function SecondtrimesterDisplay(secondtrimester) {
    const tableBody = document.getElementById('secondtrimester');
if (secondtrimester.length == 0) {
    document.getElementById('table2').style.display = 'none';
} else {
    // Create a new array with unique student data
const uniqueStudentData = Array.from(new Set(secondtrimester.map(student => 
    JSON.stringify(student)))).map(student => JSON.parse(student));
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
if (thirdtriData.length == 0) {
    document.getElementById('table3').style.display = 'none';
} else {
// Create a new array with unique student data
const uniqueStudentData = Array.from(new Set(thirdtriData.map(student => 
    JSON.stringify(student)))).map(student => JSON.parse(student));
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
            tableBody.appendChild(row);

            // Update the previous student data
            prevStudent = student;
        }
    }
});
}
}
 
  window.onload = function(){
    Getalldata();
    prospectusData();
  }
  

function exitlogout(){
  window.open("index.html");
  window.close();
  }

  /*PROSPECTUS*/
  function prospectusFirstYearFirstSem(firstRow) {
    const tableBody = document.getElementById('propsectus_first_tbody');
    
    // Create a new array with unique student data
    const uniqueStudentData = Array.from(new Set(firstRow.map(student => 
        JSON.stringify(student)))).map(student => JSON.parse(student));
    // Clear existing table rows (if any)
    tableBody.innerHTML = '';
    
    // Populate the table
    uniqueStudentData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.COURSE_CODE}</td>
            <td>${student.COURSE_DESCRIPTION}</td>
            <td>${student.FINALS}</td>
        `;
        tableBody.appendChild(row);
    });
}

    function prospectusFirstYearSecondSem(secondRow) {
        const tableBody = document.getElementById('propsectus_second_tbody');
        // Create a new array with unique student data
    const uniqueStudentData = Array.from(new Set(secondRow.map(student => 
        JSON.stringify(student)))).map(student => JSON.parse(student));
        // Clear existing table rows (if any)
        tableBody.innerHTML = '';
        
        // Populate the table
        uniqueStudentData.forEach((student) => {
                  // Create a new row if no matching row exists
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${student.COURSE_CODE}</td>
                      <td>${student.COURSE_DESCRIPTION}</td>
                      <td>${student.FINALS}</td>
                  `;
                  tableBody.appendChild(row);
        });
          
        }
    function prospectusFirstYearThirdSem(ThreeRow) {
    const tableBody = document.getElementById('propsectus_third_tbody');
    // Clear existing table rows (if any)
    tableBody.innerHTML = '';
    // Create a new array with unique student data
    const uniqueStudentData = Array.from(new Set(ThreeRow.map(student => 
        JSON.stringify(student)))).map(student => JSON.parse(student));
    console.log(uniqueStudentData);
    
    // Populate the table
    uniqueStudentData.forEach((student) => {
              // Create a new row if no matching row exists
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${student.COURSE_CODE}</td>
                  <td>${student.COURSE_DESCRIPTION}</td>
                  <td>${student.FINALS}</td>
              `;
              tableBody.appendChild(row);
      
    });
    }
    //Second Year
    function prospectusSecondYearFirstSem(firstRow) {
        const tableBody = document.getElementById('second_year_firstsem');
        
        // Create a new array with unique student data
        const uniqueStudentData = Array.from(new Set(firstRow.map(student => 
            JSON.stringify(student)))).map(student => JSON.parse(student));
        // Clear existing table rows (if any)
        tableBody.innerHTML = '';
        
        // Populate the table
        uniqueStudentData.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.COURSE_CODE}</td>
                <td>${student.COURSE_DESCRIPTION}</td>
                <td>${student.FINALS}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
        function prospectusSecondYearSecondSem(secondRow) {
            const tableBody = document.getElementById('second_year_secondsem');
            // Create a new array with unique student data
        const uniqueStudentData = Array.from(new Set(secondRow.map(student => 
            JSON.stringify(student)))).map(student => JSON.parse(student));
            // Clear existing table rows (if any)
            tableBody.innerHTML = '';
            
            // Populate the table
            uniqueStudentData.forEach((student) => {
                      // Create a new row if no matching row exists
                      const row = document.createElement('tr');
                      row.innerHTML = `
                          <td>${student.COURSE_CODE}</td>
                          <td>${student.COURSE_DESCRIPTION}</td>
                          <td>${student.FINALS}</td>
                      `;
                      tableBody.appendChild(row);
            });
              
            }
        function prospectusSecondYearThirdSem(ThreeRow) {
        const tableBody = document.getElementById('second_year_thirdsem');
        // Clear existing table rows (if any)
        tableBody.innerHTML = '';
        // Create a new array with unique student data
        const uniqueStudentData = Array.from(new Set(ThreeRow.map(student => 
            JSON.stringify(student)))).map(student => JSON.parse(student));
        console.log(uniqueStudentData);
        
        // Populate the table
        uniqueStudentData.forEach((student) => {
                  // Create a new row if no matching row exists
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${student.COURSE_CODE}</td>
                      <td>${student.COURSE_DESCRIPTION}</td>
                      <td>${student.FINALS}</td>
                  `;
                  tableBody.appendChild(row);
          
        });
        }
  prospectus_show.addEventListener('click', function(){
    document.getElementById('prospectus_form').style="display: block;";
  })
  hide_prospectus.addEventListener('click', function(){
    document.getElementById('prospectus_form').style="display: none;";
  })
  logout_btn.addEventListener('click',exitlogout); 
  