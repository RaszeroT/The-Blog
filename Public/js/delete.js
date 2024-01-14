const deleteFunction = async (e) => {
  e.preventDefault();

  const blogId = window.location.toString().split("/").length - 1
  console.log(blogId);

  const response = fetch(`/api/blogs/:${blogId}`, {
    method: "DELETE",
  });
};

const deleteBtn = document.getElementById("delete");
if (deleteBtn) {
  deleteBtn.addEventListener("click", deleteFunction);
}
