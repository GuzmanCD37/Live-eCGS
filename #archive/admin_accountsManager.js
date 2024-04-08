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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {
    getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc, updateDoc, deleteDoc, deleteField
  }
  from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
  
  const db = getFirestore();

var approveBtn = document.getElementById('approve_button')
var rejectBtn = document.getElementById('reject_button')
var deleteBtn = document.getElementById('delete_button')
var selectAllPendBtn = document.getElementById('selectAllpend_button')
var selectAllAccBtn = document.getElementById('selectAllAcc_button')

approveBtn.addEventListener('click', approveAccounts);
rejectBtn.addEventListener('click', rejectAccounts);
deleteBtn.addEventListener('click', deleteAccounts);
selectAllPendBtn.addEventListener('click', selectAllPending);
selectAllAccBtn.addEventListener('click', selectAllAccounts);

async function displayPendingAccounts() {
  try {
      const tableBody = document.querySelector('#pendingAccTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows

      const querySnapshot = await getDocs(collection(db, 'PENDING_ACCOUNTS'));

      querySnapshot.forEach((doc) => {
          const account = doc.data();
          const row = `
              <tr>
                  <td>${doc.id}</td>
                  <td>${account.TeacherName}</td>
                  <td>${account.password}</td>
                  <td><input type="checkbox" data-id="${doc.id}" class="accountCheckbox"></td>
              </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', row);
      });
  } catch (error) {
      alert(error);
  }
}

async function displayAccounts() {
  try {
      const tableBody = document.querySelector('#accountsTable tbody');
      tableBody.innerHTML = ''; // Clear existing rows

      const querySnapshot = await getDocs(collection(db, 'TEACHER_LIST'));

      querySnapshot.forEach((doc) => {
          const account = doc.data();
          const row = `
              <tr>
                  <td>${doc.id}</td>
                  <td>${account.TeacherName}</td>
                  <td>${account.password}</td>
                  <td><input type="checkbox" data-id="${doc.id}" class="accountCheckbox"></td>
              </tr>
          `;
          tableBody.insertAdjacentHTML('beforeend', row);
      });
  } catch (error) {
      alert(error);
  }
}
document.getElementById('approve_button').addEventListener('click', async () => {
  try {
    const tableBody = document.querySelector('#pendingAccTable tbody');
    const checkboxes = document.querySelectorAll('#pendingAccTable tbody input[type="checkbox"]:checked');

    checkboxes.forEach(async (checkbox) => {
        const accountId = checkbox.dataset.id;
        const sourceRef = doc(db, "PENDING_ACCOUNTS", accountId);
        const docsnap = await getDoc(sourceRef);

        if (docsnap.exists()) {
            const data = docsnap.data();
            const destinationRef = collection(db, 'TEACHER_LIST');

            // Move the document to the destination collection
            await setDoc(doc(destinationRef, accountId), data);

            // Delete the document from the source collection
            await deleteDoc(sourceRef);
        }
    });


    document.getElementById('pop-up-message').innerHTML = "Accounts Approved";
    document.getElementById('pop-up-message').style.textAlign = "center";
    myPopup.classList.add("show");
  } catch (error) {
      alert(error);
  }
});

document.getElementById('reject_button').addEventListener('click', async () => {
  try {
    const tableBody = document.querySelector('#pendingAccTable tbody');
    const checkboxes = document.querySelectorAll('#pendingAccTable tbody input[type="checkbox"]:checked');

    checkboxes.forEach(async (checkbox) => {
        const accountId = checkbox.dataset.id;
        const sourceRef = doc(db, "PENDING_ACCOUNTS", accountId);
        await deleteDoc(sourceRef);
    });

    document.getElementById('pop-up-message').innerHTML = "Accounts Deleted";
    document.getElementById('pop-up-message').style.textAlign = "center";
    myPopup.classList.add("show");
  } catch (error) {
      alert(error);
  }
});

async function deleteAccounts() {
  try {
    const tableBody = document.querySelector('#accountsTable tbody');
    const checkboxes = document.querySelectorAll('#accountsTable tbody input[type="checkbox"]:checked');

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
}

function selectAllPending() {
  const checkboxes = document.querySelectorAll('#pendingAccTable tbody input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
  });
}

function selectAllAccounts() {
  const checkboxes = document.querySelectorAll('#accountsTable tbody input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    checkbox.checked = !checkbox.checked;
  });
}

  // Call displayAccounts() when the page loads
document.addEventListener('DOMContentLoaded', displayPendingAccounts);
document.addEventListener('DOMContentLoaded', displayAccounts);
closePopup.addEventListener("click", function () {
  myPopup.classList.remove("show");
  //location.reload();
});

