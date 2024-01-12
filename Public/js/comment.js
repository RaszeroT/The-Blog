const newCommentFormHandler = async (e) => {
  e.preventDefault();

  // get blog id from url
  const blogId = parseInt(window.location.pathname.split("/").pop());
  console.log(blogId);

  // get input from textarea
  const newCommentInput = document.getElementById("new-comment-input").value;
  console.log(newCommentInput);

  if (newCommentInput) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ 
        comment: newCommentInput,
        blog_id: blogId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
        document.location.reload(); // When successful, reload the same page
      } else {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        alert('Failed to create a comment.'); // When unsuccessful, show alert
      }
    console.log(response);
  }

  
};

const newComment = document.getElementById("new-comment-form");
if (newComment) {
  newComment.addEventListener("submit", newCommentFormHandler);
}
