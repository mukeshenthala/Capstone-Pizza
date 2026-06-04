document
.getElementById("adminLoginForm")
.addEventListener(
    "submit",
    adminLogin
);

async function adminLogin(event){

    event.preventDefault();

    const admin = {

        username:
        document
        .getElementById("username")
        .value,

        password:
        document
        .getElementById("password")
        .value
    };

    try{

        const response =
        await fetch(
            ADMIN_API.login,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify(admin)
            }
        );

        const token =
        await response.text();

        if(response.ok){

            localStorage.setItem(
                "adminToken",
                token
            );

            alert(
                "Admin Login Successful"
            );

            window.location.href =
            "dashboard.html";
        }
        else{

            alert(
                "Invalid Credentials"
            );
        }

    }
    catch(error){

        console.error(error);

        alert(
            "Server Error"
        );
    }
}