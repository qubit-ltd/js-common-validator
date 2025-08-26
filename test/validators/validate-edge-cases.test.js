////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  validateLowercaseHyphenField,
  validateLowercaseUnderscoreField,
  validateUppercaseUnderscoreField,
  validateFieldByRule
} from '../../src';

/**
 * 单元测试边缘情况和可能遗漏的分支。
 *
 * @author 胡海星
 */
describe('Edge cases and missing branches', () => {
  describe('validateFieldByRule edge cases', () => {
    test('should handle rule with null isValid function', () => {
      const rule = { isValid: null };
      expect(() => {
        validateFieldByRule('test', rule, {});
      }).toThrow('The rule object must provide a isValid() function');
    });

    test('should handle rule with undefined isValid function', () => {
      const rule = { isValid: undefined };
      expect(() => {
        validateFieldByRule('test', rule, {});
      }).toThrow('The rule object must provide a isValid() function');
    });

    test('should handle rule with non-function isValid property', () => {
      const rule = { isValid: 'not a function' };
      expect(() => {
        validateFieldByRule('test', rule, {});
      }).toThrow('The rule object must provide a isValid() function');
    });

    test('should handle rule with isValid function that returns false', () => {
      const rule = { isValid: () => false };
      const context = { label: '测试字段' };
      const result = validateFieldByRule('invalid', rule, context);
      expect(result.success).toBe(false);
      expect(result.description).toBe('测试字段格式不正确');
    });

    test('should handle rule with isValid function that returns true', () => {
      const rule = { isValid: () => true };
      const context = { label: '测试字段' };
      const result = validateFieldByRule('valid', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle context with null values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: null,
        owner: null,
        start: null,
        end: null
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle context with undefined values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: undefined,
        owner: undefined,
        start: undefined,
        end: undefined
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle empty context object', () => {
      const rule = { isValid: () => true };
      const result = validateFieldByRule('test', rule, {});
      expect(result.success).toBe(true);
    });

    test('should handle undefined context', () => {
      const rule = { isValid: () => true };
      const result = validateFieldByRule('test', rule, undefined);
      expect(result.success).toBe(true);
    });
  });

  describe('New validator functions with edge cases', () => {
    test('validateLowercaseHyphenField with null context', () => {
      const result = validateLowercaseHyphenField('test-value', null);
      expect(result.success).toBe(true);
    });

    test('validateLowercaseUnderscoreField with null context', () => {
      const result = validateLowercaseUnderscoreField('test_value', null);
      expect(result.success).toBe(true);
    });

    test('validateUppercaseUnderscoreField with null context', () => {
      const result = validateUppercaseUnderscoreField('TEST_VALUE', null);
      expect(result.success).toBe(true);
    });

    test('validateLowercaseHyphenField with undefined context', () => {
      const result = validateLowercaseHyphenField('test-value', undefined);
      expect(result.success).toBe(true);
    });

    test('validateLowercaseUnderscoreField with undefined context', () => {
      const result = validateLowercaseUnderscoreField('test_value', undefined);
      expect(result.success).toBe(true);
    });

    test('validateUppercaseUnderscoreField with undefined context', () => {
      const result = validateUppercaseUnderscoreField('TEST_VALUE', undefined);
      expect(result.success).toBe(true);
    });

    test('validateLowercaseHyphenField with empty context', () => {
      const result = validateLowercaseHyphenField('test-value', {});
      expect(result.success).toBe(true);
    });

    test('validateLowercaseUnderscoreField with empty context', () => {
      const result = validateLowercaseUnderscoreField('test_value', {});
      expect(result.success).toBe(true);
    });

    test('validateUppercaseUnderscoreField with empty context', () => {
      const result = validateUppercaseUnderscoreField('TEST_VALUE', {});
      expect(result.success).toBe(true);
    });
  });

  describe('Length validation edge cases', () => {
    test('should handle minLength and maxLength with string values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        minLength: '5',
        maxLength: '10'
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle minLength and maxLength with boolean values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        minLength: true,
        maxLength: false
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle minLength and maxLength with object values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        minLength: {},
        maxLength: []
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });
  });

  describe('Range validation edge cases', () => {
    test('should handle start and end with non-string values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        start: 123,
        end: 456
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle start and end with boolean values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        start: true,
        end: false
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });

    test('should handle start and end with object values', () => {
      const rule = { isValid: () => true };
      const context = {
        label: '测试字段',
        start: {},
        end: []
      };
      const result = validateFieldByRule('test', rule, context);
      expect(result.success).toBe(true);
    });
  });
});
