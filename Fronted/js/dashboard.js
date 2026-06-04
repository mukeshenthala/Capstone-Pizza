window.onload = loadDashboard;

async function loadDashboard(){

    try{

        const menuResponse =
        await fetch(
            MENU_API.getAllMenus
        );

        const menus =
        await menuResponse.json();

        document
        .getElementById(
            "menuCount"
        )
        .innerText =
        menus.length;

        const orderResponse =
        await fetch(
            ORDER_API.getAllOrders
        );

        const orders =
        await orderResponse.json();

        document
        .getElementById(
            "orderCount"
        )
        .innerText =
        orders.length;

        let totalRevenue = 0;

        orders.forEach(order => {

            totalRevenue +=
            order.totalAmount;
        });

        document
        .getElementById(
            "revenue"
        )
        .innerText =
        "₹" + totalRevenue;

    }
    catch(error){

        console.error(error);

        alert(
            "Dashboard Load Failed"
        );
    }
}

function logoutAdmin(){

    localStorage.removeItem(
        "adminToken"
    );

    window.location.href =
    "login.html";
}