import {Trait} from '../Entity.js';

function inhibit(value, max) {

}


export default class Go extends Trait {
    constructor() {
        super('go');

        this.dir = 0;
        this.acceleration = 600;
        this.deceleration = 200;
        this.resistance = 1/5000;

        this.distance = 0;
        this.heading = 1;
    }

    update(entity, deltaTime) {
        if (this.dir) {
            entity.vel.x += this.acceleration * deltaTime * this.dir;
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            entity.vel.x -= this.deceleration * deltaTime * (entity.vel.x > 0 ? 1 : -1);
            this.distance = 0;
        }

        const drag = this.resistance * entity.vel.x * Math.abs(entity.vel.x);
        entity.vel.x += -drag;
    }
}
