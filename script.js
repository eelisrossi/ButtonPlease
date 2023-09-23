// html elements
let clickBtn = document.getElementById("click-btn");
let clickCounterTxt = document.getElementById("click-counter");
let clickerBuyBtn = document.getElementById("buy-clicker");
let clickerCounterTxt = document.getElementById("clicker-counter")
let clickerPowerTxt = document.getElementById("clicker-power")
let clickerPowerBtn = document.getElementById("buy-clicker-power")
let timerTxt = document.getElementById("timer");

// variables
var timer = 0;
var clicks = 0;
var clickerAmount = 0;
var clickerPrice = 20;
var clickerPriceExponent = 1.2;
var clickerPower = 1;
var clickerPowerPrice = 100;
var clickerPowerPriceExponent = 1.1;

// helper functions
function decimalFloor(number) {
  return (Math.floor(number * 10) / 10);
}

function editClicks(number) {
  clicks = Math.floor(clicks + number);
}

function increaseCost(number, exponent) {
  return Math.floor(number * exponent);
}

function incrementTimer() {
  timer += 1;
}

// game functions
function click(number) {
  editClicks(number);
}

function buyClicker(number) {
  clickerAmount = clickerAmount + number;
}

function clickClicker() {
  click(decimalFloor(clickerAmount * clickerPower));
}

function increaseClickerPower(number) {
  clickerPower = decimalFloor(clickerPower * number);
}

function buyClickerEvent() {
  if (clicks >= clickerPrice) {
    editClicks(-clickerPrice)
    buyClicker(1);
    clickerPrice = increaseCost(clickerPrice, clickerPriceExponent);
    clickerPriceExponent = clickerPriceExponent * 1.01;
  }
}

function buyClickerPowerEvent() {
  if (clicks >= clickerPowerPrice) {
    editClicks(-clickerPowerPrice);
    increaseClickerPower(1.1);
    clickerPowerPrice = increaseCost(clickerPowerPrice, clickerPowerPriceExponent);
    clickerPowerPriceExponent = clickerPowerPriceExponent * 1.01;
  }
}

function updateView() {
  clickCounterTxt.innerHTML = "Clicks: " + clicks;
  clickerCounterTxt.innerHTML = "Clickers: " + clickerAmount;
  clickerPowerTxt.innerHTML = "Clicker power: " + clickerPower;
  clickerBuyBtn.innerHTML = "Buy a clicker: " + clickerPrice + "c";
  clickerPowerBtn.innerHTML = "Increase clicker power: " + clickerPowerPrice + "c";
  timerTxt.innerHTML = "Timer: " + timer + "s";

  // debug texts
}


// event listeners
clickBtn.addEventListener("click", function() {
  click(1);
})

clickerBuyBtn.addEventListener("click", function() {
  buyClickerEvent();
});

clickerPowerBtn.addEventListener("click", function() {
  buyClickerPowerEvent();
})

// have clickers run on a separate timer for faster numbers?
setInterval(clickClicker, 100);
setInterval(updateView);

// debug

var clicker10time = 0;
var clicker20time = 0;
var clicker30time = 0;

var clickerPower2time = 0;
var clickerPower5time = 0;
var clickerPower10time = 0;


function testSpammer() {
  if (clickerAmount < 10) {
    click(1);
    console.log('click');
  }
  buyClickerEvent();
  buyClickerPowerEvent();

  // clicker-milestones
  if (clickerAmount == 10 && clicker10time == 0) {
    clicker10time = timer; 
    document.getElementById("clicker-10-timer").innerHTML = "Time to 10 clickers: " + clicker10time + "s";
  }
  if (clickerAmount == 20 && clicker20time == 0) {
    clicker20time = timer; 
    document.getElementById("clicker-20-timer").innerHTML = "Time to 20 clickers: " + clicker20time + "s";
  }
  if (clickerAmount == 30 && clicker30time == 0) {
    clicker30time = timer; 
    document.getElementById("clicker-30-timer").innerHTML = "Time to 30 clickers: " + clicker30time + "s";
  }

  // clicker-power-milestones
  if (clickerPower >= 2 && clickerPower2time == 0) {
    clickerPower2time = timer;
    document.getElementById("clickerPower-2-timer").innerHTML = "Time to clicker power 2: " + clickerPower2time + "s";
  }
  if (clickerPower >= 5 && clickerPower5time == 0) {
    clickerPower5time = timer;
    document.getElementById("clickerPower-5-timer").innerHTML = "Time to clicker power 5: " + clickerPower5time + "s";
  }
  if (clickerPower >= 10 && clickerPower10time == 0) {
    clickerPower10time = timer;
    document.getElementById("clickerPower-10-timer").innerHTML = "Time to clicker power 10: " + clickerPower10time + "s";
  }
}

setInterval(testSpammer, 100)
setInterval(incrementTimer, 1000)
