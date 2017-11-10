// console.log('testing');

$(() => {



//Movement: moving plane1 img left right up and down;
setInterval(movePlane, 20);
var arrowKeys = {};

$(document).keydown(function(event) {
    arrowKeys[event.keyCode] = true;
});

$(document).keyup(function(event) {
    delete arrowKeys[event.keyCode];
});


function movePlane() {
    for (let direction in arrowKeys) {
        if (!arrowKeys.hasOwnProperty(direction)) continue;
        if (direction == 37) {
            $("#plane1").animate({left: "-=5"}, 0);
            $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
        }
        if (direction == 38) {
            $("#plane1").animate({top: "-=5"}, 0);
            $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
        }
        if (direction == 39) {
            $("#plane1").animate({left: "+=5"}, 0);
            $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
        }
        if (direction == 40) {
            $("#plane1").animate({top: "+=5"}, 0);
            $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
        }
    }
}


///////////////////////////////////////////////////////////////
// Random objects to avoid



///////////////////////////////////////////////////////////////
// Staying in the boards frame
// 1. define border coordinates
// 2. define player coordinates


let plane1 = $('#plane1')[0];
let deltaX = 0;
let deltaY = 0;
// plane1.style.position = "relative";

const stayInGameBoard = () => {

let gameBoardRect = $('#board')[0].getBoundingClientRect();
console.log(gameBoardRect);

let plane1Rect = $('#plane1')[0].getBoundingClientRect();
console.log(plane1Rect);

deltaX = Math.floor(Math.random() * 10);
console.log(deltaX);
deltaY = Math.floor(Math.random() * 10);
console.log(deltaY);


if((plane1Rect.left+deltaX) >= gameBoardRect.left)  {
    if((plane1Rect.top+deltaY) >= gameBoardRect.top){
        if((plane1Rect.right+deltaX) <= gameBoardRect.right){
            if((plane1Rect.bottom+deltaY) <= gameBoardRect.bottom){
                //Coords always inside parent div
                    plane1.style.top = '' + (parseInt(plane1.style.top, 10) + deltaY) + 'px';
                    plane1.style.left = '' + (parseInt(plane1.style.left, 10) + deltaX) + 'px';



            }
        }
    }
}


}

stayInGameBoard();







//Collision with other objects, border, and collision to earn points






});
////////////////////////////////////////////////////////////////
//------------------------references---------------------------
//rotating div
//https://stackoverflow.com/questions/382591/rotating-a-div-element-in-jquery

//moving plane1 div left right up and down;
//https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple

//key down jQuery
//https://api.jquery.com/keydown/

//.getBoundingClientRect() to find the retangular deminsions of rectangles
//https://jsfiddle.net/4e7eby9x/

// jQuery .getBoundingClientRect //https://stackoverflow.com/questions/18780139/how-to-get-bounding-box-for-div-element-in-jquery

//MDN info on getBoundingClientRect() https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

// https://codepen.io/anon/pen/qVRMbQ
// if ((game.player.x + game.player.w > x
//   && game.player.x < x + w)
//   && (game.player.y + game.player.h > y
//   && game.player.y < y + h)) {
//       return true;
//------------------------references---------------------------
////////////////////////////////////////////////////////////////
