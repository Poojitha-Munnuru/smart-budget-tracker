const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

let transactions = [];

function addTransaction(){

const text = document.getElementById("text").value;
const amount = parseInt(document.getElementById("amount").value);

if(text === "" || isNaN(amount)){
alert("Enter description and amount");
return;
}

const transaction = {
text:text,
amount:amount
};

transactions.push(transaction);

const li = document.createElement("li");

li.innerHTML = `${text} : ₹${amount}`;

list.appendChild(li);

updateValues();

document.getElementById("text").value="";
document.getElementById("amount").value="";

}

function updateValues(){

let total=0;
let inc=0;
let exp=0;

transactions.forEach(t=>{

total += t.amount;

if(t.amount>0){
inc += t.amount;
}else{
exp += t.amount;
}

});

balance.innerText="₹"+total;
income.innerText="₹"+inc;
expense.innerText="₹"+Math.abs(exp);

}
