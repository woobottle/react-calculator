if (typeof window === "object") {
  const expressionComponents = {
    firstOperand: null,
    operator: null,
    secondOperand: null,
    result: null,
  };

  const digitElements = document.getElementsByClassName("digit");
  const modifierElements = document.getElementsByClassName("modifier");
  const operationElements = document.getElementsByClassName("operation");
  const totalElement = document.getElementById("total");

  for (var i = 0; i < digitElements.length; i++) {
    digitElements[i].addEventListener("click", (e) => {
      clickDigitButton(e.target);
    });
  }

  for (var i = 0; i < operationElements.length; i++) {
    operationElements[i].addEventListener("click", (e) => {
      clickOperationButton(e.target);
    });
  }

  for (var i = 0; i < modifierElements.length; i++) {
    modifierElements[i].addEventListener("click", (e) => {
      resetComponents();
      showTotalScore(null);
    });
  }

  const clickDigitButton = (el) => {
    const elValue = +el.innerText;
    const isCalculated = expressionComponents.result !== null;
    const isClickedOperator = expressionComponents.operator !== null;

    if (isCalculated && isClickedOperator) {
      resetComponents();
    }

    const targetOperand =
      !isCalculated && isClickedOperator ? "secondOperand" : "firstOperand";

    if (expressionComponents[targetOperand] > 100) {
      alert("숫자는 세자리까지만 입력 가능합니다!");
    } else {
      expressionComponents[targetOperand] =
        expressionComponents[targetOperand] * 10 + elValue;
      showTotalScore(expressionComponents[targetOperand]);
    }
  };

  const clickOperationButton = (el) => {
    if (el.innerText === "=") {
      calculateExpression();
    } else {
      const isCalculated = expressionComponents.result !== null;
      if (isCalculated) {
        setExpressionComponents();
      }
      expressionComponents.operator = el.innerText;
    }
  };

  const setExpressionComponents = () => {
    expressionComponents.firstOperand = +totalElement.innerText;
    expressionComponents.secondOperand = null;
    expressionComponents.result = null;
  };

  const resetComponents = () => {
    expressionComponents.operator = null;
    expressionComponents.firstOperand = null;
    expressionComponents.secondOperand = null;
    expressionComponents.result = null;
  };

  const calculateExpression = () => {
    let calculatedData;
    const { firstOperand, operator, secondOperand, result } =
      expressionComponents;
    const isCalculated = result !== null;

    switch (operator) {
      case "+":
        calculatedData = (isCalculated ? result : firstOperand) + secondOperand;
        break;
      case "-":
        calculatedData = (isCalculated ? result : firstOperand) - secondOperand;
        break;
      case "X":
        calculatedData = (isCalculated ? result : firstOperand) * secondOperand;
        break;
      case "/":
        calculatedData = Math.trunc(
          (isCalculated ? result : firstOperand) / secondOperand
        );
        break;
    }
    expressionComponents.result = calculatedData;
    showTotalScore(calculatedData);
  };

  const showTotalScore = (target) => {
    totalElement.innerText = [-Infinity, Infinity].includes(target)
      ? "오류"
      : target === null
      ? 0
      : target;
  };
}
