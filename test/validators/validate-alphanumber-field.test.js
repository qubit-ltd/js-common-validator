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
 * 单元测试{@link Validator.alphaNum}。
 *
 * @author 胡海星
 */
describe('Validator.alphaNum', () => {
  test('undefined, allowEmpty = false', () => {
    const str = undefined;
    const context = {
      label: '发票号',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写发票号');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = false', () => {
    const str = null;
    const context = {
      label: '发票号',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写发票号');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = false', () => {
    const str = '';
    const context = {
      label: '发票号',
      nullable: false,
    };
    const expected = new ValidationResult(false, '请填写发票号');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('undefined, allowEmpty = true', () => {
    const str = undefined;
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('null, allowEmpty = true', () => {
    const str = null;
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"", allowEmpty = true', () => {
    const str = '';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"123"', () => {
    const str = '123';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  -123  "', () => {
    const str = '  -123  ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  +123  "', () => {
    const str = '  +123  ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"123.3"', () => {
    const str = '123.3';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('" +.123"', () => {
    const str = ' +.123';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"-123. "', () => {
    const str = '-123. ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  123.3E-1"', () => {
    const str = '  123.3E-1';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  123.3e+23 "', () => {
    const str = '  123.3e+23 ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  1a23.3e+23 "', () => {
    const str = '  1a23.3e+23 ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(false, '发票号格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  NaN "', () => {
    const str = '  NaN ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"  Infinity "', () => {
    const str = '  Infinity ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });

  test('"abc"', () => {
    const str = 'abc';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('" A12cA  "', () => {
    const str = ' A12cA  ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });
  test('"32010312938AX "', () => {
    const str = '32010312938AX ';
    const context = {
      label: '发票号',
      nullable: true,
    };
    const expected = new ValidationResult(true);
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });

  test('"  1a23.3e+23 ", no label', () => {
    const str = '  1a23.3e+23 ';
    const context = {
      nullable: true,
    };
    const expected = new ValidationResult(false, '格式不正确');
    expect(Validator.alphaNum(str, context)).toEqual(expected);
  });

  test('"  1a23.3e+23 ", no context', () => {
    const str = '  1a23.3e+23 ';
    const expected = new ValidationResult(false, '格式不正确');
    expect(Validator.alphaNum(str)).toEqual(expected);
  });
});
