import React, { useState } from "react";
import { type Delegate, Icon, Text, View } from "onyx-ui";
import { ChevronRightIcon, LoaderCircleIcon } from "lucide-react";

import Clock from "../clock";

import { type Environment } from "./kopi/shared";
import { environment as originalEnvironment, parse } from "./kopi/compiler";
import type { BlockExpression } from "./kopi/ast-nodes";

import styles from "./Terminal.module.scss";

let environment = {
  ...originalEnvironment,
  clock: {
    async inspect() { return <Clock style={{ width: 300, height: 300 }} />; },
  },
};

const Input = ({
  value,
  lines,
  icon,
  changeOnEnter,
  onValueChange,
  ...props
}: Delegate<{
  value?: string,
  lines?: number,
  icon?: React.ComponentProps<typeof Icon>["icon"];
  changeOnEnter?: boolean,
  onValueChange?: (value: string) => void
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
    <View horizontal align="middle left" padding="0px 8px" className={styles.Input} {...props}>
      {icon && (
        <Icon icon={icon} size={20} style={{ marginLeft: -6, xmarginBottom: -1 }} />
      )}
      <textarea defaultValue={value} name="textarea" onKeyDown={handleKeyDown} />
    </View>
  );
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

const MonoText = ({ ...props }) => {
  return (
    <Text innerStyle={{ fontFamily: "JetBrains Mono" }} {...props} />
  );
};

//

const Terminal = () => {
  const [history, setHistory] = useState<React.ReactElement[]>([
    <MonoText key={-1} padding="4px 0px">
      Kopi shell – a simple, immutable, async programming langauge.
    </MonoText>,
  ]);

  const handleInputValueChange = (value: string) => {
    const astRootNode = parse(value);

    for (const astNode of (astRootNode as BlockExpression).statements) {
      setHistory(history => [
        ...history,
        <React.Fragment key={history.length}>
          <View horizontal padding="0px 0px" align="middle left">
            <Icon icon={ChevronRightIcon} size={20} style={{ marginLeft: -6, marginBottom: -1 }} />
            <MonoText padding="4px 0px">
              {value}
            </MonoText>
          </View>
          <React.Suspense fallback={
            <Icon icon={LoaderCircleIcon} size={14} className={styles.spin} style={{ padding: "3px 0", marginLeft: -2 }} />
          }>
            {(async (element?: string | React.ReactElement) => (
              element = await (await astNode.evaluate(environment, updateBindings)).inspect(),
              typeof element !== "string" ? element : (
                <MonoText padding="4px 0px">
                  {element}
                </MonoText>
              )
            ))()}
          </React.Suspense>
        </React.Fragment>,
      ]);
    }
  };

  return (
    <View style={{ overflowY: "auto" }}>
      <View padding="8px" style={{ paddingBottom: 0 }}>
        {history}
        <Input changeOnEnter icon={ChevronRightIcon} padding="0px" style={{ marginTop: -4 }} onValueChange={handleInputValueChange} />
      </View>
    </View>
  );
};

export default Terminal;

export {
  Input,
};
