import Entity from '../Entity.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(createGoombaFactory);
}

function createGoombaFactory(sprite) {
    const frames = ['walk-1', 'walk-2'];
    const frameLength = 0.15;
    function pickFrame(goomba) {
        const frameIndex = Math.floor(goomba.lifetime / frameLength) % frames.length;
        return frames[frameIndex];
    }

    function drawGoomba(context) {
        sprite.draw(pickFrame(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);

        goomba.addTrait({
            NAME: 'goombaWalk',
            speed: 30,
            update(goomba) {
                if (goomba.vel.x === 0) {
                    this.speed = -this.speed;
                }
                goomba.vel.x = this.speed;
            },
        });

        goomba.draw = drawGoomba;

        return goomba;
    };
}
