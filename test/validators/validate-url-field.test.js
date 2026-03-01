////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateUrlField } from '../../src';

describe('validateUrlField', () => {
  it('returns valid result for a valid URL', () => {
    const value = 'https://www.example.com';
    const context = { label: '网址' };
    const expectedResult = new ValidationResult(true);
    const result = validateUrlField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for an invalid URL', () => {
    const value = 'invalid-url';
    const context = { label: '网址' };
    const expectedResult = new ValidationResult(false, '网址格式不正确');
    const result = validateUrlField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('uses default label when context label is not provided', () => {
    const value = 'https://www.example.com';
    const context = {};
    const expectedResult = new ValidationResult(true);
    const result = validateUrlField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for non-string value', () => {
    const value = 12345;
    const expectedResult = new ValidationResult(false, '网址格式不正确');
    const result = validateUrlField(value);
    expect(result).toEqual(expectedResult);
  });
});
