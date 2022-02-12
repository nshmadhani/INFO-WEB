class Student {
  constructor(index, name, advisor, status, sem, type, budget, percentage) {
    this.index = index;
    this.name = name;
    this.advisor = advisor;
    this.status = status;
    this.sem = sem;
    this.type = type;
    this.budget = budget;
    this.percentage = percentage;
    this.toDelete = false;
    this.dropDown = false;
    this.tuition = Math.random() * 1000
  }

  static getNewStudent(index) {
    return new Student(
      index,
      `Student ${index}`,
      `Teacher ${index}`,
      index % 2 === 0 ? "Approve" : "Denied",
      index % 2 === 0 ? "FALL" : "Spring",
      index % 2 === 0 ? "TA" : "RA",
      Math.round(Math.random() * 10000),
      `${Math.round(Math.random() * 100)}%`
    );
  }


  deleBtn() {
    return this.toDelete ? `<td><button onclick="deleteRow(${this.index})">Delete</button></td>` : "";
  }

  editBtn() {
    return this.toDelete ? `<td><button onclick="editRow(${this.index})">Edit</button></td>` : "";
  }

  dropDownRow() {
    if(!this.dropDown) {
      return "";
    }
    return `<tr class="dropDownTextArea"><td colspan="8">
    Advisor: ${this.advisor}<br /><br />
    Award Details<br />
    ${this.sem} 2021(${this.type})<br />
    Budget Number: ${this.budget}<br />
    Tuition Number: ${this.tuition}<br />
    Comments:<br /><br /><br />
    Award Status: ${this.status}<br /><br /><br />`;

  }
  row() {
    return `<tr class="${this.toDelete ? "delete": ""}">
    <td><input type="checkbox" class="checkbox" onclick="handleDeleteCheck(${this.index})" ${this.toDelete ? "checked" : ""}/><br /><br />
    <img src="down.png" width="25px" onclick="handleDropDown(${this.index})" /></td>
    <td>${this.name}</td>
    <td>${this.advisor}</td>
    <td>${this.status}</td>
    <td>${this.sem}</td>
    <td>${this.type}</td>
    <td>${this.budget}</td>
    <td>${this.percentage}</td>
    ${this.deleBtn()}
    ${this.editBtn()}
    </tr>`;
  }
}

const table = document.getElementById("myTable");
const addButton = document.getElementById("add");
let studentList = {};
let studentKey = 0;

let studentSelected = 0;

function reload() {
  table.innerHTML = "";
  let rowHeader = `<tr>
  <th></th>
  <th>STUDENT</th>
  <th>ADVISOR</th>
  <th>AWARD<br/>STATUS</th>
  <th>SEMESTER</th>
  <th>TYPE</th>
  <th>BUDGET<br />#</th>
  <th>PERCENTAGE</th>
  <th>DELETE</th>
  <th>Edit</th> 
</tr>`;
  let rows = "";
  Object.keys(studentList).forEach((key) => {
    let student = studentList[key];
    rows += student.row();  
    rows += student.dropDownRow();
  });
  table.innerHTML = rowHeader + rows;

  if(studentSelected !== 0) { 
    console.log("Not Disabled")
    submitBtn.disabled = false;
  } else submitBtn.disabled = true;

}

const submitBtn  = document.getElementById("submit");

const handleDeleteCheck = (e) => {
  studentList[e].toDelete = !studentList[e].toDelete;
  if(studentList[e].toDelete) {
    studentSelected ++;
  } else studentSelected--;

  reload();
}

const handleDropDown = (e) => {
  studentList[e].dropDown = !studentList[e].dropDown;
  reload();
}


const deleteRow = (index) => {
  delete studentList[index]
  reload();
}

const editRow = (index) => {
    alert("Edit details");
}

addButton.onclick = (e) => {

  studentList[studentKey] = Student.getNewStudent(studentKey);
  studentKey++;
  console.log(studentList)
  reload();
  alert("Add Sucessful")
}



reload()

