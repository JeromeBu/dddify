export const createCustomValues = <V>(defaultValue: V) => {
  let nextValues: V[] = [];

  return {
    newValue: () => nextValues.shift() ?? defaultValue,
    setNextValue: (v: V) => {
      nextValues = [v];
    },
    setNextValues: (values: V[]) => {
      nextValues = values;
    },
  };
};
