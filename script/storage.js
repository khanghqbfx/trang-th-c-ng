'use strict';

//Bổ sung Animation cho Sibebar
const navBar = document.getElementById("sidebar");
    navBar.addEventListener("click" , function(){
    this.classList.toggle("active")
});

// lấy dữ liệu để test
const data1  = {
    id : "P001",
    name : "Tom", 
    age : 3,
    type : "Cat",
    weight : 5  , 
    length : 50 , 
    breed : "Tabby",
    color : "red" , 
    vaccinated : true ,
    dewormed : true ,
    sterilized : true ,
   date : new Date(2022 , 3, 2),

}

const data2 = {
    id : "P002",
    name : "Type", 
    age : 5,
    type : "Dog",
    weight : 3  , 
    length : 40 , 
    breed : "Mixed Breed",
    color : "green" , 
    vaccinated : false ,
    dewormed : false ,
    sterilized : false,
   date : new Date(2022 , 3, 2)
 
};


const breedAl = {
    type : "Cat",
    breed : "Mèo Con",
};

const breedBl = {
    breed : "Mèo Dia" ,
    type: "Cat"
};


if(!getFromStorage("petArr")){
    //gắn dữ liệu để test
    saveToStorage("petArr",[data1, data2]);
}

// lấy dữ liệu PetArr
 const petArr = getFromStorage("petArr");

//hàm  dữ liệu breed
if(!getFromStorage("breedArr")){
    //gắn dữ liệu để test
    saveToStorage("breedArr", [breedAl , breedBl]);
}
 const breedArr = getFromStorage("breedArr");
 console.log(breedArr);

 //hàm lấy dữ liệu
function getFromStorage(key){
    return JSON.parse(localStorage.getItem(key))
 
 }
 // hàm để lưu  trữ dữ liệu
   function saveToStorage(key, value){
     localStorage.setItem(key, JSON.stringify(value));
   }
 