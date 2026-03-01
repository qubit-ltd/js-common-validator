////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateFieldByRule } from '../../src';

describe('validateFieldByRule', () => {
  it('returns valid result for a valid value within range', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = 5;
    const context = { start: 1, end: 10, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(true));
  });

  it('returns invalid result for a value out of range', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = 11;
    const context = { start: 1, end: 10, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '数值必须在1和10之间'));
  });

  it('returns invalid result for a value less than start', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = 0;
    const context = { start: 1, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '数值必须大于或等于1'));
  });

  it('returns invalid result for a value greater than end', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = 11;
    const context = { end: 10, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '数值必须小于或等于10'));
  });

  it('returns invalid result for a null value when not nullable', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = null;
    const context = { nullable: false, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '请填写数值'));
  });

  it('returns valid result for a null value when nullable', () => {
    const rule = { isValid: jest.fn().mockReturnValue(true) };
    const value = null;
    const context = { nullable: true, label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(true));
  });

  it('returns invalid result for an invalid value according to rule', () => {
    const rule = { isValid: jest.fn().mockReturnValue(false) };
    const value = 'invalid';
    const context = { label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '数值格式不正确'));
  });

  it('throws error when rule does not provide isValid function', () => {
    const rule = {};
    const value = 'value';
    const context = { label: '数值' };
    expect(() => validateFieldByRule(value, rule, context))
      .toThrow('The rule object must provide a isValid() function');
  });

  it('throws error when rule is null', () => {
    const rule = null;
    const value = 'value';
    const context = { label: '数值' };
    expect(() => validateFieldByRule(value, rule, context))
      .toThrow('The rule object must provide a isValid() function');
  });

  it('returns invalid result, no context', () => {
    const rule = { isValid: jest.fn().mockReturnValue(false) };
    const value = 11;
    const result = validateFieldByRule(value, rule);
    expect(result).toEqual(new ValidationResult(false, '格式不正确'));
  });

  it('returns invalid result when rule.isValid returns false', () => {
    const rule = { isValid: jest.fn().mockReturnValue(false) };
    const value = 'invalid';
    const context = { label: '数值' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '数值格式不正确'));
  });

  it('returns invalid result with custom invalid message', () => {
    const rule = { isValid: jest.fn().mockReturnValue(false) };
    const value = 'invalid';
    const context = { label: '数值', invalidMessage: '自定义错误信息' };
    const result = validateFieldByRule(value, rule, context);
    expect(result).toEqual(new ValidationResult(false, '自定义错误信息'));
  });
});
