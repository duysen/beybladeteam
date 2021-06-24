class Bey {
	constructor(top, ring, driver) {

		this.pos = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);

    this.top = top;
    this.ring = ring;
    this.driver = driver;

		this.spinVel = createVector(0, 0); // to maitain spiral movement
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

    this.rpm = 43000;
    this.maxRpm = 43000;

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

  reflect(h) { // h is the point that collides
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
  }

  friction() {

  	let friction = this.vel.copy();
  	friction.normalize();
  	friction.mult(-1);

  	friction.setMag(mu);
  	this.applyForce(friction);
  }

  spin() {
  	let centerToPos = p5.Vector.sub(stadium.pos, this.pos);
    let rotation = map(centerToPos.mag(), 0, stadium.r - this.r, 1, 2);
    this.spinVel.setHeading(centerToPos.heading() + 1.5 * PI / 2);
  	let velHead = createVector(this.vel.x + this.spinVel.x, this.vel.y + this.spinVel.y).heading();
  	this.vel.setHeading(velHead).limit(14);
  }

  checkCollision(other) {
    // Get distances between the balls components
    let distVect = p5.Vector.sub(this.pos, other.pos);

    // Calculate magnitude of the vector separating the balls
    let distVectMag = distVect.mag();

    // Minimum distance before they are touching
    let minDist = this.r + other.r;

    if (distVectMag < minDist) {
      //let newVel = p5.Vector.add(this.vel, distVect);
      //this.vel.setHeading(newVel.heading()).mult(1.5);

      this.attack(other);
    }
  }

  attack(other) {
  	let rand = random(0.75, 1.26);
  	let damage = (this.atk - other.def) * rand;

    if (rand > 1.25) {
      other.broughtOut = true;
    }

    other.prevHealth = other.health;
  	other.health -= damage;

    let distVect = p5.Vector.sub(this.pos, other.pos);
    let newVel = p5.Vector.add(this.vel, distVect).setMag(this.vel.mag() * 2);
    //this.vel.setHeading(newVel.heading()).mult(2);
    this.applyForce(newVel);
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

    this.calcStm();
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

  	push();
  	if (this.statPos === 0) {
      textSize(16);
      text(this.name, 10, 520); // name
  		stroke(0);
  		strokeWeight(1);
  		noFill();
  		rect(0, 540, 200, 10); // max health
  		rect(0, 560, 200, 10); // max stm
  		noStroke();
  		fill(0, 255, 0);
  		rect(0, 540, map(this.health, 0, this.maxHealth, 0, 200, true), 10); // current health
  		fill(243, 239, 45);
  		rect(0, 560, map(this.rpm, 0, this.maxRpm, 0, 200, true), 10); // current stm
  	} else {
      textSize(16);
      text(this.name, 310, 520); // name
  		stroke(0);
  		strokeWeight(1);
  		noFill();
  		rect(300, 540, 200, 10); // max health
  		rect(300, 560, 200, 10); // max stm
  		noStroke();
  		fill(0, 255, 0);
  		rect(300, 540, map(this.health, 0, this.maxHealth, 0, 200, true), 10); // current health
  		fill(243, 239, 45);
  		rect(300, 560, map(this.rpm, 0, this.maxRpm, 0, 200, true), 10); // current stm
  	}
  	pop();
  }
}