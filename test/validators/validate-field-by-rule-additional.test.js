////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import validateFieldByRule from '../../src/validators/validate-field-by-rule';

/**
 * 单元测试{@link validateFieldByRule}的边缘情况。
 *
 * @author 胡海星
 */
describe('validateFieldByRule() edge cases', () => {
  // 创建一个mock验证规则对象
  const mockRule = {
    isValid: jest.fn().mockReturnValue(true),
  };

  test('范围验证 - 仅有start没有end', () => {
    // 模拟rule.isValid返回true
    mockRule.isValid.mockReturnValueOnce(true);

    // 测试情况：值在范围内
    const value = 10;
    const context = {
      start: 5,
      comparator: (a, b) => a - b,
    };

    let result = validateFieldByRule(value, mockRule, context);
    expect(result.success).toBeTruthy();

    // 测试情况：值小于start
    const value2 = 3;
    result = validateFieldByRule(value2, mockRule, context);
    expect(result.success).toBeFalsy();
    expect(result.description).toContain('必须大于或等于5');

    // 测试自定义错误消息
    const context2 = {
      start: 5,
      comparator: (a, b) => a - b,
      beforeStartMessage: '数值{label}必须≥{start}',
      label: '分数',
    };
    result = validateFieldByRule(value2, mockRule, context2);
    expect(result.success).toBeFalsy();
    expect(result.description).toBe('数值分数必须≥5');
  });

  test('范围验证 - 仅有end没有start', () => {
    // 模拟rule.isValid返回true
    mockRule.isValid.mockReturnValueOnce(true);
    mockRule.isValid.mockReturnValueOnce(true);
    mockRule.isValid.mockReturnValueOnce(true);

    // 测试情况：值在范围内
    const value = 5;
    const context = {
      end: 10,
      comparator: (a, b) => a - b,
    };

    let result = validateFieldByRule(value, mockRule, context);
    expect(result.success).toBeTruthy();

    // 测试情况：值大于end
    const value2 = 15;
    result = validateFieldByRule(value2, mockRule, context);
    expect(result.success).toBeFalsy();
    expect(result.description).toContain('必须小于或等于10');

    // 测试自定义错误消息
    const context2 = {
      end: 10,
      comparator: (a, b) => a - b,
      afterEndMessage: '数值{label}必须≤{end}',
      label: '分数',
    };
    result = validateFieldByRule(value2, mockRule, context2);
    expect(result.success).toBeFalsy();
    expect(result.description).toBe('数值分数必须≤10');
  });

  test('范围验证 - 同时有start和end', () => {
    // 模拟rule.isValid返回true
    mockRule.isValid.mockReturnValueOnce(true);
    mockRule.isValid.mockReturnValueOnce(true);
    mockRule.isValid.mockReturnValueOnce(true);

    // 测试情况：值在范围内
    const value = 7;
    const context = {
      start: 5,
      end: 10,
      comparator: (a, b) => a - b,
    };

    let result = validateFieldByRule(value, mockRule, context);
    expect(result.success).toBeTruthy();

    // 测试情况：值不在范围内
    const value2 = 15;
    result = validateFieldByRule(value2, mockRule, context);
    expect(result.success).toBeFalsy();
    expect(result.description).toContain('必须在5和10之间');

    // 测试自定义错误消息
    const context2 = {
      start: 5,
      end: 10,
      comparator: (a, b) => a - b,
      outOfRangeMessage: '数值{label}必须在{start}~{end}之间',
      label: '分数',
    };
    result = validateFieldByRule(value2, mockRule, context2);
    expect(result.success).toBeFalsy();
    expect(result.description).toBe('数值分数必须在5~10之间');
  });

  // 测试长度验证 - 覆盖第109行和115行的条件分支
  test('长度验证 - 值的长度太短', () => {
    // 创建具有长度属性的值
    const value = 'abc';
    const context = {
      minLength: 5,
      label: '用户名',
      owner: '张三',
    };

    const result = validateFieldByRule(value, mockRule, context);
    expect(result.success).toBeFalsy();
    expect(result.description).toContain('张三的用户名长度必须至少是5');

    // 使用自定义错误消息
    const context2 = {
      minLength: 5,
      label: '用户名',
      owner: '张三',
      tooShortMessage: '{whose}{label}太短了，需要至少{min}个字符',
    };

    const result2 = validateFieldByRule(value, mockRule, context2);
    expect(result2.success).toBeFalsy();
    expect(result2.description).toBe('张三的用户名太短了，需要至少5个字符');
  });

  test('长度验证 - 值的长度太长', () => {
    // 创建具有长度属性的值
    const value = 'abcdefghijklmnopqrst';
    const context = {
      maxLength: 10,
      label: '用户名',
      owner: '张三',
    };

    const result = validateFieldByRule(value, mockRule, context);
    expect(result.success).toBeFalsy();
    expect(result.description).toContain('张三的用户名长度不能超过10');

    // 使用自定义错误消息
    const context2 = {
      maxLength: 10,
      label: '用户名',
      owner: '张三',
      tooLongMessage: '{whose}{label}太长了，最多只能有{max}个字符',
    };

    const result2 = validateFieldByRule(value, mockRule, context2);
    expect(result2.success).toBeFalsy();
    expect(result2.description).toBe('张三的用户名太长了，最多只能有10个字符');
  });
});
