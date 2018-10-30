import * as R from 'ramda';
const MSGS = {
  BILL_VALUE_INPUT: 'BILL_VALUE_INPUT'
}

const numberConvert =  R.pipe(parseInt, R.defaultTo(0))
//functional composition using Ramda:
//numberConvert('string')
//string is piped to the JS parseInt() function
// resulting number is piped to R.defaultTo(0) example of partial application - defaltTo takes 2 args - (0) = first arg - returns second arg i.e. the number piped to it through the composition UNLESS it is NaN, undefined or null

export function billInputMsg (billValue) {
  return {
    type: MSGS.BILL_VALUE_INPUT,
    billValue
  }
}

function update (msg, model) {
  // msg = the object returned from the inputMsg functions above
  switch (msg.type) {

    case MSGS.BILL_VALUE_INPUT: {
      const { billValue } = msg

      const amount = numberConvert(billValue)

      return {
        ...model,
        billAmount: amount
      }
    }


  }
  return model;
}

export default update;
