////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import { validateNumberField } from '../../src';

/**
 * 单元测试{@link validateNumberField}。
 *
 * @author 胡海星
 */
describe('validateNumberField', () => {
  test('undefined, allowEmpty = false', () => {
    const str = undefined;
    const context = {
      label: '金额',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写金额');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const str = null;
    const context = {
      label: '金额',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写金额');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const str = '';
    const context = {
      label: '金额',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写金额');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const str = undefined;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const str = null;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const str = '';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"123"', () => {
    const str = '123';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"123.3"', () => {
    const str = '123.3';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('" +.123"', () => {
    const str = ' +.123';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"-123. "', () => {
    const str = '-123. ';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"  123.3E-1"', () => {
    const str = '  123.3E-1';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"  123.3e+23 "', () => {
    const str = '  123.3e+23 ';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"  1a23.3e+23 "', () => {
    const str = '  1a23.3e+23 ';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"  NaN "', () => {
    const str = '  NaN ';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('"  Infinity "', () => {
    const str = '  Infinity ';
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });

  test('123', () => {
    const str = 123;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('123.', () => {
    const str = 123.0;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('-123.34', () => {
    const str = -123.34;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('-123.34e-1', () => {
    const str = -123.34e-1;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('NaN', () => {
    const str = NaN;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('Infinity', () => {
    const str = Infinity;
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('object, allowEmpty = false', () => {
    const str = {};
    const context = {
      label: '金额',
      nullable: true,
    };
    const expected = new ValidationResult(false, '金额格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('object, allowEmpty = false, no label', () => {
    const str = {};
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '数值格式不正确');
    expect(validateNumberField(str, context)).toEqual(expected);
  });
  test('object, no context', () => {
    const str = '';
    const expected = new ValidationResult(false, '请填写数值');
    expect(validateNumberField(str)).toEqual(expected);
  });
});
