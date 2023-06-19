const goBack = () => {
  window.history.back();
};
const goBackBtn = document.querySelector(".goBack");

goBackBtn.addEventListener("click", () => {
  goBack();
});

const baseAddDate = 1000 * 60 * 60 * 24;
let controlDate = 0;
let controlNextDate = 1;
let date = new Date(Date.now() + controlDate * baseAddDate);
let nextDate = new Date(Date.now() + controlNextDate * baseAddDate);

const dummy = () => {};
// 오늘 날짜 정보(년,월,일,요일)을 객체에 담아둔것
let nowTime = {
  year: date.getFullYear(),
  month: Number(`0${date.getMonth() + 1}`),
  day: date.getDate(),
  week: date.getDay(),
};
// 내일 날짜 정보 (년,월,일,요일)을 객체에 담아둔것
let nextTime = {
  year: nextDate.getFullYear(),
  month: Number(`0${nextDate.getMonth() + 1}`),
  day: nextDate.getDate(),
  week: nextDate.getDay(),
};

// 지금날짜와 내일날짜를 재설정 해주는 함수
const ChangeDates = () => {
  date = new Date(Date.now() + controlDate * baseAddDate);
  nextDate = new Date(Date.now() + controlNextDate * baseAddDate);
  nowTime = {
    year: date.getFullYear(),
    month: Number(`0${date.getMonth() + 1}`),
    day: date.getDate(),
    week: date.getDay(),
  };
  nextTime = {
    year: nextDate.getFullYear(),
    month: Number(`0${nextDate.getMonth() + 1}`),
    day: nextDate.getDate(),
    week: nextDate.getDay(),
  };
};

// 이벤트로 계속해서 값이 바뀌는 년월일 변수들
let year = nextTime.year;
let month = nextTime.month;
let day = nextTime.day;
//  한자릿수면 앞에 0을 붙여주어야 Date() 객체가 사용가능하다.
// 또는 화면에 뿌려주기 위해서도 있으므로 0을 앞에 붙인 스트링 인풋 년월
let inpMonth;
let inpday;
/* 
월 마다 최대 일수가 다르고 2월은 특히 윤달이라는 것이 존재한다.
이러한 달별로 계산하여 나온 월별 최댓값을 담을 변수 settingMaxDay
*/
let settingMaxDay;

/* 
최종적으로 선택된 결과를 기준으로 Dday가 얼마나 남았는지 계산한 값이
들어와야 할 변수 dDayNum
*/
let dDayNum;

/* addZero()
  월과 일 앞에 0을 붙여 스트링으로 만들어 인풋월일에 넣어주는 함수
*/
const addZero = () => {
  if (String(month).length === 1) {
    inpMonth = `0${month}`;
  } else {
    inpMonth = month;
  }
  if (String(day).length === 1) {
    inpday = `0${day}`;
  } else {
    inpday = day;
  }
};

/* dateChange()
  오늘과 목표일 사이의 기간을 계산해 Dday가 몇일남았는지 계산해주는 함수
*/
let dDayYear;
let dDayMonth;
let dDayDay;
let afterDate;
const dateChange = () => {
  afterDate = new Date(`${year}-${inpMonth}-${inpday}T00:00:00Z`);
  const dfm = afterDate - date;
  dDayNum = Math.ceil(dfm / (1000 * 60 * 60 * 24));
};

// 각각의 Dday 리스트들에 Dday 몇일이 남았는지 계산해주는 함수
// addZero 함수와 dateChange 함수의 기능을 조합해 새로만든 함수
//
let setDate; // 날짜를 ms 단위로 변환시킨 숫자
let setdDayNum; //남은 일수
const dDaydateChange = (setYear, setMonth, setDay) => {
  let changeSetYear = setYear;
  let changeSetMonth;
  let changeSetDay;

  if (String(setMonth).length === 1) {
    changeSetMonth = `0${setMonth}`;
  } else {
    changeSetMonth = setMonth;
  }
  if (String(setDay).length === 1) {
    changeSetDay = `0${setDay}`;
  } else {
    changeSetDay = setDay;
  }
  setDate = new Date(
    `${changeSetYear}-${changeSetMonth}-${changeSetDay}T00:00:00Z`
  );
  const dfm = setDate - date;
  setdDayNum = Math.ceil(dfm / (1000 * 60 * 60 * 24));
};

/* yuunMonthDays()
  윤달과 월별 한달에 몇일이 존재하는지 계산해 settingMaxDay에 넣어준는 함수
*/
const yuunMonthDays = () => {
  //윤달계산
  const check400 = year % 400;
  const check100 = year % 100;
  const check4 = year % 4;
  const oddAndEven = month % 2;
  if (month === "2") {
    if (!!check4 || (!check4 && !check100 && !!check400)) {
      settingMaxDay = 28;
    } else {
      settingMaxDay = 29;
    }
  } else if (oddAndEven) {
    // 홀수와 짝수 달
    settingMaxDay = 31;
  } else {
    settingMaxDay = 30;
  }
};
yuunMonthDays();
// 월이 변할때 일수가 월의 일 최대치보다 높으면 월 최대치로 바꿔주는 함수
const monthChange = (e) => {
  //const dayInput =e.target.parentElement.parentElement.querySelector(".option_after  .day input"); 에서 수정
  const dayInput = document.querySelector(".option_after  .day input");
  if (dayInput.value >= settingMaxDay) {
    dayInput.value = settingMaxDay;
    day = settingMaxDay;
  }
  if (
    nextTime.year === Number(year) &&
    nextTime.month === Number(month) &&
    nextTime.day > Number(day)
  ) {
    dayInput.value = nowTime.day + 1;
    day = nowTime.day + 1;
  }
  recalldate();
  saveList("setting_daily");
  console.log(year, month, day);
};

/*upNumber()
숫자업 함수 
*/
const upNumber = (calender_input, index) => {
  calender_input[index].value = `${Number(calender_input[index].value) + 1}`;
};
/*downNumber()
숫자 다운 함수 
*/
const downNumber = (calender_input, index) => {
  calender_input[index].value = `${Number(calender_input[index].value) - 1}`;
};

// 년을 조작하는 좌측버튼을 클릭하면 작동하는 함수
const yearDayDown = (parents, calender_input, index) => {
  const yearInput = parents.querySelector(".year input");
  const monthInput = parents.querySelector(".month input");
  const dayInput = parents.querySelector(".day input");
  /* 
  오늘의 연도 보다 인풋 밸류값이 클경우에만 작동
  오늘이 2023년 이라면  밸류가 2023 이하일때는 작동안함
  */
  if (calender_input[index].value > nextTime.year) {
    downNumber(calender_input, index);
    year = yearInput.value;
    // 아래로 내렸을때 년이 오늘과 같고
    //월이 오늘보다 작을때 작동하는 함수
    if (
      Number(yearInput.value) === nextTime.year &&
      monthInput.value < Number(nextTime.month)
    ) {
      monthInput.value = Number(nextTime.month);
      month = Number(nextTime.month);
      dayInput.value = Number(nextTime.day);
      day = Number(nextTime.day);
    }
  } else {
    year = nextTime.year;
  }
};

// 년을 조작하는 우측버튼을 클릭하면 작동하는 함수
const yearDayUp = (yearParents, calender_input, index) => {
  const yearInput = yearParents.querySelector(".year input");

  // 인풋 값이 3000 미만일때만 작동
  if (calender_input[index].value < 3000) {
    upNumber(calender_input, index);
    year = yearInput.value;
    // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
  }
};

// 달을 다운 작동시키면 작동하는 기능
const monthDayDown = (monthParents, calender_input, index) => {
  const monthInput = monthParents.querySelector(".month input");
  if (nextTime.year === Number(year) && nextTime.month >= Number(month)) {
    calender_input[index].value = 12;
    month = 12;
    return;
  } else {
    if (calender_input[index].value > 1) {
      downNumber(calender_input, index);
      month = monthInput.value;
    } else {
      calender_input[index].value = 12;
      month = monthInput.value;
    }
  }
};

// 달을 업 작동시키면 작동하는 기능
const monthDayUp = (monthParents, calender_input, index) => {
  const monthInput = monthParents.querySelector(".month input");
  // 12보다 밸류값이 작으면 업 작동 12보다 밸류값이 크면 1로
  if (calender_input[index].value < 12) {
    upNumber(calender_input, index);
    month = monthInput.value;
    // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
  } else {
    calender_input[index].value = 1;
    month = 1;
    if (nextTime.year === Number(year)) {
      calender_input[index].value = nextTime.month;
      month = nextTime.month;
    }
  }
  if (nextTime.year === Number(year) && nextTime.month >= Number(month)) {
    calender_input[index].value = nextTime.month;
    month = nextTime.month;
  }
};

// 일을 다운 작동시키면 작동하는 기능
const dayDown = (dayParents, calender_input, index) => {
  const dayInput = dayParents.querySelector(".day input");

  if (calender_input[index].value > 1) {
    downNumber(calender_input, index);
    day = dayInput.value;
  } else {
    calender_input[index].value = settingMaxDay;
    day = dayInput.value;
  }
  if (
    nextTime.year === Number(year) &&
    nextTime.month === Number(month) &&
    nextTime.day > Number(day)
  ) {
    dayInput.value = settingMaxDay;
    day = settingMaxDay;
  }
};

// 일을 업 작동시키면 작동하는 기능
const dayUp = (dayParents, calender_input, index) => {
  const dayInput = dayParents.querySelector(".day input");

  if (calender_input[index].value < settingMaxDay) {
    upNumber(calender_input, index);
    day = dayInput.value;
    // 달이 설정되면 해당달에 일이 몇이나 남았는지 아래 함수로 적용
  } else {
    calender_input[index].value = 1;
    day = dayInput.value;
  }
};

// 컨트롤 버튼!!
const leftControlBtn = document.querySelector(".leftControlBtn");
const rightControlBtn = document.querySelector(".rightControlBtn");

const dateOnBtn = document.querySelector(".dateOnBtn");
const dateControl = document.querySelector(".dateControl");
dateOnBtn.addEventListener("click", () => {
  if (!dateControl.classList.contains("on")) {
    dateControl.classList.add("on");
    // ChangeDates();
    // controlAll && controlAll();
  } else {
    dateControl.classList.remove("on");
  }
});

const dateControlYear = dateControl.querySelector(".year");
const dateControlMonth = dateControl.querySelector(".month");
const dateControlDay = dateControl.querySelector(".day");

const dateControlCall = () => {
  dateControlYear.textContent = nowTime.year;
  dateControlMonth.textContent = nowTime.month;
  dateControlDay.textContent = nowTime.day;
};

let setting_daily;

let todoListPage = false;
