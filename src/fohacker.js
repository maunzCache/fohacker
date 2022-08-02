'use strict';

const Game = require('./classes/game');
const Renderer = require('./renderer');

(function () {
  var game = new Game();

  // TODO: Find out if still relevant and where to put this code
  var encodeHtmlEntity = function (str) {
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
      var character = str[i].charCodeAt();
      if (/[:alphanum:]/.test(str[i])) {
        buf.unshift([character].join(''));
      } else {
        buf.unshift(['&#', character, ';'].join(''));
      }
    }
    return buf.join('');
  };

  window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    game.createTerminal();
    // TODO: Failes to render the version even if static value
    Renderer.addFOHackerVersionBeforeInfoInput();
  });
})();
