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
    getFirestore, doc, getDoc, setDoc, serverTimestamp
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

  const db = getFirestore();

  //send verification via email
  var Email = { send: function (a) { return new Promise(function (n, e) 
    { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, 
    function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) 
    { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
    a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) 
    { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: 
    function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

    const teacher_id = localStorage.getItem('teacher_id');
    const teacher_name = localStorage.getItem('teacher_name');
    let codecontainer = [];
    let subjectsData =[];
    let email;
    let pass;
    let allsubs = []; 
    let imageqr = document.getElementById("displayQR");
    let tname = document.getElementById("tname");
    let selectCourscode = document.getElementById("select-coursecode");
    let viewQR = document.getElementById("viewQR");

    let fileName;
    const input = document.querySelector("#input-file");
    input.onchange = (e) => {
        const [file] = e.target.files;
        fileName = file.name;
    };

const submitBtn = document.getElementById('submit-button');
    
    document.getElementById('submit-button').addEventListener('click', ()=>{

                codecontainer.push(results.data[0].COURSE_CODE);
                codecontainer = [...new Set(codecontainer)];
                       
                    var ref = doc(db, "PENDING-STUD-DATA",fileName);
                    setDoc(
                    ref, {
                        Alldata : results,
                        Teacher_Name: teacher_name,
                        Teacher_ID : teacher_id,
                        File_Name : fileName,
                        Email_Address : email,
                        Status : "PENDING",
                        createdAt : serverTimestamp()
                        })

                        const uniqueSubject = subjectsData.flat().filter((subject, index, self) => {
                            return self.indexOf(subject) === index;
                        });

                var ref = doc(db, "TEACHER_LIST", teacher_id);
                                setDoc(
                                    ref, {
                                        TeacherID : teacher_id,
                                        TeacherName : teacher_name,
                                        password : pass,
                                        Email_Address : email,
                                        subjects : uniqueSubject
                                        }
                                 )
                        document.getElementById('pop-up-top').style="display: none";
                        document.getElementById('pop-up-message').innerHTML="Data uploaded succesfully, Please be inform that the data will not be automatically distribute, it will go to in academic approval section, Thank you!";
                        document.getElementById('pop-up-message').style.textAlign = "center";
                        myPopup.classList.add("show");
                        cleanUp();
                    })


        async function transferData() {
                const ref = doc(db, "TEACHER_LIST", teacher_id);
                const docsnap = await getDoc(ref);
                if (docsnap.exists()) {
                    tname.value = docsnap.data().TeacherName;
                    email = docsnap.data().Email_Address;
                    allsubs.push(docsnap.data().subjects);
                    allsubs.forEach((subject) => {
                        subjectsData = [subject, codecontainer];
                        const uniqueArray = subjectsData.flat().filter((subject, index, self) => {
                            return self.indexOf(subject) === index;
                        });
                    });
                    
                    pass = docsnap.data().password;
                    allsubs = docsnap.data().subjects;
                    const selectElement = document.getElementById("select-coursecode");
        
                    for (let i = 0; i < allsubs.length; i++) {
                        const newOption = document.createElement("option");
                        newOption.text = allsubs[i]; 
                        newOption.value = allsubs[i]; 
                        selectElement.add(newOption); 
                    }
                    
        }
    }
    viewQR.addEventListener('click', function(){
        let generateQR = generateVerifCode() +","+ selectCourscode.value +","+generateVerifCode()+tname.value;
        imageqr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + generateQR;
    });     

window.onload = transferData;             
            

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
        function cleanUp(){
            fileInput.value = null;
            fileNameEl.textContent = '';
            clearTable();

            // Show dropzone again
            dropzone.style.display = '';

            // Hide secondary navigation bar again
            secondaryNav.style.display = '';
        }