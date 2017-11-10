// console.log('testing');

$(() => {



//moving plane1 img left right up and down;
setInterval(movePlane, 20);
var keys = {};

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});


function movePlane() {
    for (let direction in keys) {
        if (!keys.hasOwnProperty(direction)) continue;
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






});
////////////////////////////////////////////////////////////////
//------------------------references---------------------------
//rotating div
//https://stackoverflow.com/questions/382591/rotating-a-div-element-in-jquery

//moving plane1 div left right up and down;
//https://stackoverflow.com/questions/7298507/move-element-with-keypress-multiple


// https://codepen.io/anon/pen/qVRMbQ
// if ((game.player.x + game.player.w > x
//   && game.player.x < x + w)
//   && (game.player.y + game.player.h > y
//   && game.player.y < y + h)) {
//       return true;
//------------------------references---------------------------
////////////////////////////////////////////////////////////////
