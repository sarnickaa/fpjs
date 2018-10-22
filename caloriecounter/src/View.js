import hh from 'hyperscript-helpers'
//hyperscript helper library = defualt export syntax
import {
  h
} from 'virtual-dom'
import * as R from 'ramda'
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg,
  deleteMealMsg,
  editMealMsg
} from './Update' //for named exports
// import { initModel } from './Model'

//destructuring to unpack the pre function form hh library
//creates pre-tag for pre formatted text
const {
  pre,
  div,
  h1,
  button,
  label,
  input,
  form,
  tr,
  td,
  th,
  tbody,
  thead,
  table,
  i
} = hh(h)

function buttonSet(dispatch) {
  return div([
    button({
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit'
      },
      'Save'),
    button({
        className: 'f3 pv2 ph3 bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(showFormMsg(false))
      },
      'Cancel')
  ])
}

function fieldSet(labelText, inputValue, oninput) {
  //inputValue = the value to show in the text fieldSet
  return div([
    label({
        className: 'db mb1'
      },
      labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    })
  ])
}

function formView(dispatch, model) {
  const {
    description,
    calories,
    showForm
  } = model

  if (showForm) {
    return form({
      className: 'w-100 mv2',
      onsubmit: e => {
        e.preventDefault()
        dispatch(saveMealMsg)
      }
    }, [
      fieldSet('Meal',
        description,
        e => dispatch(mealInputMsg(e.target.value))
    ),
      fieldSet('Calories',
      calories || '',
      //if calories value is truthy i.e. 0 is falsey - will show empty string if falsey
      e => dispatch(caloriesInputMsg(e.target.value))
      ),
      buttonSet(dispatch)
    ])
  } else {
    return button({
        className: 'f3 pv2 ph3 bg-blue white bn',
        onclick: () => dispatch(showFormMsg(true))
      },
      'Add Meal')
  }
}


// =============VIEW FUNCTIONS=============

function cell(tag, className, value) {
  return tag({className}, value)
}

const headerRow = tr([
  cell(th, 'pa2 tl', 'Meal'),
  cell(th, 'pa2 tr', 'Calorie'),
  cell(th, 'pa2 tr', 'Other')
])

const tableHeader = thead(headerRow)

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, 'pa2', meal.description),
    cell(td, 'pa2 tr', meal.calories),
    cell(td, 'pa2 tr', [
      //font awesome icons
      i({
        className: 'ph1 fa fa-trash-o pointer',
        onclick: () => dispatch(deleteMealMsg(meal.id))
      }),
      i({
        className: 'ph1 fa fa-pencil-square-o pointer',
        onclick: () => dispatch(editMealMsg(meal.id))
      })
    ])
  ])
}

function totalRow(meals) {
  const total = R.pipe(
    R.map(meal => meal.calories),
    //transforms array of meal objects into array of numbers only (the calorie values)
    R.sum
    //sums up totals
  )(meals)
  return tr({ className: 'bt b' }, [
    cell(td, 'pa2 tr', 'Total:'),
    cell(td, 'pa2 tr', total),
    cell(td, '', '')
  ])
}

function mealsBody(dispatch, className, meals) {
  const rows = R.map(
    //transforms array of meals - into array of html rows
    R.partial(mealRow, [dispatch, 'stripe-dark']),
    //partially applying dispatch function and the css class to use
    meals);

  const rowsWithTotal = [...rows, totalRow(meals)]
  return tbody({ className }, rowsWithTotal);
}

function mealsTable(meals){
  return table({ className: 'mw5 center w-100 collapse' },
              [
                tableHeader,
                mealsBody('', meals)
              ])
            }

function tableView(dispatch, meals) {
  if(meals.length === 0) {
    return div({ className: 'mv2 i black-50' }, 'No meals to display')
  }
  return table({ className: 'mv2 w-100 collapse' }, [
    tableHeader,
    mealsBody(dispatch, '', meals)
  ])
}

function view(dispatch, model) {
  return div({
      className: 'mw6 center'
    },
    //array to contain div's children:
    [
      h1({
          className: 'f2 pv2 bb'
        },
        'Calorie Counter'
      ),
      formView(dispatch, model),
      tableView(dispatch, model.meals),
      pre(JSON.stringify(model, null, 2))
      //turns JS object into a readable version of that value to display on screen
    ])
}

export default view
