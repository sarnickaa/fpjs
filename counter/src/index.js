//to start server - npm 'command from package.json: scripts'
//npm start will run webpack-dev-server --open (--open open default browser)

import h from 'hyperscript'
import hh from 'hyperscript-helpers'

const {
  div,
  button
} = hh(h)
//hyperscript-helpers depends on hyperscript to run

const initModel = 0

//view functions:
// RETURNS THE html and CSS to be shown based on the current statue of the app
//model = the number that will change
// pure functions MUST have an input paramater and return a value based on that param
function view(dispatch, model) {
  //view function takes dispatch function as a param to update Counter
  //dispatch is defined within the app function
  //because view is called from within app function - it will have access to whatever is defined within app() scope i.e. dispatch()
  // return div({ className: ''}, []) 1st param object literal for CSS classes (not mandatory), next param = tags or array of tags to create
  return div([
    div({
      className: 'mv2'
    }, `Count: ${model}`),
    button({ className: 'pv1 ph2 mr2',
      // onclick: dispatch() - would not work as dispatch() is scoped within app function
      // fixed by passing dispatch as first param to VIEW function
      // makes use of currying
      onclick: () => dispatch('plus') }, '+'),
    button({ className: 'pv1 ph2',
      onclick: dispatch.bind(null, 'minus') }, '-')
  ])
}
//onclick = an event listener on the DOM - with an event handler function passed to handle the event

//updating function to increase/decrease number
// msg = an indicaton of whether + or - was pressed i.e. a string
function update(msg, model) {
  switch (msg) {
    case 'plus':
      return model + 1;
    case 'minus':
      return model - 1;
    default:
      return model;
  }
}

//impure code:
function app(initModel, update, view, node) {
  let model = initModel // holds state of the app - allows reassignment of value
  let currentView = view(dispatch, model) // initail view set with initModel - yet can be reassigned
  //causes side efefct of showing initial page load view
  node.appendChild(currentView)

//handles the update sequence:
  function dispatch(msg) {
    model = update(msg, model)
    // reassigns model value to updated value
    const updatedView = view(dispatch, model)
    // creates updatedView with updated model value
    node.replaceChild(updatedView, currentView)
    // re-renders the view
    currentView = updatedView
  }
}

//rendering the view function into root HTML node
const rootNode = document.getElementById('app')

app(initModel, update, view, rootNode)

// rootNode.appendChild(view(update('-', initModel)))
