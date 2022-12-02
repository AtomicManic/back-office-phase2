const loginForm = document.getElementById("loginFrm");
const emailInpt = document.getElementById("emailInpt");
const passwordInpt = document.getElementById("passwordInpt");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInfo = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  try {
    if (userInfo.email !== null || userInfo.password !== null) {
      const data = await login(userInfo);
      if (data.isLoggedIn) {
        if (data.role === "manager") {
          window.location.replace("http://localhost:4000/public/dashboard");
        }
        if (data.role === "employee") {
          console.log("Inside employee dashboard");
        }
      } else {
        errorMsg.style.display = "block";
      }
    }
  } catch (error) {}
});

emailInpt.addEventListener("focus", () => {
  errorMsg.style.display = "none";
});
passwordInpt.addEventListener("focus", () => {
  errorMsg.style.display = "none";
});

const login = async (userInfo) => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  // console.log(response.json());
  return response.json();
};
