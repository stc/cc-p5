function Tween(value, damping, attraction) {
  this.value = value;
  this.damping = damping;
  this.attraction = attraction;
  this.vel = 0;
  this.accel = 0;
  this.force = 0;
  this.mass = 1;
  this.targeting;
  this.mytarget;

  Tween.prototype.set = function(v) {
    this.value = v;
  }

  Tween.prototype.update = function() {
    if (this.targeting) {
      this.force += this.attraction * (this.mytarget - this.value);
    }

    this.accel = this.force / this.mass;
    this.vel = (this.vel + this.accel) * this.damping;
    this.value += this.vel;
    this.force = 0;
  }

  Tween.prototype.target = function(t) {
    this.targeting = true;
    this.mytarget = t;
  }


  Tween.prototype.noTarget = function() {
    this.targeting = false;
  }
}


