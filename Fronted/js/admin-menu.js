window.onload = loadMenus;

document
.getElementById("menuForm")
.addEventListener(
    "submit",
    saveMenu
);

async function loadMenus(){

    const response =
    await fetch(
        MENU_API.getAllMenus
    );

    const menus =
    await response.json();

    const container =
    document.getElementById(
        "menuContainer"
    );

    container.innerHTML = "";

    menus.forEach(menu => {

        container.innerHTML += `

        <div class="menu-card">

            <img
            src="${menu.imageUrl}"
            onerror="
            this.src='https://images.unsplash.com/photo-1513104890138-7c749659a591'
            ">

            <div class="menu-info">

                <span class="category">

                    ${menu.category}

                </span>

                <h3>

                    ${menu.itemName}

                </h3>

                <p>

                    ${menu.description}

                </p>

                <div class="price">

                    ₹${menu.price}

                </div>

                <button
                onclick="editMenu(${menu.id})"
                class="btn btn-primary">

                    Edit

                </button>

                <button
                onclick="deleteMenu(${menu.id})"
                class="btn btn-danger">

                    Delete

                </button>

            </div>

        </div>
        `;
    });
}

async function saveMenu(event){

    event.preventDefault();

    const id =
    document.getElementById(
        "menuId"
    ).value;

    const menu = {

        itemName:
        document.getElementById(
            "itemName"
        ).value,

        description:
        document.getElementById(
            "description"
        ).value,

        price:
        parseFloat(
            document.getElementById(
                "price"
            ).value
        ),

        imageUrl:
        document.getElementById(
            "imageUrl"
        ).value,

        category:
        document.getElementById(
            "category"
        ).value
    };

    if(id){

        await fetch(
            MENU_API.updateMenu(id),
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(menu)
            }
        );
    }
    else{

        await fetch(
            MENU_API.addMenu,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(menu)
            }
        );
    }

    document
    .getElementById(
        "menuForm"
    )
    .reset();

    loadMenus();
}

async function editMenu(id){

    const response =
    await fetch(
        MENU_API.getAllMenus
    );

    const menus =
    await response.json();

    const item =
    menus.find(
        m => m.id === id
    );

    document
    .getElementById(
        "menuId"
    ).value =
    item.id;

    document
    .getElementById(
        "itemName"
    ).value =
    item.itemName;

    document
    .getElementById(
        "description"
    ).value =
    item.description;

    document
    .getElementById(
        "price"
    ).value =
    item.price;

    document
    .getElementById(
        "imageUrl"
    ).value =
    item.imageUrl;

    document
    .getElementById(
        "category"
    ).value =
    item.category;
}

async function deleteMenu(id){

    if(!confirm(
        "Delete Menu Item?"
    )){
        return;
    }

    await fetch(
        MENU_API.deleteMenu(id),
        {
            method:"DELETE"
        }
    );

    loadMenus();
}