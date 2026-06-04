window.onload = loadOrders;

async function loadOrders() {

    try {

        const response =
            await fetch(
                ORDER_API.getAllOrders
            );

        const orders =
            await response.json();

        const container =
            document.getElementById(
                "ordersContainer"
            );

        container.innerHTML = "";

        if (!orders || orders.length === 0) {

            container.innerHTML = `
                <div class="empty-cart">
                    <h2>No Orders Found 🍕</h2>
                </div>
            `;

            return;
        }

        orders.reverse();

        orders.forEach((order) => {

            container.innerHTML += `

            <div class="order-card">

                <h3>
                    Order #${order.orderId}
                </h3>

                <p>
                    Amount : ₹${order.totalAmount}
                </p>

                <p>
                    Delivery : ${order.deliveryMode}
                </p>

                <p>
                    Status : ${order.status}
                </p>

                ${order.status !== "CANCELLED" ?
                `
                <button
                    onclick="cancelOrder(${order.orderId})"
                    class="btn btn-danger">

                    Cancel

                </button>
                <a href="bill.html">
    <button class="btn btn-primary">
        View Bill
    </button>
</a>
                `
                :
                `
                <button
                    disabled
                    class="btn btn-secondary">

                    Cancelled

                </button>
                `
                }

            </div>

            `;
        });

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable To Load Orders"
        );
    }
}

async function cancelOrder(orderId) {

    const confirmDelete =
        confirm(
            "Cancel Order?"
        );

    if (!confirmDelete) {

        return;
    }

    try {

        const response =
            await fetch(
                ORDER_API.cancelOrder(orderId),
                {
                    method: "DELETE"
                }
            );

        const msg =
            await response.text();

        alert(msg);

        loadOrders();

    }
    catch (error) {

        console.error(error);

        alert(
            "Cancel Failed"
        );
    }
}