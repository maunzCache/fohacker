import React, { useState } from "react";

import Perk from "./classes/perk.ts";

export default function PerkList() {
  const [perks, setPerks] = useState([
    new Perk(
      "Peek-A-Boo",
      [
        "You can see the current password but you still have to click it by yourself.",
        "Less searching, more clicking. The password gets highlighted too.",
      ],
      2,
    ),
    new Perk(
      "More Of The Same",
      [
        "More possibilities. More trying. More experience.",
      ],
      0,
    ),
    new Perk(
      "Just One More Minute ...",
      [
        "Increases max. attempts.",
        "Increases max. attempts.",
        "Increases max. attempts.",
        "Increases max. attempts.",
        "Increases max. attempts.",
        "Increases max. attempts.",
      ],
      0,
    ),
    new Perk(
      "Enter The Matrix",
      [
        "Highlight duds.",
        "Multiline duds.",
      ],
      0,
    ),
    new Perk(
      "Rubbersome",
      [
        "Be rubber, my friend. Less damage when shocked by a locked terminal.",
        "Reduce damage even more when shocked by a locked terminal.",
        "No more damage from locked terminal.",
        "Get one more attempt when locking the terminal",
      ],
      0,
    ),
    new Perk(
      "Nerd Rage",
      [
        "Stop typing passwords. Start smashing terminals. Half the money, but skip the current attempt. Needs to be charged.",
      ],
      0,
    ),
  ]);

  const classes = ["perkdiv"];
  // TODO: Add code to show active skills

  return (
    <div id="perklist">
      {perks.map((perk, key) => (
        <div
          key={key}
          className={classes.join(" ")}
          data-id={key}
          title={perk.description[0]}
        >
          <b>{perk.title}</b> ({perk.level + "/" + perk.maxlevel})<br />
          <span>{perk.description[0]}</span>
        </div>
      ))}
    </div>
  );
}
