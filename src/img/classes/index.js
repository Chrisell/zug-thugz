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

const Druid = <img id='Druid' src={druid}/>
const Hunter = <img id='Hunter' src={hunter}/>
const Mage = <img id='Mage' src={mage}/>
const Priest = <img id='Priest' src={priest}/>
const Rogue = <img id='Rogue' src={rogue}/>
const Shaman = <img id='Shaman' src={shaman}/>
const Warlock = <img id='Warlock' src={warlock}/>
const Warrior = <img id='Warrior' src={warrior}/>

export {Druid, Hunter, Mage, Priest, Rogue, Shaman, Warlock, Warrior}