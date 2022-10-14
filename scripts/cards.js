let cardContainer = document.querySelector(".card__container");
// cardContainer.addEventListener("mousedown", onMouseDown);
let cardTmp = document.querySelectorAll(".card");
const cardWidth = document.querySelector('.card').getBoundingClientRect().width

let card = [];
for(let i = 0; i < cardTmp.length; i++){
card[i] = cardTmp[i].outerHTML;
cardTmp[i].remove();
}

for (let i = 0; i < card.length; i++){
  cardContainer.insertAdjacentHTML('beforeend', card[i]);
  document.querySelectorAll('.card')[i].style.left = (10*(i+1) + cardWidth*i) + 'px';
}

let startPositionX;
let finishPositionX;
let shiftX;

// function onMouseDown(event) {
//   if (event.target.closest(".card")) {
//     cardContainer.addEventListener("mousemove", onCardMove);
//     cardContainer.addEventListener("mouseup", onMouseUp);
//     startPositionX = event.clientX;
//   }
//   function onMouseUp(event) {
//     cardContainer.removeEventListener("mousemove", onCardMove);
//     cardContainer.removeEventListener("mouseup", onMouseUp);
//     finishPositionX = event.clientX;
//   }
//   function onCardMove(event) {
//     event.preventDefault();
//     shiftX = event.clientX - startPositionX;
//     for (let i = 0; i < card.length; i++) {
//       card[i].style.transform = "translate(" + shiftX + "px)";
//     }
//   }
// }

//Прокрутка на мобильных устройствах
cardContainer.addEventListener("touchstart", onTouch);
let startTouchPositionX;
let cardCoordX = [];

//Касание к контейнеру с картами
function onTouch(event) {
  cardContainer.addEventListener("touchend", onTouchEnd);
  startTouchPositionX = event.changedTouches[0].clientX;
  //Открючаем вертикальную прокрутку при промотке карт чтобы экран не прыгал
  document.querySelector("body").style.overflowY = "hidden";
  cardContainer.addEventListener("touchmove", onTouchMove);

  //Прокрутка контейнера с картами
  function onTouchMove(event) {
    let currientCoord = event.changedTouches[0].clientX;
    let shiftX = currientCoord - startTouchPositionX;
    startTouchPositionX = currientCoord;

    for (let i = 0; i < card.length; i++) {
      cardCoordX[i] = document.querySelectorAll('.card')[i].getBoundingClientRect().left;
      document.querySelectorAll('.card')[i].style.left = cardCoordX[i] + shiftX + "px";
    }
  }

  //Отпускаем карты, сбрасываем все обработчики событий
  function onTouchEnd() {
    cardContainer.removeEventListener("touchmove", onTouchMove);
    cardContainer.removeEventListener("touchend", onTouchEnd);
    document.querySelector("body").style.overflowY = "visible";
  }
}
