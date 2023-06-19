// 오늘 날짜 정보
//const date = new Date(); -- main.js로 이동시킴
// 내일 날짜 정보 (오늘날짜 + 1일=1000ms * 60 * 60 * 24)
//const nextDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
// nextDate도 main.js로 이동시킴

// // 오늘 날짜 정보(년,월,일,요일)을 객체에 담아둔것
// const nowTime = {
//   year: date.getFullYear(),
//   month: Number(`0${date.getMonth() + 1}`),
//   day: date.getDate(),
//   week: date.getDay(),
// };
// // 내일 날짜 정보 (년,월,일,요일)을 객체에 담아둔것
// const nextTime = {
//   year: nextDate.getFullYear(),
//   month: Number(`0${nextDate.getMonth() + 1}`),
//   day: nextDate.getDate(),
//   week: nextDate.getDay(),
// }
//main.js로 이동시킴

const controlAll = () => {
  // 세팅페이지전용, 현재날짜를 캘린더의 셀렉터에 현재 날짜로 집어넣는다.
  nowSelector();
  // 세팅페이지전용, 내일날짜를 캘린더의 셀렉터에 내일 날짜로 집어넣는다.
  recalldate();
  // 세팅페이지전용, 내일 날짜를 캘린더의 옵션에 내일 날짜로 집어넣는다.
  nextSelector();
  addZero();
  yuunMonthDays();
  dateControlCall();
};

const nowSelector = () => {
  // 오늘 날짜를 화면에 시작날짜 셀렉터 칸에 뿌려준다.
  document.querySelector(".selector_before .year").textContent = nowTime.year;
  document.querySelector(".selector_before .month").textContent = nowTime.month;
  document.querySelector(".selector_before .day").textContent = nowTime.day;
};
// 내일 날짜를 화면 끝날짜 셀렉터 칸에 뿌려주고 값을 가져온다.
const selectorYear = document.querySelector(".selector_after .year");
const selectorMonth = document.querySelector(".selector_after .month");
const selectorDay = document.querySelector(".selector_after .day");

const recalldate = () => {
  selectorYear.textContent = year;
  selectorMonth.textContent = month;
  selectorDay.textContent = day;
};

let afterYear = (selectorYear.textContent = nextTime.year);
let afterMonth = (selectorMonth.textContent = nextTime.month);
let afterDay = (selectorDay.textContent = nextTime.day);

// 내일 날짜를 화면 끝날짜 옵션 칸에 뿌려준다.
const nextSelector = () => {
  afterYear = selectorYear.textContent = year;
  afterMonth = selectorMonth.textContent = month;
  afterDay = selectorDay.textContent = day;
  document.querySelector(".option_after .year input").value = afterYear;
  document.querySelector(".option_after .month input").value =
    Number(afterMonth);
  document.querySelector(".option_after .day input").value = Number(afterDay);
};
nextSelector();

// 날짜 컨트롤에도 이용하기 위해 main.js로 이동
// // 이벤트로 계속해서 값이 바뀌는 년월일 변수들
// let year = nextTime.year;
// let month = nextTime.month;
// let day = nextTime.day;
// //  한자릿수면 앞에 0을 붙여주어야 Date() 객체가 사용가능하다.
// // 또는 화면에 뿌려주기 위해서도 있으므로 0을 앞에 붙인 스트링 인풋 년월
// let inpMonth;
// let inpday;
// /*
// 월 마다 최대 일수가 다르고 2월은 특히 윤달이라는 것이 존재한다.
// 이러한 달별로 계산하여 나온 월별 최댓값을 담을 변수 settingMaxDay
// */
// let settingMaxDay;

// /*
// 최종적으로 선택된 결과를 기준으로 Dday가 얼마나 남았는지 계산한 값이
// 들어와야 할 변수 dDayNum
// */
// let dDayNum;

// /* addZero()
//   월과 일 앞에 0을 붙여 스트링으로 만들어 인풋월일에 넣어주는 함수
// */
// const addZero = () => {
//   if (String(month).length === 1) {
//     inpMonth = `0${month}`;
//   } else {
//     inpMonth = month;
//   }
//   if (String(day).length === 1) {
//     inpday = `0${day}`;
//   } else {
//     inpday = day;
//   }
// };

// /* dateChange()
//   오늘과 목표일 사이의 기간을 계산해 Dday가 몇일남았는지 계산해주는 함수
// */
// const dateChange = () => {
//   const afterDate = new Date(`${year}-${inpMonth}-${inpday}T00:00:00Z`);
//   const dfm = afterDate - date;
//   dDayNum = Math.ceil(dfm / (1000 * 60 * 60 * 24));
// };

// /* yuunMonthDays()
//   윤달과 월별 한달에 몇일이 존재하는지 계산해 settingMaxDay에 넣어준는 함수
// */
// const yuunMonthDays = () => {
//   //윤달계산
//   const check400 = year % 400;
//   const check100 = year % 100;
//   const check4 = year % 4;
//   const oddAndEven = month % 2;
//   if (month === "2") {
//     if (!!check4 || (!check4 && !check100 && !!check400)) {
//       settingMaxDay = 28;
//     } else {
//       settingMaxDay = 29;
//     }
//   } else if (oddAndEven) {
//     // 홀수와 짝수 달
//     settingMaxDay = 31;
//   } else {
//     settingMaxDay = 30;
//   }
// };
// yuunMonthDays();
// // 월이 변할때 일수가 월의 일 최대치보다 높으면 월 최대치로 바꿔주는 함수
// const monthChange = (e) => {
//   const dayInput =
//     e.target.parentElement.parentElement.querySelector(".day input");
//   if (dayInput.value >= settingMaxDay) {
//     dayInput.value = settingMaxDay;
//     day = settingMaxDay;
//   }
//   if (
//     nextTime.year === Number(year) &&
//     nextTime.month === Number(month) &&
//     nextTime.day > Number(day)
//   ) {
//     dayInput.value = nextTime.day;
//     day = nextTime.day;
//   }
//   recalldate();
//   saveList("setting_daily");
// };

// /*upNumber()
// 숫자업 함수
// */
// const upNumber = (calender_input, index) => {
//   calender_input[index].value = `${Number(calender_input[index].value) + 1}`;
// };
// /*downNumber()
// 숫자 다운 함수
// */
// const downNumber = (calender_input, index) => {
//   calender_input[index].value = `${Number(calender_input[index].value) - 1}`;
// };

// 좌측버튼들 (숫자를 내리는 버튼들)
const leftBtns = document.querySelectorAll(".leftBtn");

// 각각의 좌측 버튼을 클릭했을때 발동!!
leftBtns.forEach((leftBtn, index) => {
  // calender_input에 년월일 각각의 인풋들을 가져다 넣는다.
  const calender_input = document.querySelectorAll(".calender_option input");
  leftBtn.addEventListener("click", (e) => {
    /* 부과 설명
    모든 좌측 버튼을 가져온것으로 년월일 각각의 함수를 따로 작동시키기
    위해서는
    클릭한 버튼의 위치와 인풋의 위치가 똑같은지 확인하기 위해
    버튼의 부모위치 === 클릭한 버튼의 부모위치
    년===년,월===월,일===일 의 경우에만 각각 작동하도록 할 필요가 있다.
    */

    // 년===년 해당되면 yearDayDown 함수작동
    const yearEliment =
      e.target.parentElement.parentElement.querySelector(".year");
    const yearParents = leftBtn.parentElement.parentElement;
    if (yearEliment === e.target.parentElement) {
      yearDayDown(yearParents, calender_input, index);
    }
    // 월===월 해당되면 monthDayDown
    const monthEliment =
      e.target.parentElement.parentElement.querySelector(".month");
    const monthParents = leftBtn.parentElement.parentElement;
    if (monthEliment === e.target.parentElement) {
      monthDayDown(monthParents, calender_input, index);
    }
    // 일===일 해당되면  dayDown 함수 작동
    const dayEliment =
      e.target.parentElement.parentElement.querySelector(".day");
    const dayParents = leftBtn.parentElement.parentElement;
    if (dayEliment === e.target.parentElement) {
      dayDown(dayParents, calender_input, index);
    }
    yuunMonthDays();
    monthChange(e);
  });
});

//우측버튼들 (숫자를 올리는 버튼들)
const rightBtns = document.querySelectorAll(".rightBtn");
// 각각의 우측 버튼을 클릭했을때 발동!!
rightBtns.forEach((rightBtn, index) => {
  const calender_input = document.querySelectorAll(".calender_option input");
  rightBtn.addEventListener("click", (e) => {
    const yearEliment =
      e.target.parentElement.parentElement.querySelector(".year");
    const yearParents = rightBtn.parentElement.parentElement;
    if (yearEliment === e.target.parentElement) {
      yearDayUp(yearParents, calender_input, index);
    }
    const monthEliment =
      e.target.parentElement.parentElement.querySelector(".month");
    const monthParents = rightBtn.parentElement.parentElement;
    if (monthEliment === e.target.parentElement) {
      monthDayUp(monthParents, calender_input, index);
    }
    const dayEliment =
      e.target.parentElement.parentElement.querySelector(".day");
    const dayParents = rightBtn.parentElement.parentElement;
    if (dayEliment === e.target.parentElement) {
      dayUp(dayParents, calender_input, index);
    }
    yuunMonthDays();
    monthChange(e);
  });
});

// // 년을 조작하는 좌측버튼을 클릭하면 작동하는 함수
// const yearDayDown = (parents, calender_input, index) => {
//   const yearInput = parents.querySelector(".year input");
//   const monthInput = parents.querySelector(".month input");
//   const dayInput = parents.querySelector(".day input");
//   /*
//   오늘의 연도 보다 인풋 밸류값이 클경우에만 작동
//   오늘이 2023년 이라면  밸류가 2023 이하일때는 작동안함
//   */
//   if (calender_input[index].value > nextTime.year) {
//     downNumber(calender_input, index);
//     year = yearInput.value;
//     // 아래로 내렸을때 년이 오늘과 같고
//     //월이 오늘보다 작을때 작동하는 함수
//     if (
//       Number(yearInput.value) === nextTime.year &&
//       monthInput.value < Number(nextTime.month)
//     ) {
//       monthInput.value = Number(nextTime.month);
//       month = Number(nextTime.month);
//       dayInput.value = Number(nextTime.day);
//       day = Number(nextTime.day);
//     }
//   }
// };

// // 년을 조작하는 우측버튼을 클릭하면 작동하는 함수
// const yearDayUp = (yearParents, calender_input, index) => {
//   const yearInput = yearParents.querySelector(".year input");

//   // 인풋 값이 3000 미만일때만 작동
//   if (calender_input[index].value < 3000) {
//     upNumber(calender_input, index);
//     year = yearInput.value;
//     // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
//   }
// };

// // 달을 다운 작동시키면 작동하는 기능
// const monthDayDown = (monthParents, calender_input, index) => {
//   const monthInput = monthParents.querySelector(".month input");
//   if (nextTime.year === Number(year) && nextTime.month >= Number(month)) {
//     calender_input[index].value = 12;
//     month = 12;
//     return;
//   } else {
//     if (calender_input[index].value > 1) {
//       downNumber(calender_input, index);
//       month = monthInput.value;
//     } else {
//       calender_input[index].value = 12;
//       month = monthInput.value;
//     }
//   }
// };

// // 달을 업 작동시키면 작동하는 기능
// const monthDayUp = (monthParents, calender_input, index) => {
//   const monthInput = monthParents.querySelector(".month input");
//   // 12보다 밸류값이 작으면 업 작동 12보다 밸류값이 크면 1로
//   if (calender_input[index].value < 12) {
//     upNumber(calender_input, index);
//     month = monthInput.value;
//     // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
//   } else {
//     calender_input[index].value = 1;
//     month = 1;
//     if (nextTime.year === Number(year)) {
//       calender_input[index].value = nextTime.month;
//       month = nextTime.month;
//     }
//   }
//   if (nextTime.year === Number(year) && nextTime.month >= Number(month)) {
//     calender_input[index].value = nextTime.month;
//     month = nextTime.month;
//   }
// };

// // 일을 다운 작동시키면 작동하는 기능
// const dayDown = (dayParents, calender_input, index) => {
//   const dayInput = dayParents.querySelector(".day input");

//   if (calender_input[index].value > 1) {
//     downNumber(calender_input, index);
//     day = dayInput.value;
//   } else {
//     calender_input[index].value = settingMaxDay;
//     day = dayInput.value;
//   }
//   if (
//     nextTime.year === Number(year) &&
//     nextTime.month === Number(month) &&
//     nextTime.day >= Number(day)
//   ) {
//     dayInput.value = settingMaxDay;
//     day = settingMaxDay;
//   }
// };

// // 일을 업 작동시키면 작동하는 기능
// const dayUp = (dayParents, calender_input, index) => {
//   const dayInput = dayParents.querySelector(".day input");

//   if (calender_input[index].value < settingMaxDay) {
//     upNumber(calender_input, index);
//     day = dayInput.value;
//     // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
//   } else {index
//     calender_input[index].value = 1;
//     day = dayInput.value;
//   }
// };

// 로컬에 올려둘 시간데이터
let daily = {
  year,
  month,
  day,
};
// 시간데이터를 업데이트해서 로컬에 업데이트 하는 함수

const saveList = (aa) => {
  daily.year = Number(year);
  daily.month = Number(month);
  daily.day = Number(day);
  localStorage.setItem(aa, JSON.stringify(daily));
};

const calender = document.querySelector(".selector_after");

calender.addEventListener("click", () => {
  const option = document.querySelector(".option_after");
  if (!option.classList.contains("on")) {
    option.classList.add("on");
  } else {
    option.classList.remove("on");
  }
});

const dateLoadFunc = () => {
  const option_after = document.querySelector(".option_after");
  const yearValue = option_after.querySelector(".year input");
  const monthValue = option_after.querySelector(".month input");
  const dayValue = option_after.querySelector(".day input");
  yearValue.value = year;
  monthValue.value = month;
  dayValue.value = day;
};

const saveList2 = (aa) => {
  localStorage.setItem(aa, JSON.stringify(daily));
};

const saveList3 = (aa) => {
  localStorage.setItem(aa, JSON.stringify(everylistTitle));
};
const setting_title = document.querySelector(".setting_title input");
setting_title.addEventListener("input", () => {
  //daily[title] = setting_title.value;

  everylistTitle = setting_title.value;
  console.log(everylistTitle);
  saveList3("everylistTitle");
});

//설정을 완료해 완료버튼을 누르면 합쳐진 데이터를 로컬에 보내준다.
let DdayLists;
const clearBtn = document.querySelector(".clearBtn");
clearBtn.addEventListener("click", () => {
  const get_item = JSON.parse(localStorage.getItem("DdayLists"));

  if (get_item !== undefined) {
    DdayLists = get_item;
  } else {
    DdayLists = [];
  }
  console.log(DdayLists);
  const setting_daily = JSON.parse(localStorage.getItem("setting_daily"));
  const everylistTitle = JSON.parse(localStorage.getItem("everylistTitle"));
  const todolists = JSON.parse(localStorage.getItem("todolists"));
  const DdayListsId = Date.now();
  console.log(DdayLists);
  if (!DdayLists) {
    DdayLists = [];
  }
  console.log(DdayLists);
  DdayLists = [
    ...DdayLists,
    {
      id: DdayListsId,
      setting_daily: { ...setting_daily },
      everylistTitle,
      todolists: [...todolists],
    },
  ];
  localStorage.setItem("DdayLists", JSON.stringify(DdayLists));
});

const everyTodoCountSpan = document.querySelector(".everyTodo span");

let todolists = [];
let everylistTitle = "";
const loadList_everyTodo = () => {
  const local_todolists = JSON.parse(localStorage.getItem("todolists"));
  console.log("local_todolists", local_todolists);
  if (local_todolists && local_todolists.length !== 0) {
    todolists = local_todolists;
    everyTodoCountSpan.textContent = todolists.length;
    everyTodoCountSpan.classList.add("on");
  } else {
    todolists = [];
    everyTodoCountSpan.classList.remove("on");
  }
  everylistTitle = JSON.parse(localStorage.getItem("everylistTitle"));
  setting_title.value = everylistTitle;
};
loadList_everyTodo();
