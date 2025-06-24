
function showSubMenu(categoryName) {
  document.getElementById('mainCategories').classList.add('d-none');
  document.getElementById('subCategoryMenu').classList.remove('d-none');
  document.getElementById('dishArea').classList.remove('d-none');
  document.getElementById('selectedMainCategory').innerText = categoryName;

  const dishList = document.getElementById('dishList');
  dishList.innerHTML = '';

  const sampleDishes = [
    { name: "Fried Rice", price: "$4.99", img: "images/drinks1.jpg" },
    { name: "Iced Tea", price: "$2.50", img: "images/drinks2.jpg" },
    { name: "Noodles", price: "$5.50", img: "images/drinks3.jpg" },
    { name: "Fried Rice", price: "$4.99", img: "images/drinks4.jpg" },
    { name: "Iced Tea", price: "$2.50", img: "images/drinks1.jpg" },
    { name: "Noodles", price: "$5.50", img: "images/drinks1.jpg" }
  ];

 sampleDishes.forEach(dish => {
  const col = document.createElement('div');
  col.className = 'col-6 col-md-4'; 
  // col-6: 2 items per row on small screens (<768px)
  // col-md-4: 3 items per row on medium+ screens (>=768px)

  col.innerHTML = `
    <div class="card h-100">
      <img src="${dish.img}" class="card-img-top">
      <div class="card-body p-2">
        <h6 class="card-title mb-1">${dish.name}</h6>
        <p class="card-text small text-muted">${dish.price}</p>
      </div>
    </div>
  `;
  dishList.appendChild(col);
});


}

function goBack() {
  document.getElementById('mainCategories').classList.remove('d-none');
  document.getElementById('subCategoryMenu').classList.add('d-none');
  document.getElementById('dishArea').classList.add('d-none');
}

