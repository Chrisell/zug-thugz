import React from 'react';
import {
    Dropdown,
    DropdownButton,
    Nav
} from 'react-bootstrap'
import * as races from "../img/races"
import * as classes from "../img/classes"
import * as specs from "../img/specs"

function makeDropdown(thisObj, onClick, text) {
    return (
        <Dropdown.Item variant="dark" onClick={() => thisObj.setState(onClick)}>{text}</Dropdown.Item>
    )
}

function raceDropDown(thisObj) {
    return (
        <DropdownButton drop="right" size="lg" className="general" variant="dark" id="raceDropDown" title={thisObj.state.race}>
            {makeDropdown(thisObj, {race: races.Orc, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Orc)}
            {makeDropdown(thisObj, {race: races.Tauren, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Tauren)}
            {makeDropdown(thisObj, {race: races.Troll, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Troll)}
            {makeDropdown(thisObj, {race: races.Undead, class: thisObj.state.defaultString, spec: thisObj.state.defaultString}, races.Undead)}
        </DropdownButton>
    )
}

function classDropDown(thisObj) {
    if (thisObj.state.race === races.Orc) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.class}>
                {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                {makeDropdown(thisObj, {class: classes.Warlock, spec: classes.Warlock}, classes.Warlock)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
            </DropdownButton>
        )
    } else if (thisObj.state.race === races.Tauren) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.class}>
                {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                {makeDropdown(thisObj, {class: classes.Druid, spec: thisObj.state.defaultString}, classes.Druid)}
                {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
            </DropdownButton>
        )
    } else if (thisObj.state.race === races.Troll) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.class}>
                {makeDropdown(thisObj, {class: classes.Hunter, spec: classes.Hunter}, classes.Hunter)}
                {makeDropdown(thisObj, {class: classes.Mage, spec: classes.Mage}, classes.Mage)}
                {makeDropdown(thisObj, {class: classes.Priest, spec: thisObj.state.defaultString}, classes.Priest)}
                {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                {makeDropdown(thisObj, {class: classes.Shaman, spec: thisObj.state.defaultString}, classes.Shaman)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
            </DropdownButton>
        )
    } else if (thisObj.state.race === races.Undead) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.class}>
                {makeDropdown(thisObj, {class: classes.Mage, spec: classes.Mage}, classes.Mage)}
                {makeDropdown(thisObj, {class: classes.Priest, spec: thisObj.state.defaultString}, classes.Priest)}
                {makeDropdown(thisObj, {class: classes.Rogue, spec: classes.Rogue}, classes.Rogue)}
                {makeDropdown(thisObj, {class: classes.Warlock, spec: classes.Warlock}, classes.Warlock)}
                {makeDropdown(thisObj, {class: classes.Warrior, spec: thisObj.state.defaultString}, classes.Warrior)}
            </DropdownButton>
        )
    }
    return (
        <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.class}>
        </DropdownButton>
    )
}

function specDropDown(thisObj) {
    if (thisObj.state.class === classes.Druid) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.spec}>
                {makeDropdown(thisObj, {spec: specs.Balance}, specs.Balance)}
                {makeDropdown(thisObj, {spec: specs.Bear}, specs.Bear)}
                {makeDropdown(thisObj, {spec: specs.Feral}, specs.Feral)}
                {makeDropdown(thisObj, {spec: specs.RestoDruid}, specs.RestoDruid)}
            </DropdownButton>
        )
    } else if (thisObj.state.class === classes.Priest) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.spec}>
                {makeDropdown(thisObj, {spec: classes.Priest}, classes.Priest)}
                {makeDropdown(thisObj, {spec: specs.Shadow}, specs.Shadow)}
            </DropdownButton>
        )
    } else if (thisObj.state.class === classes.Shaman) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.spec}>
                {makeDropdown(thisObj, {spec: specs.Elemental}, specs.Elemental)}
                {makeDropdown(thisObj, {spec: specs.Enhancement}, specs.Enhancement)}
                {makeDropdown(thisObj, {spec: specs.RestoShaman}, specs.RestoShaman)}
            </DropdownButton>
        )
    } else if (thisObj.state.class === classes.Warrior) {
        return (
            <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.spec}>
                {makeDropdown(thisObj, {spec: specs.Tank}, specs.Tank)}
                {makeDropdown(thisObj, {spec: classes.Warrior}, classes.Warrior)}
            </DropdownButton>
        )
    }
    return (
        <DropdownButton drop="right" size="lg" className="general" variant="dark" id="classDropDown" title={thisObj.state.spec}>
        </DropdownButton>
    )
}

export {raceDropDown, classDropDown, specDropDown}