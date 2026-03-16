
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

let total = 0;
let inc = 0;
let exp = 0;

function addTransaction() {

let text = document.getElementById("text").value;
let amount = Number(document.getElementById("amount").value);

if(text === "" || amount === 0){
alert("Enter description and amount");
return;
}

let li = document.createElement("li");
li.innerText = text + " : ₹" + amount;

list.appendChild(li);

if(amount > 0){
inc += amount;
}else{
exp += Math.abs(amount);
}

total = inc - exp;

balance.innerText = "₹" + total;
income.innerText = "₹" + inc;
expense.innerText = "₹" + exp;

document.getElementById("text").value = "";
document.getElementById("amount").value = "";

}
