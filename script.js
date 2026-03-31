const buttons = document.querySelectorAll('button')
const total = document.getElementById('result')
const expression = document.getElementById('expression')
let justCalculated = false
let operation = ""
let totalResult = ""
// console.log(display.innerHTML = 123)

buttons.forEach(btn => btn.addEventListener("click", () => {
  const value = btn.value

  if (value === "C") {
    // clear display
    total.innerHTML = ""
    expression.innerHTML = ""
    operation = ""
    // console.log('display cleaned')

  } else if (value === "=" && operation != "") {
    // calculate and generate the result    
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
      : String(operationArr[0])

    // console.log(totalResult)

    total.innerHTML = totalResult === Infinity || totalResult === -Infinity
      ? "Error"
      : totalResult
    
    expression.innerHTML = operation
    operation = String(operationArr[0])

  } else if (value === "+/-" && operation != "") {
    // console.log(typeof operation, operation)

    if (String(operation).startsWith("-") || String(totalResult).startsWith("-")) {
      // totalResult
      operation = String(operation).slice(1)

    } else {
      operation = Number(operation) * (-1)

    }

    total.innerHTML = operation

    // console.log(operation * (-1))

  } else if (value === "%" && operation != "") {
    // console.log(operation)
    const hasOperator = /[×÷+\-]/.test(operation)

    if (!hasOperator) {
      operation = String(Number(operation) / 100)
      total.innerHTML = operation
      expression.innerHTML = `${operation}%`
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