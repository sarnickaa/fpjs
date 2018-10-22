import hh from 'hyperscript-helpers'
//hyperscript helper library = defualt export syntax
import {
  h
} from 'virtual-dom'
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg
} from './Update' //for named exports

//destructuring to unpack the pre function form hh library
//creates pre-tag for pre formatted text
const {
  pre,
  div,
  h1,
  button,
  label,
  input,
  form
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
      pre(JSON.stringify(model, null, 2))
      //turns JS object into a readable version of that value to display on screen
    ])
}

export default view
