// console.log('testing');

$(() => {

//global variables-----------------//

  let cloudArray = [];
  let planeSlowArray = [];
  let planeFastArray = [];
  let score = 0;
  let arrowKeys = {};


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

  //planeFast coordinates
  let $planeFastBorder = $('#planeFast')[0].getBoundingClientRect();

  //planeSlow coordinates
  let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect();


//end global variables-------------//



///////////////////////////////////////////////////////////////
//Moving plane1 img left right up and down;
///////////////////////////////////////////////////////////////

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


} //end of movePlane() function

///////////////////////////////////////////////////////////////
//"iPhone draggable" function - from developper.apple.com
///////////////////////////////////////////////////////////////

// $('#plane1').on('touchmove', function(e) {
//     e.preventDefault();
//     var touch = e.touches[0];
//     alert(touch.pageX + " - " + touch.pageY);
// }, false);




// $('#plane1').bind('touchstart mousedown', function(e){
//   e.preventDefault();
//   var touch = e.touches[0];
//   if(touch == true){
//         curX = e.targetTouches[0].pageX - startX;
//         curY = e.targetTouches[0].pageY - startY;
//         e.targetTouches[0].target.style.webkitTransform =
//             'translate(' + curX + 'px, ' + curY + 'px)'
//   } else {
//     console.log('this works');
//   }
// );

$('#plane1').on.bind('touchmove', function(e) {
    e.preventDefault();
    curX = e.targetTouches[0].pageX - startX;
    curY = e.targetTouches[0].pageY - startY;
    e.targetTouches[0].target.style.webkitTransform =
        'translate(' + curX + 'px, ' + curY + 'px)';
});

// touchMove();




///////////////////////////////////////////////////////////////
//"mouse move" function - from jsfiddle link below in references
///////////////////////////////////////////////////////////////
//
$('#plane1').on('mousedown', function (e) {

    $(this).addClass('active');

    var oTop = e.pageY - $('.active').offset().top;
    var oLeft = e.pageX - $('.active').offset().left;

    $(this).parents().on('mousemove', function (e) {
        $('.active').offset({
            top: e.pageY - oTop,
            left: e.pageX - oLeft
        }).on('mouseup', function () {
            $(this).removeClass('active');
        });
    });
    return false;
});


///////////////////////////////////////////////////////////////
//Create clouds//
///////////////////////////////////////////////////////////////
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cloudId = 0;

const createClouds = () => {
  for(var i = 0;i<=9;i++){
		cloudArray.push(new cloud(i));
	}
  cloudInterval =
    setInterval(function() {
      if (cloudArray.length <= 10) {
      cloudArray.push(new cloud(i));
      }
    }, 1000)

function cloud(id){
      this.left = getRandomInt(50, $gameBoardRect.width);
      this.top = getRandomInt(100, $gameBoardRect.height - 30);
      this.height = 20;
      this.width = 25;
      this.id = cloudId;
      const $cloudPoints = $("<div>").addClass('cloudy').attr('id',this.id).append('<img src="img/cloud.png" width = "20px">')
        .css({"height":this.height,"width":this.width,"left":this.left,"top":this.top,"position":"absolute", "margin": '0 0'})
      $('#board').append($cloudPoints);
      cloudId ++
    }

} //end createClouds()






createClouds();
console.log(cloudArray);


const announceWin = () => {
  $('#winRow').append($("<div>").addClass('win').css({
    display: 'flex',
    'flex-direction': 'row',
    color:'white',
    'background-color': '#44AFCD',
    border: '1px solid #39FF14',
    'animation-name': 'blinkingWin',
    'animation-duration': '1s',
    'animation-iteration-count': 'infinite',
    'transition-timing-function': 'linear',
    "height":'20px',
    'padding': '5px 5px',
    "width":'100%',
    "margin": '0 0 5px 0'})
    .text('You have Won the game! Press Reset to Play again.'));

  $('#board').addClass('winBoard').css({border: '1px solid #39FF14'})

}

const announceLoss = () => {
  $('#winRow').append($("<div>").addClass('loss').css({
    display: 'flex',
    'flex-direction': 'row',
    color:'white',
    'background-color': '#F22613',
    border: '1px solid #F22613',
    'animation-name': 'blinkingLoss',
    'animation-duration': '1s',
    'animation-iteration-count': 'infinite',
    'transition-timing-function': 'linear',
    "height":'20px',
    'padding': '5px 5px',
    "width":'100%',
    "margin": '0 0 5px 0'})
    .text('Game Over! Please try again!'));

  $('#board').addClass('winBoard').css({border: '1px solid #F22613'})

}




////////////////////////////////////////////////////////////////////
//Collision with other objects, border, and collision to earn points
////////////////////////////////////////////////////////////////////
let numberOfCollisionsForLoss = 0;


const collisionDetection = () => {

      //plane coordinates
   let $plane1 = $('#plane1')[0];
   let $planeBorder = $plane1.getBoundingClientRect(); //plane coordinates
   let $plane1Width = $plane1.width;
   let $plane1Height = $plane1.height;
   let $planeBorderRight = $planeBorder.left + $planeBorder.width;
   let $planeBorderBottom = $planeBorder.top + $planeBorder.height;


   //planeFast coordinates
   let $planeFastBorder = $('#planeFast')[0].getBoundingClientRect();
   //planeSlow coordinates
   let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect();

   // collision for points
   for(var i = 0; i < cloudArray.length; i++){
     if ($planeBorder.left < cloudArray[i].left + cloudArray[i].width &&
        $planeBorder.left + $planeBorder.width > cloudArray[i].left &&
        $planeBorder.top < cloudArray[i].top + cloudArray[i].height &&
        $planeBorder.height + $planeBorder.top > cloudArray[i].top) {

          let id = cloudArray[i].id; // do not delete
          // console.log(id);

      $('#' + id).remove();// do not delete
       score ++
       $cloudPointsTotal.text('Collect Cloud Points: ' + score)
              cloudArray.splice(i, 1);

      //winning state
      if (score === 10) {
        announceWin();
      }
    }
  }


///this below works//
 // for(let i = 0; i < obstacles.length; i++){
   //plane1 and planeSlow collisionDetection

   if ($planeBorder.x < $planeSlowBorder.x + $planeSlowBorder.width &&
      $planeBorder.x + $planeBorder.width > $planeSlowBorder.x &&
      $planeBorder.y < $planeSlowBorder.y + $planeSlowBorder.height &&
      $planeBorder.height + $planeBorder.y > $planeSlowBorder.y) {
    console.log('planeSlow collision detected!');
    $('#planeSlow').addClass('scoredRed');

    numberOfCollisionsForLoss ++

    setTimeout(function() {
              $('#planeSlow').removeClass("scoredRed");
          }, 1000);

                  if (numberOfCollisionsForLoss === 1) {
                  announceLoss();
                  }
   }


// for(let i = 0; i < obstacles.length; i++){
   //plane1 and planeSlow collisionDetection
   if ($planeBorder.x < $planeFastBorder.x + $planeFastBorder.width &&
      $planeBorder.x + $planeBorder.width > $planeFastBorder.x &&
      $planeBorder.y < $planeFastBorder.y + $planeFastBorder.height &&
      $planeBorder.height + $planeBorder.y > $planeFastBorder.y) {
    console.log('planeFast collision detected!');
    $('#planeFast').addClass('scoredRed');

    numberOfCollisionsForLoss ++

    setTimeout(function() {
              $('#planeFast').removeClass("scoredRed");
          }, 1000);

                  if (numberOfCollisionsForLoss === 1) {
                  announceLoss();
                  }
   }
} //end of collisionDetection() function


///////////////////////////////////////////////////////////////
////----------- Staying on the board----------/////////
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
//btnReset//
///////////////////////////////////////////////////////////////

const $btnReset = $('<div>').text('START / RESET').attr('class','pointsBoard')
.css({ color:'white',
  // '-webkit-text-stroke': '.01em white',
  'background-color': '#44AFCD',
  border: '1px solid #39FF14',
  margin: '5px 5px 5px 0',
  padding: '5px 5px',
  width: '200px'});
$('#row').append($btnReset);



const reset = () => {

// reset score
  cloudArray = [];
  score = 0;
  numberOfCollisionsForLoss = 0
  $cloudPointsTotal.text('Collect Cloud Points: ' + score);
          console.log("reset button pressed. Score is: " + score);
  $('.cloudy').remove();
  createClouds();


  $('.win').remove();
  $('.loss').remove();
  $('.winBoard').css({"border":'1px solid white'});

//reset plane location
$('board').append($('#plane1').css({
  position: 'relative',
  top:'89%',
  left:'42%',
  Transform: 'rotate(0deg)'}));

//these don't work
$('board').append($('#planeFast').stop(true).css({
    top: '0%',
    left: '0%'}));
//these don't work
$('board').append($('#planeSlow').stop(true).css({
    top: '0%',
    left: '0%'}));


}; //end of reset()

//event listeners
$btnReset.on('click', reset);


///////////////////////////////////////////////////////////////
////----------- Recording Points in text box----------/////////
///////////////////////////////////////////////////////////////

const $cloudPointsTotal = $('<div>').attr('class','pointsBoard')
.css({ color:'white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  margin: '5px 0px',
  padding: '5px 5px',
  width: '280px'});
$('#row').append($cloudPointsTotal.text('Collect Cloud Points: ' + score));



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
              // //
              // createAlotOfPlanes(10);

              // //randomize the planes
              // function getRandomInt (min, max) {
              //     return Math.floor(Math.random() * (max - min + 1)) + min;
              // }
              //

}); // End of the game


////////////////////////////////////////////////////////////////
//------------------------references---------------------------
//"Mouse move" on line 85-101 for game to be mobile friendly
// http://jsfiddle.net/pu2kK/

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
