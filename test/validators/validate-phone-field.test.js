////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validatePhoneField } from '../../src';

describe('validatePhoneField', () => {
  it('returns valid result for a valid phone number', () => {
    const value = '010-12345678';
    const context = { label: '固定电话号码' };
    const expectedResult = new ValidationResult(true);
    const result = validatePhoneField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for an invalid phone number', () => {
    const value = 'invalid-phone';
    const context = { label: '固定电话号码' };
    const expectedResult = new ValidationResult(false, '固定电话号码格式不正确');
    const result = validatePhoneField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('uses default label when context label is not provided', () => {
    const value = '010-12345678';
    const context = {};
    const expectedResult = new ValidationResult(true);
    const result = validatePhoneField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for non-string value', () => {
    const value = 12345;
    const context = { label: '家庭电话号码' };
    const expectedResult = new ValidationResult(false, '家庭电话号码格式不正确');
    const result = validatePhoneField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for non-string value, no label', () => {
    const value = 12345;
    const context = {};
    const expectedResult = new ValidationResult(false, '固定电话号码格式不正确');
    const result = validatePhoneField(value, context);
    expect(result).toEqual(expectedResult);
  });

  it('returns invalid result for non-string value, no context', () => {
    const value = 12345;
    const expectedResult = new ValidationResult(false, '固定电话号码格式不正确');
    const result = validatePhoneField(value);
    expect(result).toEqual(expectedResult);
  });
});
