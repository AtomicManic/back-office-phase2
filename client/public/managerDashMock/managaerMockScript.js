const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  await fetch("http://localhost:4000/api/auth/logout");
  window.location.replace("http://localhost:4000/index.html");
});
