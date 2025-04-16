const menu = {
    "Burger": 189.00,
    "Fries": 129.00,
    "Soda": 89.00,
    "Sandwich": 149.00,
    "Chicken Nuggets": 229.00,
    "Fried Chicken 6 pcs": 359.00,
    "Choco lava cake": 119.00,
    "Popcorn": 199.00,
    "Biryani": 249.00,
    "Ice Cream": 219.00
};

const coupons = {
    "NEWUSER": 0.40,
    "20OFF": 0.20,
    "BULKORDER": 0.15
};

let order = [];

window.onload = function() {
    const menuDiv = document.getElementById("menu-items");
    const itemSelect = document.getElementById("item");

    for (let item in menu) {
        let p = document.createElement("p");
        p.textContent = `${item} - $${menu[item].toFixed(2)}`;
        menuDiv.appendChild(p);

        let option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
    }
};

function addToOrder() {
    const item = document.getElementById("item").value;
    const qty = parseInt(document.getElementById("quantity").value);
    const price = menu[item];
    const total = price * qty;

    order.push({ item, price, qty, total });

    const tbody = document.querySelector("#order-table tbody");
    const row = tbody.insertRow();
    row.innerHTML = `<td>${item}</td><td>$${price.toFixed(2)}</td><td>${qty}</td><td>$${total.toFixed(2)}</td>`;
}

function calculateTotal() {
    let subtotal = order.reduce((sum, item) => sum + item.total, 0);
    let tax = subtotal * 0.05;

    const couponInput = document.getElementById("coupon").value.trim().toUpperCase();
    const discountRate = coupons[couponInput] || 0;
    const discount = subtotal * discountRate;

    const grandTotal = subtotal + tax - discount;

    document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `Tax (5%): $${tax.toFixed(2)}`;
    document.getElementById("discount").textContent = `Discount: $${discount.toFixed(2)}`;
    document.getElementById("grand-total").textContent = `Grand Total: $${grandTotal.toFixed(2)}`;

    if (discountRate === 0 && couponInput !== "") {
        alert("Invalid Coupon Code");
    }
}
