import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import {
  leftValueInputMsg,
  rightValueInputMsg,
  leftUnitInputMsg,
  rightUnitInputMsg
} from './Update'

const {
  div,
  h1,
  pre,
  select,
  option,
  input
} = hh(h);
// outer tag that contains option tags to create dropdown

//view functions:
// tempDropdown const
// tempinput const
// input sections
// form view

//dropdown:
const UNITS = ['Farenheit', 'Celcius', 'Kelvin']

//function to return array of option elements:
function unitOptions(selectedUnit) {
  return R.map(
    unit => option({value: unit, selected: selectedUnit === unit}, unit),
    //selected is true when the selectedUnit from the apps model = the current unit being mapped over
    UNITS
    //map function called on the UNITS array
  )
}

//form section
function unitSection(dispatch, unit, value, oninput, onchange) {
  return div({className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value,
      oninput
    }),
    select({
      className: 'db w-100 ps2 ba input-reset br1 bg-white ba b--black',
      onchange
    },
    unitOptions(unit) // returns an array of option elements generated from R.map function used on const UNITS
    )
  ])
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({
      className: 'flex'
    }, [
      unitSection(dispatch,
              model.leftUnit,
              model.leftValue,
              e => dispatch(leftValueInputMsg(e.target.value)),
              e => dispatch(leftUnitInputMsg(e.target.value))
            ),
      unitSection(dispatch,
              model.rightUnit,
              model.rightValue,
              e => dispatch(rightValueInputMsg(e.target.value)),
              e => dispatch(rightUnitInputMsg(e.target.value))
            )
    ]),
    pre(JSON.stringify(model, null, 2))
  ])
}

export default view
