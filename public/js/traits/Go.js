import {Trait} from '../Entity.js';

function inhibit(value, max) {

}


export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 600;
        this.resistance = 1/5000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        const drag = this.resistance * entity.vel.x * Math.abs(entity.vel.x);

        entity.vel.x += this.acceleration * deltaTime * this.dir;
        entity.vel.x += -drag;

        if (entity.vel.x > this.speedLimit) {
            entity.vel.x = this.speedLimit;
        } else if (entity.vel.x < -this.speedLimit) {
            entity.vel.x = -this.speedLimit;
        }

        if (this.dir) {
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
}
