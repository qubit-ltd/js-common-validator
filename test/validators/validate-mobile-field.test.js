////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateMobileField } from '../../src';

/**
 * 单元测试{@link validateMobileField}。
 *
 * @author 胡海星
 */
describe('validateMobileField()', () => {
  const obj = {
    name: '张三',
    mobile: '13474937629',
  };
  test('正确的号码，用户有姓名', () => {
    obj.mobile = '13474937629';
    let result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.mobile = '13574937629';
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.mobile = '1795113674937629';
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('正确的号码，用户无姓名', () => {
    obj.mobile = '13474937629';
    let result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.mobile = '13574937629';
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.mobile = '1795113674937629';
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空号码，用户有姓名', () => {
    obj.mobile = '';
    let result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的手机号码');

    obj.mobile = null;
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的手机号码');

    obj.mobile = undefined;
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写张三的手机号码');

    obj.mobile = undefined;
    result = validateMobileField(obj.mobile, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写中国电信的手机号码');
  });
  test('空号码，用户无姓名', () => {
    obj.mobile = '';
    let result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写手机号码');

    obj.name = null;
    obj.mobile = null;
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写手机号码');

    obj.name = undefined;
    obj.mobile = undefined;
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写手机号码');

    delete obj.name;
    obj.mobile = '';
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写手机号码');
  });
  test('错误号码，用户有姓名', () => {
    obj.mobile = '20074937629';
    let result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的手机号码格式不正确');

    obj.mobile = '1347493762';
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的手机号码格式不正确');

    obj.mobile = '861367493769';
    result = validateMobileField(obj.mobile, { instance: obj, owner: '张三' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张三的手机号码格式不正确');

    obj.name = '中国电信';
    obj.mobile = '861367493769';
    result = validateMobileField(obj.mobile, { instance: obj, owner: '中国电信' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('中国电信的手机号码格式不正确');
  });
  test('错误号码，用户无姓名', () => {
    obj.mobile = '20074937629';
    let result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('手机号码格式不正确');

    obj.mobile = '1347493762';
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('手机号码格式不正确');

    obj.mobile = '861367493769';
    result = validateMobileField(obj.mobile, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('手机号码格式不正确');
  });
  test('错误号码, has label', () => {
    obj.mobile = '20074937629';
    const result = validateMobileField(obj.mobile, { instance: obj, label: '移动电话号码' });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('移动电话号码格式不正确');
  });
  test('错误号码, no context', () => {
    obj.mobile = '20074937629';
    const result = validateMobileField(obj.mobile);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('手机号码格式不正确');
  });
});
