// console.log('testing');
//Title: Tropical Air Traffic Game

$(() => {

//global variables-----------------//

  let cloudArray = [];
  // let obstaclePlaneArray = [];
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
  //
  // //planeFast coordinates
  // let $planeFastBorder = $('#planeFast')[0].getBoundingClientRect();
  //
  // //planeSlow coordinates
  // let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect();
  //

//end global variables-------------//



///////////////////////////////////////////////////////////////
//Moving plane1 img left right up and down;
///////////////////////////////////////////////////////////////

movePlaneInterval = setInterval(movePlane, 25);


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
//"iPhone android draggable" function.. will revisit this later
///////////////////////////////////////////////////////////////

// $('#plane1').draggable();

//
// $('.upBtn').css({ color:'white',
//   // '-webkit-text-stroke': '.01em white',
//   'background-color': '#44AFCD',
//   border: '1px solid white',
//   'font-size': '20px',
//   margin: '20px auto 5px',
//   padding: '5px 0px 5px 5px',
//   width: '50%'});
//
//
// $('.rightBtn').css({ color:'white',
//   // '-webkit-text-stroke': '.01em white',
//   'background-color': '#44AFCD',
//   border: '1px solid white',
//   'font-size': '20px',
//   margin: '0px 5px 5px 0px',
//   padding: '5px 0px 5px 5px',
//   width: '50%'});
//
//
// $('.leftBtn').css({ color:'white',
//   // '-webkit-text-stroke': '.01em white',
//   'background-color': '#44AFCD',
//   border: '1px solid white',
//   'font-size': '20px',
//   margin: '0px 0px 5px 0px',
//   padding: '5px 0px 5px 5px',
//   width: '50%'});
//
//
// $('.downBtn').css({ color:'white',
//   // '-webkit-text-stroke': '.01em white',
//   'background-color': '#44AFCD',
//   border: '1px solid white',
//   'font-size': '20px',
//   margin: '0px auto 5px',
//   padding: '5px 0px 5px 5px',
//   width: '50%'});
//
//
//
//
// const $upBtn = $('.upBtn');
// const $rightBtn = $('.rightBtn');
// const $leftBtn = $('.leftBtn');
// const $downBtn = $('.downBtn');
//
//
//
//
// const up = () => {$("#plane1").animate({top: "-=35"}, 0);
//   $("#plane1").css({Transform: 'rotate(0deg)'}, 0);
// }
//
// const right = () => {$("#plane1").animate({left: "+=35"}, 0);
//   $("#plane1").css({Transform: 'rotate(90deg)'}, 0);
// }
// const left = () => {$("#plane1").animate({left: "-=35"}, 0);
// $("#plane1").css({Transform: 'rotate(-90deg)'}, 0);
// }
// const down = () => {
//   $("#plane1").animate({top: "+=35"}, 0);
//     $("#plane1").css({Transform: 'rotate(180deg)'}, 0);
//   }
//
//   $upBtn.on('click', up);
//   $rightBtn.on('click', right);
//   $leftBtn.on('click', left);
//   $downBtn.on('click', down);
//


///////////////////////////////////////////////////////////////
//"mouse move" function - from jsfiddle link below in references
///////////////////////////////////////////////////////////////

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



$('#plane1').bind('touchmove', function (e) {

    $(this).addClass('active');

    var oTop = e.pageY - $('.active').offset().top;
    var oLeft = e.pageX - $('.active').offset().left;

    $(this).parents().bind('touchmove', function (e) {
        $('.active').offset({
            top: e.pageY - oTop,
            left: e.pageX - oLeft
        }).bind('touchmove', function () {
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
  cloudInterval = setInterval(function() {
      if (cloudArray.length <= 10) {
      cloudArray.push(new cloud(i));
      }
    }, 500)

function cloud(id){
      this.left = getRandomInt(50, $gameBoardRect.width);
      this.top = getRandomInt(150, $gameBoardRect.height - 30);
      this.height = 25;
      this.width = 30;
      this.id = cloudId;
      const $cloudPoints = $("<div>").addClass('cloudy').attr('id',this.id).append('<img src="img/cloud.png" width = "30px">')
        .css({"height":this.height,"width":this.width,"left":this.left,"top":this.top,"position":"absolute", "margin": '0 0'})
      $('#board').append($cloudPoints);
      cloudId ++
    }

} //end createClouds()



createClouds();
console.log(cloudArray);


////////////////////////////////////////////////////////////////////
//Announce win and loss
////////////////////////////////////////////////////////////////////

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
    .text('You have Won the game!'));

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
     let $planeSlowBorder = $('#planeSlow')[0].getBoundingClientRect();
     let $planeMedium1 = $('#planeMedium1')[0].getBoundingClientRect();
     let $planeMedium2 = $('#planeMedium2')[0].getBoundingClientRect();
     let $planeFigureEight1 = $('#planeFigureEight1')[0].getBoundingClientRect();
     let $planeFigureEight2 = $('#planeFigureEight2')[0].getBoundingClientRect();
     let $planeFigureEight3 = $('#planeFigureEight3')[0].getBoundingClientRect();
     let $planeFigureEight4 = $('#planeFigureEight4')[0].getBoundingClientRect();

   // Collision detections
   for(var i = 0; i < cloudArray.length; i++){
     if ($planeBorder.left < cloudArray[i].left + cloudArray[i].width &&
        $planeBorder.left + $planeBorder.width > cloudArray[i].left &&
        $planeBorder.top < cloudArray[i].top + cloudArray[i].height &&
        $planeBorder.height + $planeBorder.top > cloudArray[i].top) {

          let id = cloudArray[i].id; // do not delete
          // console.log(id);

      $('#' + id).remove();// do not delete
       score ++
       $cloudPointsTotal.text('Cloud Points: ' + score)
              cloudArray.splice(i, 1);

      //winning state
      if (score === 50) {
        announceWin();
        openWinnerModal();
        stopAnimations();
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
          openLoserModal();
          stopAnimations();
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
          openLoserModal();
          stopAnimations();
          }
   }

//planeMedium1
   if ($planeBorder.x < $planeMedium1.x + $planeMedium1.width &&
      $planeBorder.x + $planeBorder.width > $planeMedium1.x &&
      $planeBorder.y < $planeMedium1.y + $planeMedium1.height &&
      $planeBorder.height + $planeBorder.y > $planeMedium1.y) {
    // console.log('planeFast collision detected!');
    $('#planeMedium1').addClass('scoredRed');

    numberOfCollisionsForLoss ++

          setTimeout(function() {
              $('#planeMedium1').removeClass("scoredRed");
          }, 1000);

          if (numberOfCollisionsForLoss === 1) {
          announceLoss();
          openLoserModal();
          stopAnimations();
          }
   }

//planeMedium2
  if ($planeBorder.x < $planeMedium2.x + $planeMedium2.width &&
      $planeBorder.x + $planeBorder.width > $planeMedium2.x &&
      $planeBorder.y < $planeMedium2.y + $planeMedium2.height &&
      $planeBorder.height + $planeBorder.y > $planeMedium2.y) {
    // console.log('planeFast collision detected!');
    $('#planeMedium2').addClass('scoredRed');

    numberOfCollisionsForLoss ++

          setTimeout(function() {
              $('#planeMedium2').removeClass("scoredRed");
          }, 1000);

          if (numberOfCollisionsForLoss === 1) {
          announceLoss();
          openLoserModal();
          stopAnimations();
          }
   }

// planeFigureEight1
if ($planeBorder.x < $planeFigureEight1.x + $planeFigureEight1.width &&
   $planeBorder.x + $planeBorder.width > $planeFigureEight1.x &&
   $planeBorder.y < $planeFigureEight1.y + $planeFigureEight1.height &&
   $planeBorder.height + $planeBorder.y > $planeFigureEight1.y) {
 // console.log('planeFast collision detected!');
 $('#planeFigureEight1').addClass('scoredRed');

 numberOfCollisionsForLoss ++

       setTimeout(function() {
           $('#planeFigureEight1').removeClass("scoredRed");
       }, 1000);

       if (numberOfCollisionsForLoss === 1) {
       announceLoss();
       openLoserModal();
       stopAnimations();
       }
}



// planeFigureEight2
if ($planeBorder.x < $planeFigureEight2.x + $planeFigureEight2.width &&
   $planeBorder.x + $planeBorder.width > $planeFigureEight2.x &&
   $planeBorder.y < $planeFigureEight2.y + $planeFigureEight2.height &&
   $planeBorder.height + $planeBorder.y > $planeFigureEight2.y) {
 // console.log('planeFast collision detected!');
 $('#planeFigureEight2').addClass('scoredRed');

 numberOfCollisionsForLoss ++

       setTimeout(function() {
           $('#planeFigureEight2').removeClass("scoredRed");
       }, 1000);

       if (numberOfCollisionsForLoss === 1) {
       announceLoss();
       openLoserModal();
       stopAnimations();
       }
}

// planeFigureEight3
if ($planeBorder.x < $planeFigureEight3.x + $planeFigureEight3.width &&
   $planeBorder.x + $planeBorder.width > $planeFigureEight3.x &&
   $planeBorder.y < $planeFigureEight3.y + $planeFigureEight3.height &&
   $planeBorder.height + $planeBorder.y > $planeFigureEight3.y) {
 // console.log('planeFast collision detected!');
 $('#planeFigureEight3').addClass('scoredRed');

 numberOfCollisionsForLoss ++

       setTimeout(function() {
           $('#planeFigureEight3').removeClass("scoredRed");
       }, 1000);

       if (numberOfCollisionsForLoss === 1) {
       announceLoss();
       openLoserModal();
       stopAnimations();
       }
}

// planeFigureEight4
if ($planeBorder.x < $planeFigureEight4.x + $planeFigureEight4.width &&
   $planeBorder.x + $planeBorder.width > $planeFigureEight4.x &&
   $planeBorder.y < $planeFigureEight4.y + $planeFigureEight4.height &&
   $planeBorder.height + $planeBorder.y > $planeFigureEight4.y) {
 // console.log('planeFast collision detected!');
 $('#planeFigureEight4').addClass('scoredRed');

 numberOfCollisionsForLoss ++

       setTimeout(function() {
           $('#planeFigureEight4').removeClass("scoredRed");
       }, 1000);

       if (numberOfCollisionsForLoss === 1) {
       announceLoss();
       openLoserModal();
       stopAnimations();
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
////----------- Recording Points in text box----------/////////
///////////////////////////////////////////////////////////////

const $cloudPointsTotal = $('<div>').attr('class','pointsBoard')
.css({ color:'white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  margin: '0px 5px 5px 0',
  padding: '5px 5px 5px 5px',
  'font-size': '20px',
  width: '50%'});
$('#row').append($cloudPointsTotal.text('Cloud Points: ' + score));



///////////////////////////////////////////////////////////////
//btnReset//
///////////////////////////////////////////////////////////////

const $btnReset = $('<div>').text('START / RESET').attr('class','pointsBoard')
.css({ color:'white',
  // '-webkit-text-stroke': '.01em white',
  'background-color': '#44AFCD',
  border: '1px solid white',
  'font-size': '20px',
  margin: '0px 0px 5px 0px',
  padding: '5px 0px 5px 5px',
  width: '50%'});
$('#row').append($btnReset);



const reset = () => {

// reset score
  cloudArray = [];
  score = 0;
  numberOfCollisionsForLoss = 0
  $cloudPointsTotal.text('Cloud Points: ' + score);
          console.log("reset button pressed. Score is: " + score);
  $('.cloudy').remove();
  createClouds();
  startPlaneAnimations();
  $('.win').remove();
  $('.loss').remove();
  $('.winBoard').css({"border":'1px solid white'});

//reset plane location
$('board').append($('#plane1').css({
  position: 'relative',
  top:'89%',
  left:'6%',
  Transform: 'rotate(0deg)'}));

//these don't work
$('board').append($('#planeFast').css({
    top: '0%',
    left: '0%'}));
//these don't work
$('board').append($('#planeSlow').css({
    top: '0%',
    left: '0%'}));

movePlaneInterval = setInterval(movePlane, 25);

}; //end of reset()

//event listeners
$btnReset.on('click', reset);




////////////////////////////////////////////////////////////////
//modal for win and lose scenario
////////////////////////////////////////////////////////////////

//reference to divs
const $openWinnerModal = $('.modalWinner');
const $openLoserModal = $('.modalLoser');
const $playAgainWinnerBtn = $('#playAgainWinnerBtn');
const $playAgainLoserBtn = $('#playAgainLoserBtn');

//event Handlers

const openWinnerModal = () => {
  setTimeout(function(){$openWinnerModal.css('display','block')}, 1000);
};


const openLoserModal = () => {
  setTimeout(function(){$openLoserModal.css('display','block')}, 1000);
};

const closeWinnerModal = () => {
  $openWinnerModal.css('display', 'none');
  reset();
}
const closeLoserModal = () => {
  $openLoserModal.css('display', 'none');
  reset();
}

//event listeners
$playAgainWinnerBtn.on('click', closeWinnerModal);
$playAgainLoserBtn.on('click', closeLoserModal);
// $playAgainBtn.on('click', reset);

//stop animations when player wins addClass off which changes animation name to none

function clearMoveInterval() {
  clearInterval(movePlaneInterval);
};

const stopAnimations = () => {
  setTimeout(function(){
  $('#board').addClass('off');
  $('#planeFast').addClass('off');
  $('#planeSlow').addClass('off');
  $('#planeMedium1').addClass('off');
  $('#planeMedium2').addClass('off');
  $('#planeFigureEight1').addClass('off');
  $('#planeFigureEight2').addClass('off');
  $('#planeFigureEight3').addClass('off');
  $('#planeFigureEight4').addClass('off');
}, 1000);
  clearMoveInterval();
};

//starts animation again after player choses to play again.
const startPlaneAnimations = () => {
  $('#board').removeClass('off');
  $('#planeFast').removeClass('off');
  $('#planeSlow').removeClass('off');
  $('#planeMedium1').removeClass('off');
  $('#planeMedium2').removeClass('off');
  $('#planeFigureEight1').removeClass('off');
  $('#planeFigureEight2').removeClass('off');
  $('#planeFigureEight3').removeClass('off');
  $('#planeFigureEight4').removeClass('off');

}



}); // End of the game


////////////////////////////////////////////////////////////////
//------------------------references---------------------------
//"Mouse move" on line 85-101 for game be used with the mouse.
// http://jsfiddle.net/pu2kK/

//Collision detection// 2D from MDN with IF statement works perfect!
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

//Calculating score with splice and .push.apply
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

//  Example of Collisoin detection "if statement"
// https://codepen.io/anon/pen/qVRMbQ

//free open source pictogram airplane pictures
//https://www.freepik.com/free-vector/silhouette-top-views-of-different-airplanes_1250479.htm#term=airplane&page=1&position=20

//------------------------references---------------------------
////////////////////////////////////////////////////////////////
