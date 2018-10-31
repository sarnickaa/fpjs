import * as R from 'ramda';
const MSGS = {
  BILL_VALUE_INPUT: 'BILL_VALUE_INPUT',
  TIP_VALUE_INPUT: 'TIP_VALUE_INPUT',
}

// const numberConvert =  R.pipe(parseFloat, R.defaultTo(0))

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

export function tipInputMsg (tipValue) {
  return {
    type: MSGS.TIP_VALUE_INPUT,
    tipValue
  }
}

// calculate tip and total amounts:



function update (msg, model) {
  // msg = the object returned from the inputMsg functions above
  switch (msg.type) {

    case MSGS.BILL_VALUE_INPUT: {
      const { billValue } = msg

      //convert input to number
      // const amount = numberConvert(billValue)

      return {
        ...model,
        billAmount: billValue
      }
    }

    case MSGS.TIP_VALUE_INPUT: {
      const { tipValue } = msg

      //convert input to number
      // const amount = numberConvert(tipValue)

      return {
        ...model,
        tipAmount: tipValue
      }
    }


    // case MSGS.TIP_AMOUNT_INPUT: {
    //   const { tipTotal } = msg

    //   //convert input to number
    //   const amount = numberConvert(tipTotal)

    //   return {
    //     ...model,
    //     tipTotal
    //   }
    // }


  }
  return model;
}

export default update;
