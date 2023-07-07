// Retrieve expenses from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display expenses on the screen
function displayExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  if (expenses.length === 0) {
    expenseList.innerHTML = '<p>No expenses to show</p>';
    return;
  }

  expenses.forEach((expense, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${expense.product}</h5>
        <p class="card-text">Amount: $${expense.amount}</p>
        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
      </div>
    `;
    expenseList.appendChild(card);
  });
}

// Function to add an expense
function addExpense(e) {
  e.preventDefault();

  const productInput = document.getElementById('product');
  const amountInput = document.getElementById('amount');

  const product = productInput.value;
  const amount = parseFloat(amountInput.value);

  if (product === '' || isNaN(amount)) {
    alert('Please enter a valid product and amount.');
    return;
  }

  const expense = {
    product,
    amount
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  productInput.value = '';
  amountInput.value = '';

  displayExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Event listener for form submission
document.getElementById('expense-form').addEventListener('submit', addExpense);

// Event listener for delete button clicks
document.getElementById('expense-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const index = parseInt(e.target.dataset.index);
    deleteExpense(index);
  }
});

// Display expenses on page load
displayExpenses();
