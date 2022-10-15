const cardContainer = document.querySelector(".card__container");
const cardTmp = document.querySelectorAll(".card");
const cardWidth = document.querySelector(".card").getBoundingClientRect().width;

let currientCard = 0;

let card = [];
for (let i = 0; i < cardTmp.length; i++) {
  card[i] = cardTmp[i].outerHTML;
  cardTmp[i].remove();
}

for (let i = 0; i < card.length; i++) {
  cardContainer.insertAdjacentHTML("beforeend", card[i]);
  document.querySelectorAll(".card")[i].style.left =
    10 * (i + 1) + cardWidth * i + "px";
}

let startPositionX;
let finishPositionX;
let shiftX;

//Прокрутка на мобильных устройствах
cardContainer.addEventListener("touchstart", onTouch);
let startTouchPositionX;
let cardCoordX = [];

// setInterval(getScrollSpeed, 100);

//Касание контейнера с картами
function onTouch(event) {
  cardContainer.addEventListener("touchend", onTouchEnd);
  startTouchPositionX = event.changedTouches[0].clientX;
  //Открючаем вертикальную прокрутку при промотке карт чтобы экран не прыгал
  document.querySelector("body").style.overflowY = "hidden";
  cardContainer.addEventListener("touchmove", onTouchMove);

  for (let i = 0; i < card.length; i++) {
    document.getElementsByClassName("card")[i].style.transition = null;
  }

  //Прокрутка контейнера с картами
  function onTouchMove(event) {
    let currientCoord = event.changedTouches[0].clientX;
    shiftX = 0;
    shiftX = currientCoord - startTouchPositionX;
    startTouchPositionX = currientCoord;

    for (let i = 0; i < card.length; i++) {
      cardCoordX[i] = document
        .querySelectorAll(".card")
        [i].getBoundingClientRect().left;

      //Сперва проверяем на невыход всех карт про прокрутке за пределы экрана
      if (cardCoordX[0] + shiftX > 10) {
        for (let i = 0; i < card.length; i++) {
          let newCoord = (i + 1) * 10 + i * cardWidth;
          document.querySelectorAll(".card")[i].style.left = newCoord + "px";
        }
      } else {
        if (cardCoordX[card.length - 1] + shiftX < 10) {
          for (let i = 0; i < card.length; i++) {
            document.querySelectorAll(".card")[i].style.left =
              (-card.length + 1 + i) * cardWidth +
              (i - card.length + 2) * 10 +
              "px";
          }
          //После этого делаем прокрутку
        } else {
          let newCoord = cardCoordX[i] + shiftX;
          if (newCoord < 10 + cardWidth / 2 && newCoord > 10 - cardWidth / 2) {
            currientCard = i;
          }
          document.querySelectorAll(".card")[i].style.left = newCoord + "px";
        }
      }
    }
  }

  //Отпускаем карты, сбрасываем все обработчики событий
  function onTouchEnd() {
    cardContainer.removeEventListener("touchmove", onTouchMove);
    cardContainer.removeEventListener("touchend", onTouchEnd);
    document.querySelector("body").style.overflowY = "visible";

    //Плавная прокрутка карт при отпускании
    for (let i = 0; i < card.length; i++) {
      document.querySelectorAll(".card")[i].style.transition = "0.3s";
    }
    for (let i = 0; i < card.length; i++) {
      document.querySelectorAll(".card")[i].style.left =
        (i - currientCard) * cardWidth + 10 + (i - currientCard) * 10 + "px";
    }
    setActiveIndicator();
  }
}

//Заполнение индикатора
for (let i = 0; i < card.length; i++) {
  let newIndicator = document.createElement("div");
  newIndicator.classList.add("indicator");
  document
    .querySelector(".nav__top__right")
    .insertAdjacentElement("afterBegin", newIndicator);
}
setActiveIndicator();

function setActiveIndicator(){
  for(let i = 0; i< card.length; i++){
    if(currientCard === i){
      document.querySelectorAll('.indicator')[i].classList.add('indicator__active');
    }else{
      if(document.querySelectorAll('.indicator')[i].classList.contains('indicator__active')){
        document.querySelectorAll('.indicator')[i].classList.toggle('indicator__active');
      }
    }
  }
}