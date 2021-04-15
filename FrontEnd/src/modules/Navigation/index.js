
let history
export const registerNav = (ref) => {
  history = ref.history
  console.log('history');
  console.log(history)
  console.log(ref)
}

const jumpTo = (uri) => {
  history.push(uri)
}

export default jumpTo
