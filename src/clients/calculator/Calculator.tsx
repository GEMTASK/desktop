/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import { Button, Text, View } from "onyx-ui";

import type { Delegate } from "onyx-ui";
import { useLayoutEffect, useState } from "react";

const CalcButton = <TValue extends unknown>({
  value,
  children,
  onClick,
  ...props
}: Delegate<{
  value?: TValue,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, value?: TValue) => void
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

function Calculator() {
  const [display, setDisplay] = useState("");
  const [value, setValue] = useState(0);

  const handleButtonClick = (evant: any, value?: number) => {
    console.log(value);
    setDisplay(input => input + value);
  };

  const buttonProps = {
    onClick: handleButtonClick
  };

  return (
    <View flex>
      <Text select border="bottom" fontSize="32px" padding="16px" align="middle right">
        {display.toLocaleString()}
      </Text>
      <View flex horizontal padding="8px" spacing="8px" fillColor="panel" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <CalcButton value={() => setValue(0)}>C</CalcButton>
        <CalcButton>÷</CalcButton>
        <CalcButton>×</CalcButton>
        <CalcButton>−</CalcButton>
        <CalcButton bold value={7} {...buttonProps}>7</CalcButton>
        <CalcButton bold value={8} {...buttonProps}>8</CalcButton>
        <CalcButton bold value={9} {...buttonProps}>9</CalcButton>
        <CalcButton style={{ gridColumnStart: 4, gridRow: "2 / 4" }} onClick={() => setValue(Number(display))}>+</CalcButton>
        <CalcButton bold>4</CalcButton>
        <CalcButton bold>5</CalcButton>
        <CalcButton bold>6</CalcButton>
        <CalcButton bold>1</CalcButton>
        <CalcButton bold>2</CalcButton>
        <CalcButton bold>3</CalcButton>
        <CalcButton style={{ gridColumnStart: 4, gridRow: "4 / 6" }}>=</CalcButton>
        <CalcButton bold style={{ gridColumn: "1 / 3" }}>0</CalcButton>
        <CalcButton bold>.</CalcButton>
      </View>
    </View>
  );
}

export default Calculator;
