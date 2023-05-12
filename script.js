'use strict';
// khai báo Dom
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

const healthyBtn = document.getElementById("healthy-btn")
// bắt  sự  kiện khi bấm nút "Submit"

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
        date : new Date(),
       
    };
console.log(data)
// 2 . Validate dữ liệu hợp lệ
  const validate = validateData(data)
 
  if (validate) {
    //Thêm  thư cưng vào danh sách
	petArr.push(data)

    // Lưu dữ danh sách
    saveToStorage("petArr", petArr)


    //Hiển  thị danh sách thú cưng
    renderTableData(petArr)


    //Xóa dánh sach thú cưng
	clearInput()
}
});

//Hàm  hiển thị  thú cưng
 renderTableData(petArr)
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
                                </td>
                                <td><button class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button>
                                </td>`;
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

//Hàm xóa danh sách thú cưng
function clearInput(){
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value =  "";
    lengthInput.value = "";
    colorInput.value = "#333";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;

};

//  Hàm xóa 1 thú  cưng
function deletePet(petId){
    const isdeletePet = confirm('Are you sure?');
    if(isdeletePet){
        for(let i = 0 ; i < petArr.length ; i++){
            if(petId === petArr[i].id){
                //Xóa khỏi mảng
                petArr.splice(i ,1);

                saveToStorage("petArr", petArr)

                renderTableData(petArr);
            }
        }
    }
};
// bắt sự kiên khi bấm nào type
typeInput.addEventListener("click" , renderBreed)


function renderBreed(){
    breedInput.innerHTML = "<option>Select Breed</option>";
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

// khai náo  1 hàm 
 
function validateData(data){
    let isVadidata = true ;
    if(data.id.trim() ===  ""){
        alert("Please input for ID")
        isVadidata = false ; 
    }

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
for( let   i = 0 ; i < petArr.length ; i++){
     if( data.id === petArr[i].id){
        alert("ID must be unique!")
        isVadidata = false;
        break;
    };

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
};
let healthyCheck =  true;

healthyBtn.addEventListener("click" , function(){
    if(healthyCheck === true){
        //Hiển thị  thú cưng khỏe mạnh
        const healthyPet = [];
        //Lộc trong mảng petArr
        for(let i = 0 ; i <petArr.length ; i++){
            if(petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized){
                healthyPet.push(petArr[i])
            }
        }
        //Gọi hàm hiển thị
        renderTableData(healthyPet);
        healthyBtn.textContent = "Show All Pet";
        healthyCheck = false;
    } else{ 
        //Hiển thị toàn bộ thú cưng
        renderTableData(petArr)
        healthyBtn.textContent = "Show Heathy Pet";
        healthyCheck = true;

    }
});

