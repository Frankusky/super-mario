import TileResolver from './TileResolver.js';

export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }

    checkX(entity) {
        const {bounds, vel} = entity;
        let x;
        if (vel.x > 0) {
            x = bounds.right;
        } else if (vel.x < 0) {
            x = bounds.left;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            x, x,
            bounds.top, bounds.bottom);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (vel.x > 0) {
                if (bounds.right > match.x1) {
                    bounds.right = match.x1;
                    vel.x = 0;
                }
            } else if (vel.x < 0) {
                if (bounds.left < match.x2) {
                    bounds.left = match.x2;
                    vel.x = 0;
                }
            }
        });
    }

    checkY(entity) {
        const {bounds, vel} = entity;
        let y;
        if (vel.y > 0) {
            y = bounds.bottom;
        } else if (vel.y < 0) {
            y = bounds.top;
        } else {
            return;
        }

        const matches = this.tiles.searchByRange(
            bounds.left, bounds.right,
            y, y);

        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (vel.y > 0) {
                if (bounds.bottom > match.y1) {
                    bounds.bottom = match.y1;
                    vel.y = 0;
                }
            } else if (vel.y < 0) {
                if (bounds.top < match.y2) {
                    bounds.top = match.y2;
                    vel.y = 0;
                }
            }
        });
    }
}
