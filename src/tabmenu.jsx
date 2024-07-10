import React, { useState } from "react";

import TabMenuContent from "./tabmenucontent.jsx";

export default function TabMenu() {
  const [tabState, setTabState] = useState("inventory");

  return (
    <div id="tabmenu">
      <ul className="tabs">
        <li>
          <a onClick={() => setTabState("inventory")}>Inventory</a>
        </li>
        <li>
          <a onClick={() => setTabState("help")}>Help</a>
        </li>
        <li>
          <a onClick={() => setTabState("settings")}>Settings</a>
        </li>
        <li>
          <a onClick={() => setTabState("about")}>About</a>
        </li>
      </ul>
      <TabMenuContent tabState={tabState} />
    </div>
  );
}
