var particles = []

function Particle(location) {
    this.location = location.copy()
    this.velocity = createVector(random(-0.5,0.5), random(-0.5,0.5))

    this.run = function() {
        this.update()
        this.connect()
    }

    this.update = function() {
        this.location.add(this.velocity)
        if(this.location.x < 0) {
            this.velocity.x *= -1
        }
        if(this.location.x > width) {
            this.velocity.x *= -1
        }
        if(this.location.y < 0) {
            this.velocity.y *= -1
        }
        if(this.location.y > height) {
            this.velocity.y *= -1
        }
    }

    this.distance = function (particle) {
        distance = p5.Vector.sub(this.location, particle.location)
        return distance.mag()
    }

    this.connect = function() {
        noFill();
        stroke(0,random(3,5))
        beginShape()
        for (j=0; j<particles.length-1; j++) {
            temp = this.distance(particles[j])
            if (temp < minimum && temp > 10) {
                vertex(this.location.x, this.location.y, 0)
                vertex(particles[j].location.x, particles[j].location.y, 0)
            }
        }
        endShape()
    }
}

var minimum = 65
function setup() {
    var canvas = createCanvas(windowWidth,windowHeight, P2D)
    canvas.parent('bg');
    for (i=1; i<height*width/2000; i++) {
        particles.push(new Particle(createVector(random(width), random(height))))
    }
}

function draw() {
    background(255)
    for (i=particles.length-1; i>-1; i--) {
        particles[i].run()
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
