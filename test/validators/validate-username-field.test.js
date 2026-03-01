////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateUsernameField } from '../../src';

/**
 * 单元测试{@link validateUsernameField}。
 *
 * @author 胡海星
 */
describe('validateUsernameField()', () => {
  const obj = {
    name: '张三',
    username: 'validUsername',
  };
  test('正确的用户名，用户有姓名', () => {
    obj.username = 'validUsername';
    let result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.username = 'valid_@123-User.name.';
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.username = '1795113674937629';
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的用户名，用户无姓名', () => {
    obj.username = 'validUsername';
    let result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.username = 'valid_@123-User.name.';
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.username = '1795113674937629';
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空用户名，用户有姓名', () => {
    obj.username = '';
    let result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的用户名');

    obj.username = null;
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的用户名');

    obj.username = undefined;
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的用户名');

    obj.username = undefined;
    result = validateUsernameField(obj.username, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写中国电信的用户名');
  });
  test('空用户名，用户无姓名', () => {
    obj.username = '';
    let result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写用户名');

    obj.name = null;
    obj.username = null;
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写用户名');

    obj.name = undefined;
    obj.username = undefined;
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写用户名');

    delete obj.name;
    obj.username = '';
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写用户名');
  });
  test('错误用户名，用户有姓名', () => {
    obj.username = '_20074937629';
    let result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');

    obj.username = '134 7493762';
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');

    obj.username = '@861367493769';
    result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');

    obj.name = '中国电信';
    obj.username = '861367493769 ';
    result = validateUsernameField(obj.username, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国电信的用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');
  });
  test('错误用户名，用户无姓名', () => {
    obj.username = '134 7493762';
    let result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');

    obj.username = '@1347493762';
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');

    obj.username = '.861367493769';
    result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');
  });
  test('错误用户名, has label', () => {
    obj.username = '20074 937629';
    const result = validateUsernameField(obj.username, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');
  });
  test('错误用户名, no context', () => {
    obj.username = '-20074937629';
    const result = validateUsernameField(obj.username);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名必须以字母或数字开头，只能包含字母、数字、下划线、连字符、点号和 @ 符号');
  });
  test('用户名太短，用户有姓名', () => {
    obj.username = '123';
    const result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的用户名不能少于4个字符');
  });
  test('用户名太短，用户无姓名', () => {
    obj.username = '123';
    const result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名不能少于4个字符');
  });
  test('用户名太短，has label', () => {
    obj.username = '123';
    const result = validateUsernameField(obj.username, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号不能少于4个字符');
  });
  test('用户名太长，用户有姓名', () => {
    obj.username = '1234567890123456789012345678901234567890';
    const result = validateUsernameField(obj.username, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的用户名不能多于32个字符');
  });
  test('用户名太长，用户无姓名', () => {
    obj.username = '1234567890123456789012345678901234567890';
    const result = validateUsernameField(obj.username, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('用户名不能多于32个字符');
  });
  test('用户名太长，has label', () => {
    obj.username = '1234567890123456789012345678901234567890';
    const result = validateUsernameField(obj.username, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号不能多于32个字符');
  });
});
