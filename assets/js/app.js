// Variables
const TweetsList = document.getElementById('lista-tweets');


// Event Listeners

eventListener();

function eventListener(){
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',
    agregarTweet);

    //borrar tweets
    TweetsList.addEventListener('click', deleteTweet);

    //contenid cargado de localstorage
    document.addEventListener('DOMContentLoaded', localStorageReady);
}
// Funciones

function agregarTweet(e){
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //Crear el boton eliminar
    const deleteBtn = document.createElement('a');
    deleteBtn.classList = 'borrar-tweet';
    deleteBtn.innerText = 'X';
    
    //crear elemento y agregar el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //agrega el boton de borrar al tweet
    li.appendChild(deleteBtn);
    //agrega el tweet a la lista
    TweetsList.appendChild(li);
    //agregar a local storage
    addTweetToLocalStorage(tweet);
} 

//eliminar el tweet
function deleteTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        deleteTweetLocalStorage(e.target.parentElement.innerText);
        
    } 
}

//eliminar texto del local Storage
function deleteTweetLocalStorage(tweet){

    let tweets, deleteTweet;
    //elimina la X al final
    deleteTweet = tweet.substring(0, tweet.length - 1);

    tweets = getTweetsLocalStorage();
    tweets.forEach(function (tweet, index) {
        if (deleteTweet === tweet) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//agregar tweet al local storage
function addTweetToLocalStorage(tweet){
    let tweets;
    tweets = getTweetsLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets) );
}
//ver los elementos de local storage
function getTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = []
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
function localStorageReady(){
    let tweets;

    tweets = getTweetsLocalStorage();

    tweets.forEach(function(tweet){
        //Crear el boton eliminar
        const deleteBtn = document.createElement('a');
        deleteBtn.classList = 'borrar-tweet';
        deleteBtn.innerText = 'X';
        
        //crear elemento y agregar el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //agrega el boton de borrar al tweet
        li.appendChild(deleteBtn);
        //agrega el tweet a la lista
        TweetsList.appendChild(li);
    });
}