import React, { useState } from "react";
import { type Delegate, Icon, Text, View } from "onyx-ui";
import { ChevronRightIcon } from "lucide-react";

import { environment as originalEnvironment, parse } from "./kopi/compiler";
import type { BlockExpression } from "./kopi/ast-nodes";
import type { Environment } from "./kopi/shared";

let environment = originalEnvironment;

const Input = ({
  lines,
  style,
  changeOnEnter,
  onValueChange,
  ...props
}: Delegate<{
  lines?: number,
  changeOnEnter?: boolean,
  onValueChange: (value: string) => void
}, typeof View<"div">>) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const currentTarget = event.currentTarget;

    if (changeOnEnter && event.key === "Enter") {
      event.preventDefault();

      onValueChange?.(event.currentTarget.value);

      currentTarget.value = "";
    }
  };

  return (
    <View horizontal align="middle left" padding="0px 8px" style={{ ...style, minHeight: 28 }} {...props}>
      <Icon icon={ChevronRightIcon} size={20} style={{ marginLeft: -6, marginBottom: -1 }} />
      <textarea onKeyDown={handleKeyDown} style={{ padding: 0, margin: 0, fontFamily: "Open Sans", fontSize: 14, height: 20, lineHeight: "20px", border: "none", outline: "none", width: "100%", resize: "none", marginTop: -1, color: "var(--text-color)" }} />
    </View>
  );
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

//

const Terminal = () => {
  const [history, setHistory] = useState<React.ReactElement[]>([]);

  const handleInputValueChange = (value: string) => {
    const astRootNode = parse(value);

    for (const astNode of (astRootNode as BlockExpression).statements) {
      setHistory(history => [
        ...history,
        <React.Suspense key={history.length} fallback={<Text padding="8px 12px">...</Text>}>
          {(async () => (
            <>
              <View horizontal padding="0px 8px" align="middle left">
                <Icon icon={ChevronRightIcon} size={20} style={{ marginLeft: -6, marginBottom: -1 }} />
                <Text padding="4px 0px">
                  {value}
                </Text>
              </View>
              <Text padding="4px 8px">
                {(await astNode.evaluate(environment, updateBindings)).toString()}
              </Text>
            </>
          ))()}
        </React.Suspense>
      ]);
    }
  };

  return (
    <View style={{ overflowY: "auto" }}>
      <View padding="8px 0px" style={{ paddingBottom: 0 }}>
        {history}
      </View>
      <Input changeOnEnter style={{ marginTop: -4 }} onValueChange={handleInputValueChange} />
    </View>
  );
};

export default Terminal;
