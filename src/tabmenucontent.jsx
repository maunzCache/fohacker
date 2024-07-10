import React from "react";

export default function TabMenuContent({ tabState }) {
  switch (tabState) {
    case "inventory":
      return (
        <div id="inventory">
          Your inventory!
        </div>
      );
    case "help":
      return (
        <div id="help">
          Some help!
        </div>
      );
    case "settings":
      return (
        <div id="settings">
          Settings coming soon!
        </div>
      );
    case "about":
      return (
        <div id="about">
          It's me not you!<br />
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
