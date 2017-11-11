// console.log('testing');

$(() => {

var rockArray = [];

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
// move();
// animateDiv();
// rockMove();
// createRock();


}



///////////////////////////////////////////////////////////////
////----------- Staying in the boards frame----------/////////

// 1. define border coordinates
// 2. define player coordinates


let $plane1 = $('#plane1')[0];
let $plane1Width = $plane1.width;
let $plane1Height = $plane1.height;


let $gameBoardRect = $('#board')[0].getBoundingClientRect();
    //gameboard coordiantes boundaries
let $plane1Rect = $('#plane1')[0];
    //plane1 coordiantes boundaries

///////////////////////////////////////////////////////////////
//////-------stay in game boundaries-----------///////
const stayInGameBoard = () => {
      let $planeBorder = $plane1Rect.getBoundingClientRect();
      // let $gameBoardBorder = $gameBoardRect.getBoundingClientRect();
      let $planeBorderRight = $planeBorder.left + $planeBorder.width;
      let $planeBorderBottom = $planeBorder.top + $planeBorder.height;
      let $gameBoardRectRight = $gameBoardRect.left + $gameBoardRect.width-5;
      let $gameBoardRectBottom =($gameBoardRect.top) + ($gameBoardRect.height-5);

          console.log($planeBorderBottom);
          console.log($planeBorderRight);


    if($planeBorder.left < $gameBoardRect.left)  {
          console.log('inside log statement');

          $("#plane1").animate({left: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
    }

    if($planeBorder.top < $gameBoardRect.top)  {
          console.log('inside log statement');

          $("#plane1").animate({top: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
    }

    if($planeBorderRight > $gameBoardRectRight)  {
          console.log('inside log statement');

          $("#plane1").animate({left: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
    }

    if($planeBorderBottom > $gameBoardRectBottom)  {
          console.log('inside log statement');

          $("#plane1").animate({top: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
    }


}    // end of function stayInGameBoard()

///////////////////////////////////////////////////////////////
// creates 20 planes
///////////////////////////////////////////////////////////////
const createAlotOfPlanes = (num) => {
    let planes = [];
    for (let i = 0; i < num; i++) {
          // planes[i] = [];
        //   for(j=0; j< planes; j++) {
        //       planes[i][j] = { x: 0, y: 0 };
        // }

    $alotOfPlanes = $('<alotofPlanes>').empty().append('<img src="img/fastplaneemptybackground.png" height="40px" width="30px"/>').attr('id','planeFast')

    $('#board').append($alotOfPlanes);

    }
}
createAlotOfPlanes(10);



}); // End of the game





////////////////////////////////////////////////////////////////
//------------------------references---------------------------

// random movement in box
//https://stackoverflow.com/questions/10385950/how-to-get-a-div-to-randomly-move-around-a-page-using-jquery-or-css

//for obstacle movement I used the following webpage answer move retangle back and forth
// http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Animation/Move_rectangle_back_and_forth.htm

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
