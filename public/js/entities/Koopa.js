import Entity, {Sides} from '../Entity.js';
import {createAnim} from '../anim.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

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
        koopa.offset.y = 8;

        koopa.addTrait({
            NAME: 'koopaWalk',
            speed: 30,
            obstruct(koopa, side) {
                if (side === Sides.LEFT || side === Sides.RIGHT) {
                    this.speed = -this.speed;
                }
            },
            update(koopa) {
                koopa.vel.x = this.speed;
            },
        });

        koopa.draw = drawKoopa;

        return koopa;
    };
}
