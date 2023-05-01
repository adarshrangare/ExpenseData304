
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {getDatabase,ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";


const firebaseConfig = {
    databaseURL : "https://expensedata-91ef6-default-rtdb.asia-southeast1.firebasedatabase.app/"

}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const itemListInDB = ref(database, "itemList","itemPrice");


console.log(app);

const inputFieldItem = document.getElementById("item");
const inputFieldPrice = document.getElementById("price");
const inputfieldname = document.getElementById("name");
const ItemTiles = document.getElementById("itemTiles")
const addButtonEl = document.getElementById("addButton");

addButtonEl.addEventListener("click",function(){

    let binputItem = inputFieldItem.value;
    let cinputPrice = inputFieldPrice.value;
    let ainputName = inputfieldname.value;

    if(ainputName=="" ){
        inputfieldname.classList.add("error");
        document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
        return;
    }

    if(binputItem=="" ){
        inputFieldItem.classList.add("error");
        document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
        return;
    }
    if(cinputPrice=="" ){
        inputFieldPrice.classList.add("error");
        document.getElementById("errormessage").innerHTML = "Enter the Valid Input";
        return;
    }
    
    let newItem = {
         ainputName,
         binputItem,
         cinputPrice
      };
    
    push(itemListInDB, newItem);

    
    
    // console.log(inputPrice + inputItem);

    // ItemListUpdate(inputItem,inputPrice);
    clearfield();

})
onValue(itemListInDB, function(snapshot){
       

    let itemsArray = Object.values(Object.values(snapshot.val()));

    ItemTiles.innerHTML = "";
    
    for(let i=0;i<itemsArray.length;i++){
        let Array = Object.values(itemsArray[i]);
        
        
        ItemListUpdate(Array[0],Array[1],Array[2]);
    }
})


function clearfield(){

    inputFieldItem.value = "";
    inputFieldPrice.value = "";
}

function ItemListUpdate(name,item,price){

    ItemTiles.innerHTML +=`<div>
    <li>${name}</li><li>${item}</li> <li>${price}</li>
   </div> `
}