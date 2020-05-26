import React, {useState} from 'react';
import {
    Dropdown
} from 'react-bootstrap'
import {Orc, Tauren, Troll, Undead} from "../img/races"
import {Druid, Hunter, Mage, Priest, Rogue, Shaman, Warlock, Warrior} from "../img/classes"
import {Balance, Feral, Bear, RestoDruid, Shadow, Elemental, Enhancement, RestoShaman, Tank} from "../img/specs"

const defaultString = "------"

const stateMap = {Orc: {race: Orc, class: defaultString, spec: defaultString},
    Tauren: {race: Tauren, class: defaultString, spec: defaultString},
    Troll: {race: Troll, class: defaultString, spec: defaultString},
    Undead: {race: Undead, class: defaultString, spec: defaultString},
    Druid:  {class: Druid, spec: defaultString},
    Hunter: {class: Hunter, spec: Hunter},
    Mage: {class: Mage, spec: Mage},
    Priest: {class: Priest, spec: defaultString},
    Rogue: {class: Rogue, spec: Rogue},
    Shaman: {class: Shaman, spec: defaultString},
    Warlock: {class: Warlock, spec: Warlock},
    Warrior: {class: Warrior, spec: defaultString},
    Balance: {spec: Balance},
    Feral: {spec: Feral},
    Bear: {spec: Bear},
    RestoDruid: {spec: RestoDruid},
    Shadow: {spec: Shadow},
    Elemental: {spec: Elemental},
    Enhancement: {spec: Enhancement},
    RestoShaman: {spec: RestoShaman},
    Tank: {spec: Tank}
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="general"
    >
      {children}
      {/* &#x25bc; */}
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          {/* <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          /> */}
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

function makeDropdown(thisObj, id, icon, items) {
    let renderedItems = []
    items = items ? items : []
    icon = icon ? icon : defaultString
    if (typeof icon === 'object') {
        icon = icon.img
    }
    items.forEach(function (item) {
        if (stateMap[item.name]) {
          item = stateMap[item.name]
          let demographic = item.spec
          if (item.race) {
              demographic = item.race
          } else if (item.class) {
              demographic = item.class
          }
          renderedItems.push(
            <Dropdown.Item variant="dark" onClick={() => thisObj.setState(item)}>{demographic.img}<p>{demographic.name}</p></Dropdown.Item>
          )
        } else {
          renderedItems.push(
            <Dropdown.Item variant="dark" onClick={() => thisObj.setState({rank: item})}>{item}</Dropdown.Item>
          )
        }
    })
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id={id}>
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {renderedItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}

function raceDropDown(thisObj) {
    let races = [Orc, Tauren, Troll, Undead]
    return makeDropdown(thisObj, "raceDropDown", thisObj.state.race, races)
}

function classDropDown(thisObj) {
    if (thisObj.state.race === Orc) {
        let classes = [Hunter, Rogue, Shaman, Warlock, Warrior]
        return (makeDropdown(thisObj, "classDropDown", thisObj.state.class, classes))
    } else if (thisObj.state.race === Tauren) {
        let classes = [Hunter, Druid, Shaman, Warrior]
        return (makeDropdown(thisObj, "classDropDown", thisObj.state.class, classes))
    } else if (thisObj.state.race === Troll) {
        let classes = [Hunter, Mage, Priest, Rogue, Shaman, Warrior]
        return (makeDropdown(thisObj, "classDropDown", thisObj.state.class, classes))
    } else if (thisObj.state.race === Undead) {
        let classes = [Mage, Priest, Rogue, Warlock, Warrior]
        return (makeDropdown(thisObj, "classDropDown", thisObj.state.class, classes))
    }
    return (makeDropdown(thisObj, "classDropDown", thisObj.state.class))
}

function specDropDown(thisObj) {
    if (thisObj.state.class === Druid) {
        let specs = [Balance, Bear, Feral, RestoDruid]
        return (makeDropdown(thisObj, "specDropDown", thisObj.state.spec, specs))
    } else if (thisObj.state.class === Priest) {
        let specs = [Priest, Shadow]
        return (makeDropdown(thisObj, "specDropDown", thisObj.state.spec, specs))
    } else if (thisObj.state.class === Shaman) {
        let specs = [Elemental, Enhancement, RestoShaman]
        return (makeDropdown(thisObj, "specDropDown", thisObj.state.spec, specs))
    } else if (thisObj.state.class === Warrior) {
        let specs = [Tank, Warrior]
        return (makeDropdown(thisObj, "specDropDown", thisObj.state.spec, specs))
    }
    return (makeDropdown(thisObj, "specDropDown", thisObj.state.spec))
}

function rankDropDown(thisObj) {
  let ranks = ['Zug Boi', 'Zug Grunt', 'Zug Thug', 'Core Zug', 'Zug Lord', 'Zug Supreme']
  return (makeDropdown(thisObj, "rankDropDown", thisObj.state.rank, ranks))
}

export {raceDropDown, classDropDown, specDropDown, rankDropDown}