import { CustomClock } from "./Clock";

const libDefaultDate = new Date("2022-01-01T12:00:00.000Z");

describe("CustomClock", () => {
  it("can set the next value, than fallback to default", () => {
    const clock = new CustomClock();

    const nextDate = new Date("2010-10-10");
    clock.setNextDate(nextDate);

    expect(clock.now()).toEqual(nextDate);

    expect(clock.now()).toEqual(libDefaultDate);
  });

  it("can set the next n values, than fallback to default", () => {
    const clock = new CustomClock();

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
    const clock = new CustomClock();
    expect(clock.now()).toEqual(libDefaultDate);
  });

  it("has configurable default value", () => {
    const defaultDate = new Date("2010-10-10");
    const clock = new CustomClock(defaultDate);
    expect(clock.now()).toEqual(defaultDate);
  });
});
