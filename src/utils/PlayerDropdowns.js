import React, {useState} from 'react';
import {
    Dropdown,
    DropdownButton,
    Nav,
    FormControl
} from 'react-bootstrap'
import * as races from "../img/races"
import * as classes from "../img/classes"
import * as specs from "../img/specs"

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
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

function makeDropdown(thisObj, onClick, text) {
    return (
        <Dropdown.Item variant="dark" onClick={() => thisObj.setState(onClick)}>{text}<p>{text.props.id}</p></Dropdown.Item>
    )
}

function raceDropDown(thisObj) {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="raceDropDown">
                {thisObj.state.race}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {race: races.Orc, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Orc)}
                {makeDropdown(thisObj, {race: races.Tauren, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Tauren)}
                {makeDropdown(thisObj, {race: races.Troll, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Troll)}
                {makeDropdown(thisObj, {race: races.Undead, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Undead)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

function classDropDown(thisObj) {
    if (thisObj.state.race === races.Orc) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="classDropDown">
                    {thisObj.state.class}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                    {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                    {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                    {makeDropdown(thisObj, {class: classes.Warlock, spec: classes.Warlock}, classes.Warlock)}
                    {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.race === races.Tauren) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="classDropDown">
                    {thisObj.state.class}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                {makeDropdown(thisObj, {class: classes.Druid, spec: thisObj.state.defaultString}, classes.Druid)}
                {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.race === races.Troll) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="classDropDown">
                    {thisObj.state.class}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                {makeDropdown(thisObj, {class: classes.Mage, spec: classes.Mage}, classes.Mage)}
                {makeDropdown(thisObj, {class: classes.Priest, spec: thisObj.state.defaultString}, classes.Priest)}
                {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.race === races.Undead) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="classDropDown">
                    {thisObj.state.class}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {class: classes.Mage, spec: classes.Mage}, classes.Mage)}
                {makeDropdown(thisObj, {class: classes.Priest, spec: thisObj.state.defaultString}, classes.Priest)}
                {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                {makeDropdown(thisObj, {class: classes.Warlock, spec: classes.Warlock}, classes.Warlock)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="classDropDown">
                {thisObj.state.class}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
            </Dropdown.Menu>
        </Dropdown>
    )
}

function specDropDown(thisObj) {
    if (thisObj.state.class === classes.Druid) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="specDropDown">
                    {thisObj.state.spec}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {spec: specs.Balance}, specs.Balance)}
                {makeDropdown(thisObj, {spec: specs.Bear}, specs.Bear)}
                {makeDropdown(thisObj, {spec: specs.Feral}, specs.Feral)}
                {makeDropdown(thisObj, {spec: specs.RestoDruid}, specs.RestoDruid)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.class === classes.Priest) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="specDropDown">
                    {thisObj.state.spec}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {spec: classes.Priest}, classes.Priest)}
                {makeDropdown(thisObj, {spec: specs.Shadow}, specs.Shadow)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.class === classes.Shaman) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="specDropDown">
                    {thisObj.state.spec}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {spec: specs.Elemental}, specs.Elemental)}
                {makeDropdown(thisObj, {spec: specs.Enhancement}, specs.Enhancement)}
                {makeDropdown(thisObj, {spec: specs.RestoShaman}, specs.RestoShaman)}
                </Dropdown.Menu>
            </Dropdown>
        )
    } else if (thisObj.state.class === classes.Warrior) {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="specDropDown">
                    {thisObj.state.spec}
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                {makeDropdown(thisObj, {spec: specs.Tank}, specs.Tank)}
                {makeDropdown(thisObj, {spec: classes.Warrior}, classes.Warrior)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="specDropDown">
                {thisObj.state.spec}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export {raceDropDown, classDropDown, specDropDown}