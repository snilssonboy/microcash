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

// Click tier items
var ct = [new Item(1.00,1.00,0.10,0,0), new Item(2.00,2.00,null,0,0), new Item(10,10,null,0,0), new Item(20,20,null,0,0)];

// Automatron tier items
var at = [new Item(1.00,1.00,0.10,0,0), new Item(2.00,2.00,null,0,0), new Item(10,10,null,0,0), new Item(20,20,null,0,0)];

var tt = [new Item(1.00,1.00,1.00,0,0), new Item(2.00,2.00,null,0,0), new Item(10,10,null,0,0), new Item(20,20,null,0,0)];

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
	tickLength = 100000 - (tt[0].manual + tt[0].automatic);
}

function BuyClick(x){
	if(ct[x].cost <= money){
		money -= ct[x].cost;
		ct[x].manual++;
		ct[x].cost = ct[x].baseCost * Math.pow(1.60, ct[x].manual);
	}else{

	}

	UpdateEverything();
}

function BuyAuto(x){
	if(at[x].cost <= money){
		money -= at[x].cost;
		at[x].manual++;
		at[x].cost = at[x].baseCost * Math.pow(1.60, at[x].manual);
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

function ToggleStatsVisible(){
	$('#statsdisplay').toggleClass("hidden");
}

window.onload = function(){
    UpdateEverything();
}

var UpdateEverything = function(){
	CalculatePerClick();
	CalculatePerSec();
	CalculateTickLength();

	// Navbar display items
	$('#moneydisplay').html("<i class='fa fa-usd'></i> " + money.toFixed(2));
    	$('#perclickdisplay').html("<i class='fa fa-mouse-pointer'></i> " + moneyPerClick.toFixed(2));
    	$('#persecdisplay').html("<i class='fa fa-repeat'></i> " + moneyPerSec.toFixed(2));

    	// Jumbotron display items
    	$('#moneydisplay2').html("Money: " + money.toFixed(2) + " <i class='fa fa-usd'></i>");
    	$('#perclickdisplay2').html("Per Click: " + moneyPerClick.toFixed(2) + " <i class='fa fa-mouse-pointer'></i>");
    	$('#persecdisplay2').html("Per Second: " + moneyPerSec.toFixed(2) + " <i class='fa fa-repeat'></i>");

    	$('#clickcounter').html("Total Clicks: " + totalClicks.toString() + " <i class='fa fa-mouse-pointer'></i>");
    	$('#cyclecounter').html("Total Cycles: " + totalCycles.toString() + " <i class='fa fa-clock-o'></i>");
    	$('#totalcounter').html("Total Earned: " + moneyTotal.toFixed(2) + " <i class='fa fa-usd'></i>");

    	// Jumbotron click button
    	$('#clickbutton').html("Click to earn money");

    	// AUTOMATRON TIERS
    	$('#automatron > h4').html("Autobot - " + at[0].automatic + " (" + at[0].manual + ")");
    	$('#automatron > button').html("Buy - Costs : " + at[0].cost.toFixed(2) + " <i class='fa fa-usd'></i>");
    	
	$('#autotier1 > h4').html("Calculator - " + at[1].automatic + " (" + at[1].manual + ")");
    	$('#autotier1 > button').html("Buy - Costs : " + at[1].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

    	$('#autotier2 > h4').html("Laptop - " + at[2].automatic + " (" + at[2].manual + ")");
    	$('#autotier2 > button').html("Buy - Costs : " + at[2].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

    	$('#autotier3 > h4').html("Automatron - " + at[3].automatic + " (" + at[3].manual + ")");
    	$('#autotier3 > button').html("Buy - Costs : " + at[3].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	// CLICKBOOST TIERS
        	$('#clickboost > h4').html("Pointer - " + ct[0].automatic + " (" + ct[0].manual + ")");
        	$('#clickboost > button').html("Buy - Costs : " + ct[0].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier1 > h4').html("Pointerator - " + ct[1].automatic + " (" + ct[1].manual + ")");
        	$('#clicktier1 > button').html("Buy - Costs : " + ct[1].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier2 > h4').html("Click Machine - " + ct[2].automatic + " (" + ct[2].manual + ")");
        	$('#clicktier2 > button').html("Buy - Costs : " + ct[2].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier3 > h4').html("Click Nuke - " + ct[3].automatic + " (" + ct[3].manual + ")");
        	$('#clicktier3 > button').html("Buy - Costs : " + ct[3].cost.toFixed(3) + " <i class='fa fa-usd'></i>");

        	// TICTAC TIERS
        	$('#tictac > h4').html("TicTac - " + tt[0].automatic + " (" + tt[0].manual + ")");
        	$('#tictac > button').html("Buy - Costs : " + tt[0].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#tictier1 > h4').html("Hourglass - " + tt[1].automatic + " (" + tt[1].manual + ")");
        	$('#tictier1 > button').html("Buy - Costs : " + tt[1].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#tictier2 > h4').html("Stopwatch - " + tt[2].automatic + " (" + tt[2].manual + ")");
        	$('#tictier2 > button').html("Buy - Costs : " + tt[2].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#tictier3 > h4').html("Time Void - " + tt[3].automatic + " (" + tt[3].manual + ")");
        	$('#tictier3 > button').html("Buy - Costs : " + tt[3].cost.toFixed(3) + " <i class='fa fa-usd'></i>");
        	
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

	$('#tickbar').width(((tick/tickLength) * 100).toFixed(2) + '%');
	$('#tickpercent').html(((tick/tickLength) * 100).toFixed(0) + "%" + " (" + tick + "/" + tickLength + ")");

	UpdateEverything();

}
// Tick Cycle END 

// Per Second Tick
var secTick = setInterval(secTimer, 1000);

function secTimer(){
	money += moneyPerSec;
	moneyTotal += moneyPerSec;
	UpdateEverything();
}
// Per Second Tick END