////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateEmailField } from '../../src';

/**
 * 单元测试{@link validateEmailField}。
 *
 * @author 胡海星
 */
describe('validateEmailField()', () => {
  const obj = {
    name: '张三',
    email: 'i@i.com',
  };
  test('正确的电子邮件地址，用户有姓名', () => {
    obj.email = 'i@i.com';
    let result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.email = 'abc@qq.com';
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.email = 'www123@123.com';
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的电子邮件地址，用户无姓名', () => {
    obj.email = 'i@i.com';
    let result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.email = 'abc@qq.com';
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.email = 'www123@123.com';
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空电子邮件地址，用户有姓名', () => {
    obj.email = '';
    let result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的电子邮件地址');

    obj.email = null;
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的电子邮件地址');

    obj.email = undefined;
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的电子邮件地址');

    obj.email = '';
    result = validateEmailField(obj.email, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写中国电信的电子邮件地址');
  });
  test('空电子邮件地址，用户无姓名', () => {
    obj.email = '';
    let result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写电子邮件地址');

    obj.email = null;
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写电子邮件地址');

    obj.email = undefined;
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写电子邮件地址');

    obj.email = '';
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写电子邮件地址');
  });
  test('错误电子邮件地址，用户有姓名', () => {
    obj.email = '123@123';
    let result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的电子邮件地址格式不正确');

    obj.email = '---abc@---.com.';
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的电子邮件地址格式不正确');

    obj.email = 'ii~~@qq.com~';
    result = validateEmailField(obj.email, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的电子邮件地址格式不正确');

    obj.email = 'ii~~@qq.com~';
    result = validateEmailField(obj.email, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国电信的电子邮件地址格式不正确');
  });
  test('错误电子邮件地址，用户无姓名', () => {
    obj.email = '123@123';
    let result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('电子邮件地址格式不正确');

    obj.email = '---abc@---.com.';
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('电子邮件地址格式不正确');

    obj.email = 'ii~~@qq.com~';
    result = validateEmailField(obj.email, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('电子邮件地址格式不正确');
  });

  test('错误电子邮件地址, with label', () => {
    obj.email = '123@123';
    const result = validateEmailField(obj.email, { instance: obj, label: '邮箱' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('邮箱格式不正确');
  });

  test('错误电子邮件地址, no context', () => {
    obj.email = '123@123';
    const result = validateEmailField(obj.email);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('电子邮件地址格式不正确');
  });
});
