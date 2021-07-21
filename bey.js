class Bey {
	constructor(top, ring, driver) {

		this.pos = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);

    this.top = top;
    this.ring = ring;
    this.driver = driver;

		this.spinVel = createVector(0, 0); // to maitain spiral movement
    this.lastSpinVect = createVector(0, 0);
    this.angle = 0;
		this.cw = 1.1; // spin CCW or CW

		//this.m = 100; // mass
    this.m = top.m + ring.m + driver.m;
		this.r = 30; // radius
		this.color = color;
		this.statPos = 0;
    this.broughtOut = false;

		this.health = top.health + ring.health + driver.health;
		this.maxHealth = top.health + ring.health + driver.health;
		this.atk = top.atk + ring.atk + driver.atk;
		this.def = top.def + ring.def + driver.def;

		this.stm = (top.stm + ring.stm + driver.stm) / 3; // stamina
		this.maxStm = (top.stm + ring.stm + driver.stm) / 3;

    this.rpm = 5000;
    this.maxRpm = 5000;

    this.frt = 0.001; // friction

    this.name = top.color[3].slice(-2) + "-" + ring.color[3].slice(-2) + "-" + driver.color[3].slice(-2);
	}

	applyForce(force) {
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}

	hitBorder() {
		return dist(this.pos.x, this.pos.y, stadium.pos.x, stadium.pos.y) > stadium.r - this.r;
	}

	getCollideBorderPoint() {
		let d = p5.Vector.sub(this.pos, stadium.pos);
		d.setMag(stadium.r);
		let h = p5.Vector.add(stadium.pos, d);

  	return h;
  }

  reflect(h, other) { // h is the point that collides
  	let centerToH = p5.Vector.sub(h, stadium.pos);

  	let fixPos = centerToH.copy().setMag(stadium.r - this.r);
  	this.pos.x = fixPos.x + stadium.pos.x;
  	this.pos.y = fixPos.y + stadium.pos.y;

  	let oldPos = p5.Vector.sub(h, this.vel);

  	let intersect = orthogonalProjection1(stadium.pos, h, oldPos);
  	let symmPos = createVector(2 * intersect.x - oldPos.x, 2 * intersect.y - oldPos.y);
  	let delta = p5.Vector.sub(symmPos, oldPos);
  	let newPos = p5.Vector.add(oldPos, delta);
  	let newVect = p5.Vector.sub(newPos, h);

  	this.vel.setHeading(newVect.heading());
  	this.vel.mult(0.9);

    // EARN DAMAGE WHEN HIT BORDER
    let HToCenter = p5.Vector.mult(centerToH, -1);
    let angle = this.vel.angleBetween(HToCenter);
    let absAngle = PI / 2 - abs(angle);

    this.frt = 0.001;
    if (other.checkDeath() === 0) {
      this.health -= map(absAngle, 0, PI / 2, 0, 500);
      this.rpm -= map(absAngle, 0, PI / 2, 0, 50);
    }
  }

  friction() {

  	let f = this.vel.copy();
  	f.normalize();
  	f.mult(-1);

  	f.setMag(this.frt);
  	this.applyForce(f);
  }

  spin() {
  	let centerToPos = p5.Vector.sub(stadium.pos, this.pos);
    let rotation = map(centerToPos.mag(), 0, stadium.r - this.r, 1, 2);
    this.spinVel.setHeading(centerToPos.heading() +  1.5 * PI / 2);
  	let velHead = createVector(this.vel.x + this.spinVel.x, this.vel.y + this.spinVel.y).heading();
  	//this.vel.setHeading(velHead).limit(14);
    this.vel.setHeading(velHead);
  }
  
  checkCollision(other) {
    // Get distance vector
    let distVect = p5.Vector.sub(this.pos, other.pos);

    // Calculate magnitude of the vector
    let distVectMag = distVect.mag();

    // Minimum distance before they are touching
    let minDist = this.r + other.r;

    if (distVectMag < minDist) {
      //let newVel = p5.Vector.add(this.vel, distVect);
      //this.vel.setHeading(newVel.heading()).mult(1.5);

      this.attack(other);
      this.frt = 0.001;
    }
  }

  attack(other) {

    let distVect = p5.Vector.sub(this.pos, other.pos);
    let newVel = p5.Vector.add(this.vel, distVect).setMag(this.vel.mag() * 2);
    //this.vel.setHeading(newVel.heading()).mult(2);
    this.applyForce(newVel);

    //let rand = random(0.75, 1.26);
    let rand = 0;
    let reverseDistVect = p5.Vector.mult(distVect, -1);

    if (abs(this.vel.angleBetween(reverseDistVect)) <= PI / 2) {
      rand = random(1, 1.26);
    } else {
      rand = random(0.75, 1);
    }
    let damage = (this.atk - other.def) * rand;

    /*if (rand > 1.25778) {
      other.broughtOut = true;
    }*/

    if (this.stm > other.stm) {
      if (rand > 1.25926) {
        other.broughtOut = true;
      }
    } else if (this.stm < other.stm) {
      if (rand > 1.25976) {
        other.broughtOut = true;
      }
    } else {
      if (rand > 1.25952) {
        other.broughtOut = true;
      }
    }

    other.prevHealth = other.health;
    other.health -= damage;
  }

  checkDeath() {
  	//return this.health <= 0 || this.stm <= 0;
    if (this.health <= 0) {
      return 1;
    } else if (this.rpm <= 0) {
      return 2;
    } else if (this.broughtOut) {
      return 3;
    } else {
      return 0;
    }
  }

  calcStm() {
    let rpmLost = rpmConst / this.stm;
    this.rpm -= rpmLost;
  }

  update() {

  	this.vel.add(this.acc);
  	this.pos.add(this.vel);
  	this.acc.set(0, 0);

    // max speed based on rpm
    if (this.rpm < 700) {
      this.vel.limit(8);
    } else {
      this.vel.limit(14);
    }

    if (this.frt >= this.vel.mag()) {
      this.frt = this.vel.mag();
    }

    if (this.health < 0) {
      this.health = 0;
    }

    if (this.rpm < 0) {
      this.rpm = 0;
    }
  }

  updateStm(other) {

    if (other.checkDeath() === 0) {
      this.calcStm();
      this.frt += 0.0003;
    }
  }

  show() {

  	push();
  	stroke(0, 0, 0);
    strokeWeight(2);
  	fill(this.top.color[0], this.top.color[1], this.top.color[2]); // top
  	circle(this.pos.x, this.pos.y, this.r * 2);

  	
    strokeWeight(1);
    fill(this.ring.color[0], this.ring.color[1], this.ring.color[2]); // ring
  	circle(this.pos.x, this.pos.y, this.r * 4 / 3);

  	
    strokeWeight(1);
    fill(this.driver.color[0], this.driver.color[1], this.driver.color[2]); // driver
  	circle(this.pos.x, this.pos.y, this.r * 2 / 3);
  	pop();
  }

  showStat() {
    push();
    if (this.statPos === 0) {
      textSize(16);
      text("atk: " + this.atk, 10, 480); // atk
      text("def: " + this.def, 10, 500); // def
      text("sta: " + round(this.stm * 10) / 10, 10, 520); // sta
      stroke(0);
      strokeWeight(1);
      noFill();
      rect(0, 530, 240, 20); // max health
      rect(0, 550, 240, 20); // max rpm
      noStroke();
      fill(0, 255, 0);
      rect(0, 530, map(this.health, 0, this.maxHealth, 0, 240, true), 20); // current health
      textSize(14);
      fill(0);
      textAlign(CENTER);
      text(round(this.health), 120, 546);
      fill(243, 239, 45);
      rect(0, 550, map(this.rpm, 0, this.maxRpm, 0, 240, true), 20); // current rpm
      fill(0);
      textAlign(CENTER);
      text(round(this.rpm), 120, 566);
      textSize(20);
      textStyle(BOLD);
      textAlign(CENTER);
      text(this.name, 120, 600); // name
      rectMode(CENTER);
      fill(this.top.color[0], this.top.color[1], this.top.color[2]);
      stroke(0);
      strokeWeight(1);
      rect(200, 481.5, 50, 12);
      fill(this.ring.color[0], this.ring.color[1], this.ring.color[2]);
      rect(200, 492.5, 35, 10);
      fill(this.driver.color[0], this.driver.color[1], this.driver.color[2]);
      rect(200, 502.5, 10, 10);

    } else {
      textSize(16);
      text("atk: " + this.atk, 420, 480); // atk
      text("def: " + this.def, 420, 500); // def
      text("sta: " + round(this.stm * 10) / 10, 420, 520); // sta
      stroke(0);
      strokeWeight(1);
      noFill();
      rect(260, 530, 240, 20); // max health
      rect(260, 550, 240, 20); // max rpm
      noStroke();
      fill(0, 255, 0);
      rect(width - map(this.health, 0, this.maxHealth, 0, 240, true), 530, map(this.health, 0, this.maxHealth, 0, 240, true), 20); // current health
      textSize(14);
      fill(0);
      textAlign(CENTER);
      text(round(this.health), 380, 546);
      fill(243, 239, 45);
      rect(width - map(this.rpm, 0, this.maxRpm, 0, 240, true), 550, map(this.rpm, 0, this.maxRpm, 0, 240, true), 20); // current rpm
      fill(0);
      textAlign(CENTER);
      text(round(this.rpm), 380, 566);
      textSize(20);
      textStyle(BOLD);
      textAlign(CENTER);
      text(this.name, width - 120, 600); // name
      rectMode(CENTER);
      fill(this.top.color[0], this.top.color[1], this.top.color[2]);
      stroke(0);
      strokeWeight(1);
      rect(width - 200, 481.5, 50, 12);
      fill(this.ring.color[0], this.ring.color[1], this.ring.color[2]);
      rect(width - 200, 492.5, 35, 10);
      fill(this.driver.color[0], this.driver.color[1], this.driver.color[2]);
      rect(width - 200, 502.5, 10, 10);
    }
    pop();
  }
}
