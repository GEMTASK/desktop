import React, { useState } from "react";
import { Text, View } from "onyx-ui";

import { environment as originalEnvironment, parse } from "./kopi/compiler";
import type { BlockExpression } from "./kopi/ast-nodes";
import type { Environment } from "./kopi/shared";

let environment = originalEnvironment;

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

const Terminal = () => {
  const [history, setHistory] = useState<React.ReactElement[]>([]);

  const handleInputKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const currentTarget = event.currentTarget;

    if (event.key === "Enter") {
      event.preventDefault();

      const astRootNode = parse(event.currentTarget.value);

      for (const astNode of (astRootNode as BlockExpression).statements) {
        setHistory(history => [
          ...history,
          <React.Suspense key={history.length} fallback={<Text padding="8px 12px">...</Text>}>
            {(async () => (
              <Text padding="8px 12px">
                {(await astNode.evaluate(environment, updateBindings)).toString()}
              </Text>
            ))()}
          </React.Suspense>
        ]);
      }

      currentTarget.value = "";
    }
  };

  return (
    <View>
      <View padding="8px 0px">
        {history}
      </View>
      <textarea onKeyDown={handleInputKeyDown} />
    </View>
  );
};

export default Terminal;
