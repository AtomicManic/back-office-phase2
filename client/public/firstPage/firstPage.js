const adminForm = document.getElementById("adminForm");
const userForm = document.getElementById("userForm");

adminForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = adminForm.adminId.value;
    window.location.replace(`../adminPage/admin.html?id=${id}`);
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = userForm.userId.value;
    window.location.replace(`../userPage/user.html?id=${id}`);
});
