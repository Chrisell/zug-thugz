// // druid
// export {default as balance} from './balance.png'
// export {default as feral} from './feral.png'
// export {default as bear} from './bear.png'
// export {default as restoDruid} from './restoDruid.png'
// // priest
// export {default as shadow} from './shadow.png'
// // shaman
// export {default as elemental} from './elemental.png'
// export {default as enhancement} from './enhancement.png'
// export {default as restoShaman} from './restoShaman.png'
// // warrior
// export {default as tank} from './tank.png'
import React from 'react';
// druid
import balance from './balance.png'
import feral from './feral.png'
import bear from './bear.png'
import restoDruid from './restoDruid.png'
// priest
import shadow from './shadow.png'
// shaman
import elemental from './elemental.png'
import enhancement from './enhancement.png'
import restoShaman from './restoShaman.png'
// warrior
import tank from './tank.png'

// druid
const Balance = <img id='Balance' src={balance}/>
const Feral = <img id='Feral' src={feral}/>
const Bear = <img id='Bear' src={bear}/>
const RestoDruid = <img id='RestoDruid' src={restoDruid}/>
// priest
const Shadow = <img id='Shadow' src={shadow}/>
// shaman
const Elemental = <img id='Elemental' src={elemental}/>
const Enhancement = <img id='Enhancement' src={enhancement}/>
const RestoShaman = <img id='RestoShaman' src={restoShaman}/>
// warrior
const Tank = <img id='Tank' src={tank}/>

export {Balance, Feral, Bear, RestoDruid, Shadow, Elemental, Enhancement, RestoShaman, Tank}