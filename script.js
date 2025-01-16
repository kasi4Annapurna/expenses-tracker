// Financial data storage
let expenses = [];
let income = 0;
let goalAmount = 0;

document.getElementById('add-entry').addEventListener('click', function() {
  const expenseAmount = parseFloat(document.getElementById('expense').value);
  const incomeAmount = parseFloat(document.getElementById('income').value);
  const category = document.getElementById('category').value;

  // Check if income and expense inputs are valid
  if (!isNaN(expenseAmount) && expenseAmount > 0 && category !== "") {
    expenses.push({ amount: expenseAmount, category: category });
    console.log('Expense Added:', { amount: expenseAmount, category: category });
  } else {
    alert("Please enter a valid expense amount and category.");
  }

  if (!isNaN(incomeAmount) && incomeAmount > 0) {
    income = incomeAmount;
    console.log('Income Set:', incomeAmount);
  } else if (incomeAmount !== "") {
    alert("Please enter a valid income amount.");
  }

  updateFinancialSummary();
  updateGoalProgress();
});

document.getElementById('set-goal').addEventListener('click', function() {
  goalAmount = parseFloat(document.getElementById('goalAmount').value);
  
  if (isNaN(goalAmount) || goalAmount <= 0) {
    alert("Please enter a valid goal amount.");
  } else {
    console.log(`Goal set: $${goalAmount}`);
    updateGoalStatus();
  }
});

// Update the financial summary with total expense and income
function updateFinancialSummary() {
  let totalExpense = expenses.reduce((acc, entry) => acc + entry.amount, 0);
  let balance = income - totalExpense;

  document.getElementById('total-income').innerText = income;
  document.getElementById('total-expense').innerText = totalExpense;
  document.getElementById('balance').innerText = balance;
}

// Update the goal status display
function updateGoalStatus() {
  document.getElementById('goal-display').innerText = goalAmount;
}

// Update the goal progress based on the current balance
function updateGoalProgress() {
  if (goalAmount > 0) {
    let totalExpense = expenses.reduce((acc, entry) => acc + entry.amount, 0);
    let balance = income - totalExpense;

    let progress = (balance / goalAmount) * 100;

    progress = progress > 100 ? 100 : progress < 0 ? 0 : progress;

    document.getElementById('goal-progress').innerText = `${Math.round(progress)}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    if (progress >= 100) {
      alert('Congratulations! You have reached your goal!');
    }
  }
}
