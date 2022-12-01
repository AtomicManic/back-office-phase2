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
      console.log("here");
      const data = await login(userInfo);
      if (data.isLoggedIn) {
        // check role and serve correct dashboard
      } else {
        // open error element
      }
    }
  } catch (error) {}
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
