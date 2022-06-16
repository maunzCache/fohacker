'use strict';

const Game = require('./classes/game');

// TODO: Deprecated. Replace with Renderer.
const jQuery = require('jquery');

(function ($) {
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

  $(function () {
    game.createTerminal();
    $('.info .input').before('Fallout Hacker<br>Version ' + Game.version + '<br>');
  });
})(jQuery);
