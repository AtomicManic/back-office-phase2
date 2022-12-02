const addHomeAddressForm = document.getElementById("addHomeAddressForm");
const vacationRequestForm = document.getElementById("vacationRequestForm")

let tbody=document.getElementById("tbody");
let messages=document.getElementById("messages");

//fetch user function
const display = async() => {
    try
    {
        const response = await fetch("http://localhost:4000/api/employeeInfo?id=1", {method: "GET"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

//display user function
window.onload = async function employeeDisplay () {
    const displayVar = await display();
    console.log(displayVar);
    // let users = displayVar["users"];
    let td = document.createElement('tr')
        td.innerHTML = `
                        <td>email</td>
                        <td>${displayVar}</td>
                        <td>role</td>
                        <td>vacation days</td>`
        tbody.append(td);
    return td;
}

//fetch home address function
async function homeAddress(homeAddressVar) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/home_address?id=1&home_address=${homeAddressVar}`,{method:"put"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

addHomeAddressForm.addEventListener('submit',async() => {

    const homeAddressValue = addHomeAddressForm.homeAddressAdd.value;
    const responseVar = await homeAddress(homeAddressValue);
    console.log(responseVar);
    if(responseVar) {
        window.alert("home address updated");
    }else{
        window.alert("error occurs updating home address");
    }
});

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