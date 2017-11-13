// console.log('testing');

$(() => {

//global variables-----------------//
  let arrayClouds = [];
  let cloudCount = 10;
  let arrowKeys = {};
  let score = 0;

  //gameboard coordiantes
  let $gameBoardRect = $('#board')[0].getBoundingClientRect();
  let $gameBoardRectRight = $gameBoardRect.left + $gameBoardRect.width-5;
  let $gameBoardRectBottom =($gameBoardRect.top) + ($gameBoardRect.height-5);

  //plane coordinates
  let $plane1 = $('#plane1')[0];
  let $planeBorder = $plane1.getBoundingClientRect(); //plane coordinates
  let $plane1Width = $plane1.width;
  let $plane1Height = $plane1.height;
  let $planeBorderRight = $planeBorder.left + $planeBorder.width;
  let $planeBorderBottom = $planeBorder.top + $planeBorder.height;


  //planeFast
  let $planeFastBorder = $('#planeFast')[0].getBoundingClientRect(); //plane coordinates

  //planeSlow
  let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect(); //plane coordinates

   //cloud coordinates
  // let $cloudsBorder = $('#cloud1')[0].getBoundingClientRect();
  // console.log($cloudsBorder);




//end global variables-------------//
console.log($planeBorder);

//Moving plane1 img left right up and down;
setInterval(movePlane, 20);


$(document).keydown(function(event) {
    arrowKeys[event.keyCode] = true;
});

$(document).keyup(function(event) {
    delete arrowKeys[event.keyCode];
});


function movePlane() {
  for (let direction in arrowKeys) {
    if (!arrowKeys.hasOwnProperty(direction)) continue;
    //moves left
    if (direction == 37) {$("#plane1").animate({left: "-=5"}, 0);
    $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
    }
    //moves up
    if (direction == 38) {$("#plane1").animate({top: "-=5"}, 0);
      $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
    }
    //moves right
    if (direction == 39) {$("#plane1").animate({left: "+=5"}, 0);
      $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
    }
    // moves down
    if (direction == 40) {$("#plane1").animate({top: "+=5"}, 0);
      $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
    }
  }
  stayInGameBoard();
  collisionDetection();
// createClouds();
// move();

} //end of movePlane() function
//-----------------------------------------------------------this doesnt work
// Removes the cloud once collected
//   function remove(id) {
//       const $elem = cloudArray[id];
//       // $elem.empty();
//       $elem.eq( 4 ).remove();
//   }
//     // return someArray.splice(0,[id]])
// console.log($('#board').children());
//-----------------------------------------------------------this doesnt work

////////////////////////////////////////////////////////////////////
//Collision with other objects, border, and collision to earn points
////////////////////////////////////////////////////////////////////

const collisionDetection = () => {

   //plane coordinates
   let $plane1 = $('#plane1')[0];
   let $planeBorder = $plane1.getBoundingClientRect(); //plane coordinates
   let $plane1Width = $plane1.width;
   let $plane1Height = $plane1.height;
   let $planeBorderRight = $planeBorder.left + $planeBorder.width;
   let $planeBorderBottom = $planeBorder.top + $planeBorder.height;

    //cloud coordinates
   // let $cloudsBorder = $('.clouds')[0].getBoundingClientRect();
   //planeFast coordinates
   let $planeFastBorder = $('#planeFast')[0].getBoundingClientRect();
   //planeSlow coordinates
   let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect();


   // console.log('this is clouds x: ' + $cloudsBorder.x);

   //plane1 and cloud collisionDetection
   for(let i = 0; i < cloudArray.length; i++){
      // var left2 = cloudArray[i].left-8;
      // var right2 = cloudArray[i].left+cloudArray[i].width;
      // var top2 = parseInt(cloudArray[i].top)-6;
      // var bottom2 = cloudArray[i].top+cloudArray[i].height+3;
      // console.log(cloudArray[2].top);
      // console.log(cloudArray.length);

      if ($planeBorder.left < cloudArray[i].left + cloudArray[i].width &&
         $planeBorder.left + $planeBorder.width > cloudArray[i].left &&
         $planeBorder.top < cloudArray[i].top + cloudArray[i].height &&
         $planeBorder.height + $planeBorder.top > cloudArray[i].top) {

        score += 1
        $cloudPointsTotal.text('Collect Clouds: Points: ' +score);
          console.log('cloud collision detected!');
          $('#plane1').addClass('scoredGreen');
          // console.log($plane1);
          // $('.clouds').attr('id','cloudDisappear');
          // $('.clouds').addClass('scoredGreen');
          // setTimeout(function() {
          //           $('.clouds').removeClass("scoredGreen");
          //       }, 1000);
         }
       }

   //plane1 and planeSlow collisionDetection
   if ($planeBorder.x < $planeSlowBorder.x + $planeSlowBorder.width &&
      $planeBorder.x + $planeBorder.width > $planeSlowBorder.x &&
      $planeBorder.y < $planeSlowBorder.y + $planeSlowBorder.height &&
      $planeBorder.height + $planeBorder.y > $planeSlowBorder.y) {
    console.log('planeSlow collision detected!');
    $('#planeSlow').addClass('scoredRed');
    setTimeout(function() {
              $('#planeSlow').removeClass("scoredRed");
          }, 1000);
   }

   //plane1 and planeSlow collisionDetection
   if ($planeBorder.x < $planeFastBorder.x + $planeFastBorder.width &&
      $planeBorder.x + $planeBorder.width > $planeFastBorder.x &&
      $planeBorder.y < $planeFastBorder.y + $planeFastBorder.height &&
      $planeBorder.height + $planeBorder.y > $planeFastBorder.y) {
    console.log('planeFast collision detected!');
    $('#planeFast').addClass('scoredRed');
    setTimeout(function() {
              $('#planeFast').removeClass("scoredRed");
          }, 1000);
   }
} //end of collisionDetection() function



///////////////////////////////////////////////////////////////
////----------- Staying in the boards frame----------/////////
///////////////////////////////////////////////////////////////
// 1. define border coordinates
// 2. define player coordinates

const stayInGameBoard = () => {

          //gameboard coordiantes
          let $gameBoardRect = $('#board')[0].getBoundingClientRect();
          let $gameBoardRectRight = $gameBoardRect.left + $gameBoardRect.width-5;
          let $gameBoardRectBottom =($gameBoardRect.top) + ($gameBoardRect.height-5);

          //plane coordinates
          let $plane1 = $('#plane1')[0];
          let $planeBorder = $plane1.getBoundingClientRect(); //plane coordinates
          let $plane1Width = $plane1.width;
          let $plane1Height = $plane1.height;
          let $planeBorderRight = $planeBorder.left + $planeBorder.width;
          let $planeBorderBottom = $planeBorder.top + $planeBorder.height;

          // console.log($planeBorderBottom);
          // console.log($planeBorderRight);


    if($planeBorder.left < $gameBoardRect.left)  {
          $("#plane1").animate({left: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
    }

    if($planeBorder.top < $gameBoardRect.top)  {
          $("#plane1").animate({top: "+=5"}, 0);
          $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
    }

    if($planeBorder.right > $gameBoardRect.right)  {
          $("#plane1").animate({left: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
    }

    if($planeBorder.bottom > $gameBoardRect.bottom)  {
          $("#plane1").animate({top: "-=5"}, 0);
          $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
    }


}    // end of function stayInGameBoard()




///////////////////////////////////////////////////////////////
//Create clouds//
///////////////////////////////////////////////////////////////
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createClouds = () => {

  cloudArray = [];

  for(var i = 0;i<10;i++){
		cloudArray.push(new point(i));
	}

  pointInterval =
      setInterval(function() {

        if (cloudArray.length <= 40) {
        cloudArray.push(new point(i));
        }
      }, 1000)

console.log(cloudArray.length);



function point(id){
      this.left = getRandomInt(50, $gameBoardRect.width);
      this.top = getRandomInt(100, $gameBoardRect.height- 30);
      // this.left = parseInt(Math.random()*(400) + 10);
    	// this.top = parseInt(Math.random()*400 + 10);
      this.height = 20;
      this.width =20;
      this.id = id;
      const $cloudPoints = $("<div>").addClass('cloudy').append('<img src="img/cloud.png" width = "20px">')
        .css({"height":this.height,"width":this.width,"left":this.left,"top":this.top,"position":"absolute"})
      $('#board').append($cloudPoints);
}



} //end createClouds()

createClouds();

console.log(cloudArray);




///////////////////////////////////////////////////////////////
//btnReset//
///////////////////////////////////////////////////////////////

// const $btnReset = $('<div>').attr('id','startGame')
// $('#row').append($restartGameBtn.text('Start/Restart'));

const $btnReset = $('<div>').text('START/RESET').attr('class','pointsBoard')
.css({ color:'white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  margin: '5px 5px 5px 0',
  padding: '5px 5px',
  width: '200px'});
$('#row').append($btnReset);


const reset = () => {
  cloudCount = 10;
  arrayClouds = 0;
  let score = 0;
  // createClouds();
  console.log("button pressed");

};

//event listeners
$btnReset.on('click', reset);


///////////////////////////////////////////////////////////////
////----------- Recording Points----------/////////
///////////////////////////////////////////////////////////////



const $cloudPointsTotal = $('<div>').attr('class','pointsBoard')
.css({ color:'white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  margin: '5px 0px',
  padding: '5px 5px',
  width: '200px'});
$('#row').append($cloudPointsTotal.text('Collect Clouds: Points: ' + score));





}); // End of the game

// function clearOut() {
//   rockArray = [];
//   clearInterval(pointInterval);
//   clearInterval(rockInterval);
// }

// example 2
/////////----------------------------------
// $.fn.randomOrder = function(animate) {
//   // console.log(this);
//   this.each(function(foo) {
//     var image = $(this);
// // console.log(image);
// // console.log(this);
//
//     // Viewport Dimensions
//     var vpHeight = 400;
//     var vpWidth = 210;
//
//     // Image Position
//     var xPos = getRandomInt(0, vpWidth - image.width()-90);
//     var yPos = getRandomInt(0, vpHeight - image.height());
//     var zIndex = getRandomInt(0,0);
//
//     image.animate({left: xPos, top: yPos});
//     cloudsArr.push(image);
//   });
//   console.log(cloudsArr);
// };
//
// //Setup
// $('.clouds').randomOrder(true);
//


// example 3
/////////----------------------------------

// // global declarations
// var positions = [];
//

// function generatePositionsArray(maxX, maxY, safeRadius, irregularity) {
//     // declarations
//     var positionsArray = [];
//     console.log(positionsArray);
//     var r, c;
//     var rows;
//     var columns;
//     // count the amount of rows and columns
//     rows = Math.floor(maxY / safeRadius);
//     columns = Math.floor(maxX / safeRadius);
//     // loop through rows
//     for (r = 1; r <= rows; r += 1) {
//         // loop through columns
//         for (c = 1; c <= columns; c += 1) {
//             // populate array with point object
//             positionsArray.push({
//                 x: Math.round(maxX * c / columns) + getRandomInt(irregularity * 1, irregularity),
//                 y: Math.round(maxY * r / rows) + getRandomInt(irregularity * 1.5, irregularity)
//             });
//         }
//     }
//     // return array
//     return positionsArray;
// }
// positions = generatePositionsArray(10, 1, 1, 10);
//
// // get random position from positions array
// function getRandomPosition(array, removeTaken) {
//     // declarations
//     var randomIndex;
//     var coordinates;
//     // get random index
//     randomIndex = getRandomInt(0, array.length - 1);
//     // get random item from array
//     coordinates = array[randomIndex];
//     // check if remove taken
//     if (removeTaken) {
//         // remove element from array
//         array.splice(randomIndex, 1);
//     }
//     // return position
//     return coordinates;
// }
//
// getRandomPosition(positions, true);


///////////////////////////////////////////////////////////////
//ALL cloud coordinates//
///////////////////////////////////////////////////////////////

      // console.log('this is cloud x coordinate: ' +$cloudsBorder.x);
      // console.log($cloudsBorder); // all x, y, bottom, right coordinates

      // var cloudArr = [];
      // for(c=0; c<cloudCount; c++) {
      //     cloudArr[c] = [];
      //     for(r=0; r<cloudRowCount; r++) {
      //         cloudArr[c][r] = { x: 0, y: 0, status: 1 };
      //     }
      // }






  ///////////////////////////////////////////////////////////////
  // creates 20 planes
  ///////////////////////////////////////////////////////////////
  // const createAlotOfPlanes = (num) => {
  //     let planes = [];
  //     for (let i = 0; i < num; i++) {
  //           // planes[i] = [];
  //         //   for(j=0; j< planes; j++) {
  //         //       planes[i][j] = { x: 0, y: 0 };
  //         // }
  //
  //     $alotOfPlanes = $('<alotofPlanes>').empty().append('<img src="img/fastplaneemptybackground.png" height="40px" width="30px"/>').attr('id','planeFast');
  //
  //     $('#board').append($alotOfPlanes);
  //
  //     }
  // }
  // createAlotOfPlanes(10);

  // //randomize the planes
  // function getRandomInt (min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  // }
  //
  // $.fn.randomOrder = function(animate) {
  //   this.each(function() {
  //     var $planeFast = $('#planeFast');
  //
  //     // Viewport Dimensions
  //     var vpHeight = 400;
  //     var vpWidth = 210;
  //
  //     // Image Position
  //     var xPos = getRandomInt(0, vpWidth - $planeFast.width()-90);
  //     var yPos = getRandomInt(0, vpHeight - $planeFast.height());
  //     var zIndex = getRandomInt(0,0);
  //
  //     $planeFast.animate({left: xPos, top: yPos});
  //   });
  // };
  //
  // //Setup
  // $('#planeFast').randomOrder(true);

















////////////////////////////////////////////////////////////////
//------------------------references---------------------------

// //Collision detection// 2D from MDN with IF statement works perfect!
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

// Game dev Tutorial //https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Finishing_up

// Game example dodger
//http://kyleliu.info/Dodger-2-Player-Game/

///Create Clouds// this reference for radomly positioning multiple pictures in box
//https://codepen.io/anon/pen/bYqQjP

// For point tallies https://jsfiddle.net/end3r/9temh0ta/?utm_source=website&utm_medium=embed&utm_campaign=9temh0ta

// Random movement in box
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
