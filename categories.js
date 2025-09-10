function loadCategories() {
  console.log("loadCategories for index.html ✅");

  const container = document.getElementById('category-list'); // If you want, rename this to 'category-list'
  if (!container) {
    console.error("category-list container NOT found!");
    return;
  }

  container.innerHTML = '';

  fetch('http://localhost:5000/api/categories/all')
    .then(res => res.json())
    .then(categories => {
      console.log('Categories fetched:', categories);
      categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');

        div.innerHTML = `
          <div class="product-card">
            <img src="data:image/jpeg;base64,${category.image}" alt="${category.name}" class="img-fluid" />
            <h5 class="mt-2">${category.name}</h5>
            <p>${category.description}</p>
            <button class="btn btn-primary btn-sm">Add to Cart</button>
          </div>
        `;

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Error loading categories:', err);
    });
}

window.addEventListener('DOMContentLoaded', loadCategories);
