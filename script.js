const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const list = document.getElementById("list");

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;

  const li = document.createElement("li");
  li.innerHTML = `${text} <span>${amount}</span>`;

  list.appendChild(li);
}
