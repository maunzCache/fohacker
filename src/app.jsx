import React from "react";

import InfoBar from "./infobar.jsx";
import Terminal from "./terminal.jsx";
import TabMenu from "./tabmenu.jsx";
import PerkList from "./perklist.jsx";

export default function App() {
  return (
    <>
      <InfoBar />
      <Terminal />
      <TabMenu />
      <PerkList />
    </>
  );
}
