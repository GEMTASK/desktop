/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import { useState } from "react";

import { Button, Text, View } from "onyx-ui";

import type { Delegate } from "onyx-ui";

const CalcButton = <TValue extends unknown>({
  value,
  children,
  onClick,
  ...props
}: Delegate<{
  value?: TValue,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, value?: TValue) => void,
}, typeof Button, "value">) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event, value);
  };

  return (
    <Button solid style={{ minWidth: 40, minHeight: 32 }} {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

const Operator = {
  Noop: (a: number, b: number) => b,
  Add: (a: number, b: number) => a + b,
  Sub: (a: number, b: number) => a - b,
};

function Calculator() {
  const [display, setDisplay] = useState(0);
  const [value, setValue] = useState(0);
  const [operator, setOperator] = useState(() => Operator.Add);
  const [reset, setReset] = useState(false);

  const handleClearButtonClick = () => {
    setOperator(() => Operator.Noop);

    setDisplay(0);
    setValue(0);

    setReset(true);
  };

  const handleDigitButtonClick = (evant: React.MouseEvent, value?: number) => {
    if (!value) {
      return;
    }

    if (reset) {
      setDisplay(0);
      setReset(false);
    }

    setDisplay(display => display * 10 + Number(value));
  };

  const handleOperatorButtonClick = (event: React.MouseEvent, _operator?: typeof Operator[keyof typeof Operator]) => {
    if (!_operator) {
      return;
    }

    if (!reset) {
      const result = operator(value, display);

      setValue(result);
      setDisplay(result);
    } else {
      setValue(display);
    }

    setOperator(() => _operator);

    setReset(true);
  };

  const handleEqualButtonClick = () => {
    if (!reset) {
      const result = operator(value, display);

      setValue(0);
      setDisplay(result);

      setReset(true);
    }
  };

  const buttonProps = {
    onClick: handleDigitButtonClick,
  };

  return (
    <View flex>
      <Text select border="bottom" fontSize="32px" padding="16px" align="middle right">
        {display.toLocaleString()}
      </Text>
      <View flex horizontal padding="8px" spacing="8px" fillColor="panel" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <CalcButton onClick={handleClearButtonClick}>C</CalcButton>
        <CalcButton>÷</CalcButton>
        <CalcButton>×</CalcButton>
        <CalcButton value={Operator.Sub} onClick={handleOperatorButtonClick}>−</CalcButton>
        <CalcButton bold value={7} {...buttonProps}>7</CalcButton>
        <CalcButton bold value={8} {...buttonProps}>8</CalcButton>
        <CalcButton bold value={9} {...buttonProps}>9</CalcButton>
        <CalcButton value={Operator.Add} style={{ gridColumnStart: 4, gridRow: "2 / 4" }} onClick={handleOperatorButtonClick}>+</CalcButton>
        <CalcButton bold value={4} {...buttonProps}>4</CalcButton>
        <CalcButton bold value={5} {...buttonProps}>5</CalcButton>
        <CalcButton bold value={6} {...buttonProps}>6</CalcButton>
        <CalcButton bold value={1} {...buttonProps}>1</CalcButton>
        <CalcButton bold value={2} {...buttonProps}>2</CalcButton>
        <CalcButton bold value={3} {...buttonProps}>3</CalcButton>
        <CalcButton onClick={handleEqualButtonClick} style={{ gridColumnStart: 4, gridRow: "4 / 6" }}>=</CalcButton>
        <CalcButton bold value={0} {...buttonProps} style={{ gridColumn: "1 / 3" }}>0</CalcButton>
        <CalcButton bold>.</CalcButton>
      </View>
    </View>
  );
}

export default Calculator;
