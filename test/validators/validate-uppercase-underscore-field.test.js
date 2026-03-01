////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateUppercaseUnderscoreField } from '../../src';

/**
 * 单元测试{@link validateUppercaseUnderscoreField}。
 *
 * @author 胡海星
 */
describe('validateUppercaseUnderscoreField', () => {
  test('undefined, nullable = false', () => {
    const str = undefined;
    const context = {
      label: '常量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写常量名');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('null, nullable = false', () => {
    const str = null;
    const context = {
      label: '常量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写常量名');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('"", nullable = false', () => {
    const str = '';
    const context = {
      label: '常量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写常量名');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('undefined, nullable = true', () => {
    const str = undefined;
    const context = {
      label: '常量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('null, nullable = true', () => {
    const str = null;
    const context = {
      label: '常量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('"", nullable = true', () => {
    const str = '';
    const context = {
      label: '常量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid uppercase underscore string', () => {
    const str = 'USER_NAME';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid uppercase underscore string with spaces', () => {
    const str = '  USER_NAME  ';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid string with uppercase letters, numbers and underscores', () => {
    const str = 'USER_123_NAME';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(true);
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with lowercase letters', () => {
    const str = 'user_name';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with mixed case letters', () => {
    const str = 'User_Name';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with special characters', () => {
    const str = 'USER_NAME!@#';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with spaces in between', () => {
    const str = 'USER NAME';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with hyphens', () => {
    const str = 'USER-NAME';
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('non-string input', () => {
    const str = 123456;
    const context = {
      label: '常量名',
    };
    const expected = new ValidationResult(false, '常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('custom invalid message', () => {
    const str = 'user_name';
    const context = {
      label: '常量名',
      invalidMessage: '{whose}{label}必须是大写字母和下划线组合',
    };
    const expected = new ValidationResult(false, '常量名必须是大写字母和下划线组合');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('with owner context', () => {
    const str = 'user_name';
    const context = {
      label: '常量名',
      owner: '张三',
    };
    const expected = new ValidationResult(false, '张三的常量名格式不正确');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('minLength validation', () => {
    const str = 'A';
    const context = {
      label: '常量名',
      minLength: 3,
    };
    const expected = new ValidationResult(false, '常量名长度必须至少是3');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('maxLength validation', () => {
    const str = 'VERY_LONG_CONSTANT_NAME_THAT_EXCEEDS_LIMIT';
    const context = {
      label: '常量名',
      maxLength: 10,
    };
    const expected = new ValidationResult(false, '常量名长度不能超过10');
    expect(validateUppercaseUnderscoreField(str, context)).toEqual(expected);
  });
});
