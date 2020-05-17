const carousel = document.querySelector('.carousel')
const items = document.querySelectorAll('.item')
const btns = document.querySelectorAll('.btn')
const totalItems = items.length - 1;
const master = gsap.timeline({repeat:-1, delay: 1});
let interval = null;
let index = 0;

const images = [
  {imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/twgbc_com_mas_dsk_02.jpg'},
  {imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/blackwidow_0505_com_mas_dsk_01.jpg'},
  {imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/muchars_com_mas_dsk_final.jpg'},
  {imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/battleroyale_lob_mas_dsk_03_0.jpg'},
  {imageUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/support_0325_com_mas_dsk_01.jpg'}
]

function setItemBackground(){
  [...items].forEach((item,index) => {
    item.style.backgroundImage = `url(${images[index].imageUrl})`
    item.style.backgroundSize = 'cover'
    item.style.backgroundRepeat = 'no-repeat'
    item.style.backgroundPosition = 'center'
  })
}

function removeActiveClass(){
  [...btns].forEach( btn => {
    btn.classList.remove('active')
    btn.style.color = "black"
  })
}

function start(){
  let currentBtn = master.currentLabel().split('-')[1]
  btns[currentBtn-1].classList.add('active')
  btns[currentBtn-1].style.color = "#e62429"
}

function changeImage(position){
  master.seek(position)
}

function checkAnswer(){
  removeActiveClass()
  let position = `item-${this.dataset.item}`;
  changeImage(position)
}

function addEvents(){
  [...btns].forEach((btn,index)=>{
    btn.dataset.item = index+1;
    btn.addEventListener("click", checkAnswer);
  })
}

function elementIn(item,index){
  const tl = gsap.timeline()
  tl.set(item,{visibility:'visible'})
  tl.from(item,{
      onStart: start,
      duration: 1,
      x: 100,
      autoAlpha:0
    })
  .to(item,{
    delay: 2,
    duration: 0.3,
    onStart: removeActiveClass,
    x: -50,
    autoAlpha: 0
  })
  return tl;
}

function createMasterTl(){
  for(let i = 0; i<=totalItems; i++){
    master.add(elementIn(items[i]),`item-${i+1}`)
  }
}

setItemBackground()
addEvents()
createMasterTl()



