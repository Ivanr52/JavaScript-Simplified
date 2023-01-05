import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'

const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const previousMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentDate = new Date()

datePickerButton.addEventListener('click', () => {
  //Open and close datepicker when datepicker button is clicked
  datePicker.classList.toggle('show')
  //Get the currently selected date
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = selectedDate
  setupDatePicker(selectedDate)
})

function setDate(date) {
  datePickerButton.innerText = format(date, 'MMMM do, yyyy')
  //Create data attribute 'selected-date' on dataPickerButton and set it equal to current time in Unix format. Stores date on button itself
  datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, 'MMMM - yyyy')
  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  //Gets all dates between firstweekstart and lastweekend
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  dateGrid.innerHTML = ''
  dates.forEach((date) => {
    const dateElement = document.createElement('button')
    dateElement.classList.add('date')
    dateElement.innerText = date.getDate()
    //Greys out dates from other months by adding class
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add('selected')
    }

    dateElement.addEventListener('click', () => {
      setDate(date)
      datePicker.classList.remove('show')
    })
    dateGrid.appendChild(dateElement)
  })
}

nextMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  //Update global variable currentDate and call setupDatePicker to re-render datepicker with correct values
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

previousMonthButton.addEventListener('click', () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

setDate(new Date())
