////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateEnumField } from '../../src';
import Gender from './model/gender';

describe('validateEnumField', () => {
  it('returns valid result for a valid enumerator instance', () => {
    const context = { type: Gender, label: '性别' };
    const result = validateEnumField(Gender.MALE, context);
    expect(result).toEqual(new ValidationResult(true));
  });

  it('returns valid result for a valid enumerator string representation', () => {
    const context = { type: Gender, label: '性别' };
    const result = validateEnumField('FEMALE', context);
    expect(result).toEqual(new ValidationResult(true));
  });

  it('returns invalid result for an invalid enumerator string representation', () => {
    const context = { type: Gender, label: '性别' };
    const value = 'INVALID_ENUM';
    const result = validateEnumField(value, context);
    expect(result).toEqual(new ValidationResult(false, '性别的值不受支持'));
  });

  it('throws error when type is not provided in context', () => {
    const value = 'VALID_ENUM';
    const context = { label: '性别' };
    expect(() => validateEnumField(value, context)).toThrow();
  });

  it('throws error when type is not an enumeration type', () => {
    class TestEnum {}
    const value = 'VALID_ENUM';
    const context = { type: TestEnum, label: '测试枚举' };
    expect(() => validateEnumField(value, context)).toThrow();
  });

  it('returns invalid result for an invalid enumerator string representation, no label', () => {
    const context = { type: Gender };
    const value = 'INVALID_ENUM';
    const result = validateEnumField(value, context);
    expect(result).toEqual(new ValidationResult(false, '枚举的值不受支持'));
  });

  it('returns invalid result for an invalid enumerator string representation, no context', () => {
    const value = 'INVALID_ENUM';
    expect(() => validateEnumField(value)).toThrow();
  });

  it('returns valid result for null value when nullable is true', () => {
    const value = null;
    const context = { type: Gender, label: '性别', nullable: true };
    const result = validateEnumField(value, context);
    expect(result).toEqual(new ValidationResult(true));
  });

  it('returns invalid result for null value when nullable is false', () => {
    const value = null;
    const context = { type: Gender, label: '性别', nullable: false };
    const result = validateEnumField(value, context);
    expect(result).toEqual(new ValidationResult(false, '请选择性别'));
  });

  it('returns invalid result for non-string value', () => {
    const value = 12345;
    const context = { type: Gender, label: '性别' };
    const result = validateEnumField(value, context);
    expect(result).toEqual(new ValidationResult(false, '性别的值不受支持'));
  });
});
