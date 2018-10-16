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
        return ((this.location.x - particle.location.x)*(this.location.x - particle.location.x)
            + (this.location.y - particle.location.y)*(this.location.y - particle.location.y))
    }

    this.connect = function() {
        strokeWeight(.5);

        for (j=0; j<particles.length-1; j++) {
            temp = this.distance(particles[j])
            if (temp < 3500) {
                line(this.location.x, this.location.y, 0, particles[j].location.x, particles[j].location.y, 0);
            }
        }
    }
}

var minimum = 65
function setup() {
    console.log("Hey there! Welcome to my website. :)")
    p5.disableFriendlyErrors = true;
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL)
    canvas.parent('bg');
    nbparticles = height*width/2500;
    if (nbparticles > 500) { nbparticles = 500 }
    for (i=1; i<nbparticles; i++) {
        particles.push(new Particle(createVector(random(width), random(height))))
    }
}

var testperf = true;
var eligible = true;
var maxtest = 0;
var r=0;
var sum=0;
function draw() {
    if (eligible) {
        particles[0].location.x = mouseX;
        particles[0].location.y = mouseY;
        translate(-width/2,-height/2,0);
        background(255, 255, 255, 0)
        for (i=particles.length-1; i>-1; i--) {
            particles[i].run()
        }
        if (testperf) {
            r+=1
            if (r >= 10) {
                sum += frameRate()
                if (r == 20) {
                    testperf = false
                    if (sum < 100) {
                        eligible = false
                        console.log("Animated background disabled due to poor performance.")
                    }
                }
            }
        }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
