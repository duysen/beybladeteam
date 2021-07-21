let canvas;
let G = 7; // gravitational force
let mu = 0.001; // friction
let stadium;
let bey1, bey2;
let rpmConst = 50;

let beyNumStr1, beyNumStr2;

let tops = [
	new Top(170, 22, 30, 5856, 17.4, [205, 92, 92, "Hodur - A1"]),
	new Top(138, 29, 34, 5451, 13.8, [0, 206, 209, "Aiolos - A2"]),
	new Top(155, 22, 30, 4644, 16.2, [255, 102, 0, "Thor - A3"]),
	new Top(148, 29, 32, 5451, 15, [123, 104, 238, "Shura - A4"]),
	new Top(143, 42, 40, 6873, 16.8, [0, 191, 255, "Bubble - D1"]),
	new Top(118, 56, 29, 6873, 24.8, [255, 255, 0, "Atlas - D2"]),
	new Top(119, 51, 40, 5022, 21.6, [0, 128, 0, "Plague Knight - D3"]),
	new Top(137, 61, 35, 7890, 23.2, [240, 255, 255, "Pallas - D4"]),
	new Top(141, 29, 52, 4845, 15.5, [255, 0, 0, "Beelzebub - S1"]),
	new Top(163, 32, 46, 7698, 11.5, [255, 69, 0, "Survivor - S2"]),
	new Top(198, 29, 46, 8838, 12.5, [255, 182, 193, "Iltheus - S3"]),
	new Top(114, 24, 46, 7698, 12.5, [0, 250, 154, "Lauriel Wreath - S4"]),
	new Top(203, 31, 37, 6414, 17.4, [100, 100, 100, "Nilthotep - B1"]),
	new Top(145, 27, 43, 4989, 13.8, [255, 215, 0, "Chronos - B2"]),
	new Top(162, 24, 43, 4989, 13.8, [0, 0, 255, "Mermaid - B3"]),
	new Top(115, 27, 35, 5940, 15, [218, 112, 214, "Himiko - B4"])
];

let rings = [
	new Ring(86, 11, 13, 2322, 32.4, [205, 92, 92, "Corona - A1"]),
	new Ring(68, 10, 16, 2322, 27.6, [0, 206, 209, "Sagitarius - A2"]),
	new Ring(75, 11, 15, 2322, 30, [255, 102, 0, "Thunderclap - A3"]),
	new Ring(60, 11, 16, 2322, 30, [123, 104, 238, "Capricorn - A4"]),
	new Ring(60, 25, 18, 3690, 32.2, [0, 191, 255, "Colorful - D1"]),
	new Ring(39, 35, 13, 3945, 43.4, [255, 255, 0, "Titan - D2"]),
	new Ring(77, 21, 16, 3435, 37.8, [0, 128, 0, "Catalyze - D3"]),
	new Ring(66, 28, 17, 3690, 40.6, [240, 255, 255, "Angel - D4"]),
	new Ring(38, 16, 21, 3564, 25.3, [255, 0, 0, "Sprint - S1"]),
	new Ring(70, 14, 20, 3564, 27.5, [255, 69, 0, "Pan - S2"]),
	new Ring(82, 16, 24, 4134, 27.5, [255, 182, 193, "Variable - S3"]),
	new Ring(55, 16, 20, 3276, 29.7, [0, 250, 154, "Virgo - S4"]),
	new Ring(83, 15, 20, 3207, 34.8, [100, 100, 100, "Celestial - B1"]),
	new Ring(77, 13, 18, 2730, 32.4, [255, 215, 0, "Hyperspace - B2"]),
	new Ring(67, 12, 17, 2730, 30, [0, 0, 255, "Surge - B3"]),
	new Ring(52, 14, 20, 3207, 27.6, [218, 112, 214, "Paper Doll - B4"])
];

let drivers = [
	new Driver(92, 10, 15, 2523, 11.5, [205, 92, 92, "Shadow - A1"]),
	new Driver(80, 10, 17, 2523, 11.5, [0, 206, 209, "Berserker - A2"]),
	new Driver(82, 10, 15, 2799, 12.5, [255, 165, 0, "Lightning - A3"]),
	new Driver(92, 11, 13, 1716, 12.5, [123, 104, 238, "Battlecry - A4"]),
	new Driver(66, 26, 18, 3180, 13.8, [0, 191, 255, "Soft - D1"]),
	new Driver(59, 19, 18, 2832, 15, [255, 255, 0, "Shock - D2"]),
	new Driver(83, 21, 18, 2673, 15, [0, 128, 0, "Erosion - D3"]),
	new Driver(75, 19, 16, 3321, 13.8, [240, 255, 255, "Infusion - D4"]),
	new Driver(38, 16, 20, 3849, 8.4, [255, 0, 0, "Megalith - S1"]),
	new Driver(76, 16, 21, 3849, 10, [255, 69, 0, "Lurk - S2"]),
	new Driver(88, 16, 24, 3564, 10, [255, 182, 193, "Source - S3"]),
	new Driver(50, 14, 21, 3564, 9.2, [0, 250, 154, "Leaf - S4"]),
	new Driver(90, 14, 20, 3207, 14.5, [100, 100, 100, "Entropy - B1"]),
	new Driver(57, 14, 20, 3444, 13.5, [255, 215, 0, "Time - B2"]),
	new Driver(69, 14, 16, 2418, 12.5, [0, 0, 255, "Soprano - B3"]),
	new Driver(72, 12, 17, 2730, 11.5, [218, 112, 214, "Curse - B4"])
];



function setup() {
	canvas = createCanvas(500, 610);
	canvas.center('horizontal');

	//rectMode(CENTER);
	frameRate(60);
	angleMode(RADIANS);

	stadium = new Stadium();

	let input1 = getPartNum(prompt("bey 1: top_ring_driver", "0 0 0"));
	let input2 = getPartNum(prompt("bey 2: top_ring_driver", "1 1 1"));

	bey1 = new Bey(tops[input1[0]], rings[input1[1]], drivers[input1[2]]);
	bey2 = new Bey(tops[input2[0]], rings[input2[1]], drivers[input2[2]]);

	// initial bey 1
	bey1.pos = createPos(0); bey1.vel = createVector(bey1.pos.x - 0, bey1.pos.y - 250).setMag(14);
	bey1.statPos = 0; bey1.spinVel = bey1.vel.copy().mult(0.01);
	bey1.stm *= random(0.9, 1.01);
	bey1.maxStm = bey1.stm;

	// initial bey2
	bey2.pos = createPos(1); bey2.vel = createVector(bey2.pos.x - width, bey2.pos.y - 250).setMag(14);
	bey2.statPos = 1; bey2.spinVel = bey2.vel.copy().mult(0.01);
	bey2.stm *= random(0.9, 1.01);
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
			bey1.reflect(bey1.getCollideBorderPoint(), bey2);
		}
	}
	if (bey2.hitBorder()) {
		if (!bey2.broughtOut) {
			bey2.reflect(bey2.getCollideBorderPoint(), bey1);
		}
	}

	if (bey1.checkDeath() === 0 && bey2.checkDeath() === 0) {
		bey1.checkCollision(bey2);
		bey2.checkCollision(bey1);
	}

	bey1.update();
	bey2.update();

	if (bey1.checkDeath() === 0) {
		bey1.updateStm(bey2);
	}
	if (bey2.checkDeath() === 0) {
		bey2.updateStm(bey1);
	}

	if (bey1.checkDeath() === 0) {
		bey1.show();
	}
	if (bey2.checkDeath() === 0) {
		bey2.show();
	}

	bey1.showStat();
	bey2.showStat();

	if (bey1.checkDeath() === 1 && bey2.checkDeath() === 0) {
		//noLoop();
		//alert(bey2.name + " wins by a burst finish");
		endGameScreen(bey2.name + " wins by a burst finish");

	} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 0) {
		//noLoop();
		//alert(bey2.name + " wins by a survival finish");
		endGameScreen(bey2.name + " wins by a survival finish");

	} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 0) {
		//noLoop();
		//alert(bey2.name + " wins by a bring out finish");
		endGameScreen(bey2.name + " wins by a bring out finish");

	} else if (bey2.checkDeath() === 1 && bey1.checkDeath() === 0) {
		//noLoop();
		//alert(bey1.name + " wins by a burst finish");
		endGameScreen(bey1.name + " wins by a burst finish");

	} else if (bey2.checkDeath() === 2 && bey1.checkDeath() === 0) {
		//noLoop();
		//alert(bey1.name + " wins by a survival finish");
		endGameScreen(bey1.name + " wins by a survival finish");

	} else if (bey2.checkDeath() === 3 && bey1.checkDeath() === 0) {
		//noLoop();
		//alert(bey1.name + " wins by a bring out finish");
		endGameScreen(bey1.name + " wins by a bring out finish");

	} else if (bey1.checkDeath() != 0 && bey2.checkDeath() != 0) {
		//noLoop();

		if (bey1.checkDeath() === 1 && bey2.checkDeath() === 1) {
			//alert("Draw - Both beys bursted");
			endGameScreen("Draw - Both beys bursted");

		} else if (bey1.checkDeath() === 1 && bey2.checkDeath() === 2) {
			//alert("Draw - " + bey1.name + " bursted and " + bey2.name + " ran out of stamina");
			endGameScreen("Draw \n" + bey1.name + " bursted \n" + bey2.name + " ran out of stamina");

		} else if (bey1.checkDeath() === 1 && bey2.checkDeath() === 3) {
			//alert("Draw - " + bey1.name + " bursted and " + bey2.name + " brought out of stadium");
			endGameScreen("Draw \n" + bey1.name + " bursted \n" + bey2.name + " brought out of stadium");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 1) {
			//alert("Draw - " + bey1.name + " ran out of stamina and " + bey2.name + " bursted");
			endGameScreen("Draw \n" + bey1.name + " ran out of stamina \n" + bey2.name + " bursted");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 2) {
			//alert("Draw - Both beys ran out of stamina");
			endGameScreen("Draw - Both beys ran out of stamina");

		} else if (bey1.checkDeath() === 2 && bey2.checkDeath() === 3) {
			//alert("Draw - " + bey1.name + " ran out of stamina and " + bey2.name + " brought out of stadium");
			endGameScreen("Draw \n" + bey1.name + " ran out of stamina \n" + bey2.name + " brought out of stadium");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 1) {
			//alert("Draw - " + bey1.name + " brought out of stadium and " + bey2.name + " busrted");
			endGameScreen("Draw \n" + bey1.name + " brought out of stadium \n" + bey2.name + " bursted");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 2) {
			//alert("Draw - " + bey1.name + " brought out of stadium and " + bey2.name + " ran out of stamina");
			endGameScreen("Draw \n" + bey1.name + " brought out of stadium \n" + bey2.name + " ran out of stamina");

		} else if (bey1.checkDeath() === 3 && bey2.checkDeath() === 3) {
			//alert("Draw - both beys brought out of stadium");
			endGameScreen("Draw - both beys brought out of stadium");

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

function endGameScreen(messege) {

	push();
	rectMode(CORNER);
	fill(255, 150);
	noStroke();
	rect(0, 0, width, height);

	fill(0);
	textSize(20);
	textAlign(CENTER);
	text(messege, width / 2, height / 2);
	pop();
}
