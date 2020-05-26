// export {default as orc} from './orc.png'
// export {default as tauren} from './tauren.png'
// export {default as troll} from './troll.png'
// export {default as undead} from './undead.png'
import React from 'react';
import orc from "./orc.png"
import tauren from "./tauren.png"
import troll from "./troll.png"
import undead from "./undead.png"

const Orc = {name: 'Orc', img: <img alt="Orc" src={orc}/>}
const Tauren = {name: 'Tauren', img: <img alt="Tauren" src={tauren}/>}
const Troll = {name: 'Troll', img: <img alt="Troll" src={troll}/>}
const Undead = {name: 'Undead', img: <img alt="Undead" src={undead}/>}

export {Orc, Tauren, Troll, Undead}