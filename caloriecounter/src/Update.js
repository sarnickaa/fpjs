// export const MSGS = {
//   SHOW_FORM: 'SHOW_FORM'
// }
//named export - will require different syntax for import i.e. will require {}
import * as R from 'ramda'
//import every func.tion from the ramda library under the alias of R
//call functions using R.'func_name'
const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL'
}

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm
  }
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description
    //message payload
  }
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories
    //message payload
  }
}

export const  saveMealMsg = {
  type: MSGS.SAVE_MEAL
}

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg
      return { ...model,
              showForm,
              description: '',
              calories: 0
            }
    }

    case MSGS.MEAL_INPUT: {
      const { description } = msg
      return { ...model,
              description
            }
    }

    case MSGS.CALORIES_INPUT: {
      // const { calories } = msg
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
        //in the case of NaN being returned from parseInt - default value of 0 will return
      )(msg.calories)
      //pipe returns a composed function from the paramaters given
      //this function is called immediatley using msg.calories as its argument
      return { ...model,
              calories
            }
    }

    case MSGS.SAVE_MEAL: {
      return add(msg, model)
    }
  }
  return model
}

function add(msg, model) {
  const { nextId, description, calories } = model
  const meal = {
    id: nextId,
    description,
    calories
  }
  const meals = [...model.meals, meal]
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false
  }
}

export default update
//export default = can only be one
