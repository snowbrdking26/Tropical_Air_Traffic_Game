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
    for (let i = 0; i < num; i++) {

    $rock = $('<alotofPlanes>').empty().append('<img src="img/fastplaneemptybackground.png" height="30px" width="40px"/>').attr('id','planeFast')

    $('#board').append($rock);

    }
}
createAlotOfPlanes(20);

///////////////////////////////////////////////////////////////
//Collision with other objects, border, and collision to earn points





///////////////////////////////////////////////////////////////
// EXAMPLE 1 - Just an example I will delete this
///////////////////////////////////////////////////////////////
// Random Fast and Slow plane movements chaotic movements

// $(document).ready(function(){
//
//
// });

// function makeNewPosition(){
//
//     // Get viewport dimensions (remove the dimension of the div)
//     var h = $('#board').height();
//     var w = $('#board').width();
//
//     var nh = Math.floor(Math.random() * h);
//     var nw = Math.floor(Math.random() * w);
//
//     return [nh,nw];
//
// };
// function makeNewPosition2(){
//
//     // Get viewport dimensions (remove the dimension of the div)
//     var h = $('#board').height();
//     var w = $('#board').width();
//
//     var nh2 = Math.floor(Math.random() * h);
//     var nw2 = Math.floor(Math.random() * w);
//
//     return [nh2,nw2];
//
// };
//
// function animateDiv(){
//     var newq = makeNewPosition();
//     var newz = makeNewPosition2();
//     var oldq = $('#planeFast').offset();
//     var oldz = $('#planeSlow').offset();
//     var speed = calcSpeed([oldq.top, oldq.left], newq);
//     var speed = calcSpeed([oldq.top, oldq.left], newz);
//
//     $('#planeFast').animate({ top: newq[0], left: newq[1] }, speed, function(){
//       animateDiv();
//     });
//     $('#planeSlow').animate({ top: newz[0], left: newq[1] }, speed, function(){
//       animateDiv();
//     });
//
// };
//
// function calcSpeed(prev, next) {
//
//     var x = Math.abs(prev[1] - next[1]);
//     var y = Math.abs(prev[0] - next[0]);
//
//     var greatest = x > y ? x : y;
//     var speedModifier = 0.1;
//     var speed = Math.ceil(greatest/speedModifier);
//     return speed;
//
// };

// const move = () => {
//
//   const $fastPlane = $('#planeFast');
//   $fastPlane.animate({y: -60} 2000);
// };

// ////////////////////////////
// creates two planes each 3 seconds


// rockInterval =
//     setInterval(function() {
//       for (var i = 0; i < 2; i++) {
//       rockArray.push(createAlotOfPlanes(i))
//       }
//     }, 2000)
//


// ////////////////////////////


///////////////////////////////////////////////////////////////
// EXAMPLE 2 - Just an example I will delete this
///////////////////////////////////////////////////////////////
// // Rock Prototype
// function createRock(id){
//   leftRight = [];
//   topBottom = [];
//   positionArray = [];
//   //have rocks spawn between these numbers
//   randRight = Math.floor(Math.random() * (600 - 580) + 580)
//   randBot = Math.floor(Math.random() * (600 - 580) + 580)
//   randTop = Math.floor(Math.random() * (50 - 40) + 40)
//   randLeft = Math.floor(Math.random() * (50 - 40) + 40)
//
//   leftPos = Math.floor(Math.random() * (600 - 50) + 50)
//   topPos = Math.floor(Math.random() * (600 - 50) + 50)
//
//   pos = Math.floor(Math.random() * (3) + 1)
//   neg = Math.floor(Math.random() * (-3) - 1)
//
//   leftRight.push(randRight, randLeft)
//   topBottom.push(randTop, randBot)
//
//   function rand01() {
//     return Math.round(Math.random())
//   }
//
// 	positionArray.push(leftRight[rand01()],topBottom[rand01()])
//   clone = positionArray[rand01()]
//
// 	if (clone === positionArray[0]) {
//     positionArray.splice(1, 1)
//     positionArray.push(topPos)
//   }
//
// 	if (clone === positionArray[1]) {
//     positionArray.splice(0, 1)
//     positionArray.unshift(leftPos)
//   }
//
//   // Rock quadrant for directions
//   if (positionArray[0] <= (-20)) {
//     if (positionArray[1] <= 302) {
//       console.log(this);
//       this.newPos = [pos, pos];
//     }
//     if (positionArray[1] >= 303) {
//       this.newPos = [pos, neg];
//     }
//   }
//
//   if (positionArray[1] <= (-20)) {
//     if (positionArray[0] <= 502) {
//       this.newPos = [pos, pos];
//     }
//     if (positionArray[0] >= 503) {
//       this.newPos = [neg, pos];
//     }
//   }
//
//   if (positionArray[0] >= 1020) {
//     if (positionArray[1] <= 302) {
//       this.newPos = [neg, pos];
//     }
//     if (positionArray[1] >= 303) {
//       this.newPos = [neg, neg];
//     }
//   }
//
//   if (positionArray[1] >= 620) {
//     if (positionArray[0] <= 502) {
//       this.newPos = [pos, neg];
//     }
//     if (positionArray[0] >= 503) {
//       this.newPos = [neg, neg];
//     }
//   }
//
// 	this.speed = 3;
// 	this.width = 25;
// 	this.height = 25;
// 	this.left = positionArray[0];
// 	this.top = positionArray[1];
// 	this.id = id;
//
// 	$rock = $("<div class=rock/>")
// 		.css({"border":"4px solid red","height":this.height,"width":this.width,"left":this.left+"px","top":this.top+"px","position":"absolute"})
//   $('#board').append($rock);
// }




    // function rockMove() {
    //   $rocks = $('.rock');
    //
    //   for (i = 0; i < $rocks.length; i++) {
    //     rockTop = parseInt($rocks[i].style.top);
    //     rockLeft = parseInt($rocks[i].style.left);
    //
    //     leftR = rockArray[i].newPos[0];
    //     topR = rockArray[i].newPos[1];
    //
    //     newTop = rockTop + topR;
    //     this.$rocks[i].style.top = newTop + "px"
    //     newLeft = rockLeft + leftR;
    //     this.$rocks[i].style.left = newLeft + "px"
    //
    //   }
    //
    // }
















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
