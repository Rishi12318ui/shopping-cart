const products = [

{
    id: 16,
    name: "Crochet Lily Flower",
    price: 349,
    image: "images/image16.png"
},

{
    id: 1,
    name: "Crochet Shell Bag"  ,
    price: 699,
    image: "images/image1.png"
},

{
    id: 2,
    name: "Crochet Football Keychain",
    price: 349,
    image: "images/image2.png"
},

{
    id: 3,
    name: "Crochet Heart Keychain for DAD",
    price: 299,
    image: "images/image3.png"
},

{
    id: 4,
    name: "Crochet Tulip Tote Bag",
    price: 799,
    image: "images/image4.png"
},

{
    id: 5,
    name: "Set of 3 Crochet Flower Bun Ties",
    price: 499,
    image: "images/image5.png"
},

{
    id: 6,
    name: "Crochet Triangle Shawl",
    price: 1799,
    image: "images/image6.png"
},

{
    id: 7,
    name: "Crochet Rose Sling Bag",
    price: 499,
    image: "images/image7.png"
},

{
    id: 8,
    name: "Crochet Heart Keychain for MOM",
    price: 299,
    image: "images/image8.png"
},

{
    id: 9,
    name: "Crochet Flower Bracelet",
    price: 299,
    image: "images/image9.png"
},

{
    id: 10,
    name: "Set of 6 Crochet Kashmiri Bangles <br> (Size 2.4)",
    price: 499,
    image: "images/image10.png"
},

{
    id: 11,
    name: "Crochet Laptop/Book Cover",
    price: 499,
    image: "images/image11.png"
},

{
    id: 12,
    name: "Crochet Morpankh Keychain",
    price: 399,
    image: "images/image12.png"
},

{
    id: 13,
    name: "Set of 3 Crochet Yarn Keychain",
    price: 399,
    image: "images/image13.png"
},

{
    id: 14,
    name: " Pair of Crochet Earrings",
    price: 399,
    image: "images/image14.png"
},

{
    id: 15,
    name: "Crochet Rainbow Keychain",
    price: 329,
    image: "images/image15.png"
},

{
    id: 17,
    name: "Crochet Keychain for Cricket Lovers",
    price: 399,
    image: "images/image17.png"
},

{
    id: 18,
    name: "Crochet Toran Patti Jai Mata Di",
    price: 999,
    image: "images/image18.png"
},

{
    id: 19,
    name: "Crochet Sunflower Scrunchie",
    price: 249,
    image: "images/image19.png"
},

{
    id: 20,
    name: "Crochet Shivling",
    price: 499,
    image: "images/image20.png"
},


];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

function displayProducts(list = products){

    productsDiv.innerHTML = "";

    list.forEach(product => {

        productsDiv.innerHTML += `
        <div class="product">

            <img src="${product.image}" class="product-image">

            <div class="product-content">

                <h2>${product.name}</h2>

                <h3>₹${product.price}</h3>

                <p class="stock">✅ In Stock</p>

                <p class="shipping">🚚 Free Shipping</p>

            </div>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button class="buy-now" onclick="buyNow(${product.id})">
                Buy Now
            </button>

        </div>
        `;
    });

}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({
            ...product,
            quantity: 1
        });
    }

const floatingCart = document.getElementById("floating-cart");

floatingCart.classList.add("cart-bounce");

setTimeout(() => {
    floatingCart.classList.remove("cart-bounce");
}, 400);

showToast();

    updateCart();
}

function increase(id) {
    const item = cart.find(i => i.id === id);
    item.quantity++;
    updateCart();
}

function decrease(id) {
    const item = cart.find(i => i.id === id);

    item.quantity--;

    if (item.quantity <= 0) {
        removeItem(id);
    }

    updateCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {

    cartItems.innerHTML = "";

    let sum = 0;

    cart.forEach(item => {

        sum += item.price * item.quantity;

       cartItems.innerHTML += `
       <div class="cart-item">

    <div class="cart-left">

        <img src="${item.image}" alt="${item.name}">

        <div>

            <div class="cart-name">${item.name}</div>

            <div class="cart-price">₹${item.price}</div>

        </div>

    </div> 
   
    <div class="quantity-controls">

        <button onclick="decrease(${item.id})">−</button>

        <span>${item.quantity}</span>

        <button onclick="increase(${item.id})">+</button>

        <button class="remove-btn" onclick="removeItem(${item.id})">
            Remove
        </button>

    </div>

</div>
`
    });

const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

if (subtotal) subtotal.innerText = sum;
if (total) total.innerText = sum;
document.getElementById("subtotal").innerText = sum;
document.getElementById("total").innerText = sum;

const cartCount = document.getElementById("cart-count");

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

cartCount.textContent = totalItems;

localStorage.setItem("cart", JSON.stringify(cart));
}

displayProducts();
updateCart();

function buyNow(id){

    addToCart(id);

    document.getElementById("cart").scrollIntoView({
        behavior:"smooth"
    });

}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    document.getElementById("checkout-form").style.display = "block";

    document.querySelectorAll("#products button").forEach(button=>{
    button.disabled = true;
});

document.querySelectorAll("#cart button").forEach(button=>{
    button.disabled = true;
});

    document.getElementById("checkout-form").scrollIntoView({
        behavior: "smooth"
    });
}

function placeOrder(){

    const name=document.getElementById("name").value;
    const phone=document.getElementById("phone").value;
    const address=document.getElementById("address").value;
    const city=document.getElementById("city").value;
    const pincode=document.getElementById("pincode").value;

    if(!name || !phone || !address || !city || !pincode){

    alert("Please fill all fields.");

    return;
}

if(phone.length !== 10){

    alert("Please enter a valid 10-digit mobile number.");

    return;
}

if(pincode.length !== 6){

    alert("Please enter a valid 6-digit PIN code.");

    return;
}
const orderItems = cart.map(item => {
    return `• ${item.name}
  Qty: ${item.quantity}
  Price: ₹${item.price}`;
}).join("\n\n");

const message =
`🛍️ *New Order*

Items:
${orderItems}

Customer: ${name}
Phone: +91${phone}
Address: ${address}
City: ${city}
PIN: ${pincode}

Total: ₹${total.textContent}`;

const whatsappURL =
`https://wa.me/918588827327?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");

 document.getElementById("checkout-form").style.display="none";

    document.querySelectorAll("#products button").forEach(button=>{
        button.disabled = false;
    });

    document.querySelectorAll("#cart button").forEach(button=>{
        button.disabled = false;
    });


// Close the checkout popup immediately
document.getElementById("checkout-modal").style.display = "none";

// Re-enable all buttons
document.querySelectorAll("#products button").forEach(button => {
    button.disabled = false;
});

document.querySelectorAll("#cart button").forEach(button => {
    button.disabled = false;
});

document.getElementById("checkout-modal").style.display = "none";

document.querySelectorAll("#products button").forEach(button=>{
    button.disabled = false;
});

document.querySelectorAll("#cart button").forEach(button=>{
    button.disabled = false;
});

const sent = confirm(
    "Have you sent your WhatsApp order?\n\nClick OK after you've sent it.\nClick Cancel if you haven't."
);

if (sent) {
    cart = [];
    updateCart();
    localStorage.removeItem("cart");
    alert("🎉 Thank you! Your cart has been cleared.");
}

confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
});
}

function cancelCheckout(){

    document.getElementById("checkout-form").style.display = "none";

    document.getElementById("checkout-btn").disabled = false;

    document.querySelectorAll("#products button").forEach(button=>{
        button.disabled = false;
    });

    document.querySelectorAll("#cart button").forEach(button=>{
        button.disabled = false;
    });

    renderCart();

}

function checkout() {

    document.getElementById("checkout-modal").style.display = "block";

}

function cancelCheckout() {

document.getElementById("checkout-modal").style.display = "none";

    document.getElementById("checkout-btn").disabled = false;

    document.querySelectorAll("#products button").forEach(button => {
        button.disabled = false;
    });

    document.querySelectorAll("#cart button").forEach(button => {
        button.disabled = false;
    });

    updateCart();
}

function scrollToCart() {
    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });
}

function showToast(){

    const toast=document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);

}

function searchProducts(){

    const text = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(text)
    );

    displayProducts(filtered);

}
