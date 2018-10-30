import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import {
  billInputMsg
} from './Update'

const {
  div,
  h1,
  pre,
  input,
  label,
  td,
  tr,
  table
} = hh(h);


//VIEW FUNCTIONS:
// - text input for bill/tip%
// - results rows for tipAmount/Total (table)

// text input function
function amountInput(dispatch, value, title, oninput) {
 return div({ className: 'w-50 ma1' }, [
   label({
     className: 'db mb1'
   },
   title
   ),
   input({
     type: 'text',
     className: 'db w-100 mv2 pa2 input-reset ba',
     value,
     oninput
   })
 ])
}

// totals table functions:
function cell(tag, className, value) {
  return tag({className}, value)
}

function totalRow() {
  const total = 'this is the total bill'

  return tr({
    className: 'bt b'
  },
  [
    cell(td, 'pa2 tl', 'Total Bill:'),
    cell(td, 'pa2 tr', total)
  ])
}

function tipRow() {
  const tip = 'this is a tip'

  return tr({
    className: 'bt b'
  },
  [
    cell(td, 'pa2 tl', 'Tip Amount:'),
    cell(td, 'pa2 tr', tip)
  ])
}

function totalsTable () {
  return table({
    className: 'w-100'
  }, [
    tipRow(),
    totalRow()
  ])
}


function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    amountInput(dispatch, model.billAmount, 
      'Bill Amount',
      //update model directly on input event:
      //use provided dispatch function (provided through App.js) to update model
      e => dispatch(billInputMsg(e.target.value))
      ),
    amountInput(dispatch, model.tipAmount, 'Tip %'),
    totalsTable(),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
