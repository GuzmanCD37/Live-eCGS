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

  closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
    //location.reload();
  });

  displayTeachers();
 
  var tchrtable = document.getElementById('tchrAccTable');

  async function displayTeachers() {
    try {
      const tableBody = document.querySelector('#tchrAccTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows
  
      const querySnapshot = await getDocs(collection(db, 'ADMIN_LIST'));
  
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          const account = doc.data();
          if (account.accountType !== 'superadmin') { // Check if accountType is 'superadmin'
            const row = `
              <tr>
                <td>${doc.id}</td>
                <td>${account.password}</td>
                <td>${account.createdAt}</td>
                <td><input type="checkbox" data-id="${doc.id}" class="accountCheckbox"></td>
              </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', row);
          }
        });
      } else {
        alert('no document')
      }
    } catch (error) {
      alert(error);
    }
  };
  
      //code to display details of selected row//
      var tchrtable = document.getElementById('tchrAccTable');

      // Get the input fields
      var adminIdInput = document.getElementById('admin-id');
      var adminNameInput = document.getElementById('admin-name');
      var adminPasswordInput = document.getElementById('admin-password');
      
      // Add click event listener to table rows
      tchrtable.addEventListener('click', function(event) {
        // Check if the clicked element is a table cell (td)
        if (event.target.tagName.toLowerCase() === 'td') {
          // Get the row of the clicked cell
          var row = event.target.parentNode;
          
          // Get the cells of the row
          var cells = row.getElementsByTagName('td');
          
          // Update input fields with values from the row
          adminIdInput.value = cells[0].innerText;
          //adminNameInput.value = cells[1].innerText;
          adminPasswordInput.value = cells[1].innerText;
        }
      });

document.getElementById('update_button').addEventListener('click', async () => {
  try {
      if(adminIdInput.value=="" || adminPasswordInput.value==""){
        document.getElementById('pop-up-message').innerHTML = "Select an Account from the table first";
        document.getElementById('pop-up-message').style.textAlign = "center";
        myPopup.classList.add("show");
      }else{
          const ref = doc(db, "ADMIN_LIST", adminIdInput.value);
          await updateDoc(ref, {
              password : adminPasswordInput.value
          });
          document.getElementById('pop-up-message').innerHTML = adminIdInput.value + " Account Updated" ;
          document.getElementById('pop-up-message').style.textAlign = "center";
          myPopup.classList.add("show");
      }
  } catch (error) {
      alert(error)
  }
});

document.getElementById('delete_button').addEventListener('click', async () => {
  try {
        
    if(adminIdInput.value=="" || adminPasswordInput.value==""){
      document.getElementById('pop-up-message').innerHTML = "Select an Account from the table first";
      document.getElementById('pop-up-message').style.textAlign = "center";
      myPopup.classList.add("show");
    }else{
        const ref = doc(db, "ADMIN_LIST", adminIdInput.value);
        const docsnap = await getDoc(ref);
        if(docsnap.exists()){  
          await deleteDoc(ref);
          document.getElementById('pop-up-message').innerHTML = adminIdInput.value + " Account Deleted" ;
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

document.getElementById('deleteAllAdm_btn').addEventListener('click', async () => {
  try {
    const tableBody = document.querySelector('#accountsTable tbody');
    const checkboxes = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]:checked');

    checkboxes.forEach(async (checkbox) => {
        const accountId = checkbox.dataset.id;
        const sourceRef = doc(db, "ADMIN_LIST", accountId);
        await deleteDoc(sourceRef);
    });

    document.getElementById('pop-up-message').innerHTML = "Accounts Deleted";
    document.getElementById('pop-up-message').style.textAlign = "center";
    myPopup.classList.add("show");
  } catch (error) {
      alert(error);
  }
});

// Function to create admin account and add to Firestore
document.getElementById('createAdm_btn').addEventListener('click', async () => {
  // Get input values
  const adminID = document.getElementById('adminID_add').value;
  const adminPass = document.getElementById('adminPass_add').value;

  if (adminID == "" &&  adminPass == "") {
    document.getElementById('pop-up-message').innerHTML = "Complete the form first";
      document.getElementById('pop-up-message').style.textAlign = "center";
      myPopup.classList.add("show");
  } else {
      // Create a reference to the document
    const adminRef = doc(db, "ADMIN_LIST", adminID);

    // Set data for the admin document
    setDoc(adminRef, {
          adminID: adminID,
          password: adminPass,
          accountType: 'admin',
          createdAt: new Date().toLocaleString()
    })
    .then(() => {

      document.getElementById('pop-up-message').innerHTML = "Admin Account Created Successfuly";
      document.getElementById('pop-up-message').style.textAlign = "center";
      myPopup.classList.add("show");
        document.getElementById('adminID_add').value = '';
        document.getElementById('adminPass_add').value = '';
    })
    .catch((error) => {
        console.error("Error adding admin account: ", error);
    });
  }
})

document.getElementById('selectAllAdm_btn').addEventListener('click',  () => {
  var count = 0;
  const checkboxes = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
      count++;
    }
  });
  updateSelectedCount(count); // Update count after selecting all checkboxes
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
}

const checkboxes = document.querySelectorAll('#tchrAccTable tbody input[type="checkbox"]');
checkboxes.addEventListener('click', () => {
  
  checkboxes.forEach((checkbox) => {  
  
    if (checkbox.checked) {
      count++;
    } else {
      count--;
    }
    updateSelectedCount(count); // Update count whenever a checkbox is clicked
  });
});


    

    // Get the button to create admin
    const createAdminButton = document.getElementById("createAdm_btn");
    createAdminButton.addEventListener("click", createAdminAccount);





