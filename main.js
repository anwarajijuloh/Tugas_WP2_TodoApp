var todos = [];
var savedTodos = localStorage.getItem("todos");
savedTodos = JSON.parse(savedTodos);

const createTodo = (title, descrip) => {
  const id = todos.length + 1;
  todos.push({
    title: title,
    descrip: descrip,
    id: id,
    isEditing: false,
    titleEdit: "",
    descripEdit: "",
  });
};

const removeTodo = (idToDelete) =>
  (todos = todos.filter((todo) => !(todo.id == idToDelete)));

const setIsEditing = (todoToEdit) => {
  todos.forEach((todo) => {
    if (todo.id == todoToEdit.id) {
      todo.isEditing = true;
    }
  });
};

const updateProperties = (todoToUpdate, inputTitle, inputDescrip) => {
  todos.forEach((todo) => {
    if (todo.id === todoToUpdate.id) {
      todo.title = inputTitle.value;
      todo.descrip = inputDescrip.value;
      todo.isEditing = false;
    }
  });
};

const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));

const onAddTodo = () => {
  const titleTodo = document.getElementById("todo-title");
  const title = titleTodo.value;
  const descripTodo = document.getElementById("todo-descrip");
  const descrip = descripTodo.value;
  createTodo(title, descrip);
  titleTodo.value = "";
  descripTodo.value = "";
  renderTodo();
};

const onDeleteTodo = (todoToDelete) => {
  return () => {
    removeTodo(todoToDelete.id);
    renderTodo();
  };
};

const onEditTodo = (todoToEdit) => {
  return () => {
    setIsEditing(todoToEdit);
    renderTodo();
  };
};

const onUpdateTodo = (todoToUpdate, inputTitle, inputDescrip) => {
  return () => {
    updateProperties(todoToUpdate, inputTitle, inputDescrip);
    renderTodo();
  };
};

const renderTodo = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItems = document.createElement("li");
    todoItems.classList.add("todo-item");

    const todoText = document.createElement("div");
    todoText.classList.add("text");
    todoItems.appendChild(todoText);

    const todoBtn = document.createElement("div");
    todoBtn.classList.add("btn");
    todoItems.appendChild(todoBtn);

    if (todo.isEditing !== true) {
      const todoTitle = document.createElement("label");
      todoTitle.classList.add("titItem");
      todoTitle.innerText = todo.title;
      todoText.appendChild(todoTitle);

      const todoDescrip = document.createElement("label");
      todoDescrip.classList.add("desItem");
      todoDescrip.innerText = todo.descrip;
      todoText.appendChild(todoDescrip);

      const editButton = document.createElement("span");
      editButton.classList.add("btn-edit");
      editButton.classList.add("material-symbols-outlined");
      editButton.innerText = "edit";
      editButton.onclick = onEditTodo(todo);
      todoBtn.appendChild(editButton);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("btn-delete");
      deleteButton.classList.add("material-symbols-outlined");
      deleteButton.innerText = "delete";
      deleteButton.onclick = onDeleteTodo(todo);
      todoBtn.appendChild(deleteButton);
    } else {
      const editText = document.createElement("h4");
      editText.innerText = "Edit Todo";
      todoText.appendChild(editText);

      const inputTitleEdit = document.createElement("input");
      inputTitleEdit.placeholder = "Edit title";
      inputTitleEdit.value = todo.title;
      todoText.appendChild(inputTitleEdit);

      const inputDescripEdit = document.createElement("input");
      inputDescripEdit.placeholder = "Edit description";
      inputDescripEdit.value = todo.descrip;
      todoText.appendChild(inputDescripEdit);

      const updateButton = document.createElement("button");
      updateButton.innerText = "Update";
      updateButton.onclick = onUpdateTodo(
        todo,
        inputTitleEdit,
        inputDescripEdit
      );
      todoText.appendChild(updateButton);
    }
    todoList.appendChild(todoItems);
  });

  saveTodos();
};

renderTodo();
