import React, { useLayoutEffect, useRef, useState } from "react";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { type Delegate, Icon, Text, View } from "onyx-ui";
import { ChevronRightIcon, LoaderCircleIcon } from "lucide-react";

import Clock from "../clock";

import { assert } from "./kopi/utils";
import { KopiValue, type Environment } from "./kopi/shared";
import { environment as originalEnvironment, parse } from "./kopi/compiler";
import type { BlockExpression } from "./kopi/ast-nodes";
import { KopiString } from "./kopi/kopi-types";

import styles from "./Terminal.module.scss";

const client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIATDBOG2D7WLWY5KE7",
    secretAccessKey: "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",
  },
});

//

class LsCommand extends KopiValue {
  path: string;

  constructor(path: string = "") {
    super();

    this.path = path;
  }

  override async inspect() {
    const command = new ListObjectsV2Command({
      Bucket: "mike-austin",
      Delimiter: "/",
      Prefix: this.path,
    });

    const data = await client.send(command);

    const items = data && [
      ...data.CommonPrefixes!.map(({ Prefix }) => ({
        name: Prefix!.split("/").at(-2)!.padEnd(15),
      })),
      ...data.Contents!.filter(file => file.Key !== this.path)!.map(({ Key, Size }) => ({
        name: Key?.split("/").at(-1)!.replaceAll("-", "‑").padEnd(15),
      })),
    ];

    return items?.map(item => item.name).join("");
  }

  apply(thisArg: undefined, [arg]: [KopiValue]) {
    assert(arg instanceof KopiString);

    return new LsCommand(String(arg.value));
  }
}

class PwdCommand extends KopiValue {
  override async inspect() {
    console.log(client);
    return "mike-austin.s3.amazonaws";
  }
}

//

const Input = ({
  value: _value,
  lines,
  border = true,
  flush,
  icon,
  changeOnEnter,
  innerStyle,
  onValueChange,
  ...props
}: Delegate<{
  value?: string,
  lines?: number,
  flush?: boolean,
  icon?: React.ComponentProps<typeof Icon>["icon"],
  innerStyle?: React.ComponentProps<"textarea">["style"],
  changeOnEnter?: boolean,
  onValueChange?: (value: string) => void,
}, typeof View<"div">>) => {
  const [value, setValue] = useState(_value);
  const textAreaElementRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const currentTarget = event.currentTarget;

    if (changeOnEnter && event.key === "Enter" && value) {
      event.preventDefault();

      onValueChange?.(value);

      currentTarget.value = "";
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  useLayoutEffect(() => {
    if (textAreaElementRef.current) {
      textAreaElementRef.current.style.height = "";
      textAreaElementRef.current.style.height = `${textAreaElementRef.current.scrollHeight}px`;
    }
  });

  const inputClassName = [
    styles.Input,
    flush && styles.flush,
  ].filter(className => className).join(" ");

  return (
    <View horizontal border={border} align="middle left" padding="4px 8px" className={inputClassName} {...props}>
      {icon && (
        <Icon icon={icon} size={20} style={{ marginLeft: -6 }} />
      )}
      <textarea
        ref={textAreaElementRef}
        value={value}
        name="textarea"
        style={{ background: "transparent", ...innerStyle }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    </View>
  );
};

//

let environment = {
  ...originalEnvironment,
  clock: {
    async inspect() { return <Clock style={{ width: 300, height: 300 }} />; },
  },
  ls: new LsCommand(),
  pwd: new PwdCommand(),
};

const updateBindings = (bindings: Environment) => {
  environment = { ...environment, ...bindings };
};

const MonoText = ({ ...props }) => {
  return (
    <Text innerStyle={{ fontFamily: "JetBrains Mono", whiteSpace: "pre-wrap" }} {...props} />
  );
};

//

const Terminal = () => {
  const [path, setPath] = useState("");
  const [history, setHistory] = useState<React.ReactElement[]>([
    <MonoText select key={-1} padding="4px 0px">
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
            <MonoText select padding="4px 0px">
              {value}
            </MonoText>
          </View>
          <React.Suspense fallback={
            <Icon icon={LoaderCircleIcon} size={14} className={styles.spin} style={{ padding: "3px 0", marginLeft: -2 }} />
          }>
            {(async (element?: string | React.ReactElement) => (
              element = await (await astNode.evaluate(environment, updateBindings)).inspect(),
              typeof element !== "string" ? element : (
                <MonoText select padding="4px 0px">
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
        <Input
          border="none"
          changeOnEnter
          icon={ChevronRightIcon}
          padding="4px 0px"
          style={{ marginTop: -4 }}
          innerStyle={{ fontFamily: "JetBrains Mono" }}
          onValueChange={handleInputValueChange}
        />
      </View>
    </View>
  );
};

export default Terminal;

export {
  Input,
};
