import { Button, Text, View } from "../../shared/components";
import type { Delegate } from "../../shared/types/Delegate";

const CalcButton = ({
  children,
  ...props
}: Delegate<object, typeof Button>) => {
  return (
    <Button solid style={{ minWidth: 50, minHeight: 40 }} {...props}>
      {children}
    </Button>
  );
};

function Calculator() {
  return (
    <View>
      <Text select border="bottom" fontSize="32px" padding="16px" align="middle right">
        16,777,216
      </Text>
      <View horizontal padding="8px" spacing="8px" fillColor="panel" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <CalcButton>C</CalcButton>
        <CalcButton>÷</CalcButton>
        <CalcButton>×</CalcButton>
        <CalcButton>−</CalcButton>
        <CalcButton bold>7</CalcButton>
        <CalcButton bold>8</CalcButton>
        <CalcButton bold>9</CalcButton>
        <CalcButton style={{ gridColumnStart: 4, gridRow: "2 / 4" }}>+</CalcButton>
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
