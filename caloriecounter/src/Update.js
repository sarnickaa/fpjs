// export const MSGS = {
//   SHOW_FORM: 'SHOW_FORM'
// }
//named export - will require different syntax for import i.e. will require {}

const MSGS = {
  SHOW_FORM: 'SHOW_FORM'
}

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm
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
  }
  return model
}

export default update
//export default = can only be one
