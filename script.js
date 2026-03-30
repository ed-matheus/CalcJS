const buttons = document.querySelectorAll('button')
const total = document.getElementById('result')
const expression = document.getElementById('expression')
let justCalculated = false
let operation = ""
// console.log(display.innerHTML = 123)

buttons.forEach(btn => btn.addEventListener("click", () => {
  const value = btn.value

  if (value === "C") {
    // clear display
    total.innerHTML = ""
    expression.innerHTML = ""
    operation = ""
    // console.log('display cleaned')

  } else if (value === "=") {
    // calculate and generate the result    
    if (operation != "") {
      // const result = eval(
      //   operation
      //     .replace(/×/g, "*")
      //     .replace(/÷/g, "/")
      // )

      // converting operation from string to array
      let operationArr = operation.split(/([+\-×÷])/) 
      
      let opIndex;
      let firstResult;
      let result;

      // while "×" or "÷" exists...
      while (operationArr.includes("×") || operationArr.includes("÷")) {
        // operator index
        opIndex = operationArr.findIndex(item => item === "×" || item === "÷") 

        // multiplication or division
        if (operationArr[opIndex] === "×") {
          firstResult = operationArr[opIndex - 1] * operationArr[opIndex + 1]

        } else {
          firstResult = operationArr[opIndex - 1] / operationArr[opIndex + 1]
        }
        
        // removing and replacing numbers
        operationArr.splice(opIndex - 1, 3, firstResult) 
        // console.log(operationArr)
      }

      // while "+" or "-" exists...
      while (operationArr.includes("+") || operationArr.includes("-")) {
        // finding operator index to calc the last operation part
        opIndex = operationArr.findIndex(item => item === "+" || item === "-" || item === "÷" || item === "×")
        // console.log(operationArr[opIndex])
  
        if (operationArr[opIndex] === "+") {
          result = Number(operationArr[opIndex - 1]) + Number(operationArr[opIndex + 1])
  
        } else if (operationArr[opIndex] === "-") {
          result = Number(operationArr[opIndex - 1]) - Number(operationArr[opIndex + 1])
  
        } else if (operationArr[opIndex] === "÷") {
          result = Number(operationArr[opIndex - 1]) / Number(operationArr[opIndex + 1])
          
        } else {
          result = Number(operationArr[opIndex - 1]) * Number(operationArr[opIndex + 1])
        }

        operationArr.splice(opIndex - 1, 3, result) 
      }

      justCalculated = true

      const totalResult = Number.isInteger(operationArr[0]) === false
        ? Number(operationArr[0].toPrecision(9))
        : operationArr[0]

      // console.log(totalResult)

      total.innerHTML = total === Infinity || total === -Infinity
        ? "Error"
        : totalResult
      
      expression.innerHTML = operation
    }

  } else {

    if (justCalculated === true) {
      operation = ""
      expression.innerHTML = ""
      justCalculated = false
    }

    // display the numbers and operators
    operation += value
    total.innerHTML = operation

  }
}))