/* Todos
 * - Change RegExp approach and make it work
 *   - Make dud word removal work
 * - Have functions to update a specific ui element
 * - Find correct closures and merge stuff
 * - Give perks string key or getByTitle function
 * - Upgrade css (after feedback?)
 * - Implement more gameplay (lose hp on hacking fail, gameover?, stimpacks, radiation, S.P.E.C.I.A.L., ...)
 *   - Implements more perks and make old ones working
 *   - Fill dictionary
 * - Release game and write about it on reddit
 * - Limit info output to 16 lines
 * - Replace var with let where possible
*/

'use strict';

const Game = require('./classes/game');

(function ($) {
  var game = new Game();

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

  $(document).ready(function () {
    game.createTerminal();
    $('.info .input').before('Fallout Hacker<br>Version ' + game.version + '<br>');
  });
})(jQuery);
