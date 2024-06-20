import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

let todos: Todo[] = [];

const TodoContainer = document.querySelector(
  ".TodoContainer"
) as HTMLDivElement;

const todoinput = document.getElementsByTagName("input")[0] as HTMLInputElement;

const myFrom = document.getElementById("myfrom") as HTMLFormElement;

myFrom.onsubmit = (e) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoinput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoinput.value = "";
  renderTodo();
};

const renderTodo = () => {
  TodoContainer.innerHTML = "";
  todos.forEach((i) => {
    TodoContainer.innerHTML += `
    <div class="flex justify-between px-5 my-3 py-3 border-2 rounded-xl">
      <div class='flex gap-3 items-center'>
        <input type="checkbox" ${i.isCompleted ? "checked" : ""} id="${
      i.id
    }" onchange="toggleComplete('${i.id}')">
        <label class="text-lg ${i.isCompleted ? "line-through" : ""} for="${
      i.id
    }">${i.title}</label>
      </div>
      <div class="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 cursor-pointer" onclick="deleteTodo('${
        i.id
      }')">X</div>
    </div>
    `;
  });
};

(window as any).toggleComplete = (id: string) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    renderTodo();
  }
};

(window as any).deleteTodo = (id: string) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodo();
};
