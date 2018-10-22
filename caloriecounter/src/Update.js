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
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL'
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

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id
    //message payload
  }
}

export function editMealMsg(editId) {
  return {
    type: MSGS.EDIT_MEAL,
    editId
    //message payload
  }
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
      //is app in edit or add mode? - check editId
      const { editId } = model
      const updatedModel = editId !== null ?
        edit(msg, model) :
        add(msg, model)
      return updatedModel
    }

    case MSGS.DELETE_MEAL: {
      const { id } = msg
      const meals = R.filter(
        meal => meal.id !== id,
        //to remove a meal - have the predicate return a false value
        model.meals
      )
      //RETURNS A NEW ARRAY WITH SPECIFIC FILTERED OUT
      return {
        ...model,
        meals
        //OVERRIDES the meals property from the original model with the new filtered meals
      }
    }

    case MSGS.EDIT_MEAL: {
      const { editId } = msg
      //find the meal in the array that needs to be edited:
      const meal = R.find(
        meal => meal.id === editId,
        //R.find takes a predicate function - if true - that object is returned
        model.meals
      )

      const { description, calories } = meal

      return {
        ...model,
        editId,
        description,
        calories,
        showForm: true
      }
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

function edit(msg, model) {
  const { description, calories, editId } = model
  const meals = R.map(meal => {
    if (meal.id === editId) {
      return {
        ...meal,
        description,
        calories
      }
    }
    return meal
  }, model.meals)
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null
  }
}

export default update
//export default = can only be one
