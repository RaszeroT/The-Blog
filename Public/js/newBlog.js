const newBlogFormHandler = async (e) => {
  e.preventDefault();

  const blogTitle = document.getElementById("title-input").value;
  console.log(blogTitle);

  const blogContent = document.getElementById("new-blog-input").value;
  console.log(blogContent);

  if (blogTitle && blogContent) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({
        title: blogTitle,
        blog: blogContent,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        // when successful redirect to dashboard
        document.location.replace("/dashboard")
    } else {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        alert('Failed to create a comment.'); // When unsuccessful, show alert
      }
    console.log(response);
  }
};

const newBlog = document.getElementById("new-blog-form");
if (newBlog) {
  newBlog.addEventListener("submit", newBlogFormHandler);
}
