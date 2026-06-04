window.onload = loadBill;

async function loadBill(){

    const billId =
    localStorage.getItem(
        "billId"
    );

    if(!billId){

        document
        .getElementById(
            "billContainer"
        )
        .innerHTML =
        "<h3>No Bill Found</h3>";

        return;
    }

    try{

        const response =
        await fetch(
            BILL_API.getBill(
                billId
            )
        );

        const bill =
        await response.json();

        document
        .getElementById(
            "billContainer"
        )
        .innerHTML = `

        <div class="order-card">

            <h3>

                Bill #${bill.billId}

            </h3>

            <p>

                Order ID :
                ${bill.orderId}

            </p>

            <p>

                Amount :
                ₹${bill.amount}

            </p>

            <p>

                Payment :
                ${bill.paymentMode}

            </p>

        </div>
        `;
    }
    catch(error){

        console.error(error);

        alert(
            "Unable To Load Bill"
        );
    }
}