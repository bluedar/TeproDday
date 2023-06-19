todoListPage = true;
let choiceId;
const controlAll = () => {
  addZero();
  dateChange();
  yuunMonthDays();
  dateControlCall();
};

// 컨트롤버튼 클릭시 디데이를 변경해주는 함수
const changeDdayNum = () => {
  dDaydateChange(ThisTime.year, ThisTime.month, ThisTime.day);
  const DdayCount = document.querySelector(".DdayCount");
  dDays = setdDayNum;
  DdayCount.textContent = `${dDays}`;
};
const dark = document.querySelector(".dark");
const todoList_form = document.querySelector(".todoList_form");
const todoList_complet_form = document.querySelector(".todoList_complet_form");
const Percentage = document.querySelector(".Percentage");
const completBtns = document.querySelector(".completBtns");
const todoListsEl = document.querySelector(".todoLists");

const openForm = () => {
  dark.classList.add("on");
  todoList_form.classList.add("on");
  Percentage.classList.add("on");
  completBtns.classList.add("on");
  todoListsEl.classList.add("on");
};
const closeForm = () => {
  dark.classList.remove("on");
  todoList_form.classList.remove("on");
  Percentage.classList.remove("on");
  completBtns.classList.remove("on");
  todoListsEl.classList.remove("on");
};
const completForm = () => {
  todoList_form.classList.remove("on");
  todoList_complet_form.classList.add("on");
};
const endForm = () => {
  dark.classList.remove("on");
  todoList_complet_form.classList.remove("on");
  Percentage.classList.remove("on");
  completBtns.classList.remove("on");
  todoListsEl.classList.remove("on");
};

const createTodoList = (todolist, index) => {
  const todoUl1 = document.querySelector(".todoLists .All");
  const todoUl2 = document.querySelector(".todoLists .before");
  const createLi = document.createElement("li");
  createLi.innerHTML = `
    <button>
      <span>${todolist.userTitleValue}</span>
    </button>
`;
  createLi.setAttribute("data-id", todolist.id);

  const createLi2 = document.createElement("li");
  createLi2.innerHTML = `
    <button>
      <span>${todolist.userTitleValue}</span>
    </button>
`;
  createLi2.setAttribute("data-id", todolist.id);
  todoUl1.append(createLi);
  todoUl2.append(createLi2);
  const form_title = document.querySelector(".todoList_form h3");
  const form_info = document.querySelector(".todoList_form p");
  createLi.addEventListener("click", () => {
    openForm();
    completForm();
    form_title.textContent = todolist.userTitleValue;
    form_info.textContent = todolist.userparagraphValue;
    choiceId = todolist.id;
    console.log(choiceId);
  });
  createLi2.addEventListener("click", () => {
    openForm();
    form_title.textContent = todolist.userTitleValue;
    form_info.textContent = todolist.userparagraphValue;
    choiceId = todolist.id;
    console.log(choiceId);
  });
};
const close_button = document.querySelector(".close_button");
const ok_button = document.querySelector(".ok_button");
const end_btn = document.querySelector(".end_btn");

close_button.addEventListener("click", () => {
  closeForm();
});

const createTodoListAfter = (todolist) => {
  const todoUl = document.querySelector(".todoLists .after");
  const createLi = document.createElement("li");
  createLi.innerHTML = `
    <button>
      <span>${todolist.userTitleValue}</span>
    </button>
`;
  createLi.setAttribute("data-id", todolist.id);
  todoUl.append(createLi);
  const form_title = document.querySelector(".todoList_form h3");
  const form_info = document.querySelector(".todoList_form p");
  createLi.addEventListener("click", () => {
    openForm();
    completForm();
    form_title.textContent = todolist.userTitleValue;
    form_info.textContent = todolist.userparagraphValue;
    choiceId = todolist.id;
  });
};

const delItem = () => {
  const Items = todoLists_before.querySelectorAll("li");
  Items.forEach((item) => {
    if (Number(item.getAttribute("data-id")) === choiceId) {
      item.remove();
    }
  });
};

const complet_form_title = document.querySelector(".todoList_complet_form h3");
const complet_form_info = document.querySelector(".todoList_complet_form p");
// 완료보고 버튼 77
ok_button.addEventListener("click", () => {
  completForm();
  let thisItem = todolists.filter((todolist) => {
    return todolist.id === choiceId;
  });
  thisItem = thisItem[0];
  complet_form_title.textContent = thisItem.userTitleValue;
  complet_form_info.textContent = thisItem.userparagraphValue;
  createTodoListAfter(thisItem);
  delItem();
});
end_btn.addEventListener("click", () => {
  endForm();
});

const AllBtn = document.querySelector(".completBtns .AllBtn");
const beforeBtn = document.querySelector(".completBtns .beforeBtn");
const afterBtn = document.querySelector(".completBtns .afterBtn");
const todoLists_All = document.querySelector(".todoLists .All");
const todoLists_before = document.querySelector(".todoLists .before");
const todoLists_after = document.querySelector(".todoLists .after");
AllBtn.addEventListener("click", () => {
  todoLists_All.classList.remove("on");
  todoLists_before.classList.add("on");
  todoLists_after.classList.add("on");
});
beforeBtn.addEventListener("click", () => {
  todoLists_All.classList.add("on");
  todoLists_before.classList.remove("on");
  todoLists_after.classList.add("on");
});
afterBtn.addEventListener("click", () => {
  todoLists_All.classList.add("on");
  todoLists_before.classList.add("on");
  todoLists_after.classList.remove("on");
});

let todolists = [];
let ThisTime;
const todoloadList = () => {
  const localTodolist = JSON.parse(localStorage.getItem("todolist"));
  const localThisTime = JSON.parse(localStorage.getItem("ThisTime"));
  controlAll();
  if (localTodolist && localTodolist !== undefined) {
    todolists = localTodolist;
    todolists.forEach((todolist, index) => {
      createTodoList(todolist, index);
    });
    if (localThisTime && localThisTime !== undefined) {
      ThisTime = localThisTime;
      changeDdayNum(ThisTime);
    }
  }
};
todoloadList();
