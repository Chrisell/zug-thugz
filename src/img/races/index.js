// export {default as orc} from './orc.png'
// export {default as tauren} from './tauren.png'
// export {default as troll} from './troll.png'
// export {default as undead} from './undead.png'
import React from 'react';
import orc from "./orc.png"
import tauren from "./tauren.png"
import troll from "./troll.png"
import undead from "./undead.png"

const Orc = <img id='Orc' src={orc}/>
const Tauren = <img id='Tauren' src={tauren}/>
const Troll = <img id='Troll' src={troll}/>
const Undead = <img id='Undead' src={undead}/>

export {Orc, Tauren, Troll, Undead}