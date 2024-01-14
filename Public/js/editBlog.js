const editBlogFormHandler = async (e) => {
  e.preventDefault();

  const blogId = parseInt(window.location.pathname.split("/").pop());

  const blogTitle = document.getElementById("edit-title-input").value;

  const blogContent = document.getElementById("edit-blog-input").value;

  if (blogTitle && blogContent) {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: blogTitle,
        blog: blogContent,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/dashboard")
    } else {
      alert("Failed to edit blog.");
    }
  }
};

const editBlog = document.getElementById("edit-blog-form");
if (editBlog) {
  editBlog.addEventListener("submit", editBlogFormHandler);
}
