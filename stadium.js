class Stadium {
	constructor() {
		this.pos = createVector(250, 250);

		this.m = 1000;
		this.r = 200;
	}

	attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let strength = G * (this.mass * mover.mass) / force.magSq();
    force.setMag(strength);
    mover.applyForce(force);
  }

	show() {
		push();
		noFill();
		stroke(255, 0, 0, 100);
		circle(this.pos.x, this.pos.y, this.r);
		stroke(0, 0, 255, 100);
		line(this.pos.x, this.pos.y - this.r, this.pos.x, this.pos.y + this.r);
		line(this.pos.x - this.r, this.pos.y, this.pos.x + this.r, this.pos.y);
		stroke(0, 0, 0);
		circle(this.pos.x, this.pos.y, this.r * 2);
		pop();
	}
}
