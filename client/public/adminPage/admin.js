let addUserForm = document.getElementById("addUserForm");
let deleteUserForm = document.getElementById("deleteUserForm");
let editUserForm = document.getElementById("editUserForm");
let updateAllUsersStatusForm = document.getElementById("updateAllUsersStatusForm")
let tbody=document.getElementById("tbody");
let td = document.createElement('tr');

// If not went through the first page that gives the user his id relocate to the first page
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const queryIdValue = params.id; // "some_value"
if(!params.id)
    window.location.replace('../firstPage/firstPage.html');


//display user if authorized function
window.onload = async function userDisplay () {
    let check = await checkUser();
    if(check["role"] !== "admin")
    {
        window.alert("This id does not belong to admin")
        window.location.replace('../firstPage/firstPage.html')
    }
    let displayVar = await display();
    let displayStatusVar = await displayStatus();
    let displayRoleVar = await displayRole();
    let usersCount = 0;
    while(usersCount < displayVar.length) {
        td = document.createElement('tr')
        td.innerHTML = `
                            <td>${displayVar[usersCount]["id"]}</td>
                            <td>${displayVar[usersCount]["email"]}</td>
                            <td>${displayVar[usersCount]["firstName"]} ${displayVar[usersCount]["lastName"]}</td>
                            <td>${displayRoleVar[usersCount]["role"]}</td>
                            <td>${displayVar[usersCount]["address"]}</td>
                            <td>${displayStatusVar[usersCount]["status"]}</td>`
        usersCount++;
        tbody.append(td);
    }
    return td;
}

addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = addUserForm.email.value;
    const address = addUserForm.address.value;
    const firstName = addUserForm.firstName.value;
    const lastName = addUserForm.lastName.value;
    const age = addUserForm.age.value;
    const gender = addUserForm.gender.value;
    const role = addUserForm.role.value;

    const responseVar = createUser(email, address, firstName, lastName, age, gender, role);
    if(responseVar) {
        window.alert("user created");
        window.location.reload();
    }else{
        window.alert("error occurs while creating user");
    }
});

deleteUserForm.addEventListener('submit', async function(event)
{
    event.preventDefault()
    const userId = deleteUserForm.deleteById.value;
    const checkUser = await checkDeleteAndEdit(userId);
    if(checkUser != null)
    {
        if (checkUser["role"] != 'admin')
        {
            const responseVar = deleteUser(userId);
            if(responseVar)
            {
                window.alert("deleted");
                window.location.reload();
            }
            else
            {
                window.alert("error occurs while deleting user");
            }
        }
    }
    else
    {
        window.alert("Id not valid");
    }
});

editUserForm.addEventListener('submit', async function(event)
{
    event.preventDefault();
    const userId = editUserForm.statusUserId.value;
    const status = editUserForm.status.value;
    const checkUser = await checkDeleteAndEdit(userId);
    if(checkUser != null)
    {
        if (checkUser["role"] != 'admin')
        {
            const responseVar = editUserStatus(userId, status);
            console.log(responseVar);
            if (responseVar)
            {
                window.alert("user status updated");
                window.location.reload();
            }
            else
            {
                window.alert("error occurs while updating user status");
            }
        }
    }
    else
    {
        window.alert("Id not valid");
    }
});

updateAllUsersStatusForm.addEventListener('submit', async function(event)
{
    event.preventDefault();
    const status = updateAllUsersStatusForm.status.value;
    const responseVar = updateAllUsers(status);
    if (responseVar)
        {
            window.alert("all users status updated");
            window.location.reload();
        }
    else
        {
        window.alert("error occurs updating users status");
        }
});


//fetch user role function
const checkUser = async() => {
    try
    {
        console.log(queryIdValue);
        const response = await fetch(`http://localhost:4000/api/admin/checkRole?id=${queryIdValue}`, {method: "get"})
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
        const response = await fetch(`http://localhost:4000/api/admin/getUsers`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// fetch user status function
const displayStatus = async() => {
    try
    {
        const response = await fetch(`http://localhost:4000/api/admin/userStatus`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// fetch user status function
const displayRole = async() => {
    try
    {
        const response = await fetch(`http://localhost:4000/api/admin/usersRole`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// edit user from database
async function editUserStatus(userId, status) {
    try
    {
        console.log(`user sent is: ${userId}`);
        const response = await fetch(`http://localhost:4000/api/admin/updateStatus?id=${userId}&status=${status}`,{method:"put"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// delete user from database
async function deleteUser(userId) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/admin/deleteUser?id=${userId}`,{method:"delete"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

//fetch user role function
const checkDeleteAndEdit = async(userId) => {
    try
    {
        console.log(queryIdValue);
        const response = await fetch(`http://localhost:4000/api/admin/checkRole?id=${userId}`, {method: "get"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// create user
async function createUser(email, address, firstName, lastName, age, gender, role) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/admin/createUser?email=${email}&address=${address}&firstName=${firstName}&lastName=${lastName}&age=${age}&gender=${gender}&role=${role}`,{method:"post"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}

// create user
async function updateAllUsers(status) {
    try
    {
        const response = await fetch(`http://localhost:4000/api/admin/updateAllUsersStatus?status=${status}`,{method:"put"})
        return response.json();
    }
    catch(error)
    {
        throw error;
    }
}