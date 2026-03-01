////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateDateTimeField } from '../../src';

/**
 * 单元测试{@link validateDateTimeField}。
 *
 * @author 胡海星
 */
describe('validateDateTimeField', () => {
  test('undefined, allowEmpty = false', () => {
    const str = undefined;
    const context = {
      label: '就诊日期时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期时间');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const str = null;
    const context = {
      label: '就诊日期时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期时间');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const str = '';
    const context = {
      label: '就诊日期时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期时间');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const str = undefined;
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const str = null;
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const str = '';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('"2021-01-12 12:21:32"', () => {
    const str = '2021-01-12 12:21:32';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"  2021-11-31 12:21:32  "', () => {
    const str = '  2021-11-31 12:21:32 ';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"  1990-1-1 12:21:32  "', () => {
    const str = '  1990-1-1 12:21:32  ';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 12:21:32 "', () => {
    const str = ' 1991-1-211 12:21:32 ';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期时间格式不正确');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"  1991-11-11 12:61:32 "', () => {
    const str = ' 1991-11-11 12:61:32 ';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期时间格式不正确');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('"1999-01-01 12:61 "', () => {
    const str = '1999-01-01 12:61 ';
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期时间格式不正确');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('object, nullable = true', () => {
    const str = {};
    const context = {
      label: '就诊日期时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期时间格式不正确');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('value = "2021-01-12 12:31", start = "2021-01-13 14:00"', () => {
    const str = '2021-01-12 12:31';
    const context = {
      label: '就诊日期时间',
      nullable: true,
      start: '2021-01-13 14:00',
    };
    const expected = new ValidationResult(false, '就诊日期时间不能早于2021-01-13 14:00');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('value = "2021-01-12 12:31", end = "2021-01-11 10:00"', () => {
    const str = '2021-01-12 12:31';
    const context = {
      label: '就诊日期时间',
      nullable: true,
      end: '2021-01-11 10:00',
    };
    const expected = new ValidationResult(false, '就诊日期时间不能晚于2021-01-11 10:00');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('value = "2021-01-12 12:31", start = "2021-01-12 10:00:00", end = "2021-01-12 14:00:00"', () => {
    const str = '2021-01-12 12:31';
    const context = {
      label: '就诊日期时间',
      nullable: true,
      start: '2021-01-12 10:00:00',
      end: '2021-01-12 14:00:00',
    };
    const expected = new ValidationResult(true);
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });
  test('value = "2021-02-01 12:21", start = "2021-01-12 10:00:00", end = "2021-01-13 10:00:00"', () => {
    const str = '2021-02-01 12:21';
    const context = {
      label: '就诊日期时间',
      start: '2021-01-12 10:00:00',
      end: '2021-01-13 10:00:00',
    };
    const expected = new ValidationResult(false, '就诊日期时间必须在2021-01-12 10:00:00和2021-01-13 10:00:00之间');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 10:00:00 ", no label', () => {
    const str = ' 1991-1-211 10:00:00 ';
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '日期时间格式不正确');
    expect(validateDateTimeField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 10:00:00 ", no context', () => {
    const str = ' 1991-1-211 10:00:00 ';
    const expected = new ValidationResult(false, '日期时间格式不正确');
    expect(validateDateTimeField(str)).toEqual(expected);
  });
});
