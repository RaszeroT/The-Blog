const logout = document.getElementById("logout");

const functionLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

const logoutBtn = document.getElementById("logout")
if (logoutBtn) {
  logoutBtn.addEventListener("click", functionLogout);
}
