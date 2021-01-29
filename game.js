var buttonColors = ["green", "yellow", "blue", "red"];
var gamePattern = [];
var userClickedPattern = [];
var gameOver = false;
var start = false;
var levelCount = 0;

$("button").click(function () {
  if (!start) {
    $("button").html(levelCount);
    nextSequence();
    start = true;
    if (start === true) {
      $("h1").text("Simon Game");
    }
  }
});

function checkAnswer(currentLevel) {
  if (
    JSON.stringify(gamePattern[currentLevel]) ==
    JSON.stringify(userClickedPattern[currentLevel])
  ) {
    if (gamePattern.length === userClickedPattern.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    playSound("wrong");
    gameOver = true;
    if (gameOver === true) {
      $("h1").text("Game Over!");
      $("button").text("restart!").css({"font-size": "50px"});
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      restart(); 
    }
    
  }
}

function restart(){
  levelCount = 0;
  gamePattern = [];
  start = false;
  gameOver = false;
}

function nextSequence() {
  userClickedPattern = [];
  levelCount += 1;
  $("button").html(levelCount);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

$("div.btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
