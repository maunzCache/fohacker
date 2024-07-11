import React from "react";

export default function TabMenuContent({ tabState }) {
  // TODO: Tab menu needs a fixed size to make content break lines
  switch (tabState) {
    case "inventory":
      return (
        <div id="inventory">
          <span className="itemBox">Cram</span>
          <span className="itemBox">Jet</span>
          <span className="itemBox">Nuka-Cola</span>
          <span className="itemBox">Psycho</span>
          <span className="itemBox">RadAway</span>
          <span className="itemBox">Stimpak</span>
        </div>
      );
    case "help":
      return (
        <div id="help">
          This game was inspired by the Fallout hacking mini game introduced in Fallout 3.<br />
          It plays like &gt;<a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank">Mastermind</a>&lt;:<br />
          <ol>
            <li>Pick one of the words from the terminal.</li>
            <li>If wrong, you'll get an indicator how likely the chosen word is to the code word.</li>
            <li>The higher the indicator, the more letters are similar to the code word.</li>
            <li>But watch out: You only have a limited amount of tries until you get shocked by the terminal.</li>
            <li>If you're health drops to zero, it's game over!</li>
          </ol>
        </div>
      );
    case "settings":
      return (
        <div id="settings">
          Customized the game to your desires.
          <form>
            <fieldset>
              <legend>Select language</legend>
              <label>
                <input type="radio" name="english" value="en-US" defaultChecked={true} />
                English (US)
              </label>
              <label>
                <input type="radio" name="german" value="de-DE" />
                German (DE)
              </label>
            </fieldset>
          </form>
        </div>
      );
    case "about":
      return (
        <div id="about">
          FOHacker ist a Fallout inspired game.<br />
          <br />
          Changelog:
          <h4>0.1 (alpha)</h4>
          <ul>
            <li>Initial release</li>
          </ul>
        </div>
      );
    default:
      return <div>Unknown tab.</div>;
  }
}
