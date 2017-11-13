// console.log('testing');

$(() => {

//global variables-----------------//
  let arrayClouds = [];
  let arrayFastSlowObstacles = [];
  let planeSlowArray = [];
  let planeFastArray = [];

  let cloudCount = 2;
  let arrowKeys = {};
  let score = 0;
  let scoreArray =[];


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
// console.log($planeBorder);

//Moving plane1 img left right up and down;
setInterval(movePlane, 25);


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


      if ($planeBorder.left < cloudArray[i].left + cloudArray[i].width &&
         $planeBorder.left + $planeBorder.width > cloudArray[i].left &&
         $planeBorder.top < cloudArray[i].top + cloudArray[i].height &&
         $planeBorder.height + $planeBorder.top > cloudArray[i].top) {

        score += 1
        $cloudPointsTotal.text('Collect Cloud Points: ' +score);
          // console.log('cloud collision detected!');
          $('#plane1').addClass('scoredGreen');

          $('#' + i).remove()

        // cloudArray.splice(i, 1);
        // console.log(scoreArray.length);
          // scoreArray.push($('#' + i));
          // console.log(scoreArray.length);
          // console.log(cloudArray.length);

          scoreArray.push.apply(scoreArray, cloudArray.splice(i, 1));

         }
         setTimeout(function() {
                   $('.clouds').removeClass("scoredGreen");
               }, 1000);

       }

//-----------------------------------------------testing below
for(let i = 0; i < arrayFastSlowObstacles.length; i++){
  if ($planeBorder.x < arrayFastSlowObstacles[i].x + arrayFastSlowObstacles[i].width &&
     $planeBorder.x + $planeBorder.width > arrayFastSlowObstacles[i].x &&
     $planeBorder.y < arrayFastSlowObstacles[i].y + arrayFastSlowObstacles[i].height &&
     $planeBorder.height + $planeBorder.y > arrayFastSlowObstacles[i].y) {
   console.log('OBSTACLE collision detected!');
   $('#planeSlow').addClass('scoredRed');
   setTimeout(function() {
             $('#planeSlow').removeClass("scoredRed");
         }, 1000);
  }
}
//-----------------------------------------------testing above


///this below works//
 for(let i = 0; i < arrayFastSlowObstacles.length; i++){
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
 }

for(let i = 0; i < arrayFastSlowObstacles.length; i++){
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

  for(var i = 0;i<=5;i++){
		cloudArray.push(new point(i));
	}

  // pointInterval =
  //     setInterval(function() {
  //       console.log(cloudArray.length);
  //       if (cloudArray.length <= 5) {
  //       cloudArray.push(new point(i));
  //       }
  //     }, 1000)

// console.log(cloudArray.length);



function point(id){
      this.left = getRandomInt(50, $gameBoardRect.width);
      this.top = getRandomInt(100, $gameBoardRect.height - 30);
      // this.left = parseInt(Math.random()*(400) + 10);
    	// this.top = parseInt(Math.random()*400 + 10);
      this.height = 20;
      this.width =20;
      this.id = id;
      const $cloudPoints = $("<div>").addClass('cloudy').attr('id',this.id).append('<img src="img/cloud.png" width = "20px">')
        .css({"height":this.height,"width":this.width,"left":this.left,"top":this.top,"position":"absolute", "margin": '0 0'})
      $('#board').append($cloudPoints);
}

} //end createClouds()

createClouds();
console.log(cloudArray);

///////////////////////////////////////////////////////////////
//create obstacales
///////////////////////////////////////////////////////////////
// function getRandomInt (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// const createObstacles = () => {

  // for(let i = 0;i<1;i++){
	// 	arrayFastSlowObstacles.push(new point(i));
	// }
  //
  // pointInterval =
  //     setInterval(function() {
  //
  //       if (arrayFastSlowObstacles.length < 1) {
  //       arrayFastSlowObstacles.push(new point(i));
  //       }
  //     }, 1000)

// console.log(arrayFastSlowObstacles.length);

                        // const arrObstacles = [
                        // 'img/fastplaneemptybackground.png',
                        // 'img/slowplaneemptybackground.png'
                        // ];
                        // // console.log(arrObstacles);
                        //
                        // const randomNumberInArray = () => {
                        //   let number = Math.floor(Math.random()*1);
                        //   return arrObstacles[number];
                        //   // console.log(arrObstacles[number]);
                        // }
                        // const addImg = () => {
                        //   let $obstabcleImage = randomNumberInArray();
                        //   let $newObstacleImg = $('<img>').attr('src',$obstabcleImage).addClass('ALOTofplanes')
                        //   return $newObstacleImg;
                        // }

//     function point(id){
//           this.left = getRandomInt(50, $gameBoardRect.width);
//           this.top = getRandomInt(100, $gameBoardRect.height - 60);
//           this.height = 20;
//           this.width =20;
//           this.id = id;
//           // let $addImg = addImg();
//           // let $newObstacleImg = $('<img>').attr('src',$addImg).addClass('ALOTofplanes')
//           let $newObstacleImg = $('<img>').attr('src','img/fastplaneemptybackground.png').addClass('ALOTofplanes')
//           .css({"height":this.height,"width":this.width,"left":this.left,"top":this.top,"position":"absolute", "margin": '0 0',
//            'z-index':'1'});
//           $('#board').append($newObstacleImg);
//         }
//
//
// // addObstacleImg();
//
// }//end of createObstacles()
// createObstacles();


///////////////////////////////////////////////////////////////
//btnReset//
///////////////////////////////////////////////////////////////

// const $btnReset = $('<div>').attr('id','startGame')
// $('#row').append($restartGameBtn.text('Start/Restart'));

const $btnReset = $('<div>').text('START / RESET').attr('class','pointsBoard')
.css({ color:'orange',
  '-webkit-text-stroke': '.01em white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  margin: '5px 5px 5px 0',
  padding: '5px 5px',
  width: '200px'});
$('#row').append($btnReset);


const reset = () => {

  createClouds();
  cloudArray = [];
  let score = 0;
  $cloudPointsTotal.text('Collect Cloud Points: ' + score);
  console.log("reset button pressed");
  $('.cloudy').remove();
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
  width: '280px'});
$('#row').append($cloudPointsTotal.text('Collect Clouds: Points: ' + score));





}); // End of the game


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




////////////////////////////////////////////////////////////////
//------------------------references---------------------------

// //Collision detection// 2D from MDN with IF statement works perfect!
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

//calculating score with splice and .push.apply
//https://stackoverflow.com/questions/42970768/removing-item-from-array-and-add-it-to-another-array

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
