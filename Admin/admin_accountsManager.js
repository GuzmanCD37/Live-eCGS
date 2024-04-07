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
    getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  
  const db = getFirestore();

  displayStudents();
  displayTeachers();
 
  closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
  });
  
    //code to display details of selected row//
      var tchrtable = document.getElementById('tchrAccTable');

      // Get the input fields
      var teacherIdInput = document.getElementById('teacher-id');
      var teacherNameInput = document.getElementById('teacher-name');
      var teacherPasswordInput = document.getElementById('teacher-password');
      
      // Add click event listener to table rows
      tchrtable.addEventListener('click', function(event) {
        // Check if the clicked element is a table cell (td)
        if (event.target.tagName.toLowerCase() === 'td') {
          // Get the row of the clicked cell
          var row = event.target.parentNode;
          
          // Get the cells of the row
          var cells = row.getElementsByTagName('td');
          
          // Update input fields with values from the row
          teacherIdInput.value = cells[0].innerText;
          teacherNameInput.value = cells[1].innerText;
          teacherPasswordInput.value = cells[2].innerText;
        }
      });


    //Load Data in tables
async function displayStudents() {
  try {
    const tableBody = document.querySelector('#studAccTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    const querySnapshot = await getDocs(collection(db, 'TEACHER_LIST'));
  
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        const account = doc.data();
        const row = `
            <tr>
                <td>${doc.id}</td>
                <td>${account.TeacherName}</td>
                <td>${account.password}</td>
                <td>${account.createdAt}</td>
                <td><input type="checkbox" data-id="${doc.id}" class="accountCheckbox"></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
      });
    } else {
      alert('no document')
    }
  
  } catch (error) {
    alert(error);
}
};


async function displayTeachers() {
  try {
      const tableBody = document.querySelector('#tchrAccTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows

      const querySnapshot = await getDocs(collection(db, 'TEACHER_LIST'));
    
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const account = doc.data();
          const row = `
              <tr>
                  <td>${doc.id}</td>
                  <td>${account.TeacherName}</td>
                  <td>${account.password}</td>
                  <td>${account.createdAt}</td>
                  <td><input type="checkbox" data-id="${doc.id}" class="accountCheckbox"></td>
              </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', row);
        });
      } else {
        alert('no document')
      }
  } catch (error) {
      alert(error);
  }
};
    
document.getElementById('deleteAllTchr_btn').addEventListener('click', async () => {
  try {
    const tableBody = document.querySelector('#accountsTable tbody');
    const checkboxes = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]:checked');

    checkboxes.forEach(async (checkbox) => {
        const accountId = checkbox.dataset.id;
        const sourceRef = doc(db, "TEACHER_LIST", accountId);
        await deleteDoc(sourceRef);
    });

    document.getElementById('pop-up-message').innerHTML = "Accounts Deleted";
    document.getElementById('pop-up-message').style.textAlign = "center";
    myPopup.classList.add("show");
  } catch (error) {
      alert(error);
  }
});

var count = 0;

document.getElementById('selectAllTchr_btn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
      count++;
    }
  });
  updateSelectedCount(count); // Update count after selecting all checkboxes
});

document.getElementById('updateTchr_button').addEventListener('click', async () => {
  try {
      if(teacherIdInput.value=="" || teacherPasswordInput.value=="" || teacherNameInput.value==""){
        document.getElementById('pop-up-message').innerHTML = "Select an Account from the table first";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
      }else{
          const ref = doc(db, "TEACHER_LIST", teacherIdInput.value);
          await updateDoc(ref, {
              TeacherName : teacherNameInput.value,
              password : teacherPasswordInput.value
          });
          document.getElementById('pop-up-message').innerHTML = teacherIdInput.value + " Account Updated" ;
          document.getElementById('pop-up-message').style.textAlign = "center";
          myPopup.classList.add("show");
      }
  } catch (error) {
      alert(error)
  }
});

document.getElementById('deleteTchr_button').addEventListener('click', async () => {
  try {
        
    if(teacherIdInput.value=="" || teacherPasswordInput.value=="" || teacherNameInput.value==""){
      document.getElementById('pop-up-message').innerHTML = "Select an Account from the table first";
      document.getElementById('pop-up-message').style.textAlign = "center";
      myPopup.classList.add("show");
    }else{
        const ref = doc(db, "TEACHER_LIST", teacherIdInput.value);
        const docsnap = await getDoc(ref);
        if(docsnap.exists()){  
          await deleteDoc(ref);
          document.getElementById('pop-up-message').innerHTML = teacherIdInput.value + " Account Deleted" ;
          document.getElementById('pop-up-message').style.textAlign = "center";
          myPopup.classList.add("show");
        } else {
            alert('Cannot delete, User not found')
        }  
    }
  } catch (error) {
      alert(error)   
  }
});
// Function to update selected count
function updateSelectedCount() {
  const checkboxes = document.querySelectorAll('.accountCheckbox');
  let selectedCount = 0;
  checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
          selectedCount++;
      }
  });
  const selectCount = document.querySelector('#selectCount');
  selectCount.textContent = `${selectedCount} selected`;
  const checkboxes2 = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]');
checkboxes2.addEventListener('click', () => {
  checkboxes2.forEach((checkbox) => {  
  
    if (checkbox.checked) {
      count++;
    } else {
      count--;
    }
    updateSelectedCount(count); // Update count whenever a checkbox is clicked
  });
});

}


