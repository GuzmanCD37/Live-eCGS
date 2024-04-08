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
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField, serverTimestamp
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const client = getFirestore();
  let count = 0;
  let stdnum, stdname , academic, trimester , section, day , time, cc , cd, prelim , midterm, finals
    , remark, cu,fn, en, email,ylevel ;

 
  //send verification via email
  var Email = { send: function (a) { return new Promise(function (n, e) 
    { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, 
    function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) 
    { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
    a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) 
    { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: 
    function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    let password;
    const correctPassword = 'vV37iXymZVE0HNuEGn6Y'; // Replace with your actual password

    do {
        password = prompt('Final security password:');
    } while (password !== correctPassword);

    function getData(){
    const extractData =[];
    db.collection("PENDING-STUD-DATA").orderBy('createdAt').get().then((querySnapshot) => {     
      
      querySnapshot.forEach((studentdata) => {
            const data = studentdata.data();
            extractData.push({...data});
        })
        csvData(extractData)
  })
}
function csvData(student) {
  const tableBody = document.getElementById('student-container');
  
  student.forEach((students) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${students.Teacher_ID}</td>
      <td>${students.Teacher_Name}</td>
      <td>${students.File_Name}</td>
      <td>${students.Email_Address}</td>
      <td>${students.Status}</td>
      <td>
        <button class="view-btn">Details</button>
        <button class="approve-btn">Approved</button>
        <button class="deny-btn">Reject</button>
        <button class="close-btn">Closed</button>
      </td>
    `;
    tableBody.appendChild(row);

    // Get the buttons within this row
    const viewButton = row.querySelector('.view-btn');
    const approveButton = row.querySelector('.approve-btn');
    const denyButton = row.querySelector('.deny-btn');
    const closeButton = row.querySelector('.close-btn');

     // Attach event listeners
     let detailsRow;
     viewButton.addEventListener('click', () => {
      // Handle approval logic (e.g., update status to "Approved")
      //viewData(`${students.File_Name}`,`${students.Email_Address}`,`${students.Teacher_Name}`);
      //document.getElementById("student-data").style="display: block;";
      // Create a new row for the details table
      detailsRow = document.createElement('tr');
      const detailsCell = document.createElement('td');
      detailsCell.colSpan = 20 // Adjust this value based on your table structure
      
      // Create the details table and append it to the details cell
      const detailsTable = document.createElement('table');
      detailsTable.id = 'details-table';
      detailsTable.style="width: 100%;";
      //detailsCell.style.overflowX = "auto";
      detailsCell.style.padding = "0";
      detailsTable.style.overflowX = "auto";
      detailsCell.appendChild(detailsTable);
      
      // Append the details cell (and table) to the details row, and then append the details row to the main table
      
      detailsRow.appendChild(detailsCell);
      row.parentNode.insertBefore(detailsRow, row.nextSibling);
      
      // Now you can populate the details table with data
      viewData(`${students.File_Name}`,`${students.Email_Address}`,`${students.Teacher_Name}`,detailsTable);
      viewButton.disabled=true;
    });

     approveButton.addEventListener('click', () => {
      // Handle approval logic (e.g., update status to "Approved")
      
      row.querySelector('td:nth-child(5)').textContent = "Approved";
      detailsRow.remove();
      //const pass = student.password;
      //approveAccounts(accountID,pass);
      approveAccounts(`${students.File_Name}`,`${students.Teacher_ID}`);
    });

    denyButton.addEventListener('click', () => {
      denyButton.disabled = true;
      row.querySelector('td:nth-child(5)').textContent = "Rejected";
      rejectAccount(`${students.File_Name}`,`${students.Email_Address}`,`${students.Teacher_Name}`);
    });

    closeButton.addEventListener('click', () => {
      detailsRow.remove();
      viewButton.disabled=false;

    });
  })
}




document.addEventListener('DOMContentLoaded', getData);


  function viewData(filename,email,teacher_name,table) {
    const extractData = [];
    db.collection("PENDING-STUD-DATA").doc(filename).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            const data = docSnapshot.data().Alldata.data;
            for (let i = 0; i < data.length; i++) {
                extractData.push(data[i]);
            }
            studentsData(extractData,filename,email,teacher_name,table);
        } else {
            console.log("Document does not exist.");
        }
    });
}

function studentsData(student, filename, email, teacher_name, table) {
  const tableBody = table || document.getElementById('student-container');
  
  // Clear the table body
  tableBody.innerHTML = "";

  // Create a header row
  const headerRow = document.createElement('tr');
  const headers = ['STUDENT_NUM',
                   'STUDENT_NAME',
                   'ACADEMIC_YEAR',
                   'YEAR_LEVEL',
                   'TRIMESTER',
                   'SECTION',
                   'DAY',
                   'TIME',
                   'COURSE_CODE',
                   'COURSE_DESCRIPTION',
                   'EMAIL_ADDRESS',
                   'PRELIM_GRADE',
                   'MIDTERM_GRADE',
                   'FINAL_GRADE',
                   'REMARK',
                   'CREDIT_UNITS',
                   'FACULTY_NAME',
                   'ECR_NAME',
                   'ACTION'];
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  tableBody.appendChild(headerRow);
  
  
  student.forEach((students) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${students.STUDENT_NUM}</td>
      <td>${students.STUDENT_NAME}</td>
      <td>${students.ACADEMIC_YEAR}</td>
      <td>${students.YEAR_LEVEL}</td>
      <td>${students.TRIMESTER}</td>
      <td>${students.SECTION}</td>
      <td>${students.DAY}</td>
      <td>${students.TIME}</td>
      <td>${students.COURSE_CODE}</td>
      <td>${students.COURSE_DESCRIPTION}</td>
      <td>${students.EMAIL}</td>
      <td>${students.PRELIM_GRADE}</td>
      <td>${students.MIDTERM_GRADE}</td>
      <td>${students.FINAL_GRADE}</td>
      <td>${students.REMARK}</td>
      <td>${students.CREDIT_UNITS}</td>
      <td>${students.FACULTY_NAME}</td>
      <td>${students.ECR_NAME}</td>
      <td>
        <button class="deny-btn">Reject</button>
        <button class="prev-btn">Previous</button>
        <button class="close-btn">Closed</button>
      </td>
    `;
    tableBody.appendChild(row);

    const thElements = Array.from(document.querySelectorAll('#prev-table th')).slice(0, -1);

    // Get the buttons within this row
    const denyButton = row.querySelector('.deny-btn');
    const prevButton = row.querySelector('.prev-btn');
    const closeButton = row.querySelector('.close-btn');

    denyButton.addEventListener('click', () => {
      // Handle denial logic (e.g., update status to "Denied")
      denyButton.innerHTML = "Okey!"
      denyButton.disabled = true;
      SingleAccount(students,filename,email,teacher_name);
    });
    let detailsRow;
    prevButton.addEventListener('click', () => {
      // Create a new row for the details table
      detailsRow = document.createElement('tr');
      const detailsCell = document.createElement('td');
      detailsCell.colSpan = 18; // Adjust this value based on your table structure
      
      // Create the details table and append it to the details cell
      const detailsTable = document.createElement('table');
      detailsTable.id = 'details-table';
      detailsTable.style="width: 100%;";
      detailsCell.style.padding = "0";
      detailsCell.appendChild(detailsTable);
      
      // Append the details cell (and table) to the details row, and then append the details row to the main table
      
      detailsRow.appendChild(detailsCell);
      row.parentNode.insertBefore(detailsRow, row.nextSibling);
      
      // Now you can populate the details table with data
      prevData(`${students.COURSE_CODE}`,`${students.STUDENT_NUM}`,`${students.SECTION}`,detailsTable,thElements)
      prevButton.disabled=true;
    });

    closeButton.addEventListener('click', () => {
      detailsRow.remove();
      prevButton.disabled=false;
    });
  });
}

async function approveAccounts(filename,teacher_id) {
  try 
  {
  let studentData = [];
 db.collection("PENDING-STUD-DATA").doc(filename).get().then((docSnapshot) => {
      if (docSnapshot.exists) {
          studentData = docSnapshot.data().Alldata.data;
          for (let i = 0; i < studentData.length; i++) {
            stdnum = studentData[i].STUDENT_NUM;
            stdname = studentData[i].STUDENT_NAME;
            academic = studentData[i].ACADEMIC_YEAR;
            ylevel = studentData[i].YEAR_LEVEL;
            trimester = studentData[i].TRIMESTER;
            section = studentData[i].SECTION;
            day = studentData[i].DAY;
            time = studentData[i].TIME;
            cc = studentData[i].COURSE_CODE;
            cd = studentData[i].COURSE_DESCRIPTION;
            prelim = studentData[i].PRELIM_GRADE;
            midterm = studentData[i].MIDTERM_GRADE;
            finals = studentData[i].FINAL_GRADE;
            remark = studentData[i].REMARK;
            cu = studentData[i].CREDIT_UNITS;
            fn = studentData[i].FACULTY_NAME;
            en = studentData[i].ECR_NAME;
            email=studentData[i].EMAIL; 
        

            if(midterm=="" && finals==""){
              var ref = doc(client, stdnum,cc);
              setDoc(
              ref, {
                  STUDENT_NUM : stdnum,
                  STUDENT_NAME : stdname,
                  ACADEMIC_YEAR : academic,
                  YEAR_LEVEL : ylevel,
                  EMAIL_ADDRESS : email,
                  TRIMESTER : trimester,
                  SECTION : section,
                  DAY : day,
                  TIME : time,
                  COURSE_CODE : cc,
                  COURSE_DESCRIPTION : cd,
                  PRELIM : prelim,
                  MIDTERM : midterm,
                  FINALS : finals,
                  REMARK : remark,
                  CREDIT_UNITS : cu,
                  FACULTY_NAME : fn,
                  createdAt : serverTimestamp()
                  })
                  
              generateVerifCode();
                  var verificationCode = generateVerifCode();
                  var ref = doc(client, "GENERATE_CODE", verificationCode);
                      setDoc(
                      ref, {
                          StudentID : stdnum,
                          CourseCode : cc,
                          TeacherName : fn,
                          TeacherID : teacher_id,
                          sem : trimester,
                          StudentEmail : email
                          }
                      )
                      var ref = doc(client, "PREV-DATA-DELETED",cc,stdnum,section);
                          setDoc(
                          ref, {
                              STUDENT_NUM : stdnum,
                              STUDENT_NAME : stdname,
                              ACADEMIC_YEAR : academic,
                              YEAR_LEVEL : ylevel,
                              EMAIL_ADDRESS : email,
                              TRIMESTER : trimester,
                              SECTION : section,
                              DAY : day,
                              TIME : time,
                              COURSE_CODE : cc,
                              COURSE_DESCRIPTION : cd,
                              PRELIM_GRADE : prelim,
                              MIDTERM_GRADE : midterm,
                              FINAL_GRADE : finals,
                              REMARK : remark,
                              CREDIT_UNITS : cu,
                              FACULTY_NAME : fn,
                              ECR_NAME : en,
                              createdAt : serverTimestamp()
                          })
              //send email for Prelim grade
              
              try {
                  
                  Email.send({
                      Host : "smtp.elasticemail.com",
                      Username : "guzmancarlo.123@gmail.com",
                      Password : "7B3C28305E4F62DE97199FC2B2EE724F27AC",
                      To : email,
                      From : "ecr.gradecloudsync@gmail.com",
                      Subject : "Prelims Grade in " + cc + " Now Available for Viewing" ,
                      Body : "<b><h1>Dear, " + stdname
                              + "</h1><h4> Welcome to eCR-GradeCSync (eGCS) – Your Academic Hub for streamlined grading and transparent student evaluation at ICCT COLLEGES!" 
                              + "<br> Thank you for choosing eCR-GradeCSync (eGCS) to enhance your academic experience. We are thrilled to have you on board."
                              + "</h4></b><br>"
                              + "<br> Registration Details: " 
                              + "<br>"
                              + "<br> Student ID: " + stdnum
                              + "<br> Teacher Name: " + fn
                              + "<br> Course Enrolled: " + cc
                              + "<br><h2> Verfication Code: " + verificationCode
                              + "<br><h2> Prelims Grade: " + prelim
                              + "</h2><br>"
                              + "<br> <h4><i>Just copy and paste your subject verification code<i></h4>"
                              + "<p style='text-align: center;'><i><b>Note: Make sure you have received all your Subjects' verification code for this trimester before you register</b></i></p>"
                              + "<h2><p style='text-align: center;'><a href='https://lazytech15.github.io/StudentShowMyGrades/?fbclid=IwAR1Aezel-HCXPQaVo2KJDyxNU1z_pLm7_E2FgdM6IbppadK-hi0vDYNsGb8' style='background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Click to Register Now</a></p></h2>"
                              + "<br> Your journey with eCR-GradeCSync promises seamless grading, real-time updates, and enhanced transparency in your academic assessments. With our user-friendly platform, "
                              + "<br>you'll have quick access to your grades and valuable insights into your academic progress. "
                              + "<br> Best regards,"
                              + "<br>"
                              + "<br> eCR-GradeCSync (eGCS) Team "
                        
                  })
                 
                  
                  .then(()=>{
                      if(count == i){
                        
                      const Todelete =  doc(client, "PENDING-STUD-DATA", filename);
                      deleteDoc(Todelete);
                          document.getElementById('pop-up-top').style="display: none";
                          document.getElementById('pop-up-message').innerHTML="Success! The verification codes and preliminary grades have been uploaded, and notifications have been sent to your students via email";
                          document.getElementById('pop-up-message').style.textAlign = "center";
                          myPopup.classList.add("show");
                      }
                      else{
                          count + 1;
                          
                      }
                  })
                  .catch((error)=>{
                      alert("Added failed:"+error);
                  });
              }
              catch (error) {
                  alert("Added failed:"+error);
              }

          }else if(finals==""){
              var ref = doc(client, stdnum,cc);
              setDoc(
              ref, {
                  STUDENT_NUM : stdnum,
                  STUDENT_NAME : stdname,
                  ACADEMIC_YEAR : academic,
                  YEAR_LEVEL : ylevel,
                  EMAIL_ADDRESS : email,
                  TRIMESTER : trimester,
                  SECTION : section,
                  DAY : day,
                  TIME : time,
                  COURSE_CODE : cc,
                  COURSE_DESCRIPTION : cd,
                  PRELIM : prelim,
                  MIDTERM : midterm,
                  FINALS : finals,
                  REMARK : remark,
                  CREDIT_UNITS : cu,
                  FACULTY_NAME : fn,
                  createdAt : serverTimestamp()
                  }
                  
              )
                      var ref = doc(client, "PREV-DATA-DELETED",cc,stdnum,section);
                          setDoc(
                          ref, {
                              STUDENT_NUM : stdnum,
                              STUDENT_NAME : stdname,
                              ACADEMIC_YEAR : academic,
                              YEAR_LEVEL : ylevel,
                              EMAIL_ADDRESS : email,
                              TRIMESTER : trimester,
                              SECTION : section,
                              DAY : day,
                              TIME : time,
                              COURSE_CODE : cc,
                              COURSE_DESCRIPTION : cd,
                              PRELIM_GRADE : prelim,
                              MIDTERM_GRADE : midterm,
                              FINAL_GRADE : finals,
                              REMARK : remark,
                              CREDIT_UNITS : cu,
                              FACULTY_NAME : fn,
                              ECR_NAME : en,
                              createdAt : serverTimestamp()
                          })

              //send email for Midterm grade
              Email.send({
                  Host : "smtp.elasticemail.com",
                  Username : "guzmancarlo.123@gmail.com",
                  Password : "7B3C28305E4F62DE97199FC2B2EE724F27AC",
                  To : email,
                  From : "ecr.gradecloudsync@gmail.com",
                  Subject : "Midterms Grade in " + cc + " Now Available for Viewing" ,
                  Body : "<b><h1>Dear, " + stdname
                      + "</h1><h4> Welcome to eCR-GradeCSync (eGCS) – Your Academic Hub for streamlined grading and transparent student evaluation at ICCT COLLEGES!" 
                      + "<br> Thank you for choosing eCR-GradeCSync (eGCS) to enhance your academic experience. We are thrilled to have you on board."

                      + "</h4></b><br>"
                      + "<br> Grade Details: " 
                      + "<br>"
                      + "<br> Student ID: " + stdnum
                      + "<br> Teacher Name: " + fn
                      + "<br> Course Enrolled: " + cc
                      + "<br> Prelims Grade: " + prelim 
                      + "<br><h2> Midterms Grade: " + midterm   
                      + "</h2><br>"
                      + "<p style='text-align: center;'><i><b>You can also view your grades in eGCS student page by clicking this button</b></i></p>"
                      + "<h2><p style='text-align: center;'><a href='https://lazytech15.github.io/StudentShowMyGrades/?fbclid=IwAR1Aezel-HCXPQaVo2KJDyxNU1z_pLm7_E2FgdM6IbppadK-hi0vDYNsGb8' style='background-color: #002060; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Go to Login</a></p></h2>"
                      + "<br> Your journey with eCR-GradeCSync promises seamless grading, real-time updates, and enhanced transparency in your academic assessments. With our user-friendly platform, "
                      + "<br>you'll have quick access to your grades and valuable insights into your academic progress. "
                      + "<br> Best regards,"
                      + "<br>"
                      + "<br> eCR-GradeCSync (eGCS) Team "
                     
              })
              .then(()=>{
                  if(count == i){
                    
                    const Todelete =  doc(client, "PENDING-STUD-DATA", filename);
                      deleteDoc(Todelete);
                      document.getElementById('pop-up-top').style="display: none";
                      document.getElementById('pop-up-message').innerHTML="Success! Midterm grades have been uploaded, and notifications have been sent to your students via email.";
                      document.getElementById('pop-up-message').style.textAlign = "center";
                      myPopup.classList.add("show");
                  }
                  else{
                      count + 1;
                      
                  }
              })
              .catch((error)=>{
                  alert("Added failed:"+error);
              });
          }else if(!finals==""){
              
              var ref = doc(client, stdnum,cc);
              setDoc(
              ref, {
                  STUDENT_NUM : stdnum,
                  STUDENT_NAME : stdname,
                  ACADEMIC_YEAR : academic,
                  YEAR_LEVEL : ylevel,
                  EMAIL_ADDRESS : email,
                  TRIMESTER : trimester,
                  SECTION : section,
                  DAY : day,
                  TIME : time,
                  COURSE_CODE : cc,
                  COURSE_DESCRIPTION : cd,
                  PRELIM : prelim,
                  MIDTERM : midterm,
                  FINALS : finals,
                  REMARK : remark,
                  CREDIT_UNITS : cu,
                  FACULTY_NAME : fn,
                  createdAt : serverTimestamp()
                  }
                  
              )
              var ref = doc(client, "PREV-DATA-DELETED",cc,stdnum,section);
                          setDoc(
                          ref, {
                              STUDENT_NUM : stdnum,
                              STUDENT_NAME : stdname,
                              ACADEMIC_YEAR : academic,
                              YEAR_LEVEL : ylevel,
                              EMAIL_ADDRESS : email,
                              TRIMESTER : trimester,
                              SECTION : section,
                              DAY : day,
                              TIME : time,
                              COURSE_CODE : cc,
                              COURSE_DESCRIPTION : cd,
                              PRELIM_GRADE : prelim,
                              MIDTERM_GRADE : midterm,
                              FINAL_GRADE : finals,
                              REMARK : remark,
                              CREDIT_UNITS : cu,
                              FACULTY_NAME : fn,
                              ECR_NAME : en,
                              createdAt : serverTimestamp()
                          })

              //send email for Finals grade
              Email.send({
                  Host : "smtp.elasticemail.com",
                  Username : "guzmancarlo.123@gmail.com",
                  Password : "7B3C28305E4F62DE97199FC2B2EE724F27AC",
                  To : email,
                  From : "ecr.gradecloudsync@gmail.com",
                  Subject : "Finals Grade in " + cc + " Now Available for Viewing" ,
                  Body : "<b><h1>Dear, " + stdname
                      + "</h1><h4> Welcome to eCR-GradeCSync (eGCS) – Your Academic Hub for streamlined grading and transparent student evaluation at ICCT COLLEGES!" 
                      + "<br> Thank you for choosing eCR-GradeCSync (eGCS) to enhance your academic experience. We are thrilled to have you on board."
                      + "</h4></b><br>"
                      + "<br> Grade Details: " 
                      + "<br>"
                      + "<br> Student ID: " + stdnum
                      + "<br> Teacher Name: " + fn
                      + "<br> Course Enrolled: " + cc
                      + "<br> Prelims Grade: " + prelim 
                      + "<br> Midterms Grade: " + midterm  
                      + "<br><h2> Finals Grade: " + finals   
                      + "</h2><br>"
                      + "<p style='text-align: center;'><i><b>You can also view your grades in eGCS student page by clicking this button</b></i></p>"
                      + "<h2><p style='text-align: center;'><a href='https://lazytech15.github.io/StudentShowMyGrades/?fbclid=IwAR1Aezel-HCXPQaVo2KJDyxNU1z_pLm7_E2FgdM6IbppadK-hi0vDYNsGb8' style='background-color: #002060; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;'>Go to Login</a></p></h2>"
                      + "<br> Your journey with eCR-GradeCSync promises seamless grading, real-time updates, and enhanced transparency in your academic assessments. With our user-friendly platform, "
                      + "<br>you'll have quick access to your grades and valuable insights into your academic progress. "
                      + "<br> Best regards,"
                      + "<br>"
                      + "<br> eCR-GradeCSync (eGCS) Team "
                     
              })
              .then(()=>{
                  if(count == i){
                    
                    const Todelete =  doc(client, "PENDING-STUD-DATA", filename);
                      deleteDoc(Todelete);
                      document.getElementById('pop-up-top').style="display: none";
                      document.getElementById('pop-up-message').innerHTML="Success! Final grades have been uploaded, and notifications have been sent to your students via email.";
                      document.getElementById('pop-up-message').style.textAlign = "center";
                      myPopup.classList.add("show");
                  }
                  else{
                      count + 1;
                      
                  }
              })
              .catch((error)=>{
                  alert("Added failed:"+error);
              });
          }
          }         
        }
    })
    .catch((error)=>{
      alert("Added failed:"+error);
  });
} catch (error) {
  alert("Added failed:"+error);
}
}

function generateVerifCode() {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  //const specialCharacters = '!#*_';

      //put all characters in one variable (except special character)
  const allCharacters = uppercaseLetters + numbers +lowercaseLetters;
  let randomVerifCode = '';

  // Include at least one uppercase letter, one number, and one special character
  randomVerifCode += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
  randomVerifCode += numbers[Math.floor(Math.random() * numbers.length)];
  randomVerifCode += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];

  // Complete the rest of the password with random characters
  for (let i = 1; i <= 5; i++) {
      randomVerifCode += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }
  return randomVerifCode;
  }

  closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
if (event.target == myPopup) {
    myPopup.classList.remove("show");
}
});

async function rejectAccount(filename,email,teacher_name){
  const Todelete =  doc(client, "PENDING-STUD-DATA", filename);
                      deleteDoc(Todelete);
                      Email.send({
                        Host : "smtp.elasticemail.com",
                        Username : "guzmancarlo.123@gmail.com",
                        Password : "7B3C28305E4F62DE97199FC2B2EE724F27AC",
                        To : email,
                        From : "ecr.gradecloudsync@gmail.com",
                        Subject : "Disapproval of " + filename + " Student Data" ,
                        Body : "<b><h1>Dear, " + teacher_name
                                + "</h1><h4> im happily informed you that you data "+filename+" that uploaded has been rejected, Please go see the administration to clarify the action, thank you"
                                + "</h4></b><br>"
                                + "<br> eCR-GradeCSync (eGCS) Team "
                          
                    })
                    document.addEventListener('DOMContentLoaded', getData);
                      alert("Data Rejected");

}

async function SingleAccount(account, filename,email,teacher_name) {
  try {
      const docSnapshot = await db.collection("PENDING-STUD-DATA").doc(filename).get();
      if (docSnapshot.exists) {
          const data = docSnapshot.data().Alldata.data;
          const extractData = data.map((lineofdata) => lineofdata);
          const datasample = [...extractData];

          // Find the index of the element with matching COURSE_CODE
          const indexToDelete = datasample.findIndex((item) => item.COURSE_CODE === account.COURSE_CODE);

          if (indexToDelete !== -1) {
              const elementToDelete = datasample[indexToDelete];

              // Access specific properties (e.g., STUDENT_ID and STUDENT_NAME)
              const studentId = elementToDelete.STUDENT_NUM;
              const studentName = elementToDelete.STUDENT_NAME;
              const studentCourseCode = elementToDelete.COURSE_CODE;
              const studentSection = elementToDelete.SECTION;

              // Assuming 'client' is your Firestore instance
              const docRef = db.collection("PENDING-STUD-DATA").doc(filename);

              // Remove the element from the array
              await docRef.update({
                  "Alldata.data": firebase.firestore.FieldValue.arrayRemove(elementToDelete)
              });

              Email.send({
                Host : "smtp.elasticemail.com",
                Username : "guzmancarlo.123@gmail.com",
                Password : "7B3C28305E4F62DE97199FC2B2EE724F27AC",
                To : email,
                From : "ecr.gradecloudsync@gmail.com",
                Subject : "Disapproval of the data for " + studentName ,
                Body : "<b><h1>Dear, " + teacher_name
                        + "</h1><h4> im happily informed you that the data for "+studentName+" With an ID of "+ studentId +" for the subject of " +studentCourseCode+ " and section of "+ studentSection + " that uploaded has been rejected, Please go see the administration to clarify the action, thank you"
                        + "</h4></b><br>"
                        + "<br> eCR-GradeCSync (eGCS) Team "

              })
          } else {
              console.log("Error: No matching element found.");
          }
      } else {
          console.log("Document does not exist.");
      }
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

async function prevData(course_code,student_id,section,table,thElements){
  const alldata = [];
  var ref = doc(client, "PREV-DATA-DELETED",course_code,student_id,section);
    const docsnap = await getDoc(ref);
    if(docsnap.exists()){
      alldata.push(docsnap.data());
      preDataView(alldata,table,thElements);
    }
}
function preDataView(student, table, thElements) {
  const tableBody = table || document.getElementById('student-data-list');
  tableBody.innerHTML = "";

  // Define the properties to display in the table
  const properties = ['STUDENT_NUM',
                     'STUDENT_NAME',
                     'ACADEMIC_YEAR',
                     'TRIMESTER',
                     'SECTION',
                     'DAY',
                     'TIME',
                     'COURSE_CODE',
                     'COURSE_DESCRIPTION',
                     'EMAIL_ADDRESS',
                     'PRELIM_GRADE',
                     'MIDTERM_GRADE',
                     'FINAL_GRADE',
                     'REMARK',
                     'CREDIT_UNITS',
                     'FACULTY_NAME',
                     'ECR_NAME',
                     '___________________'];

  // Create a row for the table headers
  const headerRow = document.createElement('tr');
  properties.forEach((property, index) => {
    const header = document.createElement('th');
    let width = 'auto'; // Default width
    let padding = '0'; // Default padding
    if (thElements[index]) {
      width = window.getComputedStyle(thElements[index]).width;
      padding = window.getComputedStyle(thElements[index]).padding;
    }
    header.style.width = width;
    header.style.padding = padding;
    header.textContent = property;
    headerRow.appendChild(header);
  });
  tableBody.appendChild(headerRow);

  // Create rows for the student data
  student.forEach((students) => {
    const row = document.createElement('tr');
    properties.forEach((property, index) => {
      const cell = document.createElement('td');
      let width = 'auto'; // Default width
      let padding = '0'; // Default padding
      if (thElements[index]) {
        width = window.getComputedStyle(thElements[index]).width;
        padding = window.getComputedStyle(thElements[index]).padding;
      }
      cell.style.width = width;
      cell.style.padding = padding;
      cell.style.color = 'red';
      cell.textContent = students[property];
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}













