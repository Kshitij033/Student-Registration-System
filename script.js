const stName = document.querySelector("#name");
const stId = document.querySelector("#id");
const stClass = document.querySelector("#stclass");
const stEmail = document.querySelector("#email");
const stPhone = document.querySelector("#phone");
const stSubmit = document.querySelector("#addbtn");
const stRecords = document.querySelector(".records");
let isEditing = false;

document.addEventListener("DOMContentLoaded", loadRecords);

stSubmit.addEventListener("click", function(e) {
    e.preventDefault(); 
    addRecord();
});

function addRecord() {
    const phonePattern = /^[0-9]{10}$/;
    const studentIdPattern= /^[0-9]+$/;
    const studentNamePattern = /^[a-zA-Z ]+$/;
    
    if (stName.value && stId.value && stClass.value && stEmail.value && stPhone.value) {
        if(!studentNamePattern.test(stName.value)){
            alert("Please enter a valid name!");
            return;
        }
        if(!studentIdPattern.test(stId.value)){
            alert("Please enter a valid student Id!")
            return;
        }
        if (!phonePattern.test(stPhone.value)) {
            alert("Please enter a valid phone number!");
            return;
        }
        const record = {
            name: stName.value,
            id: stId.value,
            studentClass: stClass.value,
            email: stEmail.value,
            phone: stPhone.value,
        };

        let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
        console.log(records);
        records.push(record);
        localStorage.setItem("studentRecords", JSON.stringify(records));
        isEditing = false;
        displayRecord(record);
        clearInputs();
    } else {
        alert("Please fill all the details!");
    }
}

function loadRecords() {
    const records = JSON.parse(localStorage.getItem("studentRecords")) || [];
    records.forEach(record => displayRecord(record));
}

function displayRecord(record) {
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("records-data");

    const name = document.createElement("p");
    name.classList.add("Name");
    name.innerText = record.name;

    const id = document.createElement("p");
    id.classList.add("Id");
    id.innerText = record.id;

    const studentClass = document.createElement("p");
    studentClass.classList.add("Class");
    studentClass.innerText = record.studentClass;

    const email = document.createElement("p");
    email.classList.add("Email");
    email.innerText = record.email;

    const contact = document.createElement("p");
    contact.classList.add("Contact");
    contact.innerText = record.phone;

    const edit = document.createElement("button");
    edit.classList.add("Edit");
    edit.innerHTML = `<span class="material-symbols-outlined">edit_note</span>`;
    edit.addEventListener("click", () => editRecord(record, dataDiv));

    const recordDelete = document.createElement("button");
    recordDelete.classList.add("Delete");
    recordDelete.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    recordDelete.addEventListener("click", () => deleteRecord(record, dataDiv));

    dataDiv.appendChild(name);
    dataDiv.appendChild(id);
    dataDiv.appendChild(studentClass);
    dataDiv.appendChild(email);
    dataDiv.appendChild(contact);
    dataDiv.appendChild(edit);
    dataDiv.appendChild(recordDelete);

    stRecords.appendChild(dataDiv);
}

function clearInputs() {
    stName.value = '';
    stId.value = '';
    stClass.value = '';
    stEmail.value = '';
    stPhone.value = '';
}

function deleteRecord(record, dataDiv) {
    let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
    records = records.filter(r => r.id !== record.id); 
    localStorage.setItem("studentRecords", JSON.stringify(records));
    stRecords.removeChild(dataDiv);
}

function editRecord(record, dataDiv) {
    if (isEditing) {
        alert("Finish editing the current details first!");
        return;
    }
    stName.value = record.name;
    stId.value = record.id;
    stClass.value = record.studentClass;
    stEmail.value = record.email;
    stPhone.value = record.phone;

    isEditing = true;
    deleteRecord(record, dataDiv);
    setTimeout(() => {
        alert("Selected record is ready for editing.");
    }, 10);

    stSubmit.addEventListener("click", function editSubmit(e) {
        e.preventDefault();
        addRecord();
        stSubmit.removeEventListener("click", editSubmit);
    });
}
