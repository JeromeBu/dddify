import { createCustomValues } from "./createCustomValues";

export interface Clock {
  now: () => Date;
}

interface CustomClock extends Clock {
  setNextDate: (date: Date) => void;
  setNextDates: (dates: Date[]) => void;
}

export const createCustomClock = (
  defaultDate: Date = new Date("2022-01-01T12:00:00.000Z")
): CustomClock => {
  const { newValue, setNextValues, setNextValue } =
    createCustomValues(defaultDate);

  return {
    now: newValue,
    setNextDates: setNextValues,
    setNextDate: setNextValue,
  };
};

export const createActualClock = (): Clock => ({
  now: () => new Date(),
});
