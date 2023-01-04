window.addEventListener("load", () => {
  // without applying a const, var or let to the todos below, it remains a global variable, which means we can use it outside of the scope it is currently in!
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

  // how to get JSON CODE from database/localStorage
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      // elements is input in this case
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false, // saves in 1 and 0, not true or false
      createdAt: new Date().getTime(),
    };

    // add new todo to array
    todos.push(todo); // push the above content to todos in localStorage
    localStorage.setItem("todos", JSON.stringify(todos)); // save localStorage items
    e.target.reset(); // once an item is saved reset the input field (target) and category

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  // anytime you call this function clear the elements
  todoList.innerHTML = "";

  // create the elements(div) from here
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done; // this will tell if it is done or not

    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    // append all the elements above
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      // after any change we make redisplay todos and resave to localStorage
      DisplayTodos();
    });

    // edit todo
    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly"); // remove readonly so we can edit
      input.focus();
      // click outside of the input field it will stop editing - for the below code
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    // delete todo
    deleteButton.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
