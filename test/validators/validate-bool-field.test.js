////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import Validator from '../../src';

/**
 * 单元测试{@link Validator.bool}。
 *
 * @author 胡海星
 */
describe('Validator.bool', () => {
  test('undefined, allowEmpty = false', () => {
    const val = undefined;
    const context = {
      label: '是否参与',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写是否参与');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const val = null;
    const context = {
      label: '是否参与',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写是否参与');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const val = '';
    const context = {
      label: '是否参与',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写是否参与');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const val = undefined;
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const val = null;
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const val = '';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"true"', () => {
    const val = 'true';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"  FalsE  "', () => {
    const val = '  FalsE  ';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"  TRUE  "', () => {
    const val = '  TRUE  ';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"False."', () => {
    const val = 'False.';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(false, '是否参与格式不正确');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('" xxx"', () => {
    const val = ' xxx';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(false, '是否参与格式不正确');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('"false. "', () => {
    const val = 'false. ';
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(false, '是否参与格式不正确');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('true', () => {
    const val = true;
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('false', () => {
    const val = false;
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('Boolean(true)', () => {
    const val = Boolean(true);
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('Boolean(false)', () => {
    const val = Boolean(false);
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('object, allowEmpty = false', () => {
    const val = {};
    const context = {
      label: '是否参与',
      nullable: true,
    };
    const expected = new ValidationResult(false, '是否参与格式不正确');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('object, allowEmpty = false, no label', () => {
    const val = {};
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '布尔值格式不正确');
    expect(Validator.bool(val, context)).toEqual(expected);
  });
  test('object, allowEmpty = false, no context', () => {
    const val = {};
    const expected = new ValidationResult(false, '布尔值格式不正确');
    expect(Validator.bool(val)).toEqual(expected);
  });
});
