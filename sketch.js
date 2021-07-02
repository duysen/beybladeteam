let canvas;
let G = 7; // gravitational force
let mu = 0.001; // friction
let stadium;
let bey1, bey2;
let rpmConst = 400;

let beyNumStr1, beyNumStr2;

let tops = [
	new Top(134, 15, 30, 4599, 16.2, [255, 51, 153, "Behemoth - A1"]),
	new Top(118, 17, 30, 5049, 13.8, [128, 191, 255, "Hattori Hanzo - A2"]),
	new Top(155, 22, 30, 4644, 16.2, [255, 102, 0, "Thor - A3"]),
	new Top(148, 29, 32, 5451, 15, [51, 102, 204, "Shura - A4"]),
	new Top(97, 50, 32, 6363, 21.6, [0, 102, 204, "Athena - D1"]),
	new Top(118, 56, 29, 6873, 24.8, [255, 255, 0, "Atlas - D2"]),
	new Top(119, 51, 40, 5022, 21.6, [0, 255, 0, "Plague Knight - D3"]),
	new Top(137, 61, 35, 7890, 23.2, [255, 255, 153, "Pallas - D4"]),
	new Top(141, 29, 52, 4845, 15.5, [255, 0, 0, "Beelzebub - S1"]),
	new Top(163, 32, 46, 7698, 11.5, [255, 102, 0, "Survivor - S2"]),
	new Top(114, 26, 43, 7698, 11.5, [255, 51, 0, "Venus - S3"]),
	new Top(114, 24, 46, 7698, 12.5, [0, 255, 153, "Lauriel Wreath - S4"]),
	new Top(203, 31, 37, 6414, 17.4, [100, 100, 100, "Nilthotep - B1"]),
	new Top(145, 27, 43, 4989, 13.8, [0, 153, 204, "Chronos - B2"]),
	new Top(150, 22, 32, 5451, 17.4, [0, 51, 153, "Puppeteer - B3"]),
	new Top(115, 27, 35, 5940, 15, [204, 0, 153, "Himiko - B4"])
];

let rings = [
	new Ring(86, 10, 12, 2118, 32.4, [255, 51, 153, "Devil - A1"]),
	new Ring(84, 10, 15, 2556, 32.4, [128, 191, 255, "Shuriken - A2"]),
	new Ring(75, 11, 15, 2322, 30, [255, 102, 0, "Thunderclap - A3"]),
	new Ring(60, 11, 16, 2322, 30, [51, 102, 204, "Capricorn - A4"]),
	new Ring(53, 26, 14, 2925, 40.6, [0, 102, 204, "Guardian - D1"]),
	new Ring(39, 35, 13, 3945, 43.4, [255, 255, 0, "Titan - D2"]),
	new Ring(77, 21, 16, 3435, 37.8, [0, 255, 0, "Catalyze - D3"]),
	new Ring(66, 28, 17, 3690, 40.6, [255, 255, 153, "Angel - D4"]),
	new Ring(38, 16, 21, 3564, 25.3, [255, 0, 0, "Sprint - S1"]),
	new Ring(70, 14, 20, 3564, 27.5, [255, 102, 0, "Pan - S2"]),
	new Ring(46, 13, 21, 4704, 27.5, [255, 51, 0, "Heal - S3"]),
	new Ring(55, 16, 20, 3276, 29.7, [0, 255, 153, "Virgo - S4"]),
	new Ring(83, 15, 20, 3207, 34.8, [100, 100, 100, "Celestial - B1"]),
	new Ring(77, 13, 18, 2730, 32.4, [0, 153, 204, "Hyperspace - B2"]),
	new Ring(86, 11, 15, 2523, 32.4, [0, 51, 153, "Slash - B3"]),
	new Ring(52, 14, 20, 3207, 27.6, [204, 0, 153, "Paper Doll - B4"])
];

let drivers = [
	new Driver(75, 10, 13, 2523, 11.5, [255, 51, 153, "Rage - A1"]),
	new Driver(80, 11, 13, 2322, 12.5, [128, 191, 255, "Batter - A2"]),
	new Driver(82, 10, 15, 2799, 12.5, [255, 102, 0, "Lightning - A3"]),
	new Driver(92, 11, 13, 1716, 12.5, [51, 102, 204, "Battlecry - A4"]),
	new Driver(48, 23, 18, 2925, 13.8, [0, 102, 204, "Warface - D1"]),
	new Driver(59, 19, 18, 2832, 15, [255, 255, 0, "Shock - D2"]),
	new Driver(83, 21, 18, 2673, 15, [0, 255, 0, "Erosion - D3"]),
	new Driver(75, 19, 16, 3321, 13.8, [255, 255, 153, "Infusion - D4"]),
	new Driver(38, 16, 20, 3849, 8.4, [255, 0, 0, "Megalith - S1"]),
	new Driver(76, 16, 21, 3849, 10, [255, 102, 0, "Lurk - S2"]),
	new Driver(46, 13, 23, 3447, 10, [255, 51, 0, "Bloom - S3"]),
	new Driver(50, 14, 21, 3564, 9.2, [0, 255, 153, "Leaf - S4"]),
	new Driver(90, 14, 20, 3207, 14.5, [100, 100, 100, "Entropy - B1"]),
	new Driver(57, 14, 20, 3444, 13.5, [0, 153, 204, "Time - B2"]),
	new Driver(68, 13, 15, 2523, 12.5, [0, 51, 153, "Piety - B3"]),
	new Driver(72, 12, 17, 2730, 11.5, [204, 0, 153, "Curse - B4"])
];



function setup() {
	canvas = createCanvas(500, 600);
	canvas.center('horizontal');

	//rectMode(CENTER);
	frameRate(60);
	angleMode(RADIANS);

	let beyList1 = [
		new Bey(tops[0], rings[3], drivers[8]),
		new Bey(tops[1], rings[14], drivers[14]),
		new Bey(tops[2], rings[12], drivers[0]),
		new Bey(tops[3], rings[8], drivers[9]),
		new Bey(tops[4], rings[5], drivers[7]),
		new Bey(tops[5], rings[2], drivers[3]),
		new Bey(tops[6], rings[15], drivers[1]),
		new Bey(tops[7], rings[6], drivers[11]),
		new Bey(tops[8], rings[11], drivers[12]),
		new Bey(tops[9], rings[0], drivers[13]),
		new Bey(tops[10], rings[13], drivers[6]),
		new Bey(tops[11], rings[1], drivers[10]),
		new Bey(tops[12], rings[9], drivers[5]),
		new Bey(tops[13], rings[4], drivers[15]),
		new Bey(tops[14], rings[7], drivers[4]),
		new Bey(tops[15], rings[10], drivers[2])
	];

	let beyList2 = [
		new Bey(tops[0], rings[3], drivers[8]),
		new Bey(tops[1], rings[14], drivers[14]),
		new Bey(tops[2], rings[12], drivers[0]),
		new Bey(tops[3], rings[8], drivers[9]),
		new Bey(tops[4], rings[5], drivers[7]),
		new Bey(tops[5], rings[2], drivers[3]),
		new Bey(tops[6], rings[15], drivers[1]),
		new Bey(tops[7], rings[6], drivers[11]),
		new Bey(tops[8], rings[11], drivers[12]),
		new Bey(tops[9], rings[0], drivers[13]),
		new Bey(tops[10], rings[13], drivers[6]),
		new Bey(tops[11], rings[1], drivers[10]),
		new Bey(tops[12], rings[9], drivers[5]),
		new Bey(tops[13], rings[4], drivers[15]),
		new Bey(tops[14], rings[7], drivers[4]),
		new Bey(tops[15], rings[10], drivers[2])
	];

	stadium = new Stadium();

	//bey1 = beyList1[parseInt(prompt("Enter bey 1 number: (0 ~ 15)", "0"), 10)];
	//bey2 = beyList2[parseInt(prompt("Enter bey 2 number: (0 ~ 15)", "1"), 10)];

	//bey1 = new Bey(tops[parseInt(prompt("Enter bey 1 top number: (0 ~ 15)", "0"), 10)], rings[parseInt(prompt("Enter bey 1 ring number: (0 ~ 15)", "0"), 10)], drivers[parseInt(prompt("Enter bey 1 driver number: (0 ~ 15)", "0"), 10)]);
	//bey2 = new Bey(tops[parseInt(prompt("Enter bey 2 top number: (0 ~ 15)", "1"), 10)], rings[parseInt(prompt("Enter bey 2 ring number: (0 ~ 15)", "1"), 10)], drivers[parseInt(prompt("Enter bey 1 driver number: (0 ~ 15)", "1"), 10)]);

	let input1 = getPartNum(prompt("bey 1: top_ring_driver", "0 0 0"));
	let input2 = getPartNum(prompt("bey 2: top_ring_driver", "1 1 1"));

	bey1 = new Bey(tops[input1[0]], rings[input1[1]], drivers[input1[2]]);
	bey2 = new Bey(tops[input2[0]], rings[input2[1]], drivers[input2[2]]);

	// initial bey 1
	bey1.pos = createPos(0); bey1.vel = createVector(bey1.pos.x - 0, bey1.pos.y - 250).setMag(14);
	bey1.statPos = 0; bey1.spinVel = bey1.vel.copy().mult(0.01);
	bey1.stm *= random(0.9, 1.1);
	bey1.maxStm = bey1.stm;

	// initial bey2
	bey2.pos = createPos(1); bey2.vel = createVector(bey2.pos.x - width, bey2.pos.y - 250).setMag(14);
	bey2.statPos = 1; bey2.spinVel = bey2.vel.copy().mult(0.01);
	bey2.stm *= random(0.9, 1.1);
	bey2.maxStm = bey2.stm;
}

function draw() {
	background(226, 226, 226);
	stadium.show();

	stadium.attract(bey1);
	stadium.attract(bey2);

	bey1.spin();
	bey2.spin();

	bey1.friction();
	bey2.friction();

	if (bey1.hitBorder()) {
		if (!bey1.broughtOut) {
			bey1.reflect(bey1.getCollideBorderPoint());

		} /*else {
			noLoop();
			alert(bey2.name + " wins by a bring out finish");
		}*/
	}
	if (bey2.hitBorder()) {
		if (!bey2.broughtOut) {
			bey2.reflect(bey2.getCollideBorderPoint());

		} /*else {
			noLoop();
			alert(bey1.name + " wins by a bring out finish");
		}*/
	}

	bey1.checkCollision(bey2);
	bey2.checkCollision(bey1);

	bey1.update();
	bey2.update();

	bey1.show();
	bey2.show();

	if (bey1.checkDeath() === 1 && bey2.checkDeath() === 0) {
		noLoop();
		alert(bey2.name + " wins by a burst finish");

	} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 0) {
		noLoop();
		alert(bey2.name + " wins by a survival finish");

	} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 0) {
		noLoop();
		alert(bey2.name + " wins by a bring out finish");

	} else if (bey2.checkDeath() === 1 && bey1.checkDeath() === 0) {
		noLoop();
		alert(bey1.name + " wins by a burst finish");

	} else if (bey2.checkDeath() === 2 && bey1.checkDeath() === 0) {
		noLoop();
		alert(bey1.name + " wins by a survival finish");

	} else if (bey2.checkDeath() === 3 && bey1.checkDeath() === 0) {
		noLoop();
		alert(bey1.name + " wins by a bring out finish");

	} else if (bey1.checkDeath() != 0 && bey2.checkDeath() != 0) {
		noLoop();

		if (bey1.checkDeath() === 1 && bey2.checkDeath() === 1) {
			alert("Draw - Both beys bursted");

		} else if (bey1.checkDeath() === 1 && bey2.checkDeath() === 2) {
			alert("Draw - " + bey1.name + " bursted and " + bey2.name + " ran out of stamina");

		} else if (bey1.checkDeath() === 1 && bey2.checkDeath() === 3) {
			alert("Draw - " + bey1.name + " bursted and " + bey2.name + " brought out of stadium");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 1) {
			alert("Draw - " + bey1.name + " ran out of stamina and " + bey2.name + " bursted");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 2) {
			alert("Draw - Both beys ran out of stamina");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 3) {
			alert("Draw - " + bey1.name + " ran out of stamina and " + bey2.name + " brought out of stadium");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 1) {
			alert("Draw - " + bey1.name + " brought out of stadium and " + bey2.name + " busrted");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 2) {
			alert("Draw - " + bey1.name + " brought out of stadium and " + bey2.name + " ran out of stamina");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 3) {
			alert("Draw - both beys brought out of stadium");

		}
	}
}

function createPos(x) {

	let rand1 = random(0, 1);

	let center = stadium.pos;
	let vect = createVector(1, 0).mult(rand1 * (stadium.r - 31));


	let rand2 = random(0, 1);
	let head;

	if (x === 0) {
		if (rand2 < 0.6) {
			vect.setHeading(random(0, PI));
		} else {
			vect.setHeading(random(-PI, 0));
		}

	} else if (x === 1) {
		if (rand2 < 0.6) {
			vect.setHeading(random(-PI, 0));
		} else {
			vect.setHeading(random(0, PI));
		}
	}

	return p5.Vector.add(center, vect);
}

function orthogonalProjection1(a, b, p) {
  // find nearest point along a LINE
  
  d1 = p5.Vector.sub(b, a).normalize();
  d2 = p5.Vector.sub(p, a);
  
  d1.mult(d2.dot(d1));

  return p5.Vector.add(a, d1);
}



function getPartNum(str) {

	let top = 0;
	let ring = 0;
	let driver = 0;
	let spaceIndex1 = 0;
	let spaceIndex2 = 0;

	for (let i = 0; i < str.length; i++) {
		if (str[i] === " ") {
			spaceIndex1 = i;
			break;
		}
	}

	for (let i = spaceIndex1 + 1; i < str.length; i++) {
		if (str[i] === " ") {
			spaceIndex2 = i;
			break;
		}
	}

	top = parseInt(str.slice(0, spaceIndex1), 10);
	ring = parseInt(str.slice(spaceIndex1 + 1, spaceIndex2), 10);
	driver = parseInt(str.slice(spaceIndex2 + 1), 10);

	return [top, ring, driver]
}
