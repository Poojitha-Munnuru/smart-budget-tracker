let balance = 0;

function addTransaction(){

let text = document.getElementById("text").value;
let amount = Number(document.getElementById("amount").value);

if(text === "" || amount === 0){
alert("Please enter valid data");
return;
}

balance += amount;

document.getElementById("balance").innerText = "₹" + balance;

let li = document.createElement("li");
li.innerText = text + " : ₹" + amount;

document.getElementById("list").appendChild(li);

document.getElementById("text").value="";
document.getElementById("amount").value="";
}