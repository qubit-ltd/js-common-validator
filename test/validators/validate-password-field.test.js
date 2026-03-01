////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validatePasswordField } from '../../src';

/**
 * 单元测试{@link validatePasswordField}。
 *
 * @author 胡海星
 */
describe('validatePasswordField()', () => {
  const obj = {
    name: '张三',
    password: 'validPassword',
  };
  test('正确的密码，用户有姓名', () => {
    obj.password = 'validPassword';
    let result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.password = 'valid_@123-User.name.';
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.password = '1795113674937629';
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的密码，用户无姓名', () => {
    obj.password = 'validPassword';
    let result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.password = 'valid_@123-User.name.';
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.password = '1795113674937629';
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空密码，用户有姓名', () => {
    obj.password = '';
    let result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的密码');

    obj.password = null;
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的密码');

    obj.password = undefined;
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的密码');

    obj.password = undefined;
    result = validatePasswordField(obj.password, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写中国电信的密码');
  });
  test('空密码，用户无姓名', () => {
    obj.password = '';
    let result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写密码');

    obj.name = null;
    obj.password = null;
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写密码');

    obj.name = undefined;
    obj.password = undefined;
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写密码');

    delete obj.name;
    obj.password = '';
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写密码');
  });
  test('错误密码，用户有姓名', () => {
    obj.password = '_200\t74937629';
    let result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');

    obj.password = '134 7493762';
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');

    obj.password = '@86\f1367493769';
    result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');

    obj.name = '中国电信';
    obj.password = '861367493769 ';
    result = validatePasswordField(obj.password, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国电信的密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');
  });
  test('错误密码，用户无姓名', () => {
    obj.password = '134 7493762';
    let result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');

    obj.password = '@13474\n93762';
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');

    obj.password = '.8613674\t93769';
    result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');
  });
  test('错误密码, has label', () => {
    obj.password = '20074 937629';
    const result = validatePasswordField(obj.password, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');
  });
  test('错误密码, no context', () => {
    obj.password = '-200\t74937629';
    const result = validatePasswordField(obj.password);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码只能由大小写英文字母、阿拉伯数字、非空白ASCII符号组成');
  });
  test('密码太短，用户有姓名', () => {
    obj.password = '12345';
    const result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的密码不能少于6个字符');
  });
  test('密码太短，用户无姓名', () => {
    obj.password = '12345';
    const result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码不能少于6个字符');
  });
  test('密码太短，has label', () => {
    obj.password = '12345';
    const result = validatePasswordField(obj.password, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号不能少于6个字符');
  });
  test('密码太长，用户有姓名', () => {
    obj.password = '1234567890123456789012345678901234567890';
    const result = validatePasswordField(obj.password, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的密码不能多于32个字符');
  });
  test('密码太长，用户无姓名', () => {
    obj.password = '1234567890123456789012345678901234567890';
    const result = validatePasswordField(obj.password, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('密码不能多于32个字符');
  });
  test('密码太长，has label', () => {
    obj.password = '1234567890123456789012345678901234567890';
    const result = validatePasswordField(obj.password, { instance: obj, label: '移动电话户主账号' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话户主账号不能多于32个字符');
  });
});
