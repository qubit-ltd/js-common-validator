////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateTimestampField } from '../../src';

/**
 * 单元测试{@link validateTimestampField}。
 *
 * @author 胡海星
 */
describe('validateTimestampField', () => {
  test('undefined, nullable = false', () => {
    const str = undefined;
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写创建时间');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('null, nullable = false', () => {
    const str = null;
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写创建时间');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('"", nullable = false', () => {
    const str = '';
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写创建时间');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('"", nullable = true', () => {
    const str = '';
    const context = {
      label: '创建时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-12", nullable = false', () => {
    const str = ' 2021-01-12';
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(true);
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-01T23:04:55.123Z", nullable = false', () => {
    const str = ' 2021-01-01T23:04:55.123Z';
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(true);
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-01T23:04:55.1z", nullable = false', () => {
    const str = ' 2021-01-01T23:04:55.1z';
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(true);
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-01T23", nullable = false', () => {
    const str = ' 2021-01-01T23';
    const context = {
      label: '创建时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '创建时间格式不正确');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-01T23", nullable = false', () => {
    const str = 123;
    const context = {
      nullable: false,
    };
    const expected = new ValidationResult(false, '时间戳格式不正确');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('" 2021-01-01T23", no context', () => {
    const str = 123;
    const expected = new ValidationResult(false, '时间戳格式不正确');
    expect(validateTimestampField(str)).toEqual(expected);
  });

  test('value = "2021-01-12T12:31:00Z", start = "2021-01-13T14:00:00Z"', () => {
    const str = '2021-01-12T12:31:00Z';
    const context = {
      label: '就诊时间戳',
      nullable: true,
      start: '2021-01-13T14:00:00Z',
    };
    const expected = new ValidationResult(false, '就诊时间戳不能早于2021-01-13T14:00:00Z');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('value = "2021-01-12T12:31:00Z", end = "2021-01-11T10:00:00Z"', () => {
    const str = '2021-01-12T12:31:00Z';
    const context = {
      label: '就诊时间戳',
      nullable: true,
      end: '2021-01-11T10:00:00Z',
    };
    const expected = new ValidationResult(false, '就诊时间戳不能晚于2021-01-11T10:00:00Z');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });

  test('value = "2021-01-12T12:31Z", start = "2021-01-12T10:00:00Z", end = "2021-01-12T14:00:00Z"', () => {
    const str = '2021-01-12T12:31Z';
    const context = {
      label: '就诊时间戳',
      nullable: true,
      start: '2021-01-12T10:00:00Z',
      end: '2021-01-12T14:00:00Z',
    };
    const expected = new ValidationResult(true);
    expect(validateTimestampField(str, context)).toEqual(expected);
  });
  test('value = "2021-02-01 12:21", start = "2021-01-12T10:00:00Z", end = "2021-01-13T10:00:00Z"', () => {
    const str = '2021-02-01 12:21';
    const context = {
      label: '就诊时间戳',
      start: '2021-01-12T10:00:00Z',
      end: '2021-01-13T10:00:00Z',
    };
    const expected = new ValidationResult(false, '就诊时间戳必须在2021-01-12T10:00:00Z和2021-01-13T10:00:00Z之间');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211T10:00:00Z ", no label', () => {
    const str = ' 1991-1-211T10:00:00Z ';
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '时间戳格式不正确');
    expect(validateTimestampField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211T10:00:00Z ", no context', () => {
    const str = ' 1991-1-211T10:00:00Z ';
    const expected = new ValidationResult(false, '时间戳格式不正确');
    expect(validateTimestampField(str)).toEqual(expected);
  });
});
