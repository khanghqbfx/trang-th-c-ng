'use strict';
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl  = document.getElementById("tbody")
const formEl = document.getElementById("container-form")
const healthyBtn = document.getElementById("healthy-btn")

//Hiển  thị dữ liệu các thú cưng vào bảng
function renderTableData(petArr){
    
    tableBodyEl.innerHTML = '';

    petArr.forEach((pet) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <th scope="row">${pet.id}</th>
          <td>${pet.name}</td>
          <td>${pet.age}</td>
          <td>${pet.type}</td>
          <td>${pet.weight} kg</td>
          <td>${pet.length} cm</td>
          <td>${pet.breed}</td>
          <td>
              <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
          </td>
          <td>
              <i class="bi ${pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i>
          </td>
          <td>
              <i class="bi ${pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i>
          </td>
          <td>
              <i class="bi ${pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i>
          </td>
          <td>
              ${displayTime(pet.date).slice(5,7)}/
              ${displayTime(pet.date).slice(5,7)}/
              ${displayTime(pet.date).slice(0,4)}
          </td>
          <td>
              <button class="btn btn-danger" onclick="editpet('${pet.id}')">Edit</button>
          </td>
        `;
        // Append the row to a table element
        tableBodyEl.appendChild(row);
      });
};
      
//Hiển thị dữ liệu các thú cưng vào bảng
 renderTableData(petArr)

//Hiển thị thời gian
    function displayTime(date){
        if(typeof date === "string"){
          return date;
        } else if(typeof date === "object"){
          return JSON.parse(JSON.stringify(date));
        }
      };


function editpet(id){
    //hiện lại form để nhập dữ liệu..
    formEl.classList.remove("hide");
    //Tìm đến dữ liệu  của thú cưng cần Edit
     const pet = petArr.find((petItem)=> petItem.id === id);
     //hiển thị nhung thông tin trên Form
     idInput.value = pet.id ;
     nameInput.value = pet.name;
     ageInput.value = pet.age;
     typeInput.value = pet.type;
     weightInput.value =  pet.weight;
     lengthInput.value = pet.length;
     colorInput.value = pet.color;
     breedInput.value = pet.breed;
     vaccinatedInput.checked = pet.vaccinated;
     dewormedInput.checked = pet.dewormed;
     sterilizedInput.checked = pet.sterilized;

     //để hiển thị đúng các loại giống cho  từng loại Dog - Cat
     renderBreed()
     //hiển thị loại giống thú cưng
     breedInput.value =`${pet.breed}`;

};
//bắt sự kiên sau khi  bấm vào nút Type
typeInput.addEventListener("click",renderBreed)


function renderBreed(){
    breedInput.innerHTML ="<option>Select Breed</option>";
    //Nếu  type là Dog 
    if(typeInput.value === "Dog"){
        const breedDog = breedArr.filter((breedItem) => breedItem.type ==="Dog") 
        breedDog.forEach(function(breedItem) {
            const option = document.createElement("option")
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option)
            }); 
    //Nếu type là Cat
    } else if(typeInput.value === "Cat"){
        const breedCat = breedArr.filter((breedItem)=> breedItem.type ==="Cat");
        breedCat.forEach(function(breedItem){
            const option = document.createElement("option")
            option.innerHTML = `${breedItem.breed}`;
            breedInput.appendChild(option)
        })
    }
};

submitBtn.addEventListener("click", function(){
    //1. Láy  dữ  liệu từ trong Form Input
    const data ={
        id : idInput.value,
        name : nameInput.value, 
         age : parseInt(ageInput.value),
        type : typeInput.value,
        weight : parseInt(weightInput.value)  , 
        length : parseInt(lengthInput.value) , 
        breed : breedInput.value,
        color : colorInput.value , 
        vaccinated : vaccinatedInput.checked ,
        dewormed : dewormedInput.checked,
         sterilized : sterilizedInput.checked,
         date : new Date()
        
    };
console.log(data)
// 2 . Validate dữ liệu hợp lệ
  const isValidate = validateData(data);
  
    if(isValidate){
         const index = petArr.findIndex((pet) => pet.id === data.id);
         //giữ ngày thêm thú cưng
         data.date =petArr[index].date;
         // cập nhập dữ liệu thú cưng đó
         petArr[index] = data ; 
         
         saveToStorage("petArr", petArr);
         //ấn form và hiển thị thú cưng
         formEl.classList.add("hide");
         renderTableData(petArr)
    }
  
 
});

//validate dữ liệu

 
function validateData(data){
    let isVadidata = true ;
    
    if(data.name.trim() === ""){
        alert("Please input for Name")
        isVadidata = false ; 
    }

    if(isNaN(data.age)){
        alert("Please input for Age")
        isVadidata = false ; 
    }
    if(isNaN(data.weight)){
        alert("Please input for weight")
        isVadidata = false ; 
    }
    if(isNaN(data.length)){
        alert("Please input for length")
        isVadidata = false ; 
    }


    if(data.age < 1 || data.age > 15 ){
        alert("Age must be between 1 and 15!");
        isVadidata = false;
    };

    if(data.weight < 1 || data.weight > 15 ){
        alert("Weight must be between 1 and 15!");
        isVadidata = false;
    };

    if(data.length < 1 || data.length > 100){
        alert("Age must be between 1 and 100!");
        isVadidata = false;
    };
    
    if(data.type === "Select Type"){
        alert("Please select Type!");
        isVadidata = false;
    }; 

    if(data.breed === "Select Breed"){
        alert("Please select Breed!");
        isVadidata = false;
    };
   return isVadidata
};

                                                                 