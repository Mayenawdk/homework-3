document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript is loaded and DOM is ready!');

  // Get a reference to the #add-employees-btn element
  const addEmployeesBtn = document.querySelector('#add-employees-btn');
  if (!addEmployeesBtn) {
    console.error('Error: "Add Employees" button not found.');
    return;
  }

  console.log('Add Employees button:', addEmployeesBtn);

  // Function to collect employee data
  const collectEmployees = function() {
    let employees = [];
    let continueAdding = true;

    while (continueAdding) {
      let firstName = prompt("Enter first name:");
      let lastName = prompt("Enter last name:");
      let salary = parseFloat(prompt("Enter salary:"));

      if (isNaN(salary)) {
        salary = 0;
      }

      employees.push({ firstName, lastName, salary });
      console.log('Employee added:', { firstName, lastName, salary });

      continueAdding = confirm("Do you want to add another employee?");
    }

    return employees;
  }

  // Function to display the average salary
  const displayAverageSalary = function(employeesArray) {
    if (employeesArray.length === 0) {
      console.log("No employees to calculate the average salary.");
      return;
    }

    let totalSalary = employeesArray.reduce((total, employee) => total + employee.salary, 0);
    let averageSalary = totalSalary / employeesArray.length;

    console.log(`The average salary of the ${employeesArray.length} employees is $${averageSalary.toFixed(2)}.`);
  }

  // Function to get a random employee
  const getRandomEmployee = function(employeesArray) {
    if (employeesArray.length === 0) {
      console.log("No employees to select.");
      return;
    }

    let randomIndex = Math.floor(Math.random() * employeesArray.length);
    let randomEmployee = employeesArray[randomIndex];

    console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
  }

  // Function to display employee data in an HTML table
  const displayEmployees = function(employeesArray) {
    const employeeTable = document.querySelector('#employee-table');
    if (!employeeTable) {
      console.error('Error: Employee table not found.');
      return;
    }

    // Clear the employee table
    employeeTable.innerHTML = '';

    // Loop through the employee data and create a row for each employee
    for (let i = 0; i < employeesArray.length; i++) {
      const currentEmployee = employeesArray[i];

      const newTableRow = document.createElement("tr");

      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = currentEmployee.firstName;
      newTableRow.append(firstNameCell);

      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = currentEmployee.lastName;
      newTableRow.append(lastNameCell);

      const salaryCell = document.createElement("td");
      // Format the salary as currency
      salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });

      newTableRow.append(salaryCell);
      employeeTable.append(newTableRow);
    }

    console.log('Employees displayed in table:', employeesArray);
  }

  // Function to track employee data
  const trackEmployeeData = function() {
    const employees = collectEmployees();

    console.table(employees);

    displayAverageSalary(employees);

    console.log('==============================');

    getRandomEmployee(employees);

    employees.sort(function(a, b) {
      if (a.lastName < b.lastName) {
        return -1;
      } else {
        return 1;
      }
    });

    displayEmployees(employees);
  }

  // Add event listener to 'Add Employees' button
  addEmployeesBtn.addEventListener('click', trackEmployeeData);
});
