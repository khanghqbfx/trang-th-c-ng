'use strict';
const submitBtn = document.getElementById("submit-btn");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const tableBodyEl  = document.getElementById("tbody");

/*const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || [] ; 
console.log(petBreed)*/

renderBreedData(breedArr)
 
// bắt sự kiện nút Sumit

submitBtn.addEventListener("click", function(){
    const data = {
      breed : breedInput.value,
      type : typeInput.value,
    };  
    // vadidate dữ liệu
  const validate = validateBreed(data)
 
  if (validate) {
    //Thêm  thư cưng vào danh sách
	  breedArr.push(data);

    // Lưu dữ danh sách
    saveToStorage("breedArr",breedArr);

    //Hiển  thị danh sách thú cưng
    renderBreedData(breedArr);
    //Xóa dánh sach thú cưng

	  deleteBreed();  
}
});

//hàm xóa thông tin từ form
function deleteBreed(){
    breedInput.value = "" ;
    typeInput.value = "Select Type";
}




// hàm hiên thị thông tin lên bản
function renderBreedData(breedArr) {
    tableBodyEl.innerHTML = "";
    breedArr.forEach(function (breedItem, index) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td scope="col">${index + 1}</td>
        <td scope="col">${breedItem.breed}</td>
        <td scope="col">${breedItem.type}</td>
        <td><button class="btn btn-danger" onclick="deletePet('${breedItem.breed}')">Delete</button>
        </td>
      `;
      tableBodyEl.appendChild(row); 
    });
  }


  

// hàm thông báo khi chưa  nhấn chon
function validateBreed(data){
    let isVadidata = true ;

    if(breedInput.value.trim() === 0 ){
        alert("Please select Breed!");
        isVadidata = false;
    }
    if(typeInput.value.trim()==="Select Type"){
        alert("Please select Type!");
        isVadidata = false;
    }
    return isVadidata;
} 
 
function deletePet(arrId) {
  const isdeletePet = confirm('Are you sure?');
  if (isdeletePet) {
    for (let i = 0; i < breedArr.length; i++) {
      if (arrId === breedArr[i].breed) {
        // Xóa khỏi mảng
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr)

        renderBreedData(breedArr);
        break;
      }
    }
  }
};
