////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateDateField } from '../../src';

/**
 * 单元测试{@link validateDateField}。
 *
 * @author 胡海星
 */
describe('validateDateField', () => {
  test('undefined, allowEmpty = false', () => {
    const str = undefined;
    const context = {
      label: '就诊日期',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const str = null;
    const context = {
      label: '就诊日期',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const str = '';
    const context = {
      label: '就诊日期',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请选择或填写就诊日期');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const str = undefined;
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const str = null;
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const str = '';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('"2021-01-12"', () => {
    const str = '2021-01-12';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"  2021-11-32  "', () => {
    const str = '  2021-11-32  ';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"  1990-1-1  "', () => {
    const str = '  1990-1-1  ';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 "', () => {
    const str = ' 1991-1-211 ';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期格式不正确');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"  1991-111-11 "', () => {
    const str = ' 1991-111-11 ';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期格式不正确');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('"199-01-01 "', () => {
    const str = '199-01-01 ';
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期格式不正确');
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('object, nullable = true', () => {
    const str = {};
    const context = {
      label: '就诊日期',
      nullable: true,
    };
    const expected = new ValidationResult(false, '就诊日期格式不正确');
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('value = "2021-01-12", start = "2021-01-13"', () => {
    const str = '2021-01-12';
    const context = {
      label: '就诊日期',
      nullable: true,
      start: '2021-01-13',
    };
    const expected = new ValidationResult(false, '就诊日期不能早于2021-01-13');
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('value = "2021-01-12", end = "2021-01-11"', () => {
    const str = '2021-01-12';
    const context = {
      label: '就诊日期',
      nullable: true,
      end: '2021-01-11',
    };
    const expected = new ValidationResult(false, '就诊日期不能晚于2021-01-11');
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('value = "2021-01-12", start = "2021-01-12", end = "2021-01-13"', () => {
    const str = '2021-01-12';
    const context = {
      label: '就诊日期',
      nullable: true,
      start: '2021-01-12',
      end: '2021-01-13',
    };
    const expected = new ValidationResult(true);
    expect(validateDateField(str, context)).toEqual(expected);
  });
  test('value = "2021-02-01", start = "2021-01-12", end = "2021-01-13"', () => {
    const str = '2021-02-01';
    const context = {
      label: '就诊日期',
      start: '2021-01-12',
      end: '2021-01-13',
    };
    const expected = new ValidationResult(false, '就诊日期必须在2021-01-12和2021-01-13之间');
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 ", no label', () => {
    const str = ' 1991-1-211 ';
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '日期格式不正确');
    expect(validateDateField(str, context)).toEqual(expected);
  });

  test('" 1991-1-211 ", no context', () => {
    const str = ' 1991-1-211 ';
    const expected = new ValidationResult(false, '日期格式不正确');
    expect(validateDateField(str)).toEqual(expected);
  });
});
