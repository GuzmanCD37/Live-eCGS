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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  
  const db = getFirestore();

  
  //getting the value from input box and button
  const uname = document.getElementById("teacher_id");
  const upass = document.getElementById("password");
  const logbtn = document.getElementById("teacher_btn");


  //checking the the data from firestore
document.getElementById('teacher_btn').addEventListener('click', async () => {
  if(uname.value != "" && upass.value != ""){
    var tchrRef = doc(db, "TEACHER_LIST", uname.value);
    const tchrdocsnap = await getDoc(tchrRef);
    var adminRef = doc(db, "ADMIN_LIST", uname.value);
    const admindocsnap = await getDoc(adminRef);

    if(tchrdocsnap.exists()){
      var tchrpass = tchrdocsnap.data().password;
      
      //if the value from the variable pass is equal to the value of upass that the user input/    
      if(tchrpass == upass.value){
        //assigning data from firestore to variable
        var teacher_name = tchrdocsnap.data().TeacherName;
        var teacher_id = tchrdocsnap.data().TeacherID;
        var accountType = tchrdocsnap.data().accountType;
        //make it global to be able to access in different js file.
        localStorage.setItem('teacher_name', teacher_name);
        localStorage.setItem('teacher_id', teacher_id);
        localStorage.setItem('accountType', accountType);
        //opening the teacher_UI
        window.close();
        window.open("Teacher_Workplace.html");
        
      }else{
        document.getElementById('pop-up-message').innerHTML="Please check your password";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
        upass.value="";
      }
    }else if(admindocsnap.exists()){
      var adminpass = admindocsnap.data().password;
      if(adminpass == upass.value){
        //assigning data from firestore to variable
        var adminID = admindocsnap.data().adminID;
        var teacher_name = admindocsnap.data().TeacherName;
        var accountType = admindocsnap.data().accountType;
        //make it global to be able to access in different js file.
        localStorage.setItem('adminID', adminID);
        localStorage.setItem('teacher_name', teacher_name);
        localStorage.setItem('accountType', accountType);
        //opening the admin_UI
        window.open("Admin/index.html");
        window.close();
      }else{
        document.getElementById('pop-up-message').innerHTML="Please check your password";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
        upass.value="";
      }
    }else{
      document.getElementById('pop-up-message').innerHTML="Account doesn't exist!";
      document.getElementById('pop-up-message').style.textAlign = "center";
      myPopup.classList.add("show");
      uname.value="";
      upass.value="";
    }
 
  }else{
    document.getElementById('pop-up-message').innerHTML="Please fill up first!";
    document.getElementById('pop-up-message').style.textAlign = "center";
    myPopup.classList.add("show");
  }            
}); //login


closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});
window.addEventListener("click", function (event) {
  if (event.target == myPopup) {
      myPopup.classList.remove("show");
  }
});