const logout = document.getElementById("logout");

const functionHandlerLogout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
};

document
  .getElementById("logout")
  .addEventListener("click", functionHandlerLogout);
