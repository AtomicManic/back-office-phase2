let editUserForm = document.getElementById("editUserForm");
let tbody=document.getElementById("tbody");

// If not went through the first page that gives the user his id relocate to the first page
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const queryIdValue = params.id; // "some_value"
if(!params.id)
    window.location.replace('../firstPage/firstPage.html');

// Date.prototype.toDateInputValue = (function() {
//     let local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0,10);
// });
//
// document.getElementById('vacationRequestFrom').value = new Date().toDateInputValue();
// document.getElementById('vacationRequestTo').value = new Date().toDateInputValue();
//
//fetch user function
const display = async() => {
    try
    {
        console.log(queryIdValue);
        const response = await fetch(`http://localhost:4000/api/user/userInfo?id=${queryIdValue}`, {method: "GET"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

//display user function
window.onload = async function userDisplay () {
    let displayVar = await display();
    console.log(displayVar);
    let td = document.createElement('tr')
        td.innerHTML = `
                        <td>${displayVar["email"]}</td>
                        <td>${displayVar["firstName"]} ${displayVar["lastName"]}</td>
                        <td>${displayVar["age"]}</td>
                        <td>${displayVar["address"]}</td>`
        tbody.append(td);
    return td;
}

async function update(homeAddressVar) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/user/update?id=${queryIdValue}&address=${homeAddressVar}`,{method:"put"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = editUserForm.userChangeAddress.value;
    const responseVar = update(address);
    if(responseVar) {
        window.alert("home address updated");
        window.location.reload();
    }else{
        window.alert("error occurs updating home address");
    }
});

// //fetch home address function
// async function vacationRequest(vacationStartDate, vacationFinishDate) {
//     try
//     {
//         const response = await fetch(`http://localhost:4000/api/user/vacationRequest?id=1&vacationStartDate=${vacationStartDate}&vacationFinishDate=${vacationFinishDate}`,{method:"post"})
//         return response.json();
//     }
//     catch(error)
//     {
//         throw error;
//     }
// }
//
// vacationRequestForm.addEventListener('submit',async() => {
//     const vacationRequestStartDate = vacationRequestForm.requestVacationStart.value;
//     const vacationRequestFinishDate = vacationRequestForm.requestVacationEnd.value;
//     const responseVar = await vacationRequest(vacationRequestStartDate, vacationRequestFinishDate);
//     console.log(responseVar);
//     if(responseVar) {
//         window.alert("vacation request sent");
//     }else{
//         window.alert("error occurs sending vacation request");
//     }
// });
//
//
//
//
//
//
//
//
//
//
//
// const employeeForm = document.getElementById("addEmployeeForm");
// const deleteEmployeeForm = document.getElementById("deleteEmployeeForm")
// const editEmployeeForm = document.getElementById("editEmployeeForm")
// const emailInputCRUD = document.getElementById("emailInputCRUD");
// const passInputCRUD = document.getElementById("passwordInputCRUD");
// const nameInputCRUD = document.getElementById("nameInputCRUD");
// const vacationDaysInputCRUD = document.getElementById("vacationDaysInputCRUD");
//
//
// let tbody=document.getElementById("tbody");
//
// //fetch users function
// const display = async() => {
//     try
//     {
//         const response = await fetch("http://localhost:8081/api/display", {method: "GET"})
//         return response.json();
//     }
//     catch(error)
//     {
//         throw error;
//     }
// }
//
//
// //display users function
// window.onload = async function employeeDisplay () {
//     const displayVar = await display();
//     let users = displayVar["users"];
//     let td = document.createElement('tr')
//     for (var k in users) {
//         td = document.createElement('tr')
//         td.innerHTML = `
//                         <td>${users[k].email}</td>
//                         <td>${users[k].name}</td>
//                         <td>${users[k].role}</td>
//                         <td>${users[k].vacationDaysLeft}</td>`
//         tbody.append(td);
//     }
//     return td;
// }
//
// //add employee function
// employeeForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const email = addEmployeeForm.email.value;
//     const password = addEmployeeForm.password.value;
//     const name = addEmployeeForm.name.value;
//     const vacationDays = addEmployeeForm.vacationDays.value;
//     console.log(name);
//     console.log(vacationDays);
//     fetch(`http://localhost:8081/api/add?email=${email}&password=${password}&name=${name}&vacationDaysLeft=${vacationDays}`,{method:"post"})
// });
//
// deleteEmployeeForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const email = deleteEmployeeForm.deleteByEmail.value;
//     console.log(email);
//     fetch(`http://localhost:8081/api/delete?email=${email}`, {method: "put"})
// });
//
// editEmployeeForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const email = editEmployeeForm.editEmail.value;
//     const password = editEmployeeForm.editPassword.value;
//     console.log(email);
//     fetch(`http://localhost:8081/api/edit?email=${email}&password=${password}`, {method: "put"})
// });