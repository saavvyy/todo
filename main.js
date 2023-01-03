window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  // get ids from html file
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  // get username from localStorage
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });
});
