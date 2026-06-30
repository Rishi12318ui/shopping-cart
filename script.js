const products = [
    {
        id: 1,
        name: "Crochet Shell Bag",
        price: 699,
        image: "images/crochet-shell-bag.png"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");

function displayProducts() {


    products.forEach(product => {
        productsDiv.innerHTML += `
            <div class="product">

    <img src="${product.image}" class="product-image">

    <h2>${product.name}</h2>

    <p class="description">
        Beautiful handmade crochet shell bag. Perfect for casual outings and gifting.
    </p>

    <h3>₹${product.price}</h3>

    <p class="stock">✅ In Stock</p>

    <p class="shipping">🚚 Free Shipping</p>

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

    document.getElementById("checkout-form").style.display="none";

    document.querySelectorAll("#products button").forEach(button=>{
        button.disabled = false;
    });

    document.querySelectorAll("#cart button").forEach(button=>{
        button.disabled = false;
    });



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

const message =
`🛍️ *New Order*

Product: Crochet Shell Bag
Price: ₹699
Quantity: ${cart[0].quantity}

Customer: ${name}
Phone: +91${phone}
Address: ${address}
City: ${city}
PIN: ${pincode}

Total: ₹${total.textContent}`;

const whatsappURL =
`https://wa.me/918588827327?text=${encodeURIComponent(message)}`;

window.open(whatsappURL, "_blank");

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

