document.addEventListener("DOMContentLoaded", function() {
    const productList = document.querySelector('.product-list');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const productImages = [];
    let currentIndex = 0;
  
    fetch('https://api.noroff.dev/api/v1/rainy-days')
        .then(response => response.json())
        .then(products => {
  
            products.forEach(product => {
  
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('product-image-container'); 
  
                const img = new Image();
                img.src = product.image;
                img.alt = product.title;
                imgContainer.appendChild(img);
  
                const titleOverlay = document.createElement('div');
                titleOverlay.classList.add('title-overlay');
                titleOverlay.innerText = product.title;
  
                const priceOverlay = document.createElement('div');
                priceOverlay.classList.add('price-overlay');
                priceOverlay.innerText = `$${product.price.toFixed(2)}`;
  
                imgContainer.appendChild(titleOverlay);
                imgContainer.appendChild(priceOverlay);
  
                imgContainer.addEventListener('mouseover', () => {
                    titleOverlay.style.display = 'block';
                    priceOverlay.style.display = 'block';
                });
  
                imgContainer.addEventListener('mouseout', () => {
                    titleOverlay.style.display = 'none';
                    priceOverlay.style.display = 'none';
                });
  
                imgContainer.addEventListener("click", () => {
                  window.location.href = `/products/product-detail.html#${product.id}`;
                })
  
                productImages.push(imgContainer);
            });
  
            renderProducts();
  
            prevButton.addEventListener('click', () => {
                currentIndex = Math.max(currentIndex - 1, 0);
                renderProducts();
            });
  
            nextButton.addEventListener('click', () => {
                currentIndex = Math.min(currentIndex + 1, productImages.length - 1);
                renderProducts();
            });
        })
        .catch(error => console.error('Error fetching products:', error));
  
  
    function renderProducts() {
  
        productList.innerHTML = '';
  
        const currentProduct = productImages[currentIndex];
        productList.appendChild(currentProduct);
  
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === productImages.length - 1;
    }
  });
  
  
  