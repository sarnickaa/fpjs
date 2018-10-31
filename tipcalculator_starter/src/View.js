import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import {
  billInputMsg,
  tipInputMsg,
  tipAmountMsg
} from './Update'
import initModel from './Model';

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

function totalRow(total) {
  
  return tr({
    className: 'bt b'
  },
  [
    cell(td, 'pa2 tl', 'Total Bill:'),
    cell(td, 'pa2 tr', `$${total}`)
  ])
}

function tipRow(tip) {

  return tr({
    className: 'bt b'
  },
  [
    cell(td, 'pa2 tl', 'Tip Amount:'),
    cell(td, 'pa2 tr', `$${tip}`)
  ])
}

function totalsTable (tip, total) {
  return table({
    className: 'w-100'
  }, [
    tipRow(tip),
    totalRow(total)
  ])
}

function convToNum (tipInput, billInput) {
  const tip = parseFloat(tipInput)
  const bill = parseFloat(billInput)
  return { tip, 
           bill
          }
}


function view(dispatch, model) {

  const { tipAmount, billAmount } = model

  //convert to numbers:
  
  const { tip, bill } = convToNum(tipAmount, billAmount)

  const tipTotal = +((tip / 100) * bill).toFixed(2)
  // https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary


  const billTotal = +(tipTotal + bill).toFixed(2)

  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    amountInput(dispatch,                   model.billAmount, 
      'Bill Amount',
      //update model directly on input event:
      //use provided dispatch function (provided through App.js) to update model
      e => dispatch(billInputMsg(e.target.value))
      ),
    amountInput(dispatch, 
      model.tipAmount,
      'Tip %',
      e => dispatch(tipInputMsg(e.target.value))
      ),
    totalsTable(tipTotal, billTotal),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
