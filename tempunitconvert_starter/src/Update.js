import * as R from 'ramda';


const MSGS = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_INPUT: 'LEFT_UNIT_INPUT',
  RIGHT_UNIT_INPUT: 'RIGHT_UNIT_INPUT'
}

const toInt = R.pipe(parseInt, R.defaultTo(0))

export function leftValueInputMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT,
    leftValue
  }
}

export function rightValueInputMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT,
    rightValue
  }
}

export function leftUnitInputMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_INPUT,
    leftUnit
  }
}

export function rightUnitInputMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_INPUT,
    rightUnit
  }
}

function update (msg, model) {
  switch (msg.type) {

    case MSGS.LEFT_VALUE_INPUT: {
      const { leftValue } = msg

      if(leftValue === '')
      return {
        ...model,
        sourceLeft: true,
        leftValue,
        rightValue: ''
      }

      const leftValueInt = toInt(leftValue)
      return convert({
        ...model,
        sourceLeft: true,
        leftValue: leftValueInt
      })
    }

    case MSGS.RIGHT_VALUE_INPUT: {
      const { rightValue } = msg

      if(rightValue === '')
      return {
        ...model,
        sourceLeft: false,
        rightValue,
        leftValue: ''
      }

      const rightValueInt = toInt(rightValue)
      return convert({
        ...model,
        sourceLeft: false,
        rightValue: rightValueInt
      })
    }

    case MSGS.LEFT_UNIT_INPUT: {
      const { leftUnit } = msg
      return convert({
        ...model,
        leftUnit
      })
    }

    case MSGS.RIGHT_UNIT_INPUT: {
      const { rightUnit } = msg
      return convert({
        ...model,
        rightUnit
      })
    }


  }
  return model;
}

function convert(model) {
  const { leftValue, leftUnit, rightValue, rightUnit } = model

  //if sourceLeft === true - then fromUnit = leftUnit and toUnit = rightUnit
  const [fromUnit, fromTemp, toUnit] =
  model.sourceLeft ?
  [leftUnit, leftValue, rightUnit] :
  [rightUnit, rightValue, leftUnit]

  //conversion for otherValue
  const otherValue = convertTemp(fromUnit, fromTemp, toUnit)

  //return model with other value in place?
  return model.sourceLeft ?
  { ...model, rightValue: otherValue } :
  {...model, leftValue: otherValue }
}

const CONVERSIONS = {
  Celcius: {
    Farenheit: function (temp) {
      return 9 / 5 * temp + 32
    },
    Kelvin: function (temp) {
      return temp + 273.15
    }
  },
  Farenheit: {
    Celcius: function (temp) {
      return 5 / 9 * temp - 32
    },
    Kelvin: function (temp) {
      return (temp - 32) * 5 / 9 + 273.15
    }
  },
  Kelvin: {
    Celcius: function (temp) {
      return temp - 273.15
    },
    Farenheit: function (temp) {
      return (temp - 273.15) * 9 / 5 + 32
    }
  }
}

function convertTemp(unitFrom, temp, unitTo) {
  const action = CONVERSIONS[unitFrom][unitTo]
  return action(temp)
}

export default update;
