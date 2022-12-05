const addHomeAddressForm = document.getElementById("addHomeAddressForm");
const vacationRequestForm = document.getElementById("vacationRequestForm")
let tbody=document.getElementById("tbody");
let messages=document.getElementById("messages");

Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

document.getElementById('vacationRequestFrom').value = new Date().toDateInputValue();
document.getElementById('vacationRequestTo').value = new Date().toDateInputValue();

//fetch user function
const display = async() => {
    try
    {
        const response = await fetch("http://localhost:4000/api/user/employeeInfo?id=1", {method: "GET"})
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
        const response = await fetch(`http://localhost:4000/api/user/homeAddress?id=1&homeAddress=${homeAddressVar}`,{method:"put"})
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

//fetch home address function
async function vacationRequest(vacationStartDate, vacationFinishDate) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/user/vacationRequest?id=1&vacationStartDate=${vacationStartDate}&vacationFinishDate=${vacationFinishDate}`,{method:"post"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

vacationRequestForm.addEventListener('submit',async() => {
    const vacationRequestStartDate = vacationRequestForm.requestVacationStart.value;
    const vacationRequestFinishDate = vacationRequestForm.requestVacationEnd.value;
    const responseVar = await vacationRequest(vacationRequestStartDate, vacationRequestFinishDate);
    console.log(responseVar);
    if(responseVar) {
        window.alert("vacation request sent");
    }else{
        window.alert("error occurs sending vacation request");
    }
});