import {Trait} from '../Entity.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.5;
        this.velocity = 200;
        this.gracePeriod = 3/60;

        this.engageTime = 0;
        this.requestTime = 0;
        this.stability = 0;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        if (entity.vel.y === 0) {
            if (this.engageTime > 0) {
                this.cancel();
            }
            this.stability++;
        } else {
            this.stability = 0;
        }

        if (this.requestTime > 0 && this.stability > 0) {
            this.engageTime = this.duration;
            this.requestTime = 0;
        }

        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }

        this.requestTime -= deltaTime;
    }
}
