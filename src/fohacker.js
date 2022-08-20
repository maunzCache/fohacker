'use strict';

import Game from './classes/game.js';
import Renderer from './renderer.js';

(function () {
    var game = new Game();

    window.addEventListener('DOMContentLoaded', () => {
        console.log('DOM fully loaded and parsed');
        game.createTerminal();
        // TODO: Failes to render the version even if static value
        Renderer.addFOHackerVersionBeforeInfoInput();
    });
})();
