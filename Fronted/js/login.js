document
.getElementById("loginForm")
.addEventListener("submit", loginUser);

async function loginUser(event){

    event.preventDefault();

    const loginData = {

        email:
        document.getElementById("email").value,

        password:
        document.getElementById("password").value
    };

    try{

        const response =
        await fetch(USER_API.login,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:
            JSON.stringify(loginData)
        });

        if(response.ok){

            const token =
            await response.text();

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "userEmail",
                loginData.email
            );

            localStorage.setItem(
                "userName",
                loginData.email
                .split("@")[0]
            );

            alert(
                "Login Successful"
            );

            window.location.href =
            "menu.html";
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