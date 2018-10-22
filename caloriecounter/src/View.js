import hh from 'hyperscript-helpers'
//hyperscript helper library
import { h } from 'virtual-dom'

//destructuring to unpack the pre function form hh library
//creates pre-tag for pre formatted text
const { pre } = hh(h)

function view(dispatch, model) {
  return pre(JSON.stringify(model, null, 2))
  //turns JS object into a readable version of that value to display on screen
}

export default view
