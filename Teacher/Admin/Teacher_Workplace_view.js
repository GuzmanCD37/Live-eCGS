const submitBtn = document.getElementById('submit-button');
const clearBtn = document.getElementById('clear-button');
const fileNameEl = document.getElementById('file-name');
const secondaryNav = document.querySelector('.secondary-nav');
const dropzone = document.querySelector('.input-file-container');
const logoutBtn = document.getElementById('btn-logout');
const teacher_name = localStorage.getItem('teacher_name');

var results;



function dropHandler(event) {
    
    const selectedFile = event.dataTransfer.files[0];
    Papa.parse(selectedFile, {
        skipEmptyLines: true,
        complete: function(result){
            displayTable(result.data);
            var csv = Papa.unparse(result.data);
            
    Papa.parse(csv,{
        header: true,
        skipEmptyLines: true,
        complete: function(result){
            // Filter out rows that contain only whitespace
            result.data = result.data.filter(row => {
                return Object.values(row).some(field => field.trim() !== '');
            });
            results = result;
        }
    })
              
        }

    });

   // Truncate file name
   let fileName = selectedFile.name;
   const maxCharacter = 16;
   fileNameEl.textContent = fileName.length >= maxCharacter ? fileName.substring(0, maxCharacter) + "..." : fileName;

   // Remove dropzone
   dropzone.style.display = 'none';

   // Show secondary navigation
   secondaryNav.style.display = 'flex';
   adjustPaddingTop();
   // prevent the default behavior of opening the file as a link
   event.preventDefault(); 
}

function dragOverHandler(event) {
    // prevent the default behavior of opening the file as a link
    event.preventDefault();
}

// Handle file submission
const fileInput = document.getElementById('input-file');
fileInput.addEventListener('change', (event) => {
    // Parse CSV
    const selectedFile = event.target.files[0];
    Papa.parse(selectedFile, {
        skipEmptyLines: true,
        complete: function(result){
            //read every file then insert it to a array
            
            displayTable(result.data);
            savedata();  
        }
    });

    // Truncate file name
    let fileName = selectedFile.name;
    let maxCharacter = 16;
    fileNameEl.textContent = fileName.length >= maxCharacter ? fileName.substring(0, maxCharacter) + "..." : fileName;

    // Remove dropzone
    dropzone.style.display = 'none';

    // Show secondary navigation
    secondaryNav.style.display = 'flex';

    adjustPaddingTop();
});

function savedata(){
    Papa.parse(document.getElementById('input-file').files[0],
        {
            //ignore header
            header: true,
            //skip empty row
            skipEmptyLines: true,
            complete: function(result){
                // Filter out rows that contain only whitespace
                result.data = result.data.filter(row => {
                    return Object.values(row).some(field => field.trim() !== '');
                });
                results = result;
            }
        }); 
}

        function dropdata(data){
            Papa.parse(document.getElementById('input-file').files[0],
            {
                //ignore header
                header: true,
                //skip empty row
                skipEmptyLines: true,
                complete: function(result){
                    // Filter out rows that contain only whitespace
                    result.data = result.data.filter(row => {
                        return Object.values(row).some(field => field.trim() !== '');
                    });
                    results = result;
                }
            }); 
                }

// Handle rendering table
const tableContainer = document.querySelector('.table-sub-container');

function displayTable(data) {
    // Create table
    const table = document.createElement('table');

    // Create thead element
    const thead = document.createElement('thead');

    // Create header row
    const headerRow = document.createElement('tr');
    for (const header of data[0]) {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }

    // Append headerRow to thead
    thead.appendChild(headerRow);

    // Append thead to table
    table.appendChild(thead);

    // Create tbody element
    const tbody = document.createElement('tbody');

    // Create data rows
    for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        
        // Skip if row data is empty
        if (rowData.join('').trim() === '') continue;

        const row = tbody.insertRow();

        for (const value of rowData) {
            const cell = row.insertCell();
            cell.textContent = value;
        }
    }

    // Append tbody to table
    table.appendChild(tbody);

    // Clear existing table content
    clearTable();

    // Append table to container
    tableContainer.appendChild(table);
}


// Handle Clear
clearBtn.addEventListener('click', () => {
    fileInput.value = null;
    fileNameEl.textContent = '';
    clearTable();

    // Show dropzone again
    dropzone.style.display = '';

    // Hide secondary navigation bar again
    secondaryNav.style.display = '';
})

// Handle clear table
function clearTable() {
    const tableContainer = document.querySelector('.table-sub-container');
    while (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
}


// Adjust 'main' padding dynamically
function adjustPaddingTop() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('main').style.paddingTop = `${headerHeight}px`;
}
adjustPaddingTop();
window.addEventListener('resize', adjustPaddingTop);

// Handle highlight selected table rows 
let selectedRow = null;
document.querySelector('.table-sub-container').addEventListener('click', event => {
    if (event.target.tagName === 'TD') {
        const clickedRow = event.target.parentNode;
        if (clickedRow !== selectedRow) {
            if (selectedRow) {
                selectedRow.classList.remove('selected-row');
            }
            clickedRow.classList.add('selected-row');
            selectedRow = clickedRow;
        }
    }
});

let closeqr = document.getElementById("closeqr");
let qrcode = document.getElementById("qrcode");


qrcode.addEventListener('click', function(){
    document.getElementById("qrcon").style="display:block";
    tname.value = teacher_name;
    tname.readOnly=true;
});
closeqr.addEventListener('click',function(){
    document.getElementById("qrcon").style="display:none";
})

