import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import loadMario from './entities/Mario.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';
import {setupKeyboard} from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMario(),
    loadLevel('1-1'),
])
.then(([createMario, level]) => {
    const camera = new Camera();
    window.camera = camera;

    /*level.comp.layers.push(
        createCollisionLayer(level),
        createCameraLayer(camera));*/

    const marios = [];
    for (let i = 0; i < 3; i++) {
        const mario = createMario();
        mario.pos.set(64 + i * 20, 64);

        level.entities.add(mario);

        const input = setupKeyboard(mario);
        input.listenTo(window);

        marios.push(mario);
    }

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        level.update(deltaTime);

        if (marios[0].pos.x > 100) {
            camera.pos.x = marios[0].pos.x - 100;
        }

        level.comp.draw(context, camera);
    }

    timer.start();
});