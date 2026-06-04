let allItems = [];

window.onload = async () => {

    updateCartCount();

    try {

        const response =
        await fetch(MENU_API.getAllMenus);

        allItems =
        await response.json();

    }
    catch(error){

        console.error(error);

        alert("Unable To Load Menu");
    }
};

function filterCategory(category){

    document
    .getElementById("categoryTitle")
    .innerText =
    category;

    const container =
    document.getElementById(
        "menuContainer"
    );

    container.innerHTML = "";

    const items =
    allItems.filter(item =>
        item.category
        .toUpperCase()
        .includes(category)
    );

    items.forEach(item => {

        container.innerHTML += `

        <div class="menu-card">

            <img
            src="${item.imageUrl}"
            alt="${item.itemName}">

            <div class="menu-info">

                <span class="category">

                    ${item.category}

                </span>

                <h3>

                    ${item.itemName}

                </h3>

                <p>

                    ${item.description}

                </p>

                <div class="price">

                    ₹${item.price}

                </div>

                ${renderCartButton(item.id)}

            </div>

        </div>

        `;
    });
}

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || {};
}

function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function increaseQty(id){

    let cart = getCart();

    let currentQty =
    cart[id] || 0;

    if(currentQty === 10){

        alert(
            "⚠️ Out Of Stock"
        );

        return;
    }

    cart[id]++;

    saveCart(cart);

    refreshCurrentCategory();
}

function decreaseQty(id){

    let cart = getCart();

    if(!cart[id]){
        return;
    }

    cart[id]--;

    if(cart[id] <= 0){
        delete cart[id];
    }

    saveCart(cart);

    refreshCurrentCategory();
}

function renderCartButton(id){

    let cart = getCart();

    let qty = cart[id] || 0;

    if(qty === 0){

        return `
        <button
        class="btn btn-primary"
        onclick="increaseQty(${id})">

        Add To Cart

        </button>
        `;
    }

    return `
    <div class="qty-box">

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
    `;
}

function updateCartCount(){

    let cart = getCart();

    let total = 0;

    Object.values(cart).forEach(qty => {

        total += qty;
    });

    const cartCount =
    document.getElementById("cartCount");

    if(cartCount){

        cartCount.innerText = total;
    }
}

function refreshCurrentCategory(){

    const category =
    document
    .getElementById(
        "categoryTitle"
    )
    .innerText;

    if(category !==
       "Select Category"){

        filterCategory(category);
    }
}
window.addEventListener("load", () => {

    const username =
    localStorage.getItem(
        "userName"
    );

    if(username){

        const userElement =
        document.getElementById(
            "username"
        );

        if(userElement){

            userElement.innerHTML =
            "👤 " + username + " ▼";
        }
    }
});

function toggleProfile(){

    const popup =
    document.getElementById(
        "profilePopup"
    );

    if(popup){

        popup.classList.toggle(
            "show-profile"
        );
    }

    const profileName =
    document.getElementById(
        "profileName"
    );

    const profileEmail =
    document.getElementById(
        "profileEmail"
    );

    if(profileName){

        profileName.innerText =
        localStorage.getItem(
            "userName"
        ) || "Guest";
    }

    if(profileEmail){

        profileEmail.innerText =
        localStorage.getItem(
            "userEmail"
        ) || "";
    }
}

function logout(){

    localStorage.clear();

    window.location.href =
    "login.html";
}
function searchMenu(){

    const keyword =
    document
    .getElementById("searchBox")
    .value
    .toLowerCase();

    const container =
    document
    .getElementById("menuContainer");

    container.innerHTML = "";

    if(keyword === ""){

        document
        .getElementById("categoryTitle")
        .innerText =
        "Select Category";

        return;
    }

    const filteredItems =
    allItems.filter(item =>

        item.itemName
        .toLowerCase()
        .includes(keyword)

        ||

        item.category
        .toLowerCase()
        .includes(keyword)

        ||

        item.description
        .toLowerCase()
        .includes(keyword)
    );

    if(filteredItems.length === 0){

        container.innerHTML =
        "<h3>No Item Found</h3>";

        return;
    }

    document
    .getElementById("categoryTitle")
    .innerText =
    "Search Results";

    filteredItems.forEach(item => {

        container.innerHTML += `

        <div class="menu-card">

            <img
            src="${item.imageUrl}"
            alt="${item.itemName}">

            <div class="menu-info">

                <span class="category">
                    ${item.category}
                </span>

                <h3>
                    ${item.itemName}
                </h3>

                <p>
                    ${item.description}
                </p>

                <div class="price">
                    ₹${item.price}
                </div>

                ${renderCartButton(item.id)}

            </div>

        </div>

        `;
    });
}