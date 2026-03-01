////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validatePersonNameField } from '../../src';

/**
 * Unit test the {@link validatePersonNameField}.
 *
 * @author Haixing Hu
 */
describe('validatePersonNameField()', () => {
  const obj = {
    name: '张三',
  };
  test('正确姓名', () => {
    obj.name = '张三';
    let result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = '张张张张张张张张张张张张张张张张张张张张张张张张张张张张张张';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = '阿凡提.穆罕穆德.买买提';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = '䶮㐑㐒㐓㐔㐕';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = 'zhang san';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = 'SS';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = 'S.S';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');

    obj.name = 'S S S';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(true);
    expect(result.description).toBe('');
  });
  test('空姓名', () => {
    obj.name = '';
    let result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写姓名');

    obj.name = null;
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写姓名');

    obj.name = undefined;
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写姓名');

    delete obj.name;
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('请填写姓名');
  });
  test('错误姓名', () => {
    obj.name = '张张张张张张张张张张张张张张张张张张张张张张张张张张张张张张张';
    let result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张张张张张张张张张张张张张张张张张张张张张张张张张张张张张张张的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');

    obj.name = '阿凡提·穆罕穆德·';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('阿凡提·穆罕穆德·的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');

    obj.name = '张 三';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('张 三的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');

    obj.name = 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');

    obj.name = 'S S 张三';
    result = validatePersonNameField(obj.name, { instance: obj });
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('S S 张三的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');
  });
  test('no context', () => {
    obj.name = 'S S 张三';
    const result = validatePersonNameField(obj.name);
    expect(result).toBeInstanceOf(ValidationResult);
    expect(result.success).toBe(false);
    expect(result.description).toBe('S S 张三的姓名格式不正确: 请填写正确的中英文名，中文名中勿加空格');
  });
});
