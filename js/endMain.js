leftControlBtn.addEventListener("click", () => {
  controlDate = controlDate - 1;
  controlNextDate = controlDate + dDayNum + 1;
  const option_after = document.querySelector(".option_after");
  day = day - 1;
  option_after && monthChange();
  ChangeDates();
  changeDdayNum();
  controlAll && controlAll();
});
rightControlBtn.addEventListener("click", () => {
  if (todoListPage && dDays <= 0) {
    return;
  }
  controlDate = controlDate + 1;
  controlNextDate = controlDate + dDayNum + 1;
  const option_after = document.querySelector(".option_after");
  day = day + 1;
  option_after && monthChange();
  ChangeDates();
  changeDdayNum();
  controlAll && controlAll();
});

const daysUps = () => {
  const option_after = document.querySelector(".option_after");
  const dayInput = document.querySelector(".option_after .day input");
  dayUp(option_after, dayInput, 0);
};

const loadList = () => {
  const option_after = document.querySelector(".option_after");
  setting_daily = JSON.parse(localStorage.getItem("setting_daily"));
  controlAll();
  if (setting_daily) {
    year = setting_daily.year;
    month = setting_daily.month;
    day = setting_daily.day;
    option_after && dateLoadFunc();
    option_after && recalldate();
    dateChange();
  }
};
loadList();
