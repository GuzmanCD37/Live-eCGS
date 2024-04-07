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

  const tbody=document.getElementById('tbody1');
 
  function Getalldata(){
    db.collection(localStorage.getItem('student_id')).orderBy('createdAt').get().then((querySnapshot) => {
      const student = [];
      querySnapshot.forEach((studentdata) => {
        const data = studentdata.data();
        const id = studentdata.id; // Get the document ID
        student.push({ ...data, id }); // Add the ID to the data object
        /*
        for (let i = 0; i < student.length; i++) {
          const subcode = student[i].COURSE_CODE;
          if(subcode+"1st"+"1st"==id){
            
            console.log('true');
        }else{
          const tableHeaders = ['COURSE CODE', 
                                  'COURSE DESCRIPTION', 
                                  'TRIMESTER', 
                                  'Pelim grades', 
                                  'Midterm grades', 
                                  'Final grades', 
                                  'REMARKS', 
                                  'SECTION', 
                                  'Instructor',
                                  'Credit units'];
            const tableHeaderRow = document.createElement('tr');
            for (const headerText of tableHeaders) {
              const th = document.createElement('th');
              th.textContent = headerText;
              tableHeaderRow.appendChild(th);
            }
            const table = document.getElementById('table');
            table.appendChild(tableHeaderRow);
        
          }

      }
      });
      AddAllItemToTable(student);
      
      
    });
  }
  
  window.onload = Getalldata;

  //assigning value to variable
var stdno = 0;
//getting the data from tabale body

//auto create a table row depending on the data that readed
function AddItemToTable(COURSE_CODE,COURSE_DESCRIPTION,TRIMESTER,PRELIM_GRADE,MIDTERM_GRADE,
  FINAL_GRADE,REMARK,SECTION,FACULTY_NAME,CREDIT_UNITS){
  //auto-create a row and column in table
  let trow = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');
  let td7 = document.createElement('td');
  let td8 = document.createElement('td');
  let td9 = document.createElement('td');
  let td10 = document.createElement('td');

//assigning data to table that the readed after selecting file('CSV')
  
  td1.innerHTML = COURSE_CODE;
  td2.innerHTML = COURSE_DESCRIPTION;
  td3.innerHTML = TRIMESTER;
  td4.innerHTML = PRELIM_GRADE;
  td5.innerHTML = MIDTERM_GRADE;
  td6.innerHTML = FINAL_GRADE;
  td7.innerHTML = REMARK;
  td8.innerHTML = SECTION;
  td9.innerHTML = FACULTY_NAME;
  td10.innerHTML = CREDIT_UNITS;
  

//adding to row
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  trow.appendChild(td9);
  trow.appendChild(td10);
//adding to the table
  tbody.appendChild(trow);

}

function AddAllItemToTable(sample){
  stdno = 0;
  tbody.innerHTML="";
  sample.forEach(element => {
    AddItemToTable(element.COURSE_CODE,element.COURSE_DESCRIPTION,element.TRIMESTER,element.PRELIM,element.MIDTERM,
      element.FINALS,element.REMARK,element.SECTION,element.FACULTY_NAME,element.CREDIT_UNITS,element.STUDENT_NAME,element.ACADEMIC_YEAR
      );
      document.getElementById('stname').innerHTML=element.STUDENT_NAME;
      document.getElementById('school_year').innerHTML=element.ACADEMIC_YEAR;
  });
}
function exitlogout(){
  window.open("index.html");
    */
  window.close();
  }
    
  logout_btn.addEventListener('click',exitlogout); 
  
