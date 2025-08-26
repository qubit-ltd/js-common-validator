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
 * 单元测试{@link validateLowercaseHyphenField}。
 *
 * @author 胡海星
 */
describe('validateLowercaseHyphenField', () => {
  test('undefined, nullable = false', () => {
    const str = undefined;
    const context = {
      label: 'CSS类名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写CSS类名');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('null, nullable = false', () => {
    const str = null;
    const context = {
      label: 'CSS类名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写CSS类名');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('"", nullable = false', () => {
    const str = '';
    const context = {
      label: 'CSS类名',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写CSS类名');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('undefined, nullable = true', () => {
    const str = undefined;
    const context = {
      label: 'CSS类名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('null, nullable = true', () => {
    const str = null;
    const context = {
      label: 'CSS类名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('"", nullable = true', () => {
    const str = '';
    const context = {
      label: 'CSS类名',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('valid lowercase hyphen string', () => {
    const str = 'user-name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('valid lowercase hyphen string with spaces', () => {
    const str = '  user-name  ';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('valid string with lowercase letters, numbers and hyphens', () => {
    const str = 'user-123-name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(true);
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('invalid string with uppercase letters', () => {
    const str = 'User-Name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('invalid string with mixed case letters', () => {
    const str = 'user-Name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('invalid string with special characters', () => {
    const str = 'user-name!@#';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('invalid string with spaces in between', () => {
    const str = 'user name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('invalid string with underscores', () => {
    const str = 'user_name';
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('non-string input', () => {
    const str = 123456;
    const context = {
      label: 'CSS类名',
    };
    const expected = new ValidationResult(false, 'CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('custom invalid message', () => {
    const str = 'User-Name';
    const context = {
      label: 'CSS类名',
      invalidMessage: '{whose}{label}必须是小写字母和连字符组合',
    };
    const expected = new ValidationResult(false, 'CSS类名必须是小写字母和连字符组合');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('with owner context', () => {
    const str = 'User-Name';
    const context = {
      label: 'CSS类名',
      owner: '张三',
    };
    const expected = new ValidationResult(false, '张三的CSS类名格式不正确');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('minLength validation', () => {
    const str = 'a';
    const context = {
      label: 'CSS类名',
      minLength: 3,
    };
    const expected = new ValidationResult(false, 'CSS类名长度必须至少是3');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });

  test('maxLength validation', () => {
    const str = 'very-long-css-class-name-that-exceeds-limit';
    const context = {
      label: 'CSS类名',
      maxLength: 10,
    };
    const expected = new ValidationResult(false, 'CSS类名长度不能超过10');
    expect(validateLowercaseHyphenField(str, context)).toEqual(expected);
  });
});
