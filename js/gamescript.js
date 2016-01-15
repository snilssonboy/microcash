var tick = 0;
var tickLength = 100000
var totalCycles = 0.00;

var money = 0.00;
var moneyPerClick = 0.10;
var moneyPerSec = 0.00;
var moneyTotal = 0.00;

var clickCount = 0;
var totalClicks = 0.00;

var Item = function(bc,c,u,m,a){
	self = this;

	self.baseCost = bc;
	self.cost = c;
	self.upgrade = u;
	self.manual = m;
	self.automatic = a;
}

// Automatron tier items
var at = [new Item(5.00,5.00,0.10,0,0), new Item(500.00,500.00,null,0,0), new Item(30000,30000,null,0,0), new Item(9000000,9000000,null,0,0)];

// Click tier items
var ct = [new Item(1.50,1.50,0.10,0,0), new Item(1000.00,1000.00,null,0,0), new Item(900000,900000,null,0,0), new Item(10000000,10000000,null,0,0)];

// Tickcycle tier items
var tt = [new Item(100.00,100.00,3.00,0,0), new Item(800.00,800.00,null,0,0), new Item(50000,50000,null,0,0), new Item(30000000,30000000,null,0,0)];

function Click(){
	money += moneyPerClick;
	moneyTotal += moneyPerClick;

	// Counts clicks up to 10 and adds 1 automatically gained item for each automatic+manual item from the tier below
	clickCount++;
	totalClicks++;

	if(clickCount > 9){
		for(var i = 1; i < 4; i++){
			ct[i - 1].automatic += (ct[i].manual + ct[i].automatic);
		}
		clickCount = 0;
	}

	UpdateEverything();

}


function CalculatePerClick(){
	moneyPerClick = 0.10 + ct[0].upgrade * (ct[0].manual + ct[0].automatic);
}

function CalculatePerSec(){
	moneyPerSec = at[0].upgrade * (at[0].manual + at[0].automatic);
}

function CalculateTickLength(){
	// Reduces effectiveness of upgrade incrementally
	tickLength = 100000 - Math.pow((tt[0].manual + tt[0].automatic), 0.9);
	// Clamps min/max ticklength between 5000ms and 100000ms
	tickLength = Math.max(5000, Math.min((100000 - Math.pow((tt[0].manual + tt[0].automatic), 0.9)), 100000));
}

function ShortifyNumber(valueToConvert, x){
	var converted = "";

	if(valueToConvert >= Math.pow(10, 93)){
		converted = (valueToConvert / Math.pow(10, 93)).toFixed(2) + " Tg";
	}else if(valueToConvert >= Math.pow(10, 90)){
		converted = (valueToConvert / Math.pow(10, 90)).toFixed(2) + " NVi";
	}else if(valueToConvert >= Math.pow(10, 87)){
		converted = (valueToConvert / Math.pow(10, 87)).toFixed(2) + " OVi";
	}else if(valueToConvert >= Math.pow(10, 84)){
		converted = (valueToConvert / Math.pow(10, 84)).toFixed(2) + " SpVi";
	}else if(valueToConvert >= Math.pow(10, 81)){
		converted = (valueToConvert / Math.pow(10, 81)).toFixed(2) + " SxVi";
	}else if(valueToConvert >= Math.pow(10, 78)){
		converted = (valueToConvert / Math.pow(10, 78)).toFixed(2) + " QiVi";
	}else if(valueToConvert >= Math.pow(10, 75)){
		converted = (valueToConvert / Math.pow(10, 75)).toFixed(2) + " QaVi";
	}else if(valueToConvert >= Math.pow(10, 72)){
		converted = (valueToConvert / Math.pow(10, 72)).toFixed(2) + " TVi";
	}else if(valueToConvert >= Math.pow(10, 69)){
		converted = (valueToConvert / Math.pow(10, 69)).toFixed(2) + " DVi";
	}else if(valueToConvert >= Math.pow(10, 66)){
		converted = (valueToConvert / Math.pow(10, 66)).toFixed(2) + " UVi";
	}else if(valueToConvert >= Math.pow(10, 63)){
		converted = (valueToConvert / Math.pow(10, 63)).toFixed(2) + " Vi";
	}else if(valueToConvert >= Math.pow(10, 60)){
		converted = (valueToConvert / Math.pow(10, 60)).toFixed(2) + " NDc";
	}else if(valueToConvert >= Math.pow(10, 57)){
		converted = (valueToConvert / Math.pow(10, 57)).toFixed(2) + " OcDc";
	}else if(valueToConvert >= Math.pow(10, 54)){
		converted = (valueToConvert / Math.pow(10, 54)).toFixed(2) + " SpDc";
	}else if(valueToConvert >= Math.pow(10, 51)){
		converted = (valueToConvert / Math.pow(10, 51)).toFixed(2) + " SxDc";
	}else if(valueToConvert >= Math.pow(10, 48)){
		converted = (valueToConvert / Math.pow(10, 48)).toFixed(2) + " QiDc";
	}else if(valueToConvert >= Math.pow(10, 45)){
		converted = (valueToConvert / Math.pow(10, 45)).toFixed(2) + " QaDc";
	}else if(valueToConvert >= Math.pow(10, 42)){
		converted = (valueToConvert / Math.pow(10, 42)).toFixed(2) + " TDc";
	}else if(valueToConvert >= Math.pow(10, 39)){
		converted = (valueToConvert / Math.pow(10, 39)).toFixed(2) + " DDC";
	}else if(valueToConvert >= Math.pow(10, 36)){
		converted = (valueToConvert / Math.pow(10, 36)).toFixed(2) + " UDc";
	}else if(valueToConvert >= Math.pow(10, 33)){
		converted = (valueToConvert / Math.pow(10, 33)).toFixed(2) + " Dc";
	}else if(valueToConvert >= Math.pow(10, 30)){
		converted = (valueToConvert / Math.pow(10, 30)).toFixed(2) + " N";
	}else if(valueToConvert >= Math.pow(10, 27)){
		converted = (valueToConvert / Math.pow(10, 27)).toFixed(2) + " Oc";
	}else if(valueToConvert >= Math.pow(10, 24)){
		converted = (valueToConvert / Math.pow(10, 24)).toFixed(2) + " Sp";
	}else if(valueToConvert >= Math.pow(10, 21)){
		converted = (valueToConvert / Math.pow(10, 21)).toFixed(2) + " Sx";
	}else if(valueToConvert >= Math.pow(10, 18)){
		converted = (valueToConvert / Math.pow(10, 18)).toFixed(2) + " Qi";
	}else if(valueToConvert >= Math.pow(10, 15)){
		converted = (valueToConvert / Math.pow(10, 15)).toFixed(2) + " Qa";
	}else if(valueToConvert >= Math.pow(10, 12)){
		converted = (valueToConvert / Math.pow(10, 12)).toFixed(2) + " T";
	}else if(valueToConvert >= Math.pow(10, 9)){
		converted = (valueToConvert / Math.pow(10, 9)).toFixed(2) + " B";
	}else if(valueToConvert >= Math.pow(10, 6)){
		converted = (valueToConvert / Math.pow(10, 6)).toFixed(2) + " M";
	}else if(valueToConvert >= 1000){
		converted = (valueToConvert / 1000).toFixed(2) + " K";
	}else if(valueToConvert < 1000 && x == "mpc"){
		converted = valueToConvert.toFixed(2);
	}else if(valueToConvert < 999){
		converted = valueToConvert.toFixed(0);
	}

	return converted;
}

function save(){
	var save = {
		tickLength: tickLength,
		totalCycles: totalCycles,
		money: money,
		moneyPerSec: moneyPerSec,
		moneyPerClick: moneyPerClick,
		moneyTotal: moneyTotal,
		clickCount: clickCount,
		totalClicks: totalClicks,
		ct: ct,
		at: at,
		tt: tt
	}

	localStorage.setItem("save", JSON.stringify(save));
}

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));

	if(typeof savegame.tickLength !== "undefined") 
		tickLength = savegame.tickLength;

	if(typeof savegame.totalCycles !== "undefined") 
		totalCycles = savegame.totalCycles;

	if(typeof savegame.money !== "undefined") 
		money = savegame.money;

	if(typeof savegame.moneyPerSec !== "undefined") 
		moneyPerSec = savegame.moneyPerSec;

	if(typeof savegame.moneyPerClick !== "undefined") 
		moneyPerClick = savegame.moneyPerClick;

	if(typeof savegame.moneyTotal !== "undefined") 
		moneyTotal = savegame.moneyTotal;

	if(typeof savegame.clickCount !== "undefined") 
		clickCount = savegame.clickCount;

	if(typeof savegame.totalClicks !== "undefined") 
		totalClicks = savegame.totalClicks;

	if(typeof savegame.ct !== "undefined") 
		ct = savegame.ct;

	if(typeof savegame.at !== "undefined") 
		at = savegame.at;

	if(typeof savegame.tt !== "undefined") 
		tt = savegame.tt;
}

function BuyClick(x){
	if(ct[x].cost <= money){
		money -= ct[x].cost;
		ct[x].manual++;
		ct[x].cost = ct[x].baseCost * Math.pow(1.20, ct[x].manual);
	}else{

	}

	UpdateEverything();
}

function BuyAuto(x){
	if(at[x].cost <= money){
		money -= at[x].cost;
		at[x].manual++;
		at[x].cost = at[x].baseCost * Math.pow(1.15, at[x].manual);
	}else{

	}

	UpdateEverything();
}

function BuyTick(x){
	if(tt[x].cost <= money){
		money -= tt[x].cost;
		tt[x].manual++;
		tt[x].cost = tt[x].baseCost * Math.pow(1.10, tt[x].manual);
	}else{

	}

	UpdateEverything();
}

window.onload = function(){
	load();
    	UpdateEverything();
}

var UpdateEverything = function(){
	CalculatePerClick();
	CalculatePerSec();
	CalculateTickLength();

    	// Jumbotron display items
    	$('#moneydisplay').html("Money: " + ShortifyNumber(money, "mpc") + " <i class='fa fa-usd'></i>");
    	$('#perclickdisplay').html("Per Click: " + ShortifyNumber(moneyPerClick, "mpc") + " <i class='fa fa-mouse-pointer'></i>");
    	$('#persecdisplay').html("Per Second: " + ShortifyNumber(moneyPerSec, "mpc") + " <i class='fa fa-repeat'></i>");

    	$('#clickcounter').html("Total Clicks: " + ShortifyNumber(totalClicks) + " <i class='fa fa-mouse-pointer'></i>");
    	$('#cyclecounter').html("Total Cycles: " + totalCycles.toString() + " <i class='fa fa-clock-o'></i>");
    	$('#totalcounter').html("Total Earned: " + ShortifyNumber(moneyTotal) + " <i class='fa fa-usd'></i>");

    	// AUTOMATRON TIERS
    	$('#automatron > h4').html("Autobot - " + ShortifyNumber(at[0].automatic) + " (" + ShortifyNumber(at[0].manual) + ")");
    	$('#automatron > button').html("Buy - Costs : " + ShortifyNumber(at[0].cost, "mpc") + " <i class='fa fa-usd'></i>");
    	
	$('#autotier1 > h4').html("Calculator - " + ShortifyNumber(at[1].automatic) + " (" + ShortifyNumber(at[1].manual) + ")");
    	$('#autotier1 > button').html("Buy - Costs : " + ShortifyNumber(at[1].cost, "mpc") + " <i class='fa fa-usd'></i>");

    	$('#autotier2 > h4').html("Laptop - " + ShortifyNumber(at[2].automatic) + " (" + ShortifyNumber(at[2].manual) + ")");
    	$('#autotier2 > button').html("Buy - Costs : " + ShortifyNumber(at[2].cost, "mpc") + " <i class='fa fa-usd'></i>");

    	$('#autotier3 > h4').html("Automatron - " + ShortifyNumber(at[3].automatic) + " (" + ShortifyNumber(at[3].manual) + ")");
    	$('#autotier3 > button').html("Buy - Costs : " + ShortifyNumber(at[3].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	// CLICKBOOST TIERS
        	$('#clickboost > h4').html("Pointer - " + ShortifyNumber(ct[0].automatic) + " (" + ShortifyNumber(ct[0].manual) + ")");
        	$('#clickboost > button').html("Buy - Costs : " + ShortifyNumber(ct[0].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#clicktier1 > h4').html("Pointerator - " + ShortifyNumber(ct[1].automatic) + " (" + ShortifyNumber(ct[1].manual) + ")");
        	$('#clicktier1 > button').html("Buy - Costs : " + ShortifyNumber(ct[1].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#clicktier2 > h4').html("Click Machine - " + ShortifyNumber(ct[2].automatic) + " (" + ShortifyNumber(ct[2].manual) + ")");
        	$('#clicktier2 > button').html("Buy - Costs : " + ShortifyNumber(ct[2].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#clicktier3 > h4').html("Click Nuke - " + ShortifyNumber(ct[3].automatic) + " (" + ShortifyNumber(ct[3].manual) + ")");
        	$('#clicktier3 > button').html("Buy - Costs : " + ShortifyNumber(ct[3].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	// TICTAC TIERS
        	$('#tickreduction').html("Reduces ticklength (" + (tickLength.toFixed(1)) + " ms)");
        	$('#tictac > h4').html("TicTac - " + ShortifyNumber(tt[0].automatic) + " (" + ShortifyNumber(tt[0].manual) + ")");
        	$('#tictac > button').html("Buy - Costs : " + ShortifyNumber(tt[0].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#tictier1 > h4').html("Hourglass - " + ShortifyNumber(tt[1].automatic) + " (" + ShortifyNumber(tt[1].manual) + ")");
        	$('#tictier1 > button').html("Buy - Costs : " + ShortifyNumber(tt[1].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#tictier2 > h4').html("Stopwatch - " + ShortifyNumber(tt[2].automatic) + " (" + ShortifyNumber(tt[2].manual) + ")");
        	$('#tictier2 > button').html("Buy - Costs : " + ShortifyNumber(tt[2].cost, "mpc") + " <i class='fa fa-usd'></i>");

        	$('#tictier3 > h4').html("Time Void - " + ShortifyNumber(tt[3].automatic) + " (" + ShortifyNumber(tt[3].manual) + ")");
        	$('#tictier3 > button').html("Buy - Costs : " + ShortifyNumber(tt[3].cost, "mpc") + " <i class='fa fa-usd'></i>");
        	
}


// Tick Cycle
var tickCycle = setInterval(cycleTimer, 10);

function cycleTimer() {

	if(tick < tickLength){
		tick += 10;
	}else{
		tick = 0;
		for(var i = 1; i < 4; i++){
			at[i - 1].automatic += (at[i].manual + at[i].automatic);
			tt[i - 1].automatic += (tt[i].manual + tt[i].automatic);
		}
		totalCycles++;
	}

	$('#tickbarwidth').width(((tick/tickLength) * 100).toFixed(2) + '%');
	$('#tickbartext').html(((tick/tickLength) * 100).toFixed(0) + "%"/* + " (" + tick + "/" + tickLength + ")"*/);

	UpdateEverything();

}
// Tick Cycle END 

// Per Second Tick
var secTick = setInterval(secTimer, 1000);

function secTimer(){
	// Adds gold from Autobots
	money += moneyPerSec;
	moneyTotal += moneyPerSec;
	UpdateEverything();

	// Use function for tick cycle text in jumbotron
	var a = moment.duration(tickLength - tick);
	var a = a.minutes() + "m " + a.seconds() + "s";


	$('#jumboticktext').html(a + ' until tickcycle completes');
}
// Per Second Tick END

var saveGame = setInterval(save, 60000);

function wipeSave(){
	localStorage.removeItem("save");
}