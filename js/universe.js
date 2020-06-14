class Universe {

	constructor() {
		this.bodies = [];
		this.camera = new Camera();
	}

	spam(n) {
		while(n--) {
			this.bodies.push(new Body(
				rand3(2000,1000),
				rand3(40,30),
				[0,0,0],
				50,
				1000,
				randColor(255)
			));
		}
	}

	create() {
		this.bodies.push(new Body(
			[0,0,0],
			[0,0,0],
			[0,0,0],
			200,
			1000000,
			'yellow'
		));
		this.bodies.push(new Body(
			[2000,0,0],
			[0,20,0],
			[0,0,0],
			100,
			10000,
			'orange'
		));
		this.bodies.push(new Body(
			[0,1000,0],
			[0,0,30],
			[0,0,0],
			50,
			1000,
			'blue'
		));
		this.bodies.push(new Body(
			[0,0,500],
			[44,0,0],
			[0,0,0],
			20,
			100,
			'red'
		));
	}

	remake() {
		this.bodies = [];
		this.create();
	}

	axis() {
		stroke('red');
		line(0,0,0,10000,0,0);
		stroke('green');
		line(0,0,0,0,10000,0);
		stroke('blue');
		line(0,0,0,0,0,10000);
		noStroke();
	}

	calculate() {
		let i, j, F, Fg, alives = [], max = this.bodies.length;
		for(i = 0; i < max; i++) {
			F = [0,0,0];
			for(j = 0; j < max; j++) {
				if(i !== j && this.bodies[i].alive) {
					if(collision(this.bodies[i].pos,this.bodies[j].pos,this.bodies[i].rad + this.bodies[j].rad)) {
						let fusion = new Body(
							[
								(this.bodies[i].pos[0]+this.bodies[j].pos[0])/2,
								(this.bodies[i].pos[1]+this.bodies[j].pos[1])/2,
								(this.bodies[i].pos[2]+this.bodies[j].pos[2])/2
							],
							[0,0,0],
							[0,0,0],
							this.bodies[i].rad*0.8 + this.bodies[j].rad*0.8,
							this.bodies[i].mass + this.bodies[j].mass,
							randColor(255)
						);
						this.bodies[i].alive = false;
						this.bodies[j].alive = false;
						this.bodies.push(fusion);
					}
					Fg = gravity(this.bodies[i],this.bodies[j]);
					F[0] += Fg[0];
					F[1] += Fg[1];
					F[2] += Fg[2];
				}
			}
			this.bodies[i].acc = [
				F[0]/this.bodies[i].mass,
				F[1]/this.bodies[i].mass,
				F[2]/this.bodies[i].mass
			];
		}
		for(i = 0; i < this.bodies.length; i++) {
			if(this.bodies[i].alive) alives.push(this.bodies[i]);
		}
		this.bodies = alives;
	}

	run() {
		this.axis();
		this.calculate();
		this.camera.run();
		for(const body of this.bodies) {
			body.run();
		}
	}
}