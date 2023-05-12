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
const findBtn = document.getElementById("find-btn")

// hiển thị toàn bộ dữ liệu
renderTableData(petArr)

// bắt sự kiên nút Find
findBtn.addEventListener("click", function() {
    //Nếu nhập vào ID thì sẽ tìm theo ID
    let petFind = petArr;   
    
    if(idInput.value) {
        petFind = petFind.filter((pet) => pet.id.includes(idInput.value))
    }
    // nhập vào name thi tìm theo name
    if(nameInput.value) {
        petFind = petFind.filter((pet) => pet.name.includes(nameInput.value))
        };


        if(typeInput.value !== "Select Type") {
            petFind = petFind.filter((pet) => pet.type === typeInput.value)
        };


        if(breedInput.value !== "Select Breed") {
            petFind = petFind.filter((pet) => pet.breed === breedInput.value)
        };

        if(vaccinatedInput.value === true){
            petFind = petFind.filter((pet) => pet.vaccinated === true)
        };
        
        if(dewormedInput.value === true){
            petFind = petFind.filter((pet) => pet.dewormed === true)
        };

        if(sterilizedInput.value === true){
            petFind = petFind.filter((pet) => pet.sterilized === true)
        };

        //Hiên thị các thú cưng thỏa điều kiện
        renderTableData(petFind)
});

function renderTableData(petArr){
    tableBodyEl.innerHTML = '';

    for( let i = 0 ; i < petArr.length ; i++){
        const row = document.createElement('tr')
        row.innerHTML = `
                                <th scope="row">${petArr[i].id}</th>
                                <td>${petArr[i].name}</td>
                                <td>${petArr[i].age}</td>
                                <td>${petArr[i].type}</td>
                                <td>${petArr[i].weight} kg</td>
                                <td>${petArr[i].length} cm</td>
                                <td>${petArr[i].breed}</td>
                                <td>
                                    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
                                </td>
                                <td><i class="bi ${petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
                                <td><i class="bi ${petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
                                <td><i class="bi ${petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"}"></i></td>
                                <td>
                                ${displayTime(petArr[i].date).slice(5 ,7)}/
                                ${displayTime(petArr[i].date).slice(5 ,6)}/
                                ${displayTime(petArr[i].date).slice(0 ,4)}
                                </td>`
                               
        tableBodyEl.appendChild(row)
    }
};

//hàm hiển thị thời gian 
function displayTime(date){
    if(typeof date === "string"){
      return date;
    } else if(typeof date === "object"){
      return JSON.parse(JSON.stringify(date));
    }
  };

  // Hiên thị các loại giống
   renderBreed();

// Hiển thị ra các loại giống
function renderBreed(breedArr, breedInput) {
    breedArr.forEach(function(breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    })
  };

