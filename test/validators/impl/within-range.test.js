////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IntegerRule, BoolRule, LocalDateRule } from '@qubit-ltd/validation-rule';
import withinRange from '../../../src/validators/impl/within-range';
import dateComparator from '../../../src/validators/impl/date-comparator';

describe('withinRange', () => {
  it('returns true when value is within the range with both start and end', () => {
    expect(withinRange(5, IntegerRule, 1, 10)).toBe(true);
  });

  it('returns false when value is outside the range with both start and end', () => {
    expect(withinRange(0, IntegerRule, 1, 10)).toBe(false);
    expect(withinRange(11, IntegerRule, 1, 10)).toBe(false);
  });

  it('returns true when value is equal to the start or end of the range', () => {
    expect(withinRange(1, IntegerRule, 1, 10)).toBe(true);
    expect(withinRange(10, IntegerRule, 1, 10)).toBe(true);
  });

  it('returns true when only start is provided and value is greater than or equal to start', () => {
    expect(withinRange(5, IntegerRule, 1)).toBe(true);
    expect(withinRange(1, IntegerRule, 1)).toBe(true);
  });

  it('returns false when only start is provided and value is less than start', () => {
    expect(withinRange(0, IntegerRule, 1)).toBe(false);
  });

  it('returns true when only end is provided and value is less than or equal to end', () => {
    expect(withinRange(5, IntegerRule, undefined, 10)).toBe(true);
    expect(withinRange(10, IntegerRule, undefined, 10)).toBe(true);
  });

  it('returns false when only end is provided and value is greater than end', () => {
    expect(withinRange(11, IntegerRule, undefined, 10)).toBe(false);
  });

  it('returns true when no start or end is provided', () => {
    expect(withinRange(5, IntegerRule)).toBe(true);
  });

  it('uses the provided comparator function', () => {
    const rule = {
      isValid(s) {
        return (typeof s === 'string');
      },
    };
    const comparator = (a, b) => a.length - b.length;
    expect(withinRange('short', rule, 's', 'longer', comparator)).toBe(true);
    expect(withinRange('longest', rule, 's', 'longer', comparator)).toBe(false);
  });

  it('uses the provided comparator function for dates', () => {
    const date1 = '2020-01-01';
    const date2 = new Date('2020-01-02');
    expect(withinRange(date1, LocalDateRule, undefined, date2, dateComparator)).toBe(true);
    expect(withinRange(date2, LocalDateRule, undefined, date1, dateComparator)).toBe(false);
  });

  it('handles null and undefined values correctly', () => {
    expect(withinRange(null, IntegerRule, 1, 10)).toBe(false);
    expect(withinRange(undefined, IntegerRule, 1, 10)).toBe(false);
    expect(withinRange(5, IntegerRule, null, 10)).toBe(true);
    expect(withinRange(5, IntegerRule, 1, null)).toBe(true);
  });

  it('handles NaN values correctly', () => {
    expect(withinRange(NaN, IntegerRule, 1, 10)).toBe(false);
    expect(withinRange(5, IntegerRule, NaN, 10)).toBe(true);
    expect(withinRange(5, IntegerRule, 1, NaN)).toBe(true);
  });

  it('handles boolean values correctly', () => {
    expect(withinRange(true, BoolRule, false, true)).toBe(true);
    expect(withinRange(false, BoolRule, false, true)).toBe(true);
    expect(withinRange(true, BoolRule, true, false)).toBe(false);
  });
});
