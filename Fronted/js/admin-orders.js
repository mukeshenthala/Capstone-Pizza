window.onload = loadOrders;

async function loadOrders(){

    try{

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

        orders.reverse();

        orders.forEach(order => {

            container.innerHTML += `

            <div class="order-card">

                <h3>

                    Order #${order.orderId}

                </h3>

                <p>

                    User ID :
                    ${order.userId}

                </p>

                <p>

                    Amount :
                    ₹${order.totalAmount}

                </p>

                <p>

                    Delivery :
                    ${order.deliveryMode}

                </p>

                <p>

                    Current Status :
                    <b>${order.status}</b>

                </p>

                <select
                onchange=
                "updateStatus(
                ${order.orderId},
                this.value
                )">

                    <option>
                    Select Status
                    </option>

                    <option value="PLACED">
                    PLACED
                    </option>

                    <option value="PREPARING">
                    PREPARING
                    </option>

                    <option value="OUT_FOR_DELIVERY">
                    OUT FOR DELIVERY
                    </option>

                    <option value="DELIVERED">
                    DELIVERED
                    </option>

                    <option value="CANCELLED">
                    CANCELLED
                    </option>

                </select>

            </div>

            `;
        });

    }
    catch(error){

        console.error(error);

        alert(
            "Unable To Load Orders"
        );
    }
}

async function updateStatus(
        id,
        status){

    if(status ===
        "Select Status"){
        return;
    }

    try{

        const response =
        await fetch(

            `http://localhost:8081/order/status/${id}/${status}`,

            {
                method:"PUT"
            }
        );

        const msg =
        await response.text();

        alert(msg);

        loadOrders();

    }
    catch(error){

        console.error(error);

        alert(
            "Status Update Failed"
        );
    }
}