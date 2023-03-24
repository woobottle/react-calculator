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
    const { firstOperand, operator, secondOperand, result } =
      expressionComponents;

    // W.T : validate 처리를 분리했으면 좋겠다.
    if (firstOperand === null) {
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요.");
    } else {
      if (el.innerText === "=") {
        if (operator !== null && secondOperand === null) {
          alert("두 번째 피연산자를 입력해주세요.");
        } else {
          calculateExpression();
        }
      } else {
        const isCalculated = result !== null;
        if (isCalculated) {
          setExpressionComponents();
        }
        expressionComponents.operator = el.innerText;
      }
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

    // W.T : Hook 처리해서 구현하고 싶다. (https://www.rinae.dev/posts/getting-closure-on-react-hooks-summary)
    const isCalculated = result !== null;

    // W.T : 중복된 코드가 넘 많다. 어떻게 줄일 수 있을까.
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
      default:
        calculatedData = firstOperand;
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
