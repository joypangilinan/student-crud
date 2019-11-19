let students = [
    { id: "000", first_name: "Joy to the World", last_name: "Pang", age: "60", gender: "female", status: "regular", level: "Junior" },
    { id: "001", first_name: "Alen", last_name: "Turing", age: "20", gender: "male", status: "regular", level: "Junior" },
    { id: "002", first_name: "LA", last_name: "Lakers", age: "12", gender: "male", status: "regular", level: "Junior" },
    { id: "003", first_name: "Odet", last_name: "Klodet", age: "18", gender: "female", status: "regular", level: "Middle" },
    { id: "004", first_name: "Teri", last_name: "Boy", age: "30", gender: "male", status: "regular", level: "Senior" },
]
let studentsTbl = document.getElementById("studentsTbl");
students.forEach((student) => {
    let newRow = studentsTbl.insertRow()
    let newName = newRow.insertCell(0)
    let controls = newRow.insertCell(1)
    newName.innerHTML = student.first_name + " " + student.last_name
    controls.innerHTML = "<button value=\"" + student.id + "\" onclick=\"view(event)\">View</button>" +
        " <button value=\"" + student.id + "\" onclick=\"edit(event)\">Edit</button>" +
        " <button value=\"" + student.id + "\" onclick=\"delete1(event)\">Delete</button>"
})

function view(event) {
    console.log("ADD: " + event.target.value)
}
function edit(event) {
    console.log("EDIT: " + event.target.value)
}
function delete1(event) {
    console.log("DELETE: " + event.target.value)
}