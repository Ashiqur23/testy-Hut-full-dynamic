function loadData(search, cardQuantity){
    if(!search){
        return;
    }
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(URL)
    .then(res => res.json())
    .then(data => displayData(data, cardQuantity))
}
const displayData = (data, cardQuantity) =>{
    const cardContainer= document.getElementById('card-container');
    cardContainer.innerHTML =''
    const seeAll = document.getElementById('seeAll');
    // console.log(data.meals)
    if(data.meals === null){
        alert('not Found')
    }
    else{
        if(cardQuantity && data.meals.length > 5){
            data.meals = data.meals.slice(0,6)
            seeAll.classList.remove('d-none');
            seeAll.style.marginTop = '20px';
        }
        else{
            seeAll.classList.add('d-none');
        }
        // console.log(data.meals)
        data.meals.forEach(element => {
            
            // console.log(element)
            const {strMealThumb, strCategory, strInstructions, idMeal} = element;
            const div = document.createElement('div');
            div.classList.add('col-lg-6');
            div.innerHTML =`
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${strMealThumb ? strMealThumb : 'not here'}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8 p-3">
                    <div class="card-body ms-2 d-flex flex-column justify-content-between h-100">
                        <div>
                            <h5 class="card-title">${strCategory}</h5>
                            <p class="card-text">${strInstructions.slice(0,200)}</p>
                        </div>
                        <small onclick="modalLoad(${idMeal})" class="text-warning fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</small>
                    </div>
                </div>
            </div>
            `
            cardContainer.appendChild(div)
        });
    }
}
// modal section
const modalLoad = idMeal =>{
    // console.log(idMeal)
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(URL)
    .then(res => res.json())
    .then(data => displayModal(data.meals[0]))
}
// displayModal
const displayModal = (data) =>{
    console.log(data)
    const {strCategory, strMealThumb , strInstructions,strYoutube, strArea} = data
    const modalBody = document.getElementById('modal-body');
    document.getElementById('exampleModalLabel').innerText = strCategory;
    modalBody.innerHTML =`
        <div class="row g-0">
            <div class="col-md-12">
                <img src="${strMealThumb ? strMealThumb : 'not here'}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-12 p-3">
                <div class="card-body ms-2 d-flex flex-column justify-content-between h-100">
                    <div>
                        <p class="card-title"><span class= "fw-bold">Category:</span> ${strCategory}</p>
                        <p class="card-title"><span class= "fw-bold">Area:</span> ${strArea}</p>
                        <p class="card-text"><span class= "fw-bold">Instructions:</span> ${strInstructions.slice(0,400)}...</p>
                    </div>
                    <a href="${strYoutube}" target="_blank"><span class= "fw-bold text-black">Youtube:</span> Visit Youtube</a>
                </div>
            </div>
        </div>
        `
}
// toggle 
function toggle(dataLimit){
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    loadData(inputValue, dataLimit);
}
// search btn 
document.getElementById('Search-btn').addEventListener('click', function(){
    toggle(6);
})
// seeAll
document.getElementById('seeAll').addEventListener('click', function(){
    toggle();
})
// enter input
document.getElementById('input-field').addEventListener("keyup", function(event){
    if(event.key === 'Enter'){
        toggle(6)
    }
})






loadData('fish', 6)