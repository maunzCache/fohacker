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

"use strict"
var currentPasswords = [];
(function ($) {
  var dudCharacters = ",;.:^<>()[]{}!?@%$`'\"*+-=/\|_";
  var startDuds = "<([{";
  var endDuds = ">)]}";

  var gameData = {
    "password": "",
    "passwordsOnScreen": 14,
    "attempts": 0,
    "difficulty": 0,
    "experience": 0,
    "totalExperience": 0,
    "level": 1,
    "skillpoints": 0,
    "caps": 0,
    "health": 100,
    "maxhealth": 100,
    "initialValues": function () {
      gameData.passwordsOnScreen = 14;
      gameData.attempts = 4;
      gameData.difficulty = 4;// word length
      gameData.experience = 0;
      gameData.totalExperience = 0;
      gameData.level = 1;
      gameData.skillpoints = 0;
      currentPasswords = passwords[gameData.difficulty]();
      gameData.caps = 0;
      game.health = 100;
      gameData.maxhealth = 100;
    }
  };

  // Todo: Possibility to have different or bigger terminals in the future
  var terminalData = {
    "rows": 16,
    "columns": 2,// Number of "pages"
    "dataPerColumn": 12,// Characters per column
    "maxCharacters": function () {
      return terminalData.dataPerColumn * terminalData.rows * terminalData.columns;
    },
    "codeString": function () {
      var returnString = "";
      for (var i = 0; terminalData.code.length > i; i++) {
        returnString += terminalData.code[i];
      }
      return returnString;
    },
    "code": [],
    "markup": []
  };

  var game = {
    "version": "0.1 (alpha)",
    "nextLevelExp": function () {
      return Math.round(Math.exp((gameData.level + 1) * 0.45) + Math.exp(gameData.level * 0.45) * 6);
    },
    "levelUp": function () {
      var nextExp = game.nextLevelExp();

      while (gameData.experience > game.nextLevelExp()) {
        var possibleOverhead = game.nextLevelExp() - gameData.experience;
        if (possibleOverhead <= 0) {
          gameData.level++;
          gameData.skillpoints++;
          $('.info .input').before('<span class="info">Level Up</span><br>');
          gameData.totalExperience += gameData.experience;
          gameData.experience = Math.abs(possibleOverhead);
        }
      }
    },
    "addExperience": function (words) {
      var addExp = Math.round((words + 1) * gameData.difficulty * 0.35);
      gameData.experience += addExp;
      $('.info .input').before('<span class="info">EXP +' + addExp + '</span><br>');
      game.levelUp();
    },
    "getDifficulty": function () {
      if (gameData.difficulty >= 4 && gameData.difficulty <= 5) {
        return "Easy";
      } else if (gameData.difficulty >= 6 && gameData.difficulty <= 8) {
        return "Advanced";
      } else if (gameData.difficulty >= 9 && gameData.difficulty <= 10) {
        return "Expert";
      } else if (gameData.difficulty >= 11 && gameData.difficulty <= 12) {
        return "Master";
      }
    },
    "updateUI": function () {
      $('.infobar .difficulty').text(game.getDifficulty());
      $('.infobar .level').text(gameData.level);
      $('.expbar').css('width', gameData.experience / (game.nextLevelExp() / 100));

      if (perks[0]["level"] > 0) {
        $('.password').text('(Password=' + gameData.password + ')');
      }

      $('#attempts .attempt').detach();
      for (var i = 0; gameData.attempts > i; i++) {
        $('#attempts').append('<span class="attempt">&nbsp;&nbsp;</span>');
      }

      $('.perklist').empty();
      $('.perklist').append('Skillpoints: <div class="skillpoints">' + gameData.skillpoints + '</div><br>');
      $.each(perks, function (key, perk) {
        if (perk.meetRequirements()) {
          var classes = ['perkdiv'];
          if (perk.level > 0) {
            classes.push('active');
          }

          var description = perk.description[perk.level];
          if (description === undefined) {
            description = "Maxed out."
          }

          $('.perklist').append('<div class="' + classes.join(' ') + '" data-id="' + key + '">'
            + '<b>' + perk.title + '</b> (' + perk.level + '/' + perk.maxlevel + ')<br>'
            + '<span>' + description + '</span>'
            + '</div>');
        }
      });
      $('.perklist').append();
      $('.perkdiv').on('click', function () {
        if (gameData.skillpoints > 0) {
          var perkid = $(this).data("id");
          if ((perks[perkid].level + 1) <= perks[perkid].maxlevel) {
            perks[perkid].level++;
            gameData.skillpoints--;
            game.updateUI();
          }
        }
      });
    },
    "clearOld": function () {
      $('.terminal .linenumber').empty();
      $('.terminal .code').empty();
      gameData.attempts = 4;
      currentPasswords = passwords[gameData.difficulty]();
      $('.info').empty();
      $('.info').append('<span class="input">&nbsp</span>');
    },
    "createPointers": function () {
      var lineNumber = Math.random().toString(16).slice(2, 6);

      $('.terminal .linenumber').each(function (key, value) {
        for (var i = 0; i < terminalData.rows; i++) {
          lineNumber = (parseInt(lineNumber, terminalData.rows) + (i * 12)).toString(16).toUpperCase();// Todo allow overflow!

          if (lineNumber.length > 4) {
            lineNumber = lineNumber.slice(1, 5);
          }
          while (lineNumber.length < 4) {
            lineNumber = "0" + lineNumber;
          }

          if (i === 15) {
            $(value).append("<span>0x" + lineNumber + "</span>");
          } else {
            $(value).append("<span>0x" + lineNumber + "</span><br>");
          }
        }
      });
    },
    "createDudCode": function () {
      // Iterate for each character
      for (var i = 0; (terminalData.columns * terminalData.rows) > i; i++) {
        var randomData = "";
        // Iterate per "line"
        for (var j = 0; terminalData.dataPerColumn > j; j++) {
          let randomDudIndex = Math.round(Math.random() * (dudCharacters.length - 1));
          randomData += dudCharacters[randomDudIndex];
        }
        // console.log("Duds [" + i + "]: " + randomData);
        terminalData.code[i] = randomData;
      }
    },
    "createCurrentPasswords": function () {
      currentPasswords = [];

      // If dictionary is too small
      if (gameData.passwordsOnScreen > passwords[gameData.difficulty]().length) {
        gameData.passwordsOnScreen = passwords[gameData.difficulty]().length;
        console.log("Dictionary " + game.getDifficulty() + "(Size: " + gameData.difficulty + ") has too few entries (" + passwords[gameData.difficulty]().length + ").");
      }

      var tempPasswords = passwords[gameData.difficulty]().slice();
      // Pick password
      gameData.password = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];
      for (var i = 0; gameData.passwordsOnScreen > i; i++) {
        currentPasswords[i] = tempPasswords[Math.round(Math.random() * (tempPasswords.length - 1))];

        var position = $.inArray(currentPasswords[i], tempPasswords);
        if (~position) {
          tempPasswords.splice(position, 1);
        }
      }
    },
    "addPasswords": function () {
      var tempPasswords = currentPasswords.slice();
      var blockedPositions = [];

      while (tempPasswords.length > 0) {
        var randomPosition = Math.round(Math.random() * (terminalData.maxCharacters() - gameData.difficulty)); // Password fits into last line

        if ($.inArray(randomPosition, blockedPositions) > -1) {
          // console.log("Hit: " + terminalData.code[Math.floor(randomPosition / (terminalData.columns * terminalData.dataPerColumn))]);
          continue; // Get a new random position
        }

        if (randomPosition < 0) {
          randomPosition = 0;
        }

        if (randomPosition >= terminalData.maxCharacters()) {
          console.log("Position calculation wrong: " + randomPosition + " of " + terminalData.maxCharacters());
        }

        var linePosition = Math.floor(randomPosition / terminalData.dataPerColumn);
        var inLinePosition = randomPosition % terminalData.dataPerColumn;

        var nextPassword = tempPasswords.shift();
        if ((linePosition + 1) > (terminalData.columns * terminalData.rows)) {
          console.log("Accidentally hit " + (linePosition + 1) + "th row during password insertion.");
        }

        var code = terminalData.code[linePosition];
        if ((inLinePosition + gameData.difficulty) > terminalData.dataPerColumn) { // Password needs more than one row
          var difference = terminalData.dataPerColumn - inLinePosition;

          var overhead = gameData.difficulty - difference;
          terminalData.code[linePosition] = code.substr(0, inLinePosition) + nextPassword.substr(0, difference);

          code = terminalData.code[linePosition + 1];
          terminalData.code[linePosition + 1] = nextPassword.substr(difference, overhead) + code.substr(overhead);
          blockedPositions.push(randomPosition, randomPosition - 1, randomPosition + 1, randomPosition - 2, randomPosition + 2, randomPosition - 3, randomPosition + 3, randomPosition - 4, randomPosition + 4);
        } else {
          terminalData.code[linePosition] = code.substr(0, inLinePosition) + nextPassword + code.substr(inLinePosition + nextPassword.length);
          blockedPositions.push(randomPosition, randomPosition - 1, randomPosition + 1, randomPosition - 2, randomPosition + 2, randomPosition - 3, randomPosition + 3, randomPosition - 4, randomPosition + 4);
        }
      }
    },
    "findDuds": function () {
      console.log("Terminal has size: " + terminalData.code.length);
      // Get the end duds first
      var duds = [];
      for (var i = 0; terminalData.code.length > i; i++) {
        // TODO Code below hits only once. Better RegEx?
        for (var j = terminalData.code.length; 0 < j; j--) {
          var endPosition = $.inArray(terminalData.code[i][j], endDuds);
          if (~endPosition) {
            var cutString = terminalData.code[i].substr(0, endPosition);
            var startPosition = $.inArray(startDuds[endPosition], cutString);
            if (~startPosition) {
              duds.push([
                {
                  "dudPos": endPosition,// Position in char string
                  "startDud": startPosition,
                  "endDud": j
                }
              ]);
              console.log("Adding duds: " + endPosition + "/" + startPosition + "/" + j);
              console.log(terminalData.code[i]);
              // TODO: Only highlights initial duds but not new.
            }
          }
        }
      }
      if (duds.length > 0) {
        console.log("Final list of duds: ");
        console.log(duds);
      }
    },
    "createMarkup": function () {

    },
    "addHtml": function () {
      // TODO: Use markup array
      // TODO: More than two rows
      for (var i = 0; terminalData.code.length > i; i++) {
        var selector = "";
        if (i < 16) {
          selector = '.terminal .left.code';
        } else {
          selector = '.terminal .right.code';
        }

        // TODO: Finds passwords in a single row
        var lineValue = terminalData.code[i];
        // Workaround to fix nasty html side effects
        lineValue = lineValue.replace("<", "&lt;");
        lineValue = lineValue.replace(">", "&gt;");

        currentPasswords.forEach(function (value, key, array) {
          var tempNewLineValue = lineValue.replace(value, '<span class="word" data-word="' + value + '">' + value + '</span>');
          lineValue = tempNewLineValue;
        });

        $(selector).append('<span id="span' + i + '"></span><br>');
        // Note: If rendered as html '<?' duds will break stuff.
        $('#span' + i).html(lineValue);
      }
    },
    "addScript": function () {
      // TODO: Simulate typing the hovered word
      $('.code .word').on('mouseover', function (event) {
        var passwordHovered = event.target.textContent;
        console.log("Hovering: " + passwordHovered);
        $('.info .input').attr('data-content', passwordHovered);
      });
      $('.code .word').on('mouseout', function (event) {
        console.log("End hover");
        $('.info .input').attr('data-content', '');
      });
      // Todo: Merge code from createTerminal()
    },
    "createTerminal": function () {
      game.clearOld();

      console.log("--- Creating pointers ---");
      game.createPointers();// Create "random" line numbers
      console.log("--- Creating duds---");
      game.createDudCode();// Create password text filled with duds
      console.log("--- Create passwords ---");
      game.createCurrentPasswords();// Generate current password list
      console.log("--- Merge passwords and duds ---");
      game.addPasswords();// Merge duds and passwords
      console.log("--- Find/highlight duds---");
      game.findDuds();
      console.log("--- Create markup ---");
      game.createMarkup();
      console.log("--- Add html ---");
      game.addHtml();// Create HTML
      console.log("--- Add events and listeners ---");
      game.addScript();

      if (perks[0]["level"] >= 2) {
        $('.code .word').each(function () {
          if (gameData.password == $(this).data("word")) {
            $(this).addClass("highlight");
          }
        });
      }

      // Create settings menubar
      // Todo move code to ui building code
      // Code by http://www.jacklmoore.com/notes/jquery-tabs/
      $('ul.tabs').each(function () {
        // For each set of tabs, we want to keep track of
        // which tab is active and it's associated content
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
        $active.addClass('active');

        $content = $($active[0].hash);

        // Hide the remaining content
        $links.not($active).each(function () {
          $(this.hash).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function (e) {
          // Make the old tab inactive.
          $active.removeClass('active');
          $content.hide();

          // Update the variables with the new link and content
          $active = $(this);
          $content = $(this.hash);

          // Make the tab active.
          $active.addClass('active');
          $content.show();

          // Prevent the anchor's default click action
          e.preventDefault();
        });
      });

      // Make passwords clickable
      $('.code .word').on('click', function (event) {
        var selectedPassword = event.target.textContent;

        var position = $.inArray(selectedPassword, currentPasswords);
        if (~position) {
          currentPasswords.splice(position, 1);
        }

        var likeness = 0;
        for (var i = 0; gameData.difficulty > i; i++) {
          if (gameData.password[i] == selectedPassword[i]) {
            likeness++;
          }
        }

        if (gameData.password == selectedPassword) {
          var oldLength = currentPasswords.length;
          game.createTerminal();
          game.addExperience(oldLength);
          $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
          $('.info .input').before('<span class="text">Access granted.</span><br>');
        } else {
          gameData.attempts--;
          $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
          $('.info .input').before('<span class="likeness">Likeness=' + likeness + '</span><br>');
          $('.info .input').before('<span class="text">Entry denied.</span><br>');
          if (gameData.attempts == 0) {
            game.createTerminal();
            $('.info .input').before('<span class="try">' + selectedPassword + '</span><br>');
            $('.info .input').before('<span class="text">Terminal locked.</span><br>');
          }
        }

        game.updateUI();
      });

      // Break special
      $('.linebreak').hover(function () {
        var dataWord = $(this).data("word");
        var siblings = $('[data-word="' + dataWord + '"]');
        $(siblings).each(function () {
          $(this).css("background-color", "#82FA58");
          $(this).css("color", "#0B1907");
        });
      }, function () {
        $('.linebreak').css("background-color", "#0B1907");
        $('.linebreak').css("color", "#82FA58");
      });

      // Todo update data word :(
      $('.pagebreak').hover(function () {
        $('.pagebreak').css("background-color", "#82FA58");
        $('.pagebreak').css("color", "#0B1907");
      }, function () {
        $('.pagebreak').css("background-color", "#0B1907");
        $('.pagebreak').css("color", "#82FA58");
      });

      game.updateUI();
    }
  };

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
    gameData.initialValues();
    game.createTerminal();
    $('.info .input').before('Fallout Hacker<br>Version ' + game.version + '<br>');
  });
})(jQuery);
