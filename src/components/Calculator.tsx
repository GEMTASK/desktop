import { Button, Text, View } from "../shared/components";
import type { Delegate } from "../shared/types/Delegate";

const CalcButton = ({ children, ...props }: Delegate<{}, typeof Button>) => {
  return (
    <Button style={{ minWidth: 50, minHeight: 40 }} {...props}>
      {children}
    </Button>
  );
};

function Calculator() {
  return (
    <View>
      <Text border="bottom" fontSize="32px" padding="16px" align="middle right">
        16,777,216
      </Text>
      <View horizontal padding="8px" spacing="8px" fillColor="gray-0" style={{ display: 'grid', gridTemplateColumns: "repeat(4, 1fr)" }}>
        <CalcButton>C</CalcButton>
        <CalcButton>÷</CalcButton>
        <CalcButton>×</CalcButton>
        <CalcButton>−</CalcButton>
        <CalcButton>7</CalcButton>
        <CalcButton>8</CalcButton>
        <CalcButton>9</CalcButton>
        <CalcButton style={{ gridColumnStart: 4, gridRow: "2 / 4" }}>+</CalcButton>
        <CalcButton>4</CalcButton>
        <CalcButton>5</CalcButton>
        <CalcButton>6</CalcButton>
        <CalcButton>1</CalcButton>
        <CalcButton>2</CalcButton>
        <CalcButton>3</CalcButton>
        <CalcButton style={{ gridColumnStart: 4, gridRow: "4 / 6" }}>=</CalcButton>
        <CalcButton style={{ gridColumn: "1 / 3" }}>0</CalcButton>
        <CalcButton>.</CalcButton>
      </View>
    </View>
  );
}

export default Calculator;
