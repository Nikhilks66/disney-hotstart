const carousel = document.querySelector('.carousel');
let sliders = [];

let slideIndex = 0;

const createSlide = () => {
    if(slideIndex >= movies.length){
        slideIndex = 0;
    }

//creating DOM element
let slide = document.createElement('div');
let imgElement = document.createElement('img');
let content = document.createElement('div');
let h1 = document.createElement('h1');
let p = document.createElement('p');

//Attaching all element
imgElement.appendChild(document.createTextNode(''));
h1.appendChild(document.createTextNode(movies[slideIndex].name));
p.appendChild(document.createTextNode(movies[slideIndex].des));
content.appendChild(h1);
content.appendChild(p);
slide.appendChild(content);
slide.appendChild(imgElement);
carousel.appendChild(slide);

//setting up image
imgElement.src = movies[slideIndex].image;
slideIndex++;

//setting element classname
slide.className = 'slider';
content.className = 'slide-content';
h1.className = 'movie-title';
p.className = 'movie-des';
sliders.push(slide);

//adding img slider

if(sliders.length){
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${30 * (sliders.length - 2)}px)`
}

}
for(let i = 0; i < 3; i++){
    createSlide();
}
setInterval(() => {
    createSlide();
}, 3000);


////video cards to hover
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(item => {
    item.addEventListener('mouseover',() =>{
        let video = item.children[1];
        video.play();
    })
    item.addEventListener('mouseleave',() =>{
        let video = item.children[1];
        video.play();
    })
})


///working slider for card


let cardContainers = document.querySelectorAll('.card-container');
let preBtns = document.querySelectorAll('.pre-btn');
let nxtBtns = document.querySelectorAll('.nxt-btn');

cardContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;


    nxtBtns[i].addEventListener('click', () =>{
        item.scrollLeft += containerWidth - 200;
    })
    preBtns[i].addEventListener('click', () =>{
        item.scrollLeft -= containerWidth + 200;
    })
})

// const getDiscountBtn = document.querySelector(".get-discount-btn");
const couponContainer = document.querySelector(".coupon-container");
const closeBtn = document.querySelector(".coupon-container .close");

getDiscountBtn.addEventListener("click", () => {
  couponContainer.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  couponContainer.classList.remove("active");
});

//dark-light mode js
const checkbox = document.getElementById('checkbox');
const navbar = document.getElementsByClassName('navbar')
checkbox.addEventListener('change', ()=>{
    //changing the theme or background colour of website
    document.body.classList.toggle('dark');
});
// ==============================================================================
let x = document.getElementById('out');
let y = document.getElementById('weatherOut');
function geolocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition)  
    }
    else
    {
        x.innerText = "Geo Not Supported"    
    }
}
function showPosition(data){
    console.log(data)
    let lat = data.coords.latitude;
    let long = data.coords.longitude;
    let y = document.getElementById('weatherOut');
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    //api calling
    fetch(url,{method: 'GET'})
    // return promise
    .then((res) => res.json())
    // resolve promise
    .then((data) => {
        console.log(data)

        let cityName = data.city.name;
        let temp = data.list[0].temp.day;

        // y.innerText = `City : ${cityName} `
        
        x.innerText =` Temperature : ${temp} °C`

    })
    // .catch((err) => {
    //     console.log(err)
    // })
    geolocation();
}