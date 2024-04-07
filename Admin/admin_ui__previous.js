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
  var stdnum, stdname , academic, trimester , section, day , time, cc , cd, prelim , midterm, finals
    , remark, cu,fn, en, email,createAt ;

 
  //send verification via email
  var Email = { send: function (a) { return new Promise(function (n, e) 
    { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, 
    function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) 
    { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
    a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) 
    { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: 
    function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    
    let password;
    const correctPassword = 'hackaton2023'; // Replace with your actual password
    do {
        password = prompt('Final security password:');
    } while (password !== correctPassword);
    

// Get all rows of the table
const rows = document.querySelectorAll('#table tbody tr');

// Add click event listener to each row
rows.forEach((row) => {
  row.addEventListener('click', () => {
    alert('sds')
    // Find the checkbox within the clicked row
    const checkbox = row.querySelector('input[type="checkbox"]');
    
    // Toggle the checked state of the checkbox
    checkbox.checked = !checkbox.checked;
  });
});

    function getData(){
    const extractData =[];
    db.collection("PENDING-STUD-DATA").orderBy('createdAt').get().then((querySnapshot) => {     
      
      querySnapshot.forEach((studentdata) => {
            const data = studentdata.data();
            extractData.push({...data});
            console.log(extractData);
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
      <td style="display: flex; height: 50px">
        <button class="btn-ghost view-btn">Details</button>
        <button class="btn-ghost green approve-btn">Approve</button>
        <button class="btn-ghost red deny-btn">Reject</button>
        
      </td>
      <td>
        <input type="checkbox" 
        data-id="${students.Teacher_ID},${students.Teacher_Name},${students.File_Name},${students.Email_Address}" 
        class="accountCheckbox">
      </td>
    `;
    tableBody.appendChild(row);

    // Get the buttons within this row
    const viewButton = row.querySelector('.view-btn');
    const approveButton = row.querySelector('.approve-btn');
    const denyButton = row.querySelector('.deny-btn');

    viewButton.addEventListener('click', () => {
      // Select the modal and modal content elements
      const modal = document.getElementById('myModal');
      const modalTable = modal.querySelector('.modal-table');
  
      // Clear the previous content of the modal
      modalTable.innerHTML = '';
  
      // Create the details table and append it to the modal content
      const detailsTable = document.createElement('table');
      detailsTable.id = 'details-table';
      detailsTable.style = "width: 90%;";
      
      // Now you can populate the details table with data
      viewData(`${students.File_Name}`, `${students.Email_Address}`, `${students.Teacher_Name}`, detailsTable);
  
      // Append the details table to the modal content
      modalTable.appendChild(detailsTable);
  
      // Show the modal
      modal.style.display = "flex";
  
      // Disable the view button to prevent multiple clicks
      viewButton.disabled = true;
  });
  
  // Event listener for close button within the modal
  const closeButtonModal = document.querySelector('#myModal .close-modal');
  closeButtonModal.addEventListener('click', () => {
      // Hide the modal
      modal.style.display = "none";
  
      // Enable the view button again
      viewButton.disabled = false;
  });

            //Modal exit when clicked outside..
          var modal = document.getElementById("myModal");
          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
              viewButton.disabled = false;
            }
          };
            
  

     approveButton.addEventListener('click', () => {
      // Handle approval logic (e.g., update status to "Approved")
      
      row.querySelector('td:nth-child(5)').textContent = "Approved";
      //detailsRow.remove();
      //const pass = student.password;
      //approveAccounts(accountID,pass);
      approveAccounts(`${students.File_Name}`,`${student.Teacher_ID}`);
    });

    denyButton.addEventListener('click', () => {
      denyButton.disabled = true;
      row.querySelector('td:nth-child(5)').textContent = "Rejected";
      rejectAccount(`${students.File_Name}`,`${students.Email_Address}`,`${students.Teacher_Name}`);
    });

    
  })
}

document.getElementById('selectAllFiles_btn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#table tbody input[type="checkbox"]');
  let allChecked = true;
  
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      allChecked = false;
      return;
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.checked = !allChecked;
  });
});

document.getElementById('approveAll_btn').addEventListener('click', async () => {
  try {
    const checkboxes = document.querySelectorAll('#table tbody input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
          // Retrieve the data-id attribute value
          const dataId = checkbox.dataset.id;
          // Split the data-id value to get Teacher_ID and File_Name separately
          const [teacherId, teacherName, fileName, email] = dataId.split(',');
          // Call your function with the retrieved values
          approveAccounts(fileName, teacherId);
    });
 
    
  } catch (error) {
      console(error);
  }
});
document.getElementById('rejectAll_btn').addEventListener('click', async () => {
  try {
    const checkboxes = document.querySelectorAll('#table tbody input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
          // Retrieve the data-id attribute value
          const dataId = checkbox.dataset.id;
          // Split the data-id value to get Teacher_ID and File_Name separately
          const [teacherId, teacherName, fileName, email] = dataId.split(',');
          // Call your function with the retrieved values
          rejectAccount(fileName, email, teacherName);
  });

    
  } catch (error) {
      alert(error);
  }
});



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

// Define a global variable to hold the student data array
let studentsDataArray = [];

function studentsData(student, filename, email, teacher_name, table) {
  const tableBody = table || document.getElementById('student-container');
  
  // Clear the table body
  tableBody.innerHTML = "";

  // Create a header row
  const headerRow = document.createElement('tr');
  const headers = ['STUDENT_NUM',
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
                   'ACTION',
                  ];
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  // Add checkbox for "Select All"
  const selectAllCheckboxHeader = document.createElement('th');
  const selectAllCheckbox = document.createElement('input');
  selectAllCheckbox.type = 'checkbox';
  selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = document.querySelectorAll('#details-table input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });
  selectAllCheckboxHeader.appendChild(selectAllCheckbox);
  headerRow.appendChild(selectAllCheckboxHeader);

  tableBody.appendChild(headerRow);
  
  // Store the student data in the global array
  studentsDataArray = student;

  student.forEach((students) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${students.STUDENT_NUM}</td>
      <td>${students.STUDENT_NAME}</td>
      <td>${students.ACADEMIC_YEAR}</td>
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
        <button class="btn-ghost red deny-btn">Reject</button>
        <button class="btn-solid prev-btn">Previous</button>
        <button class="btn-ghost close-btn">Close</button>
      </td>
      <td>
        <input type="checkbox" 
        data-id="${filename},${email},${teacher_name},${students.STUDENT_NUM}" 
        class="accountCheckbox">
      </td>
      `; 
    tableBody.appendChild(row);

    var thElements = Array.from(document.querySelectorAll('#prev-table th')).slice(0, -1);

    // Get the buttons within this row
    var denyButton = row.querySelector('.deny-btn');
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

document.getElementById('rejectAllStudData_btn').addEventListener('click', async () => {
  try {
    const checkboxes = document.querySelectorAll('#details-table input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
          // Retrieve the data-id attribute value
          const studentdataId = checkbox.dataset.id;
          // Split the data-id value to get Teacher_ID, File_Name, and Student_Num separately
          const [filename, email, teacher_name, studentNum] = studentdataId.split(',');
          // Find the student object from the stored array based on student number
          const student = studentsDataArray.find(student => student.STUDENT_NUM === studentNum);
          if (student) {
            console.log('student is: ' + student)
            // Call your function with the retrieved values
            SingleAccount(student, filename, email, teacher_name);
          }
    });
    
  } catch (error) {
      alert(error);
  }
});




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
              //send email for Prelim grade and
              
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
      console.log(account)
      console.log(filename)
      console.log(email)
      console.log(teacher_name)
      const docSnapshot = await db.collection("PENDING-STUD-DATA").doc(filename).get();
      if (docSnapshot.exists) {
          const data = docSnapshot.data().Alldata.data;
          const extractData = data.map((lineofdata) => lineofdata);
          const datasample = [...extractData];

          // Find the index of the element with matching COURSE_CODE
          const indexToDelete = datasample.findIndex((item) => item.STUDENT_NUM === account.STUDENT_NUM);
          
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
  console.log(course_code,student_id,section);
  const alldata = [];
  var ref = doc(client, "PREV-DATA-DELETED",course_code,student_id,section);
    const docsnap = await getDoc(ref);
    if(docsnap.exists()){
      alldata.push(docsnap.data());
      preDataView(alldata,table,thElements);
      console.log(alldata);
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
                     '',
                     '',
                     ''];

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













