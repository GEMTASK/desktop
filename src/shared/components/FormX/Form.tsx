import React, { createContext, useContext } from "react";

import { View } from "..";
import type { Delegate } from "../../types/Delegate";

type FieldValue = string | number | boolean | null | undefined;

function noop() { }

type FormContext = {
  fields: { [name: string]: FieldValue; };
  onFieldChange: (name: string, value: FieldValue) => void;
};

const FormContext = createContext<FormContext>({
  fields: {},
  onFieldChange: () => undefined
});

//
// FormField
//

function FormField({
  name,
  children
}: {
  name: string;
  children: React.ReactElement<{
    value: FieldValue;
    onValueChange: (value: FieldValue) => void;
  }>;
}) {
  const { fields, onFieldChange } = useContext(FormContext);

  const handleValueChange = (value: FieldValue) => {
    onFieldChange(name, value);
  };

  const onlyChild = React.Children.only(children);

  return (
    React.isValidElement(onlyChild) && React.cloneElement(onlyChild, {
      value: fields[name],
      onValueChange: handleValueChange
    })
  );
}

FormField.withComponent = <TProps extends object>(Component: React.ComponentType<TProps>) => ({
  name,
  ...props
}: {
  name: string;
} & TProps) => {
  return (
    <Form.Field name={name}>
      <Component {...props as TProps} />
    </Form.Field>
  );
};

//
// Form
//

function Form({
  fields,
  children,
  onFieldChange = noop,
  ...props
}: Delegate<{
  fields: Record<string, FieldValue>;
  onFieldChange?: (name: string, value: FieldValue) => void;
}, typeof View<"form">>) {
  const formContextValue = {
    fields,
    onFieldChange
  };

  return (
    <FormContext value={formContextValue}>
      <View as="form" {...props}>
        {children}
      </View>
    </FormContext>
  );
}

Form.Field = FormField;

export type {
  FieldValue
};

export default Form;
