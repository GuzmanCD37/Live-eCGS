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
  firebase.initializeApp(firebaseConfig);

  import {
    getFirestore, doc, getDoc, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  const client = firebase.firestore();
  const db = getFirestore();

  var Course_Code;
  let GenerateContainer = [];
  let codecontainer = [];
  let dataID = [];
  let newdataID = [];
  let toDelete =[];
  let IDrecieved = [];
  let checksub = 0;
  let qrResults;

    const sub1_btn = document.getElementById('verify-button');
    const nextbutton = document.getElementById('next_button');
    const backbutton = document.getElementById('back_button');
    const addsub = document.getElementById("addsub_button");

    let studID = document.getElementById('student-id');
    let fName = document.getElementById('first-name');
    let mI = document.getElementById('middle-initial');
    let lName = document.getElementById('last-name');
    let password = document.getElementById('password');

    let sub1 = document.getElementById('sub1_verification');
    let sub2 = document.getElementById('sub2_verification');
    let sub3 = document.getElementById('sub3_verification');
    let sub4 = document.getElementById('sub4_verification');
    let sub5 = document.getElementById('sub5_verification');
    let sub6 = document.getElementById('sub6_verification');
    let sub7 = document.getElementById('sub7_verification');
    let sub8 = document.getElementById('sub8_verification');
    let sub9 = document.getElementById('sub9_verification');
    let sub10 = document.getElementById('sub10_verification');
    let sub11 = document.getElementById('sub11_verification');
    let sub12 = document.getElementById('sub12_verification');

try{
function conditionStatement(){
            
            if (studID.value===""){
                document.getElementById('pop-up-message').innerHTML="Please finish fill up";
                document.getElementById('pop-up-message').style.textAlign = "center";
                myPopup.classList.add("show");
            }else{
                
                client.collection("GENERATE_CODE").get().then((querySnapshot) => {
                querySnapshot.forEach((GenerateData) => {
                const data = GenerateData.data();
                dataID = GenerateData.id;
                newdataID.push(GenerateData.id);
                const studentID = GenerateData.data().StudentID;
                Course_Code = GenerateData.data().CourseCode;
                GenerateContainer.push({ ...data, dataID});
                IDrecieved.push(dataID);
               
            })  
                code01verified();
                code02verified();
                code03verified();
                code04verified();
                code05verified();
                code06verified();
                code07verified();
                code08verified();
                code09verified();
                code010verified();
                code011verified();
                code12verified(); 
        })
    }
}
function code01verified(){
    let Gcode01 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub1.value && GenerateCode.StudentID === studID.value
    })
    if (Gcode01){
        codecontainer.push(Gcode01.CourseCode);
        toDelete.push(Gcode01.dataID);
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=1;
        document.getElementById('verified1').value = Gcode01.CourseCode + " " + Gcode01.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub2_verification").style="display: inline-flex;";
        document.getElementById("verified2").style="display:inline-flex;";
        document.getElementById("qrsub1").style="display: none;";
    }else{
        document.getElementById('verified1').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code02verified(){
    let Gcode02 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub2.value && GenerateCode.StudentID === studID.value
    })
    if (sub2.value ===""){
        //don nothing
    }else
    if(Gcode02){
        codecontainer.push(Gcode02.CourseCode);
        toDelete.push(Gcode02.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=2;
        document.getElementById('verified2').value = Gcode02.CourseCode + " " + Gcode02.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub3_verification").style="display: inline-flex;";
        document.getElementById("verified3").style="display:inline-flex;";
    }else{
        document.getElementById('verified2').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code03verified(){
    let Gcode03 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub3.value && GenerateCode.StudentID === studID.value
    })
    if (sub3.value ===""){
        //don nothing
    }else
    if(Gcode03){
        codecontainer.push(Gcode03.CourseCode);
        toDelete.push(Gcode03.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=3;
        document.getElementById('verified3').value = Gcode03.CourseCode + " " + Gcode03.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub4_verification").style="display: inline-flex;";
        document.getElementById("verified4").style="display:inline-flex;";
    }else{
        document.getElementById('verified3').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code04verified(){
    let Gcode04 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub4.value && GenerateCode.StudentID === studID.value
    })
    if (sub4.value ===""){
        //don nothing
    }else
    if (Gcode04){
        codecontainer.push(Gcode04.CourseCode);
        toDelete.push(Gcode04.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=4;
        document.getElementById('verified4').value = Gcode04.CourseCode + " " + Gcode04.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub5_verification").style="display: inline-flex;";
        document.getElementById("verified5").style="display:inline-flex;";
    }else{
        document.getElementById('verified4').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code05verified(){
    let Gcode05 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub5.value && GenerateCode.StudentID === studID.value
    })
    if (sub5.value ===""){
        //don nothing
    }else
    if(Gcode05){
        codecontainer.push(Gcode05.CourseCode);
        toDelete.push(Gcode05.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=5;
        document.getElementById('verified5').value = Gcode05.CourseCode + " " + Gcode05.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub6_verification").style="display: inline-flex;";
        document.getElementById("verified6").style="display:inline-flex;";
    }else{
        document.getElementById('verified5').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code06verified(){
    let Gcode06 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub6.value && GenerateCode.StudentID === studID.value
    })
    if (sub6.value ===""){
        //don nothing
    }else
    if(Gcode06){
        codecontainer.push(Gcode06.CourseCode);
        toDelete.push(Gcode06.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=6;
        document.getElementById('verified6').value = Gcode06.CourseCode + " " + Gcode06.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("verif-form-row2").style="display: block";
        document.getElementById("subjects-image").style="display: none";
        document.getElementById("sub7_verification").style="display: inline-flex;";
        document.getElementById("verified7").style="display:inline-flex;";
        document.getElementById("verif-form-row1").style="width: 300px;";
        
    }else{
        document.getElementById('verified6').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code07verified(){
    let Gcode07 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub7.value && GenerateCode.StudentID === studID.value
    })
    if (sub7.value ===""){
        //don nothing
    }else
    if (Gcode07){
        codecontainer.push(Gcode07.CourseCode);
        toDelete.push(Gcode07.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=7;
        document.getElementById('verified7').value = Gcode07.CourseCode + " " + Gcode07.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub8_verification").style="display: inline-flex;";
        document.getElementById("verified8").style="display:inline-flex;";
    }else{
        document.getElementById('verified7').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code08verified(){
    let Gcode08 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub8.value && GenerateCode.StudentID === studID.value
    })
    if (sub8.value ===""){
        //don nothing
    }else
    if(Gcode08){
        codecontainer.push(Gcode08.CourseCode);
        toDelete.push(Gcode08.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=8;
        document.getElementById('verified8').value = Gcode08.CourseCode + " " + Gcode08.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub9_verification").style="display: inline-flex;";
        document.getElementById("verified9").style="display:inline-flex;";
    }else{
        document.getElementById('verified8').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code09verified(){
    let Gcode09 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub9.value && GenerateCode.StudentID === studID.value
    })
    if (sub9.value ===""){
        //don nothing
    }else
    if(Gcode09){
        codecontainer.push(Gcode09.CourseCode);
        toDelete.push(Gcode09.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=9;
        document.getElementById('verified9').value = Gcode09.CourseCode + " " + Gcode09.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub10_verification").style="display: inline-flex;";
        document.getElementById("verified10").style="display:inline-flex;";
    }else{
        document.getElementById('verified9').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code010verified(){
    let Gcode10 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub10.value && GenerateCode.StudentID === studID.value
    })
    if (sub10.value ===""){
        //don nothing
    }else
    if (Gcode10){
        codecontainer.push(Gcode10.CourseCode);
        toDelete.push(Gcode10.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=10;
        document.getElementById('verified10').value = Gcode10.CourseCode + " " + Gcode10.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub11_verification").style="display: inline-flex;";
        document.getElementById("verified11").style="display:inline-flex;";
    }else{
        document.getElementById('verified10').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code011verified(){
    let Gcode11 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub11.value && GenerateCode.StudentID === studID.value
    })
    if (sub11.value ===""){
        //don nothing
    }else
    if(Gcode11){
        codecontainer.push(Gcode11.CourseCode);
        toDelete.push(Gcode11.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=11;
        document.getElementById('verified11').value = Gcode11.CourseCode + " " + Gcode11.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("sub12_verification").style="display: inline-flex;";
        document.getElementById("verified12").style="display:inline-flex;";
    }else{
        document.getElementById('verified11').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}
function code12verified(){
    let Gcode12 = GenerateContainer.find(function(GenerateCode){
        return GenerateCode.dataID === sub12.value && GenerateCode.StudentID === studID.value
    })
    if (sub12.value ===""){
        //don nothing
    }else
    if(Gcode12){
        codecontainer.push(Gcode12.CourseCode);
        toDelete.push(Gcode12.dataID);
        toDelete = [...new Set(toDelete)];
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=12;
        document.getElementById('verified12').value = Gcode12.CourseCode + " " + Gcode12.TeacherName;
        document.getElementById("next_button").style="display: block;";
    }else{
        document.getElementById('verified12').value = "Please Check your verification & ID!";
        document.getElementById("next_button").style="display: none;";
    }
}


async function SaveRegistrationFrom(){
    const currentData =[];
    let subjectsData =[];
    var ref = doc(db, "STUDENT_LIST","STUDENT_DATA", studID.value, password.value);
    const docsnap = await getDoc(ref);
    if(docsnap.exists()){
        currentData.push(docsnap.data().subjects);
        currentData.forEach((subject) => {
            subjectsData = [...subject, ...codecontainer];
        });
        
    }else{
        subjectsData = [...codecontainer];
    }
    try {
        if(studID.value =="" && fName.value =="" && lName.valuev =="" && password.value ==""){
        alert("Please Finish the fill up first");
        ShowPersonalData();
        }else{
            for (let i=0;i<checksub;i++){
                var ref = doc(db, "STUDENT_LIST","STUDENT_DATA",studID.value,password.value);
                setDoc( 
                ref, {
                    studentID : studID.value,
                    name : fName.value + " " + mI.value +" "+ lName.value,
                    password : password.value,
                    subjects : subjectsData.flat().filter((subject) => subject),
            })
            const collectionRef = client.collection("GENERATE_CODE");
            const docRef = collectionRef.doc(toDelete[i]);
            docRef.delete()
            document.getElementById('pop-up-top').style="display: none";
            document.getElementById('pop-up-message').innerHTML="Registered Successful!";
            document.getElementById('pop-up-message').style.textAlign = "center";
            myPopup.classList.add("show");
            document.getElementById("student-id").style="display: block;";
            document.getElementById("password").style="display: none;";
            document.getElementById("addsub_button").style="display: none;";
            HidePersonalData(); 
            ShowSubjects();
            cleanUp(); 
            }
        }
        
    } catch (error) {
        document.getElementById('pop-up-message').innerHTML="Please Check the data you input before proceeding";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
        document.getElementById("password").style="display: none;";
        HidePersonalData();
        ShowSubjects();
        cleanUp();
    }
    
}
async function checkingaccount(){
    if(password.value ==""){
        document.getElementById('pop-up-message').innerHTML="Please enter password first!";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
    }else if(lName.value==""){
        //do nothing
    }else{
    var ref = doc(db, "STUDENT_LIST","STUDENT_DATA", studID.value, password.value);
    const docsnap = await getDoc(ref);
    if(docsnap.exists()){
        var pass = docsnap.data().password;
        if (pass === password.value){
            document.getElementById('pop-up-message').innerHTML="It's look like you already registered, it will save to add subjects";
            document.getElementById('pop-up-message').style.textAlign = "center";
            myPopup.classList.add("show");
            document.getElementById("register_button").style="display: none;";
            document.getElementById("subjects-warning").style="display: none;";
            document.getElementById("addsubject-warning").style="display: block;";
            document.getElementById("addsub_button").style="display: block;";
            const addname  = docsnap.data().name;
            const Toseperate = addname.split(" ");
            fName.value = Toseperate[0];
            mI.value = Toseperate[1];
            lName.value = Toseperate[2];
            fName.readOnly=true;
            mI.readOnly=true;
            lName.readOnly=true;
        }
    }else{
        const collectionRef = client.collection("STUDENT_LIST");
        const docRef = collectionRef.doc("STUDENT_DATA");
        const inputSubcollectionName = studID.value;
        // Fetch the subcollection and check its size
        docRef.collection(inputSubcollectionName).get().then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                document.getElementById('pop-up-message').innerHTML="Its seems that you already have an account, please check your password";
                document.getElementById('pop-up-message').style.textAlign = "center";
                myPopup.classList.add("show");
                password.value="";
                fName.value="";
                lName.value="";
                mI.value="";
            } else {
                SaveRegistrationFrom();
            }
        });
        }
    }
}
        addsub.addEventListener('click', SaveRegistrationFrom);
        password.addEventListener('change',checkingaccount);
        sub1_btn.addEventListener('click',conditionStatement);
        nextbutton.addEventListener('click', function() {
            ShowPersonalData();
            document.getElementById("password").style="display: block;";
            document.getElementById("student-id").style="display: none;";
        });
        backbutton.addEventListener('click', function() {
            HidePersonalData();
            ShowSubjects();
            document.getElementById("next_button").style="display: block;";
            document.getElementById("password").style="display: none;";
            document.getElementById("student-id").style="display: block;";
        });
            //confirmation for register
        document.getElementById("register_button").addEventListener("click", function() {
            // Ask for confirmation
            var userConfirmation = confirm("Are you sure you want to finish registration? Take note you cannot change your password after registration");
            // Check the user's response
            if (userConfirmation) {
                checkingaccount();
                

            } else {

            }
        });
        
        }catch(Error){
        console.log(Error);
    }
    function cleanUp(){
        studID.value="";
        fName.value="";
        mI.value="";
        lName.value="";
        password.value="";
        sub1.value=""
        sub2.value=""
        sub3.value=""
        sub4.value=""
        sub5.value=""
        sub6.value=""
        document.getElementById("verified1").value="";
        document.getElementById("sub2_verification").style="display: none;";
        document.getElementById("verified2").style="display: none;";
        document.getElementById("sub3_verification").style="display: none;";
        document.getElementById("verified3").style="display: none;";
        document.getElementById("sub4_verification").style="display: none;";
        document.getElementById("verified4").style="display: none;";
        document.getElementById("sub5_verification").style="display: none;";
        document.getElementById("verified5").style="display: none;";
        document.getElementById("sub6_verification").style="display: none;";
        document.getElementById("verified6").style="display: none;";
        document.getElementById("sub7_verification").style="display: none;";
        document.getElementById("verified7").style="display: none;";
        document.getElementById("sub8_verification").style="display: none;";
        document.getElementById("verified8").style="display: none;";
        document.getElementById("verif-form-row2").style="display: none";
        document.getElementById("subjects-image").style="display: block";
    }
    closePopup.addEventListener("click", function () {
        myPopup.classList.remove("show");
      });
      window.addEventListener("click", function (event) {
      if (event.target == myPopup) {
        myPopup.classList.remove("show");
      }
      });
      
      function HidePersonalData(){
        document.getElementById("personal-data-container").style="display: none;";
        document.getElementById("register_button").style="display: none;";
        document.getElementById("personal-datawarning").style="display: none;";
        }
      function ShowPersonalData(){
        document.getElementById("subjects-container").style="display: none;";
        document.getElementById("verify-button").style="display: none;";
        document.getElementById("subjects-warning").style="display: none;";
        document.getElementById("next_button").style="display: none;";
        document.getElementById("personal-data-container").style="display: flex;";
        document.getElementById("register_button").style="display: block;";
        document.getElementById("personal-datawarning").style="display: block;";
        document.getElementById("back_button").style="display: block;";
        document.getElementById("password").style="display: block;"
        }
      function ShowSubjects(){
        document.getElementById("subjects-container").style="display: block;";
        document.getElementById("verify-button").style="display: block;";
        document.getElementById("subjects-warning").style="display: block;";
        document.getElementById("back_button").style="display: none;";
        document.getElementById("password").style="display: none;"
        }

function QrVerification(){
    let listdata = [];
    let newlistdata = [];
    let teacherName;
    client.collection("GENERATE_CODE").get().then((querySnapshot) => {
        querySnapshot.forEach((GenerateData) => {
        const data = GenerateData.data();
        const stID = GenerateData.id;
        newdataID.push(GenerateData.id);
        listdata.push({ ...data, stID});
        })
        let retrieveCode = listdata.find(function(GenerateCode){
            return GenerateCode.CourseCode === qrResults && GenerateCode.StudentID === studID.value
        })
        if (retrieveCode){
            console.log(retrieveCode);
        newlistdata.push(retrieveCode.studID);
        codecontainer.push(retrieveCode.CourseCode);
        codecontainer = [...new Set(codecontainer)];
        GenerateContainer = [...new Set(GenerateContainer)];
        checksub=1;
        toDelete.push(retrieveCode.stID);
        document.getElementById('sub1_verification').value = retrieveCode.stID
        document.getElementById('verified1').value = retrieveCode.CourseCode + " " + retrieveCode.TeacherName;
        document.getElementById("next_button").style="display: block;";
        document.getElementById("qrsub1").style="display: none;";
        document.getElementById("verify-button").style="display: none;";
        }else{
            document.getElementById('pop-up-message').innerHTML="Please check your QR CODE or Student Number";
            document.getElementById('pop-up-message').style.textAlign = "center";
            myPopup.classList.add("show");
            document.getElementById('sub1_verification').value ="";
            document.getElementById('verified1').value ="";
            document.getElementById("next_button").style="display: none;";
        }
    })
}

let qrbtn = document.getElementById('qrsub1');

qrbtn.addEventListener('click', function() {
    if (studID.value === ""){
        document.getElementById('pop-up-message').innerHTML="Please enter you student number first!";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
    }else{
    myqrcode.classList.add("show");
    function domReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    domReady(function() {
        var myqr = document.getElementById('you-qr-result');
        var lastResult, counterResults = 0;
        function onScanSuccess(decodeText, decodeResult) {
            if (decodeText !== lastResult) {
                ++counterResults;
                lastResult = decodeText;
                

                qrResults = decodeText,decodeResult;
                const Toseperate = qrResults.split(",");
                qrResults = Toseperate[1];
                
                QrVerification();
                myqrcode.classList.remove("show");
                myqr.innerHTML = `You scanned ${decodeText}`;
            }
            
        }
        var htmlscanner = new Html5QrcodeScanner("my-qr-reader", { fps: 10, qrbox: 250 });
        htmlscanner.render(onScanSuccess);
    });
    }
});


    closecamera.addEventListener("click", function () {
    myqrcode.classList.remove("show");
    
  });
  window.addEventListener("click", function (event) {
  if (event.target == myqrcode) {
    myqrcode.classList.remove("show");
  }
  });