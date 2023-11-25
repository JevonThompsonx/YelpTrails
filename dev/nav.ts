const btn = document.querySelector('.mobile-menu-button'),
menu = document.querySelector('.mobile-menu')

btn?.addEventListener('click', ()=> {
    menu?.classList.toggle('hidden')
})

const theWholePage = document.querySelector('#allDiv'),
allDivs:NodeListOf<HTMLDivElement> = document.querySelectorAll('.singleTrail')

let locationNumber = 9,
firstDiv = 15,
endDiv = 25;


const loadDivs = (initial:number,max:number)=> {
       for (let index = initial; index < max; index++) {
    let singleDiv = allDivs[index];
    singleDiv.classList.toggle('hidden');
    singleDiv.classList.toggle('flex');
    } 
}
,
onLoadLoadDivs = ()=> { window.addEventListener('DOMContentLoaded',()=> {
    loadDivs(0,15);
})
},loadMore = ()=> {
    let locationCheckDiv = allDivs[locationNumber];
    if (locationCheckDiv.getBoundingClientRect().y <= 0){
    loadDivs(firstDiv,endDiv);
    firstDiv += 10;
    endDiv += 10;
    locationNumber +=10
    }
}
onLoadLoadDivs();
document.addEventListener('scroll',loadMore);