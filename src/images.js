
const authChek = document.getElementById('auth');
const images = document.getElementById('photo');
const Email = document.getElementById('email');
const password = document.getElementById('password');
const sendAuth = document.getElementById('authSend');

const emailValue = Email.value;

const passwordValue = password.value;







document.addEventListener('DOMContentLoaded',function (){

    const token = window.localStorage.getItem('log_token_from_script');
    
    

    fetch('http://localhost:5000/youtube/img',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${token}`
            
        },
        credentials: 'include',
        body: JSON.stringify({
            Email: Email,
            password: password
        })
    })
    .then(res => {
        res.json();

        console.log(res.status);
        
        if (res.status !== 200) {
            authChek.style.display = "block";

            sendAuth.addEventListener("click", () =>{
                console.log(Email);
                console.log(password);


                fetch('http://localhost:5000/youtube/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        Email: Email,
                        password: password
                    })
                    
                }).then(res => res.json())
                .then(data => {
                    
                 if(data.message === "Wrong email") {
                        return alert("your Email is incorrect")
                    }
                    else if(data.message === "Incorrect password"){
                        return alert("You entered a wrong password")
                        
                    }
                    else{
                        document.cookie = `log_token=${data.token}`;
                    window.localStorage.setItem('log_token_from_script', data.token);
                    authChek.style.display = "none";
                    images.style.display = "block";
               
                        
            
                    }
                
            
                    
                })
                .catch(err => {
                    console.log(err);
                    
                });

            })
           
        
        }
        else{
            images.style.display = "block"

        }
       
        
    })
    
    
    
    
})
