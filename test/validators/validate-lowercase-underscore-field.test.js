////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/common-validation-rule';
import { validateLowercaseUnderscoreField } from '../../src';

/**
 * 单元测试{@link validateLowercaseUnderscoreField}。
 *
 * @author 胡海星
 */
describe('validateLowercaseUnderscoreField', () => {
  test('undefined, nullable = false', () => {
    const str = undefined;
    const context = {
      label: '变量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写变量名');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('null, nullable = false', () => {
    const str = null;
    const context = {
      label: '变量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写变量名');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('"", nullable = false', () => {
    const str = '';
    const context = {
      label: '变量名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写变量名');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('undefined, nullable = true', () => {
    const str = undefined;
    const context = {
      label: '变量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('null, nullable = true', () => {
    const str = null;
    const context = {
      label: '变量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('"", nullable = true', () => {
    const str = '';
    const context = {
      label: '变量名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid lowercase underscore string', () => {
    const str = 'user_name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid lowercase underscore string with spaces', () => {
    const str = '  user_name  ';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('valid string with lowercase letters, numbers and underscores', () => {
    const str = 'user_123_name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with uppercase letters', () => {
    const str = 'User_Name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with mixed case letters', () => {
    const str = 'user_Name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with special characters', () => {
    const str = 'user_name!@#';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with spaces in between', () => {
    const str = 'user name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('invalid string with hyphens', () => {
    const str = 'user-name';
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('non-string input', () => {
    const str = 123456;
    const context = {
      label: '变量名',
    };
    const expected = new ValidationResult(false, '变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('custom invalid message', () => {
    const str = 'User_Name';
    const context = {
      label: '变量名',
      invalidMessage: '{whose}{label}必须是小写字母和下划线组合',
    };
    const expected = new ValidationResult(false, '变量名必须是小写字母和下划线组合');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('with owner context', () => {
    const str = 'User_Name';
    const context = {
      label: '变量名',
      owner: '张三',
    };
    const expected = new ValidationResult(false, '张三的变量名格式不正确');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('minLength validation', () => {
    const str = 'a';
    const context = {
      label: '变量名',
      minLength: 3,
    };
    const expected = new ValidationResult(false, '变量名长度必须至少是3');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });

  test('maxLength validation', () => {
    const str = 'very_long_variable_name_that_exceeds_limit';
    const context = {
      label: '变量名',
      maxLength: 10,
    };
    const expected = new ValidationResult(false, '变量名长度不能超过10');
    expect(validateLowercaseUnderscoreField(str, context)).toEqual(expected);
  });
});
