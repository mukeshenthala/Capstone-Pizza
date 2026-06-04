let menuItems = [];

window.onload = async () => {

    await loadMenuItems();

    loadCart();
};

async function loadMenuItems(){

    const response =
    await fetch(
        MENU_API.getAllMenus
    );

    menuItems =
    await response.json();
}

function loadCart(){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || {};

    const container =
    document.getElementById(
        "cartItems"
    );

    container.innerHTML = "";

    let total = 0;

    Object.keys(cart)
    .forEach(id => {

        const item =
        menuItems.find(
            x => x.id == id
        );

        if(!item) return;

        const qty = cart[id] || 0;

        if(qty <= 0){
        return;
        }

const amount =
qty * item.price;

        total += amount;

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>

                    ${item.itemName}

                </h3>

                <p>

                    ₹${item.price}

                </p>

            </div>

            <div>

                <button
                onclick="decreaseQty(${id})">

                    -

                </button>

                <span>

                    ${qty}

                </span>

                <button
                onclick="increaseQty(${id})">

                    +

                </button>

            </div>

        </div>

        `;
    });

    document
    .getElementById(
        "totalPrice"
    )
    .innerText =
    "₹" + total;
}

function increaseQty(id){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    );

    cart[id]++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}
function decreaseQty(id){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || {};

    if(!cart[id]){
        return;
    }

    cart[id]--;

    if(cart[id] <= 0){

        delete cart[id];
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

async function placeOrder(){

    const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || {};

    if(
        Object.keys(cart).length === 0
    ){

        alert(
            "Cart Empty"
        );

        return;
    }

    let total = 0;

    Object.keys(cart)
    .forEach(id => {

        const item =
        menuItems.find(
            x => x.id == id
        );

        total +=
        item.price *
        cart[id];
    });

    const order = {

        userId: 1,

        totalAmount: total,

        deliveryMode:
        document
        .getElementById(
            "deliveryMode"
        )
        .value
    };

    try{

        const response =
        await fetch(
            ORDER_API.placeOrder,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(order)
            }
        );

        if(response.ok){

    const savedOrder =
    await response.json();

    const bill = {

        orderId:
        savedOrder.orderId,

        amount:
        total,

        paymentMode:
        "UPI"
    };

    const billResponse =
await fetch(
    BILL_API.generateBill,
    {
        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(bill)
    }
);

const savedBill =
await billResponse.json();

localStorage.setItem(
    "billId",
    savedBill.billId
);

    alert(
        "Order Placed Successfully"
    );

    localStorage.removeItem(
        "cart"
    );

    window.location.href =
    "orders.html";
}

    }
    catch(error){

        console.error(error);

        alert(
            "Order Failed"
        );
    }
}
function updateCartBadge(){

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || {};

    let total = 0;

    Object.values(cart)
    .forEach(qty => {

        total += qty;
    });

    const badge =
    document.getElementById("cartCount");

    if(badge){

        badge.innerText = total;
    }
}