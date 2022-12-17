//get all button
const allButtons = document.querySelectorAll('button');

//get number
const displayNum = document.querySelector('.num');

//add 'click' event listener to all button
allButtons.forEach(button => button.addEventListener('click', doSomething));

//current number
let currentNum = [];

//curret operator
let currentOperator = "";

//result of computation
let res = 0;

let fullDisplay = false;

function doSomething() {
    //check if number or operator
    let button = this.textContent;
    if (isSameOperator(button) && isOperator(button) && currentOperator && !fullDisplay) {
        return
    }

    if (isDifferentOperator(button) && isOperator(button) && currentOperator && !fullDisplay) {
        //set current operator to new operator
        currentOperator = button;
        displayNum.textContent = `${currentNum[0]} ${currentOperator} `
    } else if (isOperator(button)) {
        computeOperator(button);
    } else if (button === '=') {
        equalOperation();
    } else if (button === 'Clear') {
        clearDisplay();
    } else if (button === 'CE') {
        //displayNum.textContent = displayNum.textContent.slice(0, displayNum.textContent.length - 1)
    }else { //if it is a number
        displayNumber(button)
    }

}

function equalHelper(res){
    displayNum.textContent = `${res}`
    currentOperator = '';
    currentNum = [];
}

function equalOperation() {
    let [num1, num2] = displayNum.textContent.split(` ${currentOperator} `)
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    switch (currentOperator) {
        case "+":
            res = add(num1, num2);
            equalHelper(res);
            break;
        case '-':
            res = subtract(num1, num2);
            equalHelper(res);
            break;
        case "x":
            res = multiply([num1, num2]); 
            equalHelper(res);
            break;
        case '/':
            res = divide(num1, num2); 
            equalHelper(res);
            break;
    }
}


function isDifferentOperator(button) {
    let current = displayNum.textContent.split(' ')[1];
    return current !== button;
}

function isSameOperator(button) {
    let current = displayNum.textContent.split(' ')[1];
    return current === button;
}

function isOperator(button){
    let operators = ['-', '+', '/', 'x']
    return (operators.includes(button)) 
}

/**
 * Clear the display, set currentNum array to empty,
 * set currentOperator to empty.
 */
function clearDisplay() {
    displayNum.textContent = 0
    currentNum = [];
    currentOperator = "";
}

function displayNumber(button) {
    if (displayNum.textContent === '0') {
        displayNum.textContent = `${button}`
    } else {
    displayNum.textContent += `${button}`
    fullDisplay = isFullDisplay();
    }
}

function isFullDisplay() {
    let array = displayNum.textContent.split(' ');
    return array.length === 3
}

function computeOperator(operator) {
    //if array is empty
    if (currentNum.length == 0) {
        currentOperator = operator;
        currentNum.push(displayNum.textContent.split(` ${currentOperator} `)[0])
        displayNum.textContent += ` ${currentOperator} `
    } else {
        doCalculation(operator)
    }
}

function doCalculation(operator) {
    let [num1, num2] = displayNum.textContent.split(` ${currentOperator} `)
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    switch (currentOperator) {
        case "+":
            res = add(num1, num2);
            operatorHelper(res, operator);
            break;
        case '-':
            res = subtract(num1, num2);
            operatorHelper(res, operator);
            break;
        case "x":
            res = multiply([num1, num2]); 
            operatorHelper(res, operator);
            break;
        case '/':
            res = divide(num1, num2); 
            operatorHelper(res, operator);
            break;
    }
}


/**
 * This function takes in a result and operator. The result and operator
 * will be added to the display html. The current operator will be set 
 * the operate that was recently pressed.
 * @param {*} res result of computation
 * @param {*} operator new operator
 */

function operatorHelper(res, operator) {
    currentOperator = operator
    displayNum.textContent = `${res} ${currentOperator} `
    currentNum[0] = res
}

const add = function(a, b) {
	return (a) + (b);
};

const subtract = function(a, b) {
	return (a) - (b);
};

const sum = function(nums) {
	return nums.reduce((total, num) => total += num, 0)
};

const multiply = function(nums) {
  return nums.reduce((total, num) => total *= num,1)
};

const power = function(a, b) {
	return a**b
};

const factorial = function(num) {
	if (num === 1 || num === 0) {
    return 1
  }
  return num * factorial(num-1)
};

const divide = function(num1, num2) {
    return Math.round(num1 / num2) / 100;
}
