const controlAll = () => {
  addZero();
  dateChange();
  yuunMonthDays();
  dateControlCall();
};
let dDays;

let ThisTodolist;
let ThisTime;
// 디데이 리스트를 생성하는 함수
const createDdayList = (localDdayList, index) => {
  // 디데이 리스트를 생성할때 생성일에 넣을 수치를 만들어 주는 함수
  dDaydateChange(
    localDdayList.setting_daily.year,
    localDdayList.setting_daily.month,
    localDdayList.setting_daily.day
  );
  /* dDaydateChange 의 결과가 들어있는 변수 let = setdDayNum */
  const DdayList_wrap = document.querySelector(".DdayList_wrap ul");
  const title = localDdayList.everylistTitle;
  dDays = setdDayNum;
  const createLi = document.createElement("li");
  createLi.innerHTML = `
  <button>
    <a href="./todoList.html">
      <span>${title}</span>
      <span class="dDaySpan"> D-${dDays} </span>
    </a>
  </button>
  <img src="./img/alret.png" alt="할일이 남아있어요!" />
`;
  DdayList_wrap.append(createLi);
  createLi.addEventListener("click", () => {
    ThisTodolist = localDdayList.todolists;
    ThisTime = localDdayList.setting_daily;
    localStorage.setItem("todolist", JSON.stringify(ThisTodolist));
    localStorage.setItem("ThisTime", JSON.stringify(ThisTime));
  });
};

// 컨트롤버튼 클릭시 각각의 디데이리스트의 디데이를 변경해주는 함수
const changeDdayNum = () => {
  const DdayList_wrap_lis = document.querySelectorAll(".DdayList_wrap ul li");
  DdayList_wrap_lis.forEach((DdayList_wrap_li, index) => {
    dDaydateChange(
      DdayLists[index].setting_daily.year,
      DdayLists[index].setting_daily.month,
      DdayLists[index].setting_daily.day
    );
    const dDaySpan = DdayList_wrap_li.querySelector(".dDaySpan");
    dDays = setdDayNum;
    dDaySpan.textContent = `D-${dDays}`;

    //만약 D-day가 0이 되면 해당 D-day 리스트를 제거한다. (추후 삭제한 대상의 데이터를 뽑아 앨범에 사용한다.)
    if (dDays <= 0) {
      console.log(DdayLists);
      DdayList_wrap_li.remove();
      DdayLists = DdayLists.filter((DdayList) => {
        return DdayList !== DdayLists[index];
      });
      localStorage.setItem("DdayLists", JSON.stringify(DdayLists));
      console.log(DdayLists);
    }
  });
};
let DdayLists = [];

const DdayloadList = () => {
  localStorage.removeItem("setting_daily");
  localStorage.removeItem("everylistTitle");
  localStorage.removeItem("todolists");
  const localDdayLists = JSON.parse(localStorage.getItem("DdayLists"));
  controlAll();
  if (localDdayLists && localDdayLists !== undefined) {
    DdayLists = localDdayLists;
    localDdayLists.forEach((localDdayList, index) => {
      createDdayList(localDdayList, index);
    });
  }
};
DdayloadList();
