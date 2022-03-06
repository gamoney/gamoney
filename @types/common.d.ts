type AnyComponent =
  string |
  React.FunctionComponent<never> |
  (new (properties: never) => React.Component)

type PropertiesOf<T> =
  T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends React.ComponentType<infer Properties>
      ? Properties & JSX.IntrinsicAttributes
      : never
