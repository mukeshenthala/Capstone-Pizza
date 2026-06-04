// =============================
// Pizza Store API Configuration
// =============================

// User Service
const USER_BASE_URL = "http://localhost:8081";

// Admin/Menu Service
const ADMIN_BASE_URL = "http://localhost:8086";

// =============================
// User APIs
// =============================

const USER_API = {

    register: `${USER_BASE_URL}/user/register`,

    login: `${USER_BASE_URL}/user/login`,

    allUsers: `${USER_BASE_URL}/user/all`
};

// =============================
// Menu APIs
// =============================

const MENU_API = {

    getAllMenus: `${ADMIN_BASE_URL}/menu/all`,

    addMenu: `${ADMIN_BASE_URL}/menu/add`,

    updateMenu: (id) =>
        `${ADMIN_BASE_URL}/menu/update/${id}`,

    deleteMenu: (id) =>
        `${ADMIN_BASE_URL}/menu/delete/${id}`
};

// =============================
// Order APIs
// =============================

const ORDER_API = {

    placeOrder: `${USER_BASE_URL}/order/place`,

    getAllOrders: `${USER_BASE_URL}/order/all`,

    cancelOrder: (id) =>
        `${USER_BASE_URL}/order/cancel/${id}`
};

// =============================
// Bill APIs
// =============================

const BILL_API = {

    generateBill: `${USER_BASE_URL}/bill/generate`,

    getBill: (id) =>
        `${USER_BASE_URL}/bill/${id}`
};

// =============================
// Admin APIs
// =============================

const ADMIN_API = {

    login: `${ADMIN_BASE_URL}/admin/login`
};

// =============================
// Common Helper Methods
// =============================

async function getData(url) {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP Error : ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        alert("Failed to fetch data");

        return null;
    }
}

async function postData(url, data) {

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(
                `HTTP Error : ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        alert("Request Failed");

        return null;
    }
}

async function putData(url, data) {

    try {

        const response = await fetch(url, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(
                `HTTP Error : ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        alert("Update Failed");

        return null;
    }
}

async function deleteData(url) {

    try {

        const response = await fetch(url, {

            method: "DELETE"
        });

        return await response.text();

    } catch (error) {

        console.error(error);

        alert("Delete Failed");

        return null;
    }
}

// =============================
// Local Storage Helpers
// =============================

function saveUser(user) {

    localStorage.setItem(
        "loggedUser",
        JSON.stringify(user)
    );
}

function getUser() {

    return JSON.parse(
        localStorage.getItem("loggedUser")
    );
}

function logout() {

    localStorage.clear();

    window.location.href = "login.html";
}