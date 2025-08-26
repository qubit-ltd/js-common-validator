////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/common-validation-rule';
import { validateLowercaseHyphenField } from '../../src';

/**
 * 单元测试范围验证分支覆盖。
 *
 * @author 胡海星
 */
describe('validateFieldByRule range validation branches', () => {
  // 测试 withinRange 函数中的分支
  describe('withinRange function branches', () => {
    test('should return true when both start and end are valid and value is within range', () => {
      const str = 'middle-value';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'z',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return false when both start and end are valid but value is below range', () => {
      const str = 'a';
      const context = {
        label: '测试字段',
        start: 'b',
        end: 'z',
      };
      const expected = new ValidationResult(false, '测试字段必须在b和z之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return false when both start and end are valid but value is above range', () => {
      const str = 'z';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'y',
      };
      const expected = new ValidationResult(false, '测试字段必须在a和y之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return false when both start and end are valid but value is out of range', () => {
      const str = 'out-of-range';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'b',
      };
      const expected = new ValidationResult(false, '测试字段必须在a和b之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when only start is valid and value is greater than or equal to start', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        start: 'a',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return false when only start is valid but value is less than start', () => {
      const str = 'a';
      const context = {
        label: '测试字段',
        start: 'b',
      };
      const expected = new ValidationResult(false, '测试字段必须大于或等于b');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when only end is valid and value is less than or equal to end', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        end: 'z',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return false when only end is valid but value is greater than end', () => {
      const str = 'z';
      const context = {
        label: '测试字段',
        end: 'y',
      };
      const expected = new ValidationResult(false, '测试字段必须小于或等于y');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when start and end are invalid (not valid according to rule)', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        start: 'INVALID_START',
        end: 'INVALID_END',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when start is invalid but end is valid', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        start: 'INVALID_START',
        end: 'z',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when start is valid but end is invalid', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'INVALID_END',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when neither start nor end is provided', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should return true when start and end are nullish', () => {
      const str = 'valid-value';
      const context = {
        label: '测试字段',
        start: null,
        end: undefined,
      };
      const expected = new ValidationResult(true);
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });
  });

  // 测试自定义比较器
  describe('custom comparator', () => {
    test('should use custom comparator for range validation', () => {
      const str = 'test-value';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'z',
        comparator: (lhs, rhs) => {
          // 自定义比较器：按长度比较
          return lhs.length - rhs.length;
        },
      };
      const expected = new ValidationResult(false, '测试字段必须在a和z之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should use custom comparator when value is out of range', () => {
      const str = 'short';
      const context = {
        label: '测试字段',
        start: 'longer-value',
        end: 'even-longer-value',
        comparator: (lhs, rhs) => {
          // 自定义比较器：按长度比较
          return lhs.length - rhs.length;
        },
      };
      const expected = new ValidationResult(false, '测试字段必须在longer-value和even-longer-value之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });
  });

  // 测试自定义错误消息
  describe('custom error messages', () => {
    test('should use custom outOfRangeMessage', () => {
      const str = 'out-of-range';
      const context = {
        label: '测试字段',
        start: 'a',
        end: 'b',
        outOfRangeMessage: '自定义范围错误消息：{whose}{label}必须在{start}和{end}之间',
      };
      const expected = new ValidationResult(false, '自定义范围错误消息：测试字段必须在a和b之间');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should use custom beforeStartMessage', () => {
      const str = 'a';
      const context = {
        label: '测试字段',
        start: 'b',
        beforeStartMessage: '自定义开始值错误消息：{whose}{label}必须大于{start}',
      };
      const expected = new ValidationResult(false, '自定义开始值错误消息：测试字段必须大于b');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });

    test('should use custom afterEndMessage', () => {
      const str = 'z';
      const context = {
        label: '测试字段',
        end: 'y',
        afterEndMessage: '自定义结束值错误消息：{whose}{label}必须小于{end}',
      };
      const expected = new ValidationResult(false, '自定义结束值错误消息：测试字段必须小于y');
      expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
    });
  });
});
