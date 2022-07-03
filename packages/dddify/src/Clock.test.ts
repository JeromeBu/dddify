import { createCustomClock } from "./Clock";

const libDefaultDate = new Date("2022-01-01T12:00:00.000Z");

describe("CustomClock", () => {
  it("can set the next value, than fallback to default", () => {
    const clock = createCustomClock();

    const nextDate = new Date("2010-10-10");
    clock.setNextDate(nextDate);

    expect(clock.now()).toEqual(nextDate);

    expect(clock.now()).toEqual(libDefaultDate);

    const anotherDate = new Date("2022-10-10");
    clock.setNextDate(anotherDate);
    expect(clock.now()).toEqual(anotherDate);
  });

  it("can set the next n values, than fallback to default", () => {
    const clock = createCustomClock();

    const nextDate1 = new Date("2010-10-10");
    const nextDate2 = new Date("2011-11-11");
    const nextDate3 = new Date("2012-12-12");
    clock.setNextDates([nextDate1, nextDate2, nextDate3]);

    expect(clock.now()).toEqual(nextDate1);
    expect(clock.now()).toEqual(nextDate2);
    expect(clock.now()).toEqual(nextDate3);
    expect(clock.now()).toEqual(libDefaultDate);
  });

  it("has deterministic default value", () => {
    const clock = createCustomClock();
    expect(clock.now()).toEqual(libDefaultDate);
  });

  it("has configurable default value", () => {
    const defaultDate = new Date("2010-10-10");
    const clock = createCustomClock(defaultDate);
    expect(clock.now()).toEqual(defaultDate);
  });
});
