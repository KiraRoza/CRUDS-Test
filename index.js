// ANCHOR - CRUD operation...
// C => Create.
// R => Retrieve.
// U => Update.
// D => Delete.
// S => Search.

// NOTE - Global Variables.
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDesc");
let addBtn = document.querySelector("#addBtn");
let updateBtn = document.querySelector("#updateBtn");
var productsArr;

if (localStorage.getItem("productsArr") === null) {
  productsArr = [];
} else {
  productsArr = JSON.parse(localStorage.getItem("productsArr"));
  displayProducts(productsArr);
}

// LINK - Start Add Product Function
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };
  productsArr.push(product);
  clearInputs();
  displayProducts(productsArr);
  localStorage.setItem("productsArr", JSON.stringify(productsArr));
}
// LINK - End Add Product Function
// LINK - Start Display Products Function
function displayProducts(list) {
  var box = ``;
  for (var i = 0; i < list.length; i++) {
    box += `<tr>
            <td>${i + 1}</td>
            <td>${list[i].newName ? list[i].newName : list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].description}</td>
            <td>
              <button onclick="updateProduct(${i})" class="btn btn-warning btn-sm fw-semibold">Update</button>
            </td>
            <td>
              <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm fw-semibold">Delete</button>
            </td>
          </tr>`;
  }
  document.getElementById("tBody").innerHTML = box;
}
// LINK - End Display Products Function
// LINK - Start Clear Inputs Function
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}
// LINK - End Clear Inputs Function
// LINK - Start Delete Product Function
function deleteProduct(index) {
  productsArr.splice(index, 1);
  localStorage.setItem("productsArr", JSON.stringify(productsArr));
  displayProducts(productsArr);
}
// LINK - End Delete Product Function
// LINK - Start Update Product Function
function updateProduct(index) {
  productName.value = productsArr[index].name;
  productPrice.value = productsArr[index].price;
  productCategory.value = productsArr[index].category;
  productDescription.value = productsArr[index].description;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  productsArr.splice(index, 1);
}
function updateTable() {
  addProduct();
  clearInputs();
  displayProducts(productsArr);
}
// LINK - End Update Product Function
// LINK - Start Search Function
function searchByName(term) {
  var foundedItems = [];
  var i = 0;
  for (; i < productsArr.length; i++) {
    if (
      productsArr[i].name.toLowerCase().includes(term.toLowerCase()) === true
    ) {
      productsArr[i].newName = productsArr[i].name
        .toLowerCase()
        .replace(
          term.toLowerCase(),
          `<span class="text-danger fs-5 bg-danger-subtle">${term}</span>`
        );
      foundedItems.push(productsArr[i]);
    }
  }
  displayProducts(foundedItems);
}
// LINK - End Search Function
