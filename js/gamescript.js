var tick = 0;
var tickLength = 10000;

var money = 0.00;
var moneyPerClick = 0.10;
var moneyPerSec = 0.00;

var clickCount = 0;

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

function Click(){
	money += moneyPerClick;

	// Counts clicks up to 10 and adds 1 automatically gained item for each automatic+manual item from the tier below
	clickCount++;

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

function BuyClick(x){
	if(ct[x].cost <= money){
		money -= ct[x].cost;
		ct[x].manual++;
		ct[x].cost = ct[x].baseCost * Math.pow(1.60, ct[x].manual);
		if(ct[x].upgrade != null){
			moneyPerClick += ct[x].upgrade;
		}
	}else{

	}

	console.log("click");

	UpdateEverything();
}

function BuyAuto(x){
	if(at[x].cost <= money){
		money -= at[x].cost;
		at[x].manual++;
		at[x].cost = at[x].baseCost * Math.pow(1.60, at[x].manual);
		if(at[x].upgrade != null){
			moneyPerSec += at[x].upgrade;
		}
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

	/*// Navbar display items
	$('#moneydisplay').html("<i class='fa fa-usd'></i> " + money.toFixed(2));
    	$('#perclickdisplay').html("<i class='fa fa-mouse-pointer'></i> " + moneyPerClick.toFixed(2));
    	$('#persecdisplay').html("<i class='fa fa-repeat'></i> " + moneyPerSec.toFixed(2));

    	// Jumbotron click button
    	$('#clickbutton').html("+ " + moneyPerClick.toFixed(2) + " <i class='fa fa-usd'></i> / <i class='fa fa-mouse-pointer'></i>");

    	// AUTOMATRON TIERS
    	$('#automatron > h4').html("Automatron - " + at[0].automatic + " (" + at[0].manual + ")");
    	$('#automatron > button').html("Buy - Costs : " + at[0].cost.toFixed(2) + " <i class='fa fa-usd'></i>");
    	
	$('#autotier1 > h4').html("Tier 1 Auto - " + at[1].automatic + " (" + at[1].manual + ")");
    	$('#autotier1 > button').html("Buy - Costs : " + at[1].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

    	$('#autotier2 > h4').html("Tier 2 Auto - " + at[2].automatic + " (" + at[2].manual + ")");
    	$('#autotier2 > button').html("Buy - Costs : " + at[2].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

    	$('#autotier3 > h4').html("Tier 3 Auto - " + at[3].automatic + " (" + at[3].manual + ")");
    	$('#autotier3 > button').html("Buy - Costs : " + at[3].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	// CLICKBOOST TIERS
        	$('#clickboost > h4').html("Clickboost - " + ct[0].automatic + " (" + ct[0].manual + ")");
        	$('#clickboost > button').html("Buy - Costs : " + ct[0].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier1 > h4').html("Tier 1 Click - " + ct[1].automatic + " (" + ct[1].manual + ")");
        	$('#clicktier1 > button').html("Buy - Costs : " + ct[1].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier2 > h4').html("Tier 2 Click - " + ct[2].automatic + " (" + ct[2].manual + ")");
        	$('#clicktier2 > button').html("Buy - Costs : " + ct[2].cost.toFixed(2) + " <i class='fa fa-usd'></i>");

        	$('#clicktier3 > h4').html("Tier 3 Click - " + ct[3].automatic + " (" + ct[3].manual + ")");
        	$('#clicktier3 > button').html("Buy - Costs : " + ct[3].cost.toFixed(3) + " <i class='fa fa-usd'></i>");*/
        	
}

// Tick Cycle
var tickCycle = setInterval(cycleTimer, 100);

function cycleTimer() {

	if(tick < 10000){
		tick += 10;
	}else{
		tick = 0;
		for(var i = 1; i < 4; i++){
			at[i - 1].automatic += (at[i].manual + at[i].automatic);
		}
	}

	$('#tickbar').width(tick/100 + '%');
	$('#tickpercent').html(((tick/10000) * 100).toFixed(0) + "%");

	UpdateEverything();

}
// Tick Cycle END 

// Per Second Tick
var secTick = setInterval(secTimer, 1000);

function secTimer(){
	money += moneyPerSec;
	UpdateEverything();
}
// Per Second Tick END