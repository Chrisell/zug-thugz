// export {default as druid} from './druid.png'
// export {default as hunter} from './hunter.png'
// export {default as mage} from './mage.png'
// export {default as priest} from './priest.png'
// export {default as rogue} from './rogue.png'
// export {default as shaman} from './shaman.png'
// export {default as warlock} from './warlock.png'
// export {default as warrior} from './warrior.png'
import React from 'react';
import druid from "./druid.png"
import hunter from "./hunter.png"
import mage from "./mage.png"
import priest from "./priest.png"
import rogue from "./rogue.png"
import shaman from "./shaman.png"
import warlock from "./warlock.png"
import warrior from "./warrior.png"

const Druid = {name: 'Druid', img: <img src={druid}/>}
const Hunter = {name: 'Hunter', img: <img src={hunter}/>}
const Mage = {name: 'Mage', img: <img src={mage}/>}
const Priest = {name: 'Priest', img: <img src={priest}/>}
const Rogue = {name: 'Rogue', img: <img src={rogue}/>}
const Shaman = {name: 'Shaman', img: <img src={shaman}/>}
const Warlock = {name: 'Warlock', img: <img src={warlock}/>}
const Warrior = {name: 'Warrior', img: <img src={warrior}/>}

export {Druid, Hunter, Mage, Priest, Rogue, Shaman, Warlock, Warrior}