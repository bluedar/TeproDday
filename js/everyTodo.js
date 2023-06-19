const controlAll = () => {
  nowSelector();
  //recalldate();
  //nextSelector();
  addZero();
  yuunMonthDays();
  //dateControlCall();
};

// 내일 날짜를 화면 끝날짜 셀렉터 칸에 뿌려주고 값을 가져온다.
const selectorYear = document.querySelector(".selector_after .year");
const selectorMonth = document.querySelector(".selector_after .month");
const selectorDay = document.querySelector(".selector_after .day");

const nowSelector = () => {
  // 시작 날짜를 화면에 시작날짜 셀렉터 칸에 뿌려준다.
  document.querySelector(".selector_before .year").textContent = nowTime.year;
  document.querySelector(".selector_before .month").textContent = nowTime.month;
  document.querySelector(".selector_before .day").textContent = nowTime.day;
};

let EndTime = {};

const loadList = () => {
  const daily = JSON.parse(localStorage.getItem("setting_daily"));
  if (daily) {
    EndTime = daily;
    nextSelector();
  } else {
    return;
  }
};

const nextSelector = () => {
  // 종료 날짜를 화면에 시작날짜 셀렉터 칸에 뿌려준다.
  document.querySelector(".selector_after .year").textContent = EndTime.year;
  document.querySelector(".selector_after .month").textContent = EndTime.month;
  document.querySelector(".selector_after .day").textContent = EndTime.day;
};

controlAll();
loadList();

///////////////////////////////////////////////////////
const addListBtn = document.querySelector(".addListBtn button");
const setting_add_bg = document.querySelector(".setting_add_bg");
const formCloseBtn = document.querySelector(".formCloseBtn");

let delBeforLi = false;
addListBtn.addEventListener("click", () => {
  setting_add_bg.classList.add("on");
});
formCloseBtn.addEventListener("click", () => {
  setting_add_bg.classList.remove("on");
  delBeforLi = false;
});

const FormOkBtn = document.querySelector(".FormOkBtn");
const userTitle = document.querySelector(".userTitle input");
const userparagraph = document.querySelector(".userparagraph .textarea");
const newTodolistUl = document.querySelector(".todo_list_wrap");
let todolists = [];
let todolist = {};

// 투두리스트 li 만드는 함수
const makeTodoList = () => {
  const newTodolistLi = document.createElement("li");
  const newTodolistButton = document.createElement("button");
  const newTodolistSpan = document.createElement("span");
  newTodolistSpan.textContent = userTitle.value;
  newTodolistButton.append(newTodolistSpan);
  newTodolistLi.append(newTodolistButton);
  newTodolistLi.setAttribute("data-id", todolist.id);
  // const newTodolistUl = document.querySelector(".todo_list_wrap");
  // 생성된 li에다 클릭 이벤트를 달아주는 함수
  openForm(newTodolistLi);
  newTodolistUl.append(newTodolistLi);
};
let createdLi;
// 생성된 todo를 선택할때 그 todo에 관한 정보가 들어있다.
//(form에 뿌려주거나 수정할때 리스트작성란에서 사용할 데이터)
let thisTodolist;
// newTodolistLi클릭시 폼이 열리는 이벤트를 달아주는 함수
const openForm = (newTodolistLi) => {
  // 생성된 todo를 클릭하면 발생하는 이벤트
  newTodolistLi.addEventListener("click", () => {
    dark.classList.add("on");
    todoList_form.classList.add("on");
    document.querySelectorAll(".todo_list_wrap li").forEach((li) => {
      li.classList.add("off");
    });

    thisTodolist = todolists.filter((todo) => {
      return todo.id === Number(newTodolistLi.getAttribute("data-id"));
    });

    todoList_form.querySelector("h3").textContent =
      thisTodolist[0].userTitleValue;
    todoList_form.querySelector("p").textContent =
      thisTodolist[0].userparagraphValue;
    createdLi = newTodolistLi;
    delBeforLi = true;
  });
};

FormOkBtn.addEventListener("click", () => {
  if (!userTitle.value) {
    alert("제목을 입력해 주세요!!");
  } else if (!userparagraph.textContent) {
    alert("할일내용을 적어주세요!!");
  } else {
    todolist["id"] = Date.now();
    todolist["userTitleValue"] = userTitle.value;
    todolist["userparagraphValue"] = userparagraph.textContent;

    todolists = [...todolists, { ...todolist }];
    makeTodoList();
    userTitle.value = "";
    userparagraph.textContent = "";
    dark.classList.remove("on");
    todoList_form.classList.remove("on");
    setting_add_bg.classList.remove("on");
    formOff();
    console.log(todolists);
  }
  /* 생성된 todoli를 클릭했다면 delBeforLi ture상태가 되어 수정으로 들어가 
  확인버튼클릭으로 새로운 li를 생성할때 이전 li가 삭제되도록 하고
  생성된 li를 클릭후 취소버튼을 클릭하면 delBeforLi flase 상태가 되어
  비활성화 상태로 수정이 아닌 리스트 작성을 통한 새로운 li생성시에는 
  이전에 클릭했던 todoli가 삭제되지 않도록 한다.
   */
  delBeforLi && createdLi && removeTodoChild();
  saveList("todolists");
  delBeforLi = false;
});
const removeTodoChild = () => {
  newTodolistUl.removeChild(createdLi);
  todolists = todolists.filter((todolist) => {
    return !(todolist.id === Number(createdLi.getAttribute("data-id")));
  });
  console.log(todolists);
};

const dark = document.querySelector(".dark");
const todoList_form = document.querySelector(".todoList_form");

dark.addEventListener("click", () => {
  dark.classList.remove("on");
  todoList_form.classList.remove("on");
  formOff();
});

const formOff = () => {
  const offLis = document.querySelectorAll(".off");
  offLis.forEach((offLi) => {
    offLi.classList.remove("off");
  });
};

const modify = todoList_form.querySelector(".modify_button");

modify.addEventListener("click", () => {
  userTitle.value = thisTodolist[0].userTitleValue;
  userparagraph.textContent = thisTodolist[0].userparagraphValue;
  setting_add_bg.classList.add("on");
});

const delite = todoList_form.querySelector(".delite_button");

delite.addEventListener("click", () => {
  delBeforLi && createdLi && removeTodoChild();
  todoList_form.classList.remove("on");
  dark.classList.remove("on");
  formOff();
  saveList("todolists");
});
const saveList = (aa) => {
  localStorage.setItem(aa, JSON.stringify(todolists));
};
const completBtn = document.querySelector(".completBtn");
//작성완료 클릭
completBtn.addEventListener("click", () => {
  //const aa = newTodolistUl.childNodes("li");
  console.log(todolists.length);
  saveList("todolists");
});

const makeLoadTodoList = (todolist) => {
  const newTodolistLi = document.createElement("li");
  const newTodolistButton = document.createElement("button");
  const newTodolistSpan = document.createElement("span");
  newTodolistSpan.textContent = todolist.userTitleValue;
  newTodolistButton.append(newTodolistSpan);
  newTodolistLi.append(newTodolistButton);
  newTodolistLi.setAttribute("data-id", todolist.id);
  // const newTodolistUl = document.querySelector(".todo_list_wrap");
  // 생성된 li에다 클릭 이벤트를 달아주는 함수
  openForm(newTodolistLi);
  newTodolistUl.append(newTodolistLi);
};

const loadList_everyTodo = () => {
  const local_todolists = JSON.parse(localStorage.getItem("todolists"));
  if (local_todolists) {
    todolists = local_todolists;
    console.log(todolists);
    todolists.forEach((todolist) => {
      makeLoadTodoList(todolist);
    });
  }
};
loadList_everyTodo();
