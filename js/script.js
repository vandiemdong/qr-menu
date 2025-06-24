const allItems = [
  { id: 1,name: "Cà phê đen", price: "28.000 VND", img: "images/denda.jpg", categoryId: 1 },
  { id: 2,name: "Cà phê sữa", price: "28.000 VND", img: "images/suada.jpg", categoryId: 1 },
  { id: 3,name: "Trà trái cây nhiệt đới", price: "28.000 VND", img: "images/tratraicaynhietdoi.jpg", categoryId: 2 },
  { id: 4,name: "Trà dưa lưới tứ quý", price: "28.000 VND", img: "images/tradualuoi.jpg", categoryId: 2 },
  { id: 5,name: "Trà ổi hồng ngọc trai", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 6,name: "Trà cam dâu đác", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  {id: 7, name: "Trà lựu đỏ thanh long", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 8,name: "Trà vải lài", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 9,name: "Trà sen nhãn", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 10,name: "Trà xoài chanh dây", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 11,name: "Trà dứa đác thơm", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 12,name: "Trà dâu tằm", price: "28.000 VND", img: "images/drinks2.jpg", categoryId: 2 },
  { id: 13,name: "Trà sữa Thái đỏ", price: "28.000 VND", img: "images/thaired.jpg", categoryId: 3 },
  {id: 14, name: "Trà sữa Thái xanh", price: "28.000 VND", img: "images/thaigreen.jpg", categoryId: 3 },
  {id: 15, name: "Matcha Latte", price: "28.000 VND", img: "images/matcha.jpg", categoryId: 4 },
  { id: 16,name: "Matcha sữa hạt Oatside", price: "28.000 VND", img: "images/matcha.jpg", categoryId: 4 },
  { id: 17,name: "Matcha sữa gấu", price: "28.000 VND", img: "images/matcha.jpg", categoryId: 4 },
  { id: 18,name: "Matcha xoài", price: "28.000 VND", img: "images/matchamango.jpg", categoryId: 4 },
  { id: 19,name: "Matcha dâu", price: "28.000 VND", img: "images/matchadau.jpg", categoryId: 4 },
  { id: 20,name: "Matcha dưa lưới", price: "28.000 VND", img: "images/drinks4.jpg", categoryId: 4 },
];
let currentDish = null;
    let currentQty = 1;
    let cart = [];


function showItemsByCategory(categoryId, element) {
  document.getElementById('mainCategories').classList.add('d-none');
  document.getElementById('subCategoryMenu').classList.remove('d-none');
  document.getElementById('dishArea').classList.remove('d-none');
  //document.getElementById('selectedMainCategory').innerText = categoryId;

  // Highlight selected sub-category item
  document.querySelectorAll('.category-item').forEach(item => {
    item.classList.remove('selected');
  });
  if (element) {
    element.classList.add('selected');
  }

  // Lọc item theo category
  const dishList = document.getElementById('dishList');
  dishList.innerHTML = '';

  const filteredItems = allItems.filter(item => item.categoryId === categoryId);

  filteredItems.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <div class="card h-100" onclick='openDishDetail(${JSON.stringify(item)})'>
        <img src="${item.img}" class="card-img-top">
        <div class="card-body p-2">
          <h6 class="card-title mb-1">${item.name}</h6>
          <p class="card-text small text-muted">${item.price}</p>
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

 function openDishDetail(dish) {
      currentDish = dish;
      currentQty = 1;
      document.getElementById('modalDishImg').src = dish.img;
      document.getElementById('modalDishName').innerText = dish.name;
      document.getElementById('modalPrice').innerText = dish.price;
      document.getElementById('modalQty').innerText = currentQty;

      const modal = new bootstrap.Modal(document.getElementById('dishModal'));
      modal.show();
    }

    function changeQty(amount) {
      currentQty = Math.max(1, currentQty + amount);
      document.getElementById('modalQty').innerText = currentQty;
    }

    function addToCart() {
      const existing = cart.find(item => item.id === currentDish.id);
      if (existing) {
        existing.qty += currentQty;
      } else {
        cart.push({ ...currentDish, qty: currentQty });
      }

      updateCartCount();
      bootstrap.Modal.getInstance(document.getElementById('dishModal')).hide();
    }

    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.qty, 0);
      document.getElementById('cartCount').innerText = count;
    }

    function toggleCart() {
      const cartDrawer = new bootstrap.Offcanvas('#cartDrawer');
      renderCart();
      cartDrawer.show();
    }

    function renderCart() {
      const cartList = document.getElementById('cartList');
      cartList.innerHTML = '';
      let total = 0;

      cart.forEach(item => {
        const price = parseFloat(item.price.replace('VNĐ ', '')) * item.qty;
        total += price;

        const div = document.createElement('div');
        div.className = 'mb-3';
        div.innerHTML = `
          <div class="d-flex justify-content-between">
            <div>
              <strong>${item.name}</strong><br>
              <small>${item.qty} × ${item.price}</small>
            </div>
            <div>VNĐ ${price.toFixed(2)}</div>
          </div>
        `;
        cartList.appendChild(div);
      });

      document.getElementById('cartTotal').innerText = total.toFixed(2);
    }


