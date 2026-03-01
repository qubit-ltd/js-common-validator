////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateTimeField } from '../../src';

/**
 * 单元测试{@link validateTimeField}。
 *
 * @author 胡海星
 */
describe('validateTimeField', () => {
  test('undefined, allowEmpty = false', () => {
    const str = undefined;
    const context = {
      label: '就诊时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊时间');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const str = null;
    const context = {
      label: '就诊时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊时间');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const str = '';
    const context = {
      label: '就诊时间',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊时间');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const str = undefined;
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const str = null;
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const str = '';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('"10:21:01"', () => {
    const str = '10:21:01';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"  10:21:01  "', () => {
    const str = '  10:21:01  ';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"  03:21  "', () => {
    const str = '  03:21  ';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('" 14:32:61 "', () => {
    const str = ' 14:32:61 ';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊时间格式不正确');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"  14/32/51 "', () => {
    const str = ' 14/32/51 ';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊时间格式不正确');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('"24:23:00 "', () => {
    const str = '24:23:00 ';
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊时间格式不正确');
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('object, nullable = true', () => {
    const str = {};
    const context = {
      label: '就诊时间',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊时间格式不正确');
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('value = "12:21:32", start = "14:00:00"', () => {
    const str = '12:21:32';
    const context = {
      label: '就诊时间',
      nullable: true,
      start: '14:00:00',
    };
    const expected = new ValidationResult(false, '就诊时间不能早于14:00:00');
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('value = "12:21:32", end = "10:30"', () => {
    const str = '12:21:32';
    const context = {
      label: '就诊时间',
      nullable: true,
      end: '10:30',
    };
    const expected = new ValidationResult(false, '就诊时间不能晚于10:30');
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('value = "12:21:32", start = "9:00", end = "15:00"', () => {
    const str = '12:21:32';
    const context = {
      label: '就诊时间',
      nullable: true,
      start: '9:00',
      end: '15:00',
    };
    const expected = new ValidationResult(true);
    expect(validateTimeField(str, context)).toEqual(expected);
  });
  test('value = "12:21:32", start = "9:00", end = "12:00"', () => {
    const str = '12:21:32';
    const context = {
      label: '就诊时间',
      start: '9:00',
      end: '12:00',
    };
    const expected = new ValidationResult(false, '就诊时间必须在9:00和12:00之间');
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('" 12:21:323 ", no label', () => {
    const str = ' 12:21:323 ';
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '时间格式不正确');
    expect(validateTimeField(str, context)).toEqual(expected);
  });

  test('" 12:21:323 ", no context', () => {
    const str = ' 12:21:323 ';
    const expected = new ValidationResult(false, '时间格式不正确');
    expect(validateTimeField(str)).toEqual(expected);
  });
});
