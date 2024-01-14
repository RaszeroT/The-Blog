const deleteFunction = async (e) => {
  e.preventDefault();

  const blogId = parseInt(window.location.pathname.split("/").pop());
  console.log(blogId);

  const response = await fetch(`/api/blogs/${blogId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard")
    alert("Blog deleted")
  } else {
    alert("Failed to delete")
  }
  console.log(response);
};

const deleteBtn = document.getElementById("delete");
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteFunction);
}
