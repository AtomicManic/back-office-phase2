let editUserForm = document.getElementById("editUserForm");
let tbody=document.getElementById("tbody");

// If not went through the first page that gives the user his id relocate to the first page
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const queryIdValue = params.id; // "some_value"
if(!params.id)
    window.location.replace('../firstPage/firstPage.html');

//fetch user role function
const checkUserRole = async() => {
    try
    {
        console.log(queryIdValue);
        const response = await fetch(`http://localhost:4000/api/user/checkRole?id=${queryIdValue}`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

//fetch user role function
const checkUserStatus = async() => {
    try
    {
        console.log(queryIdValue);
        const response = await fetch(`http://localhost:4000/api/user/checkStatus?id=${queryIdValue}`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

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

//display user if authorized function
window.onload = async function userDisplay () {
    let checkRole = await checkUserRole();
    if(checkRole["role"] !== "user")
    {
        window.alert("This id does not belong to user")
        window.location.replace('../firstPage/firstPage.html')
    }
    let checkStatus = await checkUserStatus();
    if(checkStatus["status"] !== "active")
    {
        window.alert("This account has been disabled")
        window.location.replace('../firstPage/firstPage.html')
    }
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

// update user info
async function updateUser(homeAddressVar) {
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
    const responseVar = updateUser(address);
    if(responseVar) {
        window.alert("home address updated");
        window.location.reload();
    }else{
        window.alert("error occurs updating home address");
    }
});

// delete user from database
async function deleteUser(homeAddressVar) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/user/update?id=${queryIdValue}`,{method:"delete"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

editUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const responseVar = deleteUser(address);
    if(responseVar) {
        window.alert("deleted");
        window.location.replace('../firstPage/firstPage.html');
    }else{
        window.alert("error occurs delete");
    }
});