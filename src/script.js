


 
 class UI {
    constructor(){
        this.signUp = document.getElementById('authorize-button');
        this.logIn = document.getElementById('authorizing-button');
        this.logOut = document.getElementById('authorized-button');
        this.fill = document.getElementById('fill');
        this.sendPassword = document.getElementById('sendPassword');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.inputs = document.querySelector('.input');
        this.Auth = document.getElementById('authantication');
        this.videoContent = document.getElementById('videocontent');
        this.searchInput = document.querySelector('textarea[name=search]');
        this.search = document.getElementById('searchButton');
        this.video = document.getElementById('video');

    }


    


startSignup(){

    this.signUp.style.display = 'none';
    this.logIn.style.display = 'none';
    this.inputs.style.display = 'block';
    this.sendPassword.style.display = 'block';
};



functionLogIn(){
 
    
this.signUp.style.display = 'none';
this.logIn.style.display = 'none';

this.inputs.style.display = 'block';
  this.sendPassword.style.display = 'block';                    


};



searchCheck(){
   const searchvalue = this.searchInput.value
    

   if(searchvalue === ''){
       return alert('enter channel name in the search fill')
   }

   else{
        const API_KEY = 'AIzaSyDlNhyVzf8rNlE7EzBCNpD4sxtZPiQbvkU';
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${searchvalue}&maxResults=9`;
        fetch(url)
        .then(ressult => {
            return ressult.json();
        })
        .then(data => {
         console.log(data);
        const videoItems = []; 
        const videoElements = document.querySelector(".youtubeVideos");
        data.items.forEach(item => {
                if(item.id.kind =="youtube#video"){
                    const videoElement = document.createElement('div');
                    const vidItem = {
                        videoHtml:  `
                        <div class="col s6">
                        <iframe width="450" height="310" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\
                        </div>
                        `
                    };
                    videoItems.push( vidItem);
                    videoElement.innerHTML = vidItem.videoHtml;

                    videoElements.append(videoElement);
                    this.searchInput.textContent = '';
                }

            });    
        })
        .catch(err => {
            console.log(err);
            
        })

        
    }
    
};

submitAuth() {
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    fetch('http://localhost:5000/youtube/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            Email: emailValue,
            password:passwordValue
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
   
            this.Auth.style.display = "none";
            this.videoContent.style.display = 'block';
        } 
    })
    .catch(err => {
        console.log(err);
        
    });   
} 


}

function addEventListeners(){
    const ui = new UI();
    ui.signUp.addEventListener("click", function(event) {
        event.preventDefault();
        ui.startSignup();
    });
    ui.logIn.addEventListener("click", function(event) {
        event.preventDefault();
        ui.functionLogIn();
    });
    ui.logOut.addEventListener("click", function(event){
        event.preventDefault();
       

    });

    ui.sendPassword.addEventListener('click', function(event){
        event.preventDefault();
        ui.submitAuth();
    });

   ui.search.addEventListener('click', function (event){
       event.preventDefault();
       ui.searchCheck();
   })

}
document.addEventListener('DOMContentLoaded',function (){
    addEventListeners();
})

