'use strict';

const YEARS_OF_STUDY = 4;
const TABLE_COLS = 4;
const tableColsName = [
  'ФИО студента',
  'Факультет',
  'Дата рождения',
  'Годы обучения',
];
const departments = [
  'Математический',
  'Физический',
  'Биологический',
  'Географический',
  'Философский',
];
// sudents
//** test array */
const testStudents = [
  {
    name: 'Константин',
    lastname: 'Федоров',
    middlename: 'Юрьевич',
    dateOfBirth: new Date(1989, 0, 1),
    enteredYear: 2000,
    departmentNum: 3,
    department: departments[3],
  },
  {
    name: 'Иван',
    lastname: 'Петров',
    middlename: 'Васильевич',
    dateOfBirth: new Date(1989, 0, 1),
    enteredYear: 2000,
    departmentNum: 1,
    department: departments[1],
  },
  {
    name: 'Василий',
    lastname: 'Иванов',
    middlename: 'Васильевич',
    dateOfBirth: new Date(1988, 2, 5),
    enteredYear: 2003,
    departmentNum: 0,
    department: departments[0],
  },
  {
    name: 'Петр',
    lastname: 'Васильев',
    middlename: 'Иванович',
    dateOfBirth: new Date(1976, 2, 5),
    enteredYear: 2020,
    departmentNum: 4,
    department: departments[4],
  },
];

// =================================
// array
let students = [];
// data table
let studentsTable = [];

// todo test
// students = testStudents;

// get student`s age
function getAge(dateOfBirth) {
  let age = new Date().getFullYear() - dateOfBirth.getFullYear();
  // consider declination of numerals
  if (String(age).endsWith('1')) {
    age += ' год';
  } else if (
    String(age).endsWith('2') ||
    String(age).endsWith('3') ||
    String(age).endsWith('4')
  ) {
    age += ' года';
  } else {
    age += ' лет';
  }

  return age;
}

// format date to DD.MM.YYYYY or YYYY-MM-DD
function formatDate(date, separator = '.', reversed = false) {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yyyy = date.getFullYear();

  if (!reversed) {
    return dd + separator + mm + separator + yyyy;
  } else {
    return yyyy + separator + mm + separator + dd;
  }
}

// get date from inputDate.value
function getDateFromInput(value) {
  value = String(value).slice(0, 10);
  return new Date(
    parseInt(String(value).split('-')[0]),
    parseInt(String(value).split('-')[1]),
    parseInt(String(value).split('-')[2])
  );
}

// get student`s course
// returns (-1) if finished
function getCourse(entered) {
  let course = new Date().getFullYear() - entered;
  return course <= YEARS_OF_STUDY ? course : -1;
}

// check if finished
function finished(entered) {
  return new Date().getFullYear() - entered > YEARS_OF_STUDY ? true : false;
}

// prepare tabledata
function studentToTable(student) {
  return {
    name: student.name,
    lastname: student.lastname,
    middlename: student.middlename,
    fullname: `${student.lastname} ${student.name} ${student.middlename}`,
    dateOfBirth: formatDate(student.dateOfBirth),
    age: getAge(student.dateOfBirth),
    departmentNum: student.departmentNum,
    department: student.department,
    enteredYear: student.enteredYear,
    finishYear: Number(student.enteredYear) + YEARS_OF_STUDY,
    course: getCourse(student.enteredYear),
    finished: finished(student.enteredYear),
  };
}

// layout
function createContainer(mount) {
  mount.classList.add('container');
}

function createHeading() {
  const h1 = document.createElement('h1');
  h1.classList.add(
    'mb-3',
    'p-3',
    'text-center',
    'text-uppercase',
    'bg-light',
    'shadow'
  );
  h1.innerText = 'список студентов';

  return h1;
}
// row
function createRow() {
  const row = document.createElement('div');
  row.classList.add('row', 'mb-3');

  row.formContainer = document.createElement('div');
  row.formContainer.classList.add('col-6');
  row.appendChild(row.formContainer);

  row.filterContainer = document.createElement('div');
  row.filterContainer.classList.add('col-6');
  row.appendChild(row.filterContainer);

  return row;
}
// input form
function createInputForm() {
  let inputForm = {};

  inputForm.heading = document.createElement('h4');
  inputForm.heading.innerText = 'Добавить студента';
  // form
  inputForm.form = document.createElement('form');
  inputForm.form.id = 'addstudent';
  inputForm.form.name = 'addstudent';
  // lastname
  inputForm.form.divLastname = document.createElement('div');
  inputForm.form.divLastname.classList.add('input-group', 'mb-2');
  inputForm.form.appendChild(inputForm.form.divLastname);
  inputForm.form.divLastname.span = document.createElement('span');
  inputForm.form.divLastname.span.classList.add('input-group-text');
  inputForm.form.divLastname.span.innerText = 'Фамилия';
  inputForm.form.divLastname.appendChild(inputForm.form.divLastname.span);
  inputForm.form.divLastname.inputText = document.createElement('input');
  inputForm.form.divLastname.inputText.type = 'text';
  inputForm.form.divLastname.inputText.id = 'lastname';
  inputForm.form.divLastname.inputText.required = true;
  inputForm.form.divLastname.inputText.classList.add('form-control');
  inputForm.form.divLastname.inputText.placeholder = 'Введите фамилию...';
  inputForm.form.divLastname.appendChild(inputForm.form.divLastname.inputText);
  // name
  inputForm.form.divName = document.createElement('div');
  inputForm.form.divName.classList.add('input-group', 'mb-2');
  inputForm.form.appendChild(inputForm.form.divName);
  inputForm.form.divName.span = document.createElement('span');
  inputForm.form.divName.span.classList.add('input-group-text');
  inputForm.form.divName.span.innerText = 'Имя';
  inputForm.form.divName.appendChild(inputForm.form.divName.span);
  inputForm.form.divName.inputText = document.createElement('input');
  inputForm.form.divName.inputText.type = 'text';
  inputForm.form.divName.inputText.id = 'name';
  inputForm.form.divName.inputText.required = true;
  inputForm.form.divName.inputText.classList.add('form-control');
  inputForm.form.divName.inputText.placeholder = 'Введите имя...';
  inputForm.form.divName.appendChild(inputForm.form.divName.inputText);
  // middlename
  inputForm.form.divMiddlename = document.createElement('div');
  inputForm.form.divMiddlename.classList.add('input-group', 'mb-2');
  inputForm.form.appendChild(inputForm.form.divMiddlename);
  inputForm.form.divMiddlename.span = document.createElement('span');
  inputForm.form.divMiddlename.span.classList.add('input-group-text');
  inputForm.form.divMiddlename.span.innerText = 'Отчество';
  inputForm.form.divMiddlename.appendChild(inputForm.form.divMiddlename.span);
  inputForm.form.divMiddlename.inputText = document.createElement('input');
  inputForm.form.divMiddlename.inputText.type = 'text';
  inputForm.form.divMiddlename.inputText.id = 'middlename';
  inputForm.form.divMiddlename.inputText.required = true;
  inputForm.form.divMiddlename.inputText.classList.add('form-control');
  inputForm.form.divMiddlename.inputText.placeholder = 'Введите отчество...';
  inputForm.form.divMiddlename.appendChild(
    inputForm.form.divMiddlename.inputText
  );
  // date of birth
  let maxDate = new Date();
  let maxVal = formatDate(maxDate, '-', true);
  inputForm.form.divDateOfBirth = document.createElement('div');
  inputForm.form.divDateOfBirth.classList.add('input-group', 'mb-2');
  inputForm.form.appendChild(inputForm.form.divDateOfBirth);
  inputForm.form.divDateOfBirth.span = document.createElement('span');
  inputForm.form.divDateOfBirth.span.classList.add('input-group-text');
  inputForm.form.divDateOfBirth.span.innerText = 'Дата рождения';
  inputForm.form.divDateOfBirth.appendChild(inputForm.form.divDateOfBirth.span);
  inputForm.form.divDateOfBirth.inputDate = document.createElement('input');
  inputForm.form.divDateOfBirth.inputDate.type = 'date';
  inputForm.form.divDateOfBirth.inputDate.id = 'dateofbirth';
  inputForm.form.divDateOfBirth.inputDate.required = true;
  inputForm.form.divDateOfBirth.inputDate.setAttribute('min', '1900-01-01');
  inputForm.form.divDateOfBirth.inputDate.setAttribute('max', maxVal);
  inputForm.form.divDateOfBirth.inputDate.classList.add('form-control');
  inputForm.form.divDateOfBirth.appendChild(
    inputForm.form.divDateOfBirth.inputDate
  );
  // entered year
  inputForm.form.divEnteredYear = document.createElement('div');
  inputForm.form.divEnteredYear.classList.add('input-group', 'mb-2');
  inputForm.form.appendChild(inputForm.form.divEnteredYear);
  inputForm.form.divEnteredYear.span = document.createElement('span');
  inputForm.form.divEnteredYear.span.classList.add('input-group-text');
  inputForm.form.divEnteredYear.span.innerText = 'Год начала обучения';
  inputForm.form.divEnteredYear.appendChild(inputForm.form.divEnteredYear.span);
  inputForm.form.divEnteredYear.inputNumber = document.createElement('input');
  inputForm.form.divEnteredYear.inputNumber.type = 'number';
  inputForm.form.divEnteredYear.inputNumber.id = 'enteredyear';
  inputForm.form.divEnteredYear.inputNumber.required = true;
  inputForm.form.divEnteredYear.inputNumber.setAttribute('min', 2000);
  inputForm.form.divEnteredYear.inputNumber.setAttribute(
    'max',
    maxDate.getFullYear()
  );
  inputForm.form.divEnteredYear.inputNumber.classList.add('form-control');
  inputForm.form.divEnteredYear.inputNumber.placeholder = '2000';
  inputForm.form.divEnteredYear.appendChild(
    inputForm.form.divEnteredYear.inputNumber
  );
  // departament
  inputForm.form.divDepartment = document.createElement('div');
  inputForm.form.divDepartment.classList.add('input-group', 'mb-1');
  inputForm.form.appendChild(inputForm.form.divDepartment);
  inputForm.form.divDepartment.span = document.createElement('span');
  inputForm.form.divDepartment.span.classList.add('input-group-text');
  inputForm.form.divDepartment.span.innerText = 'Факультет';
  inputForm.form.divDepartment.appendChild(inputForm.form.divDepartment.span);
  inputForm.form.divDepartment.select = document.createElement('select');
  inputForm.form.divDepartment.select.id = 'department';
  inputForm.form.divDepartment.select.required = true;
  inputForm.form.divDepartment.select.classList.add('form-select');
  for (let i = 0; i < departments.length; ++i) {
    let option = document.createElement('option');
    if (i == 0) option.setAttribute('selected', 'true');
    option.setAttribute('value', i);
    option.innerText = departments[i];

    inputForm.form.divDepartment.select.appendChild(option);
  }
  inputForm.form.divDepartment.appendChild(inputForm.form.divDepartment.select);
  // btn group
  inputForm.form.divBtnGroup = document.createElement('div');
  inputForm.form.divBtnGroup.classList.add(
    'd-flex',
    'justify-content-between',
    'mt-4'
  );
  inputForm.form.appendChild(inputForm.form.divBtnGroup);
  // add student
  inputForm.form.divBtnGroup.btnAdd = document.createElement('button');
  inputForm.form.divBtnGroup.btnAdd.type = 'submit';
  inputForm.form.divBtnGroup.btnAdd.value = 'Add';
  inputForm.form.divBtnGroup.btnAdd.innerText = 'Добавить студента';
  inputForm.form.divBtnGroup.btnAdd.classList.add(
    'btn',
    'btn-sm',
    'btn-outline-success'
  );
  inputForm.form.divBtnGroup.appendChild(inputForm.form.divBtnGroup.btnAdd);
  // inputForm.form.appendChild(inputForm.form.divBtnGroup);
  // download list
  // inputForm.form.divBtnGroup.btnDownload = document.createElement('button');
  // inputForm.form.divBtnGroup.btnDownload.type = 'button';
  // inputForm.form.divBtnGroup.btnDownload.innerText = 'Загрузить список';
  // inputForm.form.divBtnGroup.btnDownload.classList.add(
  //   'btn',
  //   'btn-sm',
  //   'btn-outline-secondary'
  // );
  // inputForm.form.divBtnGroup.appendChild(
  //   inputForm.form.divBtnGroup.btnDownload
  // );
  // reset
  inputForm.form.appendChild(inputForm.form.divBtnGroup);
  inputForm.form.divBtnGroup.btnReset = document.createElement('button');
  inputForm.form.divBtnGroup.btnReset.type = 'reset';
  inputForm.form.divBtnGroup.btnReset.value = 'reset';
  inputForm.form.divBtnGroup.btnReset.innerText = 'Очистить форму';
  inputForm.form.divBtnGroup.btnReset.classList.add(
    'btn',
    'btn-sm',
    'btn-outline-danger'
  );
  inputForm.form.divBtnGroup.appendChild(inputForm.form.divBtnGroup.btnReset);

  return inputForm;
}
// filters
function createFilters() {
  let filter = {};

  filter.heading = document.createElement('h4');
  filter.heading.innerText = 'Поиск студентов';
  // form
  filter.form = document.createElement('form');
  filter.form.id = 'search';
  filter.form.name = 'search';
  // fullname search
  filter.form.divFullname = document.createElement('div');
  filter.form.divFullname.classList.add('form-check');
  filter.form.appendChild(filter.form.divFullname);
  // checkbox
  filter.form.divFullname.inputCheckbox = document.createElement('input');
  filter.form.divFullname.inputCheckbox.type = 'checkbox';
  filter.form.divFullname.inputCheckbox.id = 'fullnamecheck';
  filter.form.divFullname.inputCheckbox.classList.add('form-check-input');
  filter.form.divFullname.appendChild(filter.form.divFullname.inputCheckbox);
  // label
  filter.form.divFullname.label = document.createElement('label');
  filter.form.divFullname.label.setAttribute('for', 'fullnamecheck');
  filter.form.divFullname.label.classList.add('form-label');
  filter.form.divFullname.label.innerText = 'Фамилия, имя, отчество  студента';
  filter.form.divFullname.appendChild(filter.form.divFullname.label);
  // input
  filter.form.divFullname.inputText = document.createElement('input');
  filter.form.divFullname.inputText.type = 'text';
  filter.form.divFullname.inputText.classList.add('form-control');
  filter.form.divFullname.inputText.disabled = true;
  filter.form.divFullname.inputText.placeholder = 'Введите фамилию...';
  filter.form.divFullname.appendChild(filter.form.divFullname.inputText);
  // department search
  filter.form.divDepartment = document.createElement('div');
  filter.form.divDepartment.classList.add('form-check');
  filter.form.appendChild(filter.form.divDepartment);
  // checkbox
  filter.form.divDepartment.inputCheckbox = document.createElement('input');
  filter.form.divDepartment.inputCheckbox.type = 'checkbox';
  filter.form.divDepartment.inputCheckbox.id = 'departmentcheck';
  filter.form.divDepartment.inputCheckbox.classList.add('form-check-input');
  filter.form.divDepartment.appendChild(
    filter.form.divDepartment.inputCheckbox
  );
  // label
  filter.form.divDepartment.label = document.createElement('label');
  filter.form.divDepartment.label.setAttribute('for', 'departmentcheck');
  filter.form.divDepartment.label.classList.add('form-label');
  filter.form.divDepartment.label.innerText = 'Факультет';
  filter.form.divDepartment.appendChild(filter.form.divDepartment.label);
  // select
  filter.form.divDepartment.select = document.createElement('select');
  filter.form.divDepartment.select.classList.add('form-select');
  filter.form.divDepartment.select.disabled = true;
  for (let i = 0; i < departments.length; ++i) {
    let option = document.createElement('option');
    if (i == 0) option.setAttribute('selected', 'true');
    option.setAttribute('value', i);
    option.innerText = departments[i];

    filter.form.divDepartment.select.appendChild(option);
  }
  filter.form.divDepartment.appendChild(filter.form.divDepartment.select);
  // entered year
  filter.form.divEnteredYear = document.createElement('div');
  filter.form.divEnteredYear.classList.add('form-check');
  filter.form.appendChild(filter.form.divEnteredYear);
  // checkbox
  filter.form.divEnteredYear.inputCheckbox = document.createElement('input');
  filter.form.divEnteredYear.inputCheckbox.type = 'checkbox';
  filter.form.divEnteredYear.inputCheckbox.id = 'enteredyearcheck';
  filter.form.divEnteredYear.inputCheckbox.classList.add('form-check-input');
  filter.form.divEnteredYear.appendChild(
    filter.form.divEnteredYear.inputCheckbox
  );
  // label
  filter.form.divEnteredYear.label = document.createElement('label');
  filter.form.divEnteredYear.label.setAttribute('for', 'enteredyearcheck');
  filter.form.divEnteredYear.label.classList.add('form-label');
  filter.form.divEnteredYear.label.innerText = 'Год начала обучения';
  filter.form.divEnteredYear.appendChild(filter.form.divEnteredYear.label);
  // input
  filter.form.divEnteredYear.inputNumber = document.createElement('input');
  filter.form.divEnteredYear.inputNumber.type = 'number';
  filter.form.divEnteredYear.inputNumber.classList.add('form-control');
  filter.form.divEnteredYear.inputNumber.disabled = true;
  filter.form.divEnteredYear.inputNumber.setAttribute('min', 2000);
  filter.form.divEnteredYear.inputNumber.placeholder = 2000;
  filter.form.divEnteredYear.appendChild(
    filter.form.divEnteredYear.inputNumber
  );
  // finish year
  filter.form.divFinishYear = document.createElement('div');
  filter.form.divFinishYear.classList.add('form-check');
  filter.form.appendChild(filter.form.divFinishYear);
  // checkbox
  filter.form.divFinishYear.inputCheckbox = document.createElement('input');
  filter.form.divFinishYear.inputCheckbox.type = 'checkbox';
  filter.form.divFinishYear.inputCheckbox.id = 'finishyearcheck';
  filter.form.divFinishYear.inputCheckbox.classList.add('form-check-input');
  filter.form.divFinishYear.appendChild(
    filter.form.divFinishYear.inputCheckbox
  );
  // label
  filter.form.divFinishYear.label = document.createElement('label');
  filter.form.divFinishYear.label.setAttribute('for', 'finishyearcheck');
  filter.form.divFinishYear.label.classList.add('form-label');
  filter.form.divFinishYear.label.innerText = 'Год окончания обучения';
  filter.form.divFinishYear.appendChild(filter.form.divFinishYear.label);
  // input
  filter.form.divFinishYear.inputNumber = document.createElement('input');
  filter.form.divFinishYear.inputNumber.type = 'number';
  filter.form.divFinishYear.inputNumber.classList.add('form-control');
  filter.form.divFinishYear.inputNumber.disabled = true;
  filter.form.divFinishYear.inputNumber.setAttribute('min', 2004);
  filter.form.divFinishYear.inputNumber.placeholder = 2004;
  filter.form.divFinishYear.appendChild(filter.form.divFinishYear.inputNumber);
  // btn group
  filter.form.divBtnGroup = document.createElement('div');
  filter.form.divBtnGroup.classList.add(
    'd-flex',
    'justify-content-between',
    'mt-2'
  );
  filter.form.appendChild(filter.form.divBtnGroup);
  // btn submit
  filter.form.divBtnGroup.btnSubmit = document.createElement('button');
  filter.form.divBtnGroup.btnSubmit.type = 'submit';
  filter.form.divBtnGroup.btnSubmit.value = 'submit';
  filter.form.divBtnGroup.btnSubmit.innerText = 'Поиск';
  filter.form.divBtnGroup.btnSubmit.classList.add(
    'btn',
    'btn-sm',
    'btn-outline-success'
  );
  filter.form.divBtnGroup.appendChild(filter.form.divBtnGroup.btnSubmit);
  // btn chooseAll
  filter.form.divBtnGroup.btnChooseAll = document.createElement('button');
  filter.form.divBtnGroup.btnChooseAll.type = 'button';
  filter.form.divBtnGroup.btnChooseAll.innerText = 'Выбрать всё';
  filter.form.divBtnGroup.btnChooseAll.classList.add(
    'btn',
    'btn-sm',
    'btn-outline-secondary'
  );
  filter.form.divBtnGroup.appendChild(filter.form.divBtnGroup.btnChooseAll);
  // btn reset
  filter.form.divBtnGroup.btnReset = document.createElement('button');
  filter.form.divBtnGroup.btnReset.type = 'reset';
  filter.form.divBtnGroup.btnReset.value = 'reset';
  filter.form.divBtnGroup.btnReset.innerText = 'Очистить форму';
  filter.form.divBtnGroup.btnReset.classList.add(
    'btn',
    'btn-sm',
    'btn-outline-danger'
  );
  filter.form.divBtnGroup.appendChild(filter.form.divBtnGroup.btnReset);

  return filter;
}

function toggleDisableInput(input, chekbox) {
  chekbox.addEventListener('change', () => {
    !chekbox.checked
      ? input.setAttribute('disabled', 'true')
      : input.removeAttribute('disabled');
  });
}

// table
function createTable() {
  let table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover', 'shadow');

  return table;
}

function createTableHead() {
  let thead = document.createElement('thead');

  thead.tr = document.createElement('tr');
  thead.tr.classList.add('table-primary');
  thead.appendChild(thead.tr);

  thead.tr.th = [];

  for (let col = 0; col < TABLE_COLS; ++col) {
    let th = document.createElement('th');
    th.scope = 'col';
    th.btn = document.createElement('button');
    th.btn.type = 'button';
    th.btn.id = 'sortByFullname';
    th.btn.classList.add(
      'd-flex',
      'justify-content-between',
      'w-100',
      'btn',
      'btn-sm',
      'text-start',
      'fw-bold'
    );
    // names of table cols
    switch (col) {
      case 0:
        th.btn.innerHTML = `${tableColsName[0]}
            <span class="bi bi-sort-alpha-down">`;
        break;
      case 1:
        th.btn.innerHTML = `${tableColsName[1]}
             <span class="bi bi-sort-alpha-down">`;
        break;
      case 2:
        th.btn.innerHTML = `${tableColsName[2]}
            <span class="bi bi-sort-numeric-down">`;
        break;
      case 3:
        th.btn.innerHTML = `${tableColsName[3]}
            <span class="bi bi-sort-numeric-down">`;
        break;

      default:
        th.btn.innerText = 'Название не выбрано';
    }

    th.appendChild(th.btn);
    thead.tr.appendChild(th);
    thead.tr.th.push(th);
  }

  return thead;
}

function createTableBody(studentsTable = []) {
  if (!Array.isArray(studentsTable)) return;

  let tbody = document.createElement('tbody');

  tbody.tr = [];

  for (let student of studentsTable) {
    let tr = document.createElement('tr');
    tr.td = [];

    for (let col = 0; col < TABLE_COLS; ++col) {
      let td = document.createElement('td');
      // fill cells with student data
      switch (col) {
        case 0:
          td.innerText = student.fullname;
          break;
        case 1:
          td.innerText = student.department;
          break;
        case 2:
          td.innerText = `${student.dateOfBirth} (${student.age})`;
          break;
        case 3:
          td.innerText = `${student.enteredYear} - ${student.finishYear}`;
          if (student.finished || !student.course) {
            td.innerText += ' (закончил)';
          } else {
            td.innerText += ` (${student.course} курс)`;
          }
          break;
        default:
          td.innerText = 'Ошибка!';
      }
      // append and push cells into table-row
      tr.appendChild(td);
      tr.td.push(td);
    }
    // append and push table-row into table-body
    tbody.appendChild(tr);
    tbody.tr.push(tr);
  }

  return tbody;
}

// compare strings
function compareStrings(strA, strB) {
  strA.toUpperCase();
  strB.toUpperCase();
  if (strA < strB) {
    return -1;
  }
  if (strA > strB) {
    return 1;
  }
  return 0;
}
// compare numbers
function compareValues(valA, valB) {
  return parseInt(valA) - parseInt(valB);
}

// sort by
// name
function sortByFullname(studentsTable) {
  return studentsTable.sort((studentA, studentB) => {
    return compareStrings(studentA.fullname, studentB.fullname);
  });
}
// department
function sortByDepartment(studentsTable) {
  return studentsTable.sort((studentA, studentB) => {
    return compareStrings(studentA.department, studentB.department);
  });
}
// age
function sortByAge(studentsTable) {
  return studentsTable.sort((studentA, studentB) => {
    return compareValues(studentA.age, studentB.age);
  });
}
// enteredyear
function sortByEnteredYear(studentsTable) {
  return studentsTable.sort((studentA, studentB) => {
    return compareValues(studentA.enteredYear, studentB.enteredYear);
  });
}
// filter by
// namepart
function filterByNamePart(studentsTable, namePart) {
  let filtered = [];

  studentsTable.forEach((student) => {
    let fullname = student.fullname.toUpperCase();
    if (fullname.includes(namePart.trim().toUpperCase())) {
      filtered.push(student);
    }
  });

  return filtered;
}

// department
function filterByDepartment(studentsTable, department) {
  let filtered = [];

  studentsTable.forEach((student) => {
    if (student.departmentNum == department) {
      filtered.push(student);
    }
  });

  return filtered;
}

// entered year
function filterByEnteredYear(studentsTable, enteredYear) {
  let filtered = [];

  studentsTable.forEach((student) => {
    if (student.enteredYear == enteredYear) {
      filtered.push(student);
    }
  });

  return filtered;
}

// entered year
function filterByFinishYear(studentsTable, finishYear) {
  let filtered = [];

  studentsTable.forEach((student) => {
    if (student.finishYear == finishYear) {
      filtered.push(student);
    }
  });

  return filtered;
}

// capitalize
function capitalizeString(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.toLowerCase().slice(1);
}
/**
 * ===========
 * application
 * ===========
 */
function createApp(mount) {
  // mount point
  createContainer(mount);
  // heading
  mount.appendChild(createHeading());
  // before table block
  // left part - add students
  // right part - search students
  const row = createRow();
  mount.appendChild(row);
  // input form
  const inputForm = createInputForm();
  row.formContainer.appendChild(inputForm.heading);
  row.formContainer.appendChild(inputForm.form);
  // table
  let table = createTable();
  mount.appendChild(table);
  // table head
  let thead = createTableHead();
  table.appendChild(thead);
  // from localstorage
  students = JSON.parse(localStorage.getItem('studentsSaved')) || [];
  // represent student data
  // from initial array into table
  if (students.length) {
    for (let student of students) {
      // format date
      // this line for students from localstorage ONLY
      student.dateOfBirth = getDateFromInput(student.dateOfBirth);
      studentsTable.push(studentToTable(student));
    }
  }
  // table body
  let tbody = createTableBody(studentsTable);
  table.appendChild(tbody);

  /**
   * add students
   */
  inputForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newStudent = {};

    newStudent.name = capitalizeString(
      inputForm.form.divName.inputText.value.trim()
    );
    newStudent.lastname = capitalizeString(
      inputForm.form.divLastname.inputText.value.trim()
    );
    newStudent.middlename = capitalizeString(
      inputForm.form.divMiddlename.inputText.value.trim()
    );
    newStudent.dateOfBirth = getDateFromInput(
      inputForm.form.divDateOfBirth.inputDate.value
    );
    newStudent.enteredYear = inputForm.form.divEnteredYear.inputNumber.value;
    newStudent.departmentNum = inputForm.form.divDepartment.select.value;
    newStudent.department =
      departments[parseInt(inputForm.form.divDepartment.select.value)];

    students.push(newStudent);
    localStorage.setItem('studentsSaved', JSON.stringify(students));
    studentsTable.length = 0;

    for (let student of students) {
      studentsTable.push(studentToTable(student));
    }
    // table body
    tbody.remove();
    tbody = createTableBody(studentsTable);
    table.appendChild(tbody);
    // reset
    inputForm.form.reset();
  });

  // search students with filters
  // filter object
  const filter = createFilters();
  row.filterContainer.appendChild(filter.heading);
  row.filterContainer.appendChild(filter.form);
  // toggle disable inputs for search
  toggleDisableInput(
    filter.form.divFullname.inputText,
    filter.form.divFullname.inputCheckbox
  );
  toggleDisableInput(
    filter.form.divDepartment.select,
    filter.form.divDepartment.inputCheckbox
  );
  toggleDisableInput(
    filter.form.divEnteredYear.inputNumber,
    filter.form.divEnteredYear.inputCheckbox
  );
  toggleDisableInput(
    filter.form.divFinishYear.inputNumber,
    filter.form.divFinishYear.inputCheckbox
  );

  /**
   * filtering
   */
  // by part of name
  filter.form.divFullname.inputText.addEventListener('input', (e) => {
    let filtered = [];
    filtered = filterByNamePart(
      studentsTable,
      filter.form.divFullname.inputText.value
    );
    tbody.remove();
    tbody = createTableBody(filtered);
    table.appendChild(tbody);
  });

  // by department
  filter.form.divDepartment.select.addEventListener('click', () => {
    let filtered = [];
    filtered = filterByDepartment(
      studentsTable,
      filter.form.divDepartment.select.value
    );
    tbody.remove();
    tbody = createTableBody(filtered);
    table.appendChild(tbody);
  });

  // by entered year
  filter.form.divEnteredYear.inputNumber.addEventListener('input', () => {
    let filtered = [];
    filtered = filterByEnteredYear(
      studentsTable,
      filter.form.divEnteredYear.inputNumber.value
    );
    tbody.remove();
    tbody = createTableBody(filtered);
    table.appendChild(tbody);
  });

  // by finish year
  filter.form.divFinishYear.inputNumber.addEventListener('input', () => {
    let filtered = [];
    filtered = filterByFinishYear(
      studentsTable,
      filter.form.divFinishYear.inputNumber.value
    );
    tbody.remove();
    tbody = createTableBody(filtered);
    table.appendChild(tbody);
  });

  // submit
  filter.form.addEventListener('submit', (e) => {
    e.preventDefault();
    let filtered = [];
    // filtering by part of name
    if (filter.form.divFullname.inputCheckbox.checked) {
      filtered = filterByNamePart(
        studentsTable,
        filter.form.divFullname.inputText.value
      );
    }
    // filtering by department
    if (filter.form.divDepartment.inputCheckbox.checked) {
      if (
        filter.form.divFullname.inputCheckbox.checked ||
        filter.form.divEnteredYear.inputCheckbox.checked ||
        filter.form.divFinishYear.inputCheckbox.checked
      ) {
        filtered = filterByDepartment(
          filtered,
          filter.form.divDepartment.select.value
        );
      } else {
        filtered = filterByDepartment(
          studentsTable,
          filter.form.divDepartment.select.value
        );
      }
    }
    // filtering by entered year
    if (filter.form.divEnteredYear.inputCheckbox.checked) {
      if (
        filter.form.divFullname.inputCheckbox.checked ||
        filter.form.divDepartment.inputCheckbox.checked ||
        filter.form.divFinishYear.inputCheckbox.checked
      ) {
        filtered = filterByEnteredYear(
          filtered,
          filter.form.divEnteredYear.inputNumber.value
        );
      } else {
        filtered = filterByEnteredYear(
          studentsTable,
          filter.form.divEnteredYear.inputNumber.value
        );
      }
    }
    // filtering by finish year
    if (filter.form.divFinishYear.inputCheckbox.checked) {
      if (
        filter.form.divFullname.inputCheckbox.checked ||
        filter.form.divDepartment.inputCheckbox.checked ||
        filter.form.divEnteredYear.inputCheckbox.checked
      ) {
        filtered = filterByFinishYear(
          filtered,
          filter.form.divFinishYear.inputNumber.value
        );
      } else {
        filtered = filterByFinishYear(
          studentsTable,
          filter.form.divFinishYear.inputNumber.value
        );
      }
    }

    tbody.remove();
    tbody = createTableBody(filtered);
    table.appendChild(tbody);
  });
  // chose all
  filter.form.divBtnGroup.btnChooseAll.addEventListener('click', () => {
    filter.form.divFullname.inputCheckbox.checked = true;
    filter.form.divFullname.inputText.disabled = false;
    filter.form.divDepartment.inputCheckbox.checked = true;
    filter.form.divDepartment.select.disabled = false;
    filter.form.divEnteredYear.inputCheckbox.checked = true;
    filter.form.divEnteredYear.inputNumber.disabled = false;
    filter.form.divFinishYear.inputCheckbox.checked = true;
    filter.form.divFinishYear.inputNumber.disabled = false;
  });

  // reset
  filter.form.divBtnGroup.btnReset.addEventListener('click', () => {
    filter.form.divFullname.inputText.disabled = true;
    filter.form.divDepartment.select.disabled = true;
    filter.form.divEnteredYear.inputNumber.disabled = true;
    filter.form.divFinishYear.inputNumber.disabled = true;
  });

  /**sorting
   * remove table body
   * sort table-array of students
   * create and append sorted table-body
   */
  // sort by fullname
  thead.tr.th[0].btn.addEventListener('click', () => {
    tbody.remove();
    tbody = createTableBody(sortByFullname(studentsTable));
    table.appendChild(tbody);
  });
  // sort by department
  thead.tr.th[1].btn.addEventListener('click', () => {
    tbody.remove();
    tbody = createTableBody(sortByDepartment(studentsTable));
    table.appendChild(tbody);
  });
  // sort by age
  thead.tr.th[2].btn.addEventListener('click', () => {
    tbody.remove();
    tbody = createTableBody(sortByAge(studentsTable));
    table.appendChild(tbody);
  });
  // sort by enteredyear
  thead.tr.th[3].btn.addEventListener('click', () => {
    tbody.remove();
    tbody = createTableBody(sortByEnteredYear(studentsTable));
    table.appendChild(tbody);
  });
}

// export

export { createApp };
