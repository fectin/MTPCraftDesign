/*
Licensing: This is my programming work to implement a game process described in Moon Toad Publications' Spacecraft Design Guide SRD.
The current version of this generator can be found at https://github.com/fectin/CepheusCraftDesign . 

This script uses material from Moon Toad Publishing's Spacecraft Design Guide System Reference Document, Copyright © 2018 Michael Johnson. This site and its author are not affiliated with Michael Johnson or Moon Toad Publishing.

This script uses material from the Cepheus Engine System Reference Document, Copyright © 2016 Samardan Press; Author Jason "Flynn" Kemp. Cepheus Engine and Samardan Press are the trademarks of Jason "Flynn" Kemp. This site and its author are not affiliated with Jason "Flynn" Kemp or Samardan Press™.

Cepheus is product derived from the Traveller System Reference Document and other Open Gaming Content made available by the Open Gaming License, and does not contain closed content from products published by either Mongoose Publishing or Far Future Enterprises. This Product is not affiliated with either Mongoose Publishing or Far Future Enterprises, and it makes no claim to or challenge to any trademarks held by either entity. The use of the Traveller System Reference Document does not convey the endorsement of this Product by either Mongoose Publishing or Far Future Enterprises as a product of either of their product lines.

A copy of the Open Gaming License is available alongside this file.


Basically, I'm fine with you using my stuff however you want, but my stuff is inextricably intertwined with Moon Toad, Cepheus, and Traveller, and you either need to use the OGL or get a pile of other special permission to use their stuff.



In addition to the above, I request (but do NOT require) that if you use this, you do the following:
 - Notify me
 - Release any derivative works in a similar spirit


*/


class MTCD {
	"use strict";
	#craft = {};
	#state = {};

	printOut() {
		let UCP =`<h3 id="ShipName">${this.#craft.name}</h3>` + 
		`<table>` +
		`<tr><th scope="row">CraftID:</th><td id="UCPCraftID">${this.getCraftID()}</td></tr>` +
		`<tr><th scope="row">Hull:</th><td id="UCPHull">${this.getHull()}</td></tr>` +
		`<tr><th scope="row">Power:</th><td id="UCPPower">${this.getPower()}</td></tr>` +
		`<tr><th scope="row">Loco:</th><td id="UCPLoco">${this.getLoco()}</td></tr>` +
		`<tr><th scope="row">Commo:</th><td id="UCPCommo">${this.getCommo()}</td></tr>` +
		`<tr><th scope="row">Sensors:</th><td id="UCPSensors">${this.getSensors()}</td></tr>` +
		`<tr><th scope="row">Off:</th><td id="UCPOff">${this.getOff()}</td></tr>` +
		`<tr><th scope="row">Def:</th><td id="UCPDef">${this.getDef()}</td></tr>` +
		`<tr><th scope="row">Control:</th><td id="UCPControl">${this.getControl()}</td></tr>` +
		`<tr><th scope="row">Accom:</th><td id="UCPAccom">${this.getAccom()}</td></tr>` +
		`<tr><th scope="row">Other:</th><td id="UCPOther">${this.getOther()}</td></tr>` +
		`</table>`;
		return UCP;
	}
	lineBreaker(toBeBroken)	{
		var formatted = "";
		if (!Array.isArray(toBeBroken))	{return toBeBroken}
		toBeBroken.forEach((lineItem) => {
			formatted = formatted + lineItem + "<br>";
		});
		formatted = formatted.slice(0,-4);
		return formatted;
	}
	getCraftID() {
		return this.lineBreaker(this.#craft.craftID);
	}
	getHull() {
		return this.lineBreaker(this.#craft.hull);
	}
	getPower() {
		return this.lineBreaker(this.#craft.power);
	}
	getLoco() {
		return this.lineBreaker(this.#craft.loco);
	}
	getCommo() {
		return this.lineBreaker(this.#craft.commo);
	}
	getSensors() {
		return this.lineBreaker(this.#craft.sensors);
	}
	getOff() {
		return this.lineBreaker(this.#craft.off);
	}
	getDef() {
		return this.lineBreaker(this.#craft.def);
	}
	getControl() {
		return this.lineBreaker(this.#craft.control);
	}
	getAccom() {
		return this.lineBreaker(this.#craft.accom);
	}
	getOther() {
		return this.lineBreaker(this.#craft.other);
	}
	
	
	nameThatShip(shipName = "")	{
		//if passed a string, names the ship that and moves on. Otherwise, generates a name.
		var wordy = 6;
		if (shipName == "")	{
			[wordy,shipName] = MTCD.#rules.names.main[Math.floor(Math.random() * MTCD.#rules.names.main.length)]
			if (Math.floor(Math.random()*9) < wordy)	{
				shipName = MTCD.#rules.names.modifier[Math.floor(Math.random() * MTCD.#rules.names.modifier.length)] + shipName;
			}
			if (Math.floor(Math.random()*40) < wordy)	{
				shipName = shipName.trim() + MTCD.#rules.names.suffix[Math.floor(Math.random() * MTCD.#rules.names.suffix.length)];
			}
			shipName = MTCD.#rules.names.article[Math.floor(Math.random() * MTCD.#rules.names.article.length)] + shipName;
		}
		this.#craft.name=shipName.trim();
		return shipName.trim();
	}


	
	#initialize() {
		this.nameThatShip();
	}
	
	constructor(techLevel = 0)	{
		this.feedback = "";
		this.#state = {
			techLevel: techLevel,
			craftType: 0
		}
		this.#craft = {
			name: "The Burning Swanson", 
			craftID: [],
			hull: [],
			power: [],
			loco: [],
			commo: [],
			sensors: [],
			off: [],
			def: [],
			control: [],
			accom: [],
			other: [],
		}
				
		this.#initialize();
	}
	
	
	static #rules = {
		hullTable: [
		//UCP,volume,weight,price
		//all three vehicles have the same table, it just shows price differently
			[0.007,0.10,0.010,400],
			[0.019,0.25,0.025,850],
			[0.037,0.50,0.075,1200],
			[0.056,0.75,0.075,1400],
			[0.074,1.00,0.100,1600],
			[0.093,1.25,0.125,1800],
			[0.111,1.50,0.150,2000],
			[0.130,1.75,0.175,2200],
			[0.185,2,50,0.250,2400],
			[0.250,3.37,0.400,2600],
			[0.500,6.75,0.700,2800],
			[0.750,10.12,1.10,3000],
			[1.000,13.50,1.50,3300],
			[2.000,27.00,2.20,3700],
			[3.000,40.50,2.80,4200],
			[4.000,54.00,3.50,5800],
			[5.000,67.50,4.00,6500],
			[6.000,81.00,4.60,7500],
			[7.000,94.50,5.20,8500],
			[8.000,108.0,5.70,10000],
			[9.000,121.5,6.30,13700],
			[10.00,135.0,6.80,17400],
			[11.00,148.5,7.30,21100],
			[12.00,162.0,7.80,24800],
			[13.00,175.5,8.40,28500],
			[14.00,189.0,8.80,30300],
			[15.00,202.5,9.30,33000],
			[16.00,216.0,9.80,36700],
			[17.00,229.5,10.3,38400],
			[18.00,243.0,10.8,40100],
			[19.00,256.5,11.3,42800],
			[20.00,270.0,11.8,44550],
			[25.0,335,13.4,49700],
			[30.0,405,16.2,56800],
			[35.0,470,18.8,62100],
			[40.0,540,21.6,66820],
			[45.0,605,23.6,69900],
			[50.0,675,26.3,72400],
			[55.0,740,28.8,79400],
			[60.0,810,31.6,84200],
			[65.0,875,33.3,89500],
			[70.0,945,35.0,93500],
			[75.0,1010,36.4,100000],
			[80.0,1080,37.8,107000],
			[85.0,1150,38.5,114000],
			[90.0,1215,39.0,124000],
			[95.0,1285,39.5,127000],
			[100.0,1350,40.0,134000],
			[200,2700,70,265000],
			[300,4050,100,400000],
			[400,5400,130,535000],
			[500,6750,160,665000],
			[600,8100,190,805000],
			[700,9450,220,935000],
			[800,10800,250,1050000],
			[900,12150,280,1200000],
			[1000,13500,310,1350000],
			[2000,27000,600,2700000],
			[3000,40500,900,4000000],
			[4000,54000,1200,5300000],
			[5000,67500,1500,6700000],
			[6000,81000,1800,8000000],
			[7000,94500,2100,9400000],
			[8000,108000,2400,10700000],
			[9000,121500,2700,12100000],
			[10000,135000,3000,13400000],
			[20000,270000,6000,15600000],
			[30000,405000,8000,17800000],
			[40000,540000,10000,20100000],
			[50000,675000,11500,22300000],
			[75000,1010000,15000,44600000],
			[100000,1350000,18000,66800000],
			[200000,2700000,29000,89100000],
			[300000,4050000,38000,111400000],
			[400000,5400000,46000,166700000],
			[500000,6750000,54000,222800000],
			[700000,9450000,67000,445500000],
			[900000,12150000,79000,668300000],
			[1000000,13500000,85000,891000000]
		],
		configurationTable: [
		//type,configuration,wtMod,priceMod,unstreamed,streamed,airframe
		//0 is not available
			[0,"Open Frame",0.5,0.5,1,0,0],
			[1,"Needle/Wedge",1,1.2,0,1,1.5],
			[2,"Cone",1,1.1,0,1,2], 
			[3,"Cylinder",1,1,1,1.2,3],
			[4,"Box",1,0.6,1,1.5,0],
			[5,"Sphere",0.8,1.5,0,1,0],
			[6,"Dome/Disk",0.9,1.2,0,2,3],
			[7,"Irregular",0.9,0.5,1,0,0]
			//ignores planetoids and buffered planetoids, which are a special case
		],
		armorTypeTable: [
		//UCP,TL,Type,weightmod,pricemod
		//0 is not available
			['A',5,"Soft Steel",1.25,1],
			['B',6,"Hard Steel",1,1],
			['C',7,"Composite Laminate",0.44,1.8],
			['D',9,"Lt Wt Composite Laminate",0.35,1.6],
			['E',10,"Crystaliron",0.31,1.1],
			['F',12,"Superdense",0.26,1],
			['G',14,"Bonded Superdense",0.14,1],
			['H',17,"Coherent Superdense",0.06,1.3]
		],
		armorTable: [
		//armor,mod
			[1,0.25],
			[2,0.5],
			[3,0.75],
			[4,1],
			[5,1.25],
			[6,1.5],
			[7,1.75],
			[8,2],
			[9,2.25],
			[10,2.5],
			[11,2.75],
			[12,3],
			[13,3.25],
			[14,3.54],
			[15,3.86],
			[16,4.2],
			[17,4.59],
			[18,5],
			[19,5.45],
			[20,5.95],
			[21,6.48],
			[22,7.07],
			[23,7.71],
			[24,8.41],
			[25,9.17],
			[26,10],
			[27,10.9],
			[28,11.9],
			[29,13],
			[30,14.1],
			[31,15.4],
			[32,16.8],
			[33,18.3],
			[34,20],
			[35,21.8],
			[36,23.8],
			[37,25.9],
			[38,28.3],
			[39,30.8],
			[40,33],
			[41,36.7],
			[42,40],
			[43,43.6],
			[44,47.6],
			[45,51.9],
			[46,56.6],
			[47,61.7],
			[48,67.3],
			[49,73.4],
			[50,80],
			[51,87.2],
			[52,95.1],
			[53,104],
			[54,113],
			[55,123],
			[56,135],
			[57,147],
			[58,160],
			[59,174],
			[60,190],
			[61,207],
			[62,226],
			[63,247],
			[64,269],
			[65,293],
			[66,320],
			[67,349],
			[68,381],
			[69,415],
			[70,453],
			[71,494],
			[72,538],
			[73,587],
			[74,640],
			[75,698],
			[76,761],
			[77,830],
			[78,905],
			[79,987],
			[80,1080],
			[81,1170],
			[82,1280],
			[83,1400],
			[84,1520],
			[85,1660],
			[86,1810],
			[87,1970],
			[88,2150],
			[89,2350],
			[90,2560],
			[91,2790],
			[92,3040],
			[93,3320],
			[94,3620],
			[95,3950],
			[96,4310],
			[97,4700],
			[98,5120],
			[99,5580],
			[100,6090],
			[101,6640],
			[102,7240],
			[103,7900],
			[104,8610],
			[105,9360],
			[106,10200],
			[107,11200],
			[108,12200],
			[110,14500],
			[112,17200],
			[114,20500],
			[116,24400],
			[118,29000],
			[120,34400]
		],
		powerPlantTable: [
		//TL,power,weight,price,min volume,fuel rate per hour,fuel Type
		//all per kiloliter of volume
			[5,"Internal Combustion",0.25,1,1000,0.005,0.03,"Hydrocarbons"],
			[6,"Improved Internal Combustlon",0.4,1,2000,0.001,0.025,"Hydrocarbons"],
			[6,"Nuclear Flsslon",1,8,100000,5,0.002,"Radioactlves"],
			[7,"Gas Turblne",0.6,1,5000,0.005,0.04,"Hydrocarbons"],
			[8,"MHD Turblne",0.8,1,10000,0.001,0.035,"Hydrocarbons"],
			[9,"Fusion",2,4,200000,10,0.003,"Hydrogen"],
			[10,"Fusion",2,4,200000,2,0.003,"Hydrogen"],
			[11,"Fusion",2,4,200000,1,0.003,"Hydrogen"],
			[12,"Fusion",2,4,200000,0.25,0.003,"Hydrogen"],
			[13,"Fusion",3,3,200000,0.15,0.005,"Hydrogen"],
			[14,"Fusion",3,3,200000,0.1,0.005,"Hydrogen"],
			[15,"Fusion",6,2,200000,0.09,0.009,"Hydrogen"],
			[16,"Fusion",7,1,200000,0.08,0.01,"Hydrogen"],
			[17,"Antimatter",500,6,500000,8,0.029,"Antimatter"],
			[18,"Antimatter",1000,5,500000,1,0.057,"Antimatter"],
			[19,"Antimatter",2500,4,500000,0.5,0.143,"Antimatter"],
			[20,"Antimatter",15000,3,500000,0.1,0.856,"Antimatter"],
			[21,"Antimatter",50000,2,500000,0.02,2.852,"Antimatter"]
		],
		plantEfficiencyTable: [
			//type,size,output multiplier
			//negative values check for smaller-than
			//in order, so can check against each and take last multiple
			["Internal Combustion",-0.1,0.33],
			["Internal Combustion",11,1.5],
			["Gas Turblne",-0.1,0.33],
			["Gas Turblne",11,1.5],
			["MHD Turblne",-0.1,0.33],
			["MHD Turblne",11,1.5],
			["Nuclear Flsslon",50,2],
			["Fusion",6,1.5],
			["Fusion",10,2],
			["Fusion",14,3],
			["Fusion",-0.75,0.67],
			["Fusion",-0.5,0.5],
			["Fusion",-0.25,0.25]
		],
		batteryTable: [
		//TL, megawatt storage, price 
		//all per kiloliter; book gives per liter
			[5,0.1,500000],
			[6,0.2,425000],
			[7,0.3,300000],
			[8,0.4,325000],
			[9,0.6,375000],
			[10,0.8,525000],
			[11,0.9,675000],
			[12,1,850000],
			[13,3,3000000],
			[14,4,5000000],
			[15,7,10000000],
			[16,11,15000000],
			[17,18,20000000],
			[18,30,26000000],
			[19,55,32000000],
			[20,103,38000000],
			[21,180,42000000]
		],
		
		//ignore solar and fuel cells for now
		
		jumpUnitsTable: [
		//reverse engineered from book table
		//techlevel,jump,jumpunit multiplier
		//to get jump units, multiply hull displacement by mulitplier
		//maybe round displacement up to nearest 100 first?
			[9,'Jump1',0.02],
			[11,'Jump2',0.03],
			[12,'Jump3',0.04],
			[13,'Jump4',0.05],
			[14,'Jump5',0.06],
			[15,'Jump6',0.07]
		],
		jumpUnit: {
			volume: 13.5,
			weight: 27,
			price: 3000000
		},
		maneuverUnitsTable: [
		//reverse engineered from book table
		//for a given g, multiply the factor by hull displacement to get table value
			['1G',0.02],
			['2G',0.05],
			['3G',0.08],
			['4G',0.11],
			['5G',0.14],
			['6G',0.17]
		],
		maneuverUnitAG:	{
			volume: 13.5,
			weight: 27,
			power: 65,
			price: 500000
		},
		maneuverUnitThrust:	{
			volume: 13.5,
			weight: 35,
			power: 70,
			price: 700000
		},
		thrustSuspensionTable:	[
		//TL,type,power,volume,weight,price, min vol.
		//values are per ton of thrust; must be at least as much as vehicle
			[7,'Air Cushion',0.1,0.2,0.3,30000,0.01],
			[9,'Standard Grav',0.1,0.02,0.04,2000,0.02],
			[10,'Low Power H-Grav',0.02,0.05,0.03,25000,0.02],
			[12,'Low Power L-Grav',0.01,0.03,0.02,300000,0.003]
		],
			


		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		names:	{
			article: ["The "],
			modifier: [
				"Adamant ",
				"Acute ",
				"Burning ",
				"Agile ",
				"Chubby ",
				"Friendly ",
				"Royal ",
				"Brilliant ",
				"Audacious ",
				"Cozy ",
				"Beautiful ",
				"Bitter ",
				"Crimson ",
				"Dark ",
				"Bold ",
				"Swift ",
				"Brave ",
				"Star of the ",
				"Crown of the  ",
				"Space ",
				"Star ",
				"Daring ",
				"Alpha ",
				"Delta ",
				"Omega ",
				"Desperate ",
				"Hanged ",
				"Good ",
				"Gory ",
				"Grim ",
				"Hopeful ",
				"Angry ",
				"Frolicking  ",
				"Playful ",
				"Determined ",
				"Hasty ",
				"Imperial ",
				"Implacable ",
				"Impulsive ",
				"Indefatigable ",
				"Indomitable ",
				"Flying ",
				"Jubilant ",
				"Dancing ",
				"Slumbering ",
				"Lady ",
				"Maiden ",
				"Majestic ",
				"Lone ",
				"Modest ",
				"Nimble ",
				"Obdurate ",
				"Obedient ",
				"Plucky ",
				"Pert ",
				"Red ",
				"Relentless ",
				"Renegade ",
				"Resolute ",
				"Footloose ",
				"Restless ",
				"Splendid ",
				"Dour ",
				"Subtle ",
				"Jeweled ",
				"Staggering ",
				"Swaggering ",
				"Tireless ",
				"Flirty ",
				"Victorious ",
				"Bashari ",
				"Jumped-Up ",
				"Wild ",
				"Enterprising ",
				"Young ",
				"Zesty ",
				"Zealous ",
				"White ",
				"Blue ",
				"Welcome ",
				"Twisted ",
				"Unbridled ",
				"Unruly ",
				"Golden ",
				"Silver ",
				"Diamond ",
				"Iron ",
			],
			main:	[
				[6,"Adder"],
				[3,"Advantage"],
				[1,"Adventure"],
				[6,"Adversary"],
				[2,"Agamemnon"],
				[6,"Aggressor"],
				[2,"Ajax"],
				[6,"Alacrity"],
				[4,"Albatross"],
				[6,"Angel"],
				[6,"Arrow"],
				[3,"Audacity"],
				[3,"Aurora"],
				[6,"Beagle"],
				[6,"Beauty"],
				[8,"Biter"],
				[6,"Blade"],
				[6,"Broadsword"],
				[6,"Bull"],
				[6,"Bumblebee"],
				[6,"Bunkhouse"],
				[6,"Buzzard"],
				[6,"Calliope"],
				[8,"Castle"],
				[6,"Cherub"],
				[6,"City"],
				[6,"Cockatrice"],
				[6,"Comet"],
				[5,"Consort"],
				[6,"Crocodile"],
				[6,"Dart"],
				[6,"Decoy"],
				[6,"Defender"],
				[6,"Discovery"],
				[6,"Doom"],
				[6,"Dragon"],
				[6,"Dreamer"],
				[6,"Dryad"],
				[6,"Duchess"],
				[6,"Eagle"],
				[6,"Fate"],
				[6,"Flare"],
				[9,"Flight"],
				[6,"Friend"],
				[8,"Fury"],
				[6,"Gala"],
				[6,"Gambler"],
				[8,"Gentleman"],
				[6,"Gladiator"],
				[3,"Glory"],
				[0,"Go Ahead and Try"],
				[5,"Goshawk"],
				[6,"Griffon"],
				[6,"Harpy"],
				[8,"Heap"],
				[3,"Hecate"],
				[6,"Helper"],
				[6,"Hope"],
				[6,"Hornet"],
				[6,"Hound"],
				[1,"Imperial"],
				[1,"Implacable"],
				[1,"Impulsive"],
				[6,"Ingenuity"],
				[4,"Javelin"],
				[6,"Kielbasa"],
				[6,"Lady"],
				[6,"Leviathan"],
				[6,"Locust"],
				[6,"Magpie"],
				[6,"Maiden"],
				[6,"Malice"],
				[6,"Matilda"],
				[6,"Mayfly"],
				[4,"Minerva"],
				[6,"Naiad"],
				[6,"Nebula"],
				[5,"Nova"],
				[7,"Nymph"],
				[8,"Patriot"],
				[5,"Petard"],
				[6,"Prize"],
				[8,"Queen"],
				[6,"Ramparts"],
				[6,"Rapier"],
				[7,"Renegade"],
				[7,"Renown"],
				[7,"Republic"],
				[5,"Rook"],
				[6,"Scow"],
				[6,"Seraphim"],
				[6,"Sovereign"],
				[7,"Sovereign"],
				[9,"Spaceways"],
				[5,"Stag"],
				[6,"Star"],
				[6,"Sun"],
				[8,"Trader"],
				[7,"Tramp"],
				[5,"Tree Bat"],
				[6,"Tree Bear"],
				[7,"Tree Boar"],
				[7,"Tree Swan"],
				[6,"Tree Wolf"],
				[8,"Trollop"],
				[6,"Turtle"],
				[7,"Unicorn"],
				[6,"Venture"],
				[8,"Wanderer"],
				[7,"Wizard"],
				[6,"Wolf"],
				[6,"Wombat"],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""],
				[9,""]

			],
			suffix: [
				" Itself",
				"'s Rest",
				" II",
				" III",
				" IV",
				" II",
				" III",
				" IV",
				"'s Crown",
				"'s Pride",
				" Unbound",
				" of the Skies",
				"'s Shadow",
				"'s Rest",
				"'s Home",
				"'s Castle",
				"'s Revenge",
				"'s Jewel",
				" Reborn"
			]
		}

		
	}
}