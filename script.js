const buttons = document.querySelectorAll('button')
const display = document.getElementById('result')
let operation = ""
// console.log(display.innerHTML = 123)

buttons.forEach(btn => btn.addEventListener("click", () => {
  const value = btn.value

  if (value === "C") {
    // clear display
    display.innerHTML = ""
    console.log('display cleaned')

  } else if (value === "=") {
    // calculate and generate the result


  } else {
    // display the numbers and operators
    operation += value
    display.innerHTML = operation
    console.log(operation)

  }
}))