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
    stayInGameBoard();
}


///////////////////////////////////////////////////////////////
// Random objects to avoid



///////////////////////////////////////////////////////////////
// Staying in the boards frame
// 1. define border coordinates
// 2. define player coordinates


let $plane1 = $('#plane1')[0];
let $plane1Width = $plane1.width;
let $plane1Height = $plane1.height;

let $gameBoardRect = $('#board')[0].getBoundingClientRect();
    //gameboard coordiantes boundaries
      // console.log($gameBoardRect);


let $plane1Rect = $('#plane1')[0];
    //plane1 coordiantes boundaries
      // console.log($plane1Rect);
      // console.log('plane rectangle left ' + $plane1Rect.left);
      // console.log('plane width ' + $plane1Width);
      // console.log($gameBoardRect);
      // console.log($plane1Rect);






//////-------stay in game boundaries-----------///////
const stayInGameBoard = () => {
      let $planeBorder = $plane1Rect.getBoundingClientRect();
      // let $gameBoardBorder = $gameBoardRect.getBoundingClientRect();
      let $planeBorderRight = $planeBorder.left + $planeBorder.width;
      let $planeBorderBottom = $planeBorder.top + $planeBorder.height;
      let $gameBoardRectRight = $gameBoardRect.left + $gameBoardRect.width;
      let $gameBoardRectBottom =$gameBoardRect.top + $gameBoardRect.height;

          console.log($planeBorderBottom);
          console.log($gameBoardRect.top + $gameBoardRect.height);


    if($planeBorder.left <= $gameBoardRect.left)  {
          console.log('inside log statement');

          $("#plane1").animate({left: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
    }

    if($planeBorder.top <= $gameBoardRect.top)  {
          console.log('inside log statement');

          $("#plane1").animate({top: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
    }

    if($planeBorderRight >= $gameBoardRectRight)  {
          console.log('inside log statement');

          $("#plane1").animate({left: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
    }

    if($planeBorderBottom >= $gameBoardRectBottom)  {
          console.log('inside log statement');

          $("#plane1").animate({top: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
    }


}    // end of stayInGameBoard()




//Collision with other objects, border, and collision to earn points



}); // End of the game


// possibly useful---------------------------------------------------
// if((plane1Rect.top+plane1Height) >= gameBoardRect.top){
//   console.log("true2");
//     if((plane1Rect.right+plane1Width) <= gameBoardRect.right){
//       console.log("true3");
//         if((plane1Rect.bottom+plane1Height) <= gameBoardRect.bottom){
//           console.log("true4");
//             Coords always inside parent div
//
//            plane1.top = 0px;
//            plane1.left = -35px;
//
//            plane1.top = '' + (parseInt(plane1.top, 10) + plane1Height) + 'px';
//                 console.log(plane1.top);
//
//            plane1.left = '' + (parseInt(plane1.left, 10) + plane1Width) + 'px';
//               console.log(parseInt(plane1.left, 10));
//
//         }
//     }
// }
// end of possibly useful---------------------------------------------------





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
