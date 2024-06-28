import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://expensedata-91ef6-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemListInDB = ref(database, "itemList", "itemPrice");

// console.log(app);
console.log({ itemListInDB });

const inputFieldItem = document.getElementById("item");
const inputFieldPrice = document.getElementById("price");
const inputfieldname = document.getElementById("name");
const ItemTiles = document.getElementById("itemTiles");
const addButtonEl = document.getElementById("addButton");

const total = document.getElementById("total");
const adarsh = document.getElementById("adarsh");
// const rupesh = document.getElementById("rupesh")

const vikas = document.getElementById("vikas");
const manav = document.getElementById("manav");
const perPerson = document.getElementById("perPerson");

addButtonEl.addEventListener("click", function () {
  let binputItem = inputFieldItem.value;
  let cinputPrice = inputFieldPrice.value;
  let ainputName = inputfieldname.value;

  if (ainputName == "") {
    inputfieldname.classList.add("error");
    document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
    return;
  }

  if (binputItem == "") {
    inputFieldItem.classList.add("error");
    document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
    return;
  }
  if (cinputPrice == "") {
    inputFieldPrice.classList.add("error");
    document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
    return;
  }

  let newItem = {
    ainputName,
    binputItem,
    cinputPrice,
  };

  push(itemListInDB, newItem);

  // console.log(inputPrice + inputItem);

  // ItemListUpdate(inputItem,inputPrice);
  clearfield();
});
onValue(itemListInDB, function (snapshot) {
  let itemsArray = Object.values(Object.values(snapshot.val()));

  console.log({ itemsArray });

  ItemTiles.innerHTML = "";

  for (let i = 0; i < itemsArray.length; i++) {
    let Array = Object.values(itemsArray[i]);
    ItemListUpdate(Array[0], Array[1], Array[2]);
  }

  const result = calculteResult(itemsArray);

  UpdateResult(result);
});

function clearfield() {
  inputFieldItem.value = "";
  inputFieldPrice.value = "";
}

function ItemListUpdate(name, item, price) {
  ItemTiles.innerHTML += `<div>
    <li>${name}</li><li>${item}</li> <li>${price}</li>
   </div> `;
}

function UpdateResult(values) {
  console.log(values);
  total.textContent = values.totalVal;
  adarsh.textContent = values.adarshVal;
  rupesh.textContent = values.rupeshVal;
  vikas.textContent = values.vikasVal;
  manav.textContent = values.manavVal;
  perPerson.textContent = values.perPerson;
}

function calculteResult(data) {
  const manavVal = data
    .filter((item) => item.ainputName.trim().toLowerCase() == "manav")
    .reduce((acc, curr) => {
      return acc + curr.cinputPrice * 1;
    }, 0);
  const adarshVal = data
    .filter((item) => item.ainputName.trim().toLowerCase() == "adarsh")
    .reduce((acc, curr) => {
      return acc + curr.cinputPrice * 1;
    }, 0);
  const rupeshVal = data
    .filter((item) => item.ainputName.trim().toLowerCase() == "rupesh")
    .reduce((acc, curr) => {
      return acc + curr.cinputPrice * 1;
    }, 0);
  const vikasVal = data
    .filter((item) => item.ainputName.trim().toLowerCase() == "vikas")
    .reduce((acc, curr) => {
      return acc + curr.cinputPrice * 1;
    }, 0);

  //   console.log({ resultManav });
  //   console.log({ resultVikas });
  //   console.log({ resultRupesh });
  //   console.log({ resultAdarsh });

  const totalVal = data.reduce((acc, curr) => {
    return acc + curr.cinputPrice * 1;
  }, 0);

  const perPerson = totalVal / 4;

  return { adarshVal, manavVal, rupeshVal,perPerson, vikasVal, totalVal };
}


const warningMessage = document.querySelector('.warning');

const date = new Date()

if(date.getDate() < 5 ){
    warningMessage.classList.add("show");
  }else{
  warningMessage.classList.add("hide");

}