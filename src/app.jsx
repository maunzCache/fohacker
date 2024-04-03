import React from "react";
import ReactDOM from "react-dom/client";

import { InfoBar } from "./infobar.jsx";
import { Terminal } from "./terminal.jsx";
import { TabMenu } from "./tabmenu.jsx";
import { PerkList } from "./perklist.jsx";

function App() {
  return (
    <>
      <InfoBar />
      <Terminal />
      <TabMenu />
      <PerkList />
    </>
  );
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
