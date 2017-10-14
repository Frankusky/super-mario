import Entity from '../Entity.js';
import {createAnim} from '../anim.js';
import {loadSpriteSheet} from '../loaders.js';

function createKoopaFactory(sprite) {
    const walkAnim = createAnim(['walk-1', 'walk-2'], 0.15);

    function pickFrame(koopa) {
        return walkAnim(koopa.lifetime);
    }

    function drawKoopa(context) {
        sprite.draw(
            pickFrame(this), context, 0, 0,
            this.koopaWalk.speed < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);

        koopa.addTrait({
            NAME: 'koopaWalk',
            speed: 30,
            update(koopa) {
                if (koopa.vel.x === 0) {
                    this.speed = -this.speed;
                }
                koopa.vel.x = this.speed;
            },
        });

        koopa.draw = drawKoopa;

        return koopa;
    };
}

export default function setup() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}
