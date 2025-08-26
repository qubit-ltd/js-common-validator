////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/common-validation-rule';
import {
  validateLowercaseHyphenField,
  validateLowercaseUnderscoreField,
  validateUppercaseUnderscoreField,
} from '../../src';

/**
 * 单元测试新添加的验证器函数。
 *
 * @author 胡海星
 */
describe('New validator functions coverage', () => {
  describe('validateLowercaseHyphenField', () => {
    test('should validate lowercase hyphen string correctly', () => {
      const str = 'test-value';
      const context = {
        label: '测试字段',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });
  });

  describe('validateLowercaseUnderscoreField', () => {
    test('should validate lowercase underscore string correctly', () => {
      const str = 'test_value';
      const context = {
        label: '测试字段',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
    });
  });

  describe('validateUppercaseUnderscoreField', () => {
    test('should validate uppercase underscore string correctly', () => {
      const str = 'TEST_VALUE';
      const context = {
        label: '测试字段',
      };
      const expected = new ValidationResult(true);
      expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
    });
  });
});
