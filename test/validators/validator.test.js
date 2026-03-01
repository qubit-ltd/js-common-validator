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
import Gender from './model/gender';
import Status from './model/Status';
import TestUser from './model/TestUser';

/**
 * 单元测试{@link Validator}类。
 *
 * @author 胡海星
 */
describe('Validator', () => {
  describe('Basic validation tests', () => {
    test('Validator should be a class', () => {
      expect(typeof Validator).toBe('function');
      expect(Validator.prototype).toBeDefined();
    });

    test('All validation methods should be static', () => {
      const methods = [
        'alphaNum', 'bool', 'date', 'time', 'datetime', 'email', 'enum',
        'number', 'id', 'int', 'mobile', 'money', 'password', 'personName',
        'phone', 'timestamp', 'upperAlphaNum', 'username', 'url',
      ];

      methods.forEach((method) => {
        expect(typeof Validator[method]).toBe('function');
        expect(Validator.prototype[method]).toBeUndefined();
      });
    });
  });

  describe('alphaNum validation', () => {
    test('Valid alphanumeric string', () => {
      const result = Validator.alphaNum('abc123', { label: '编号', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid non-alphanumeric string', () => {
      const result = Validator.alphaNum('abc@123', { label: '编号', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Null value with nullable false', () => {
      const result = Validator.alphaNum(null, { label: '编号', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Null value with nullable true', () => {
      const result = Validator.alphaNum(null, { label: '编号', nullable: true });
      expect(result).toEqual(new ValidationResult(true));
    });
  });

  describe('bool validation', () => {
    test('Valid boolean true', () => {
      const result = Validator.bool(true, { label: '激活状态', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid boolean false', () => {
      const result = Validator.bool(false, { label: '激活状态', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid string "true"', () => {
      const result = Validator.bool('true', { label: '激活状态', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid string "false"', () => {
      const result = Validator.bool('false', { label: '激活状态', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid string', () => {
      const result = Validator.bool('invalid', { label: '激活状态', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('email validation', () => {
    test('Valid email', () => {
      const result = Validator.email('test@example.com', { label: '邮箱', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid email without @', () => {
      const result = Validator.email('testexample.com', { label: '邮箱', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Invalid email without domain', () => {
      const result = Validator.email('test@', { label: '邮箱', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('number validation', () => {
    test('Valid number', () => {
      const result = Validator.number(123.45, { label: '金额', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid number string', () => {
      const result = Validator.number('123.45', { label: '金额', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid string', () => {
      const result = Validator.number('abc', { label: '金额', nullable: false });
      expect(result.success).toBe(false);
    });

    test('NaN', () => {
      const result = Validator.number(NaN, { label: '金额', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Infinity', () => {
      const result = Validator.number(Infinity, { label: '金额', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('integer validation', () => {
    test('Valid integer', () => {
      const result = Validator.int(123, { label: '年龄', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid integer string', () => {
      const result = Validator.int('123', { label: '年龄', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid decimal', () => {
      const result = Validator.int(123.45, { label: '年龄', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Invalid decimal string', () => {
      const result = Validator.int('123.45', { label: '年龄', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('enum validation', () => {
    test('Valid enum value by name', () => {
      const result = Validator.enum('MALE', {
        label: '性别',
        nullable: false,
        type: Gender,
      });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid Status enum value', () => {
      const result = Validator.enum('ACTIVE', {
        label: '状态',
        nullable: false,
        type: Status,
      });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid enum value', () => {
      const result = Validator.enum('invalid', {
        label: '性别',
        nullable: false,
        type: Gender,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('date validation', () => {
    test('Valid date', () => {
      const result = Validator.date('2023-12-25', { label: '日期', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid date format', () => {
      const result = Validator.date('25/12/2023', { label: '日期', nullable: false });
      expect(result.success).toBe(false);
    });

    test('Invalid date', () => {
      const result = Validator.date('2023-1-211', { label: '日期', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('time validation', () => {
    test('Valid time', () => {
      const result = Validator.time('14:30:00', { label: '时间', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid time without seconds', () => {
      const result = Validator.time('14:30', { label: '时间', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid time format', () => {
      const result = Validator.time('2:30 PM', { label: '时间', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('datetime validation', () => {
    test('Valid datetime', () => {
      const result = Validator.datetime('2023-12-25 14:30:00', { label: '日期时间', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid datetime with space', () => {
      const result = Validator.datetime('2023-12-25 14:30:00', { label: '日期时间', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid datetime', () => {
      const result = Validator.datetime('invalid datetime', { label: '日期时间', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('mobile validation', () => {
    test('Valid mobile number', () => {
      const result = Validator.mobile('13812345678', { label: '手机号', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid mobile number', () => {
      const result = Validator.mobile('1234567890', { label: '手机号', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('url validation', () => {
    test('Valid HTTP URL', () => {
      const result = Validator.url('http://example.com', { label: 'URL', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Valid HTTPS URL', () => {
      const result = Validator.url('https://example.com', { label: 'URL', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid URL', () => {
      const result = Validator.url('not-a-url', { label: 'URL', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('upperAlphaNum validation', () => {
    test('Valid uppercase alphanumeric string', () => {
      const result = Validator.upperAlphaNum('ABC123', { label: '代码', nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Invalid lowercase in string', () => {
      const result = Validator.upperAlphaNum('Abc123', { label: '代码', nullable: false });
      expect(result.success).toBe(false);
    });
  });

  describe('Alias validations', () => {
    test('id should work same as int', () => {
      const intResult = Validator.int(123, { label: 'ID', nullable: false });
      const idResult = Validator.id(123, { label: 'ID', nullable: false });
      expect(idResult).toEqual(intResult);
    });

    test('money should work same as number', () => {
      const numberResult = Validator.number(123.45, { label: '金额', nullable: false });
      const moneyResult = Validator.money(123.45, { label: '金额', nullable: false });
      expect(moneyResult).toEqual(numberResult);
    });

    test('phone should work same as mobile', () => {
      const mobileResult = Validator.mobile('13812345678', { label: '手机号', nullable: false });
      const phoneResult = Validator.phone('13812345678', { label: '手机号', nullable: false });
      expect(phoneResult).toEqual(mobileResult);
    });
  });

  describe('Integration with @Model and @Validatable', () => {
    test('TestUser model with valid data', () => {
      const user = new TestUser();
      user.username = 'testuser';
      user.password = 'Password123!';
      user.email = 'test@example.com';
      user.mobile = '13812345678';
      user.age = 25;
      user.height = 1.75;
      user.name = '张三';
      user.gender = 'MALE';
      user.status = 'ACTIVE';
      user.active = true;
      user.registerDate = '2023-12-25';
      user.registerTime = '14:30:00';
      user.registerDateTime = '2023-12-25 14:30:00';
      user.lastLoginTimestamp = '2023-12-25T14:30:00Z';
      user.homepage = 'https://example.com';
      user.code = 'ABC123';
      user.upperCode = 'XYZ789';
      user.phone = '13987654321';
      user.id = 1001;
      user.balance = 1000.50;

      // 验证用户名
      const usernameResult = user.validate('username');
      expect(usernameResult.success).toBe(true);

      // 验证邮箱
      const emailResult = user.validate('email');
      expect(emailResult.success).toBe(true);

      // 验证手机号
      const mobileResult = user.validate('mobile');
      expect(mobileResult.success).toBe(true);

      // 验证年龄
      const ageResult = user.validate('age');
      expect(ageResult.success).toBe(true);

      // 验证所有字段
      const allResult = user.validate();
      expect(allResult.success).toBe(true);
    });

    test('TestUser model with invalid data', () => {
      const user = new TestUser();
      user.username = ''; // 空用户名
      user.password = '123'; // 密码太简单
      user.email = 'invalid-email'; // 无效邮箱
      user.mobile = '123456'; // 无效手机号
      user.age = 'invalid'; // 无效年龄
      user.name = ''; // 空姓名

      // 验证用户名应该失败
      const usernameResult = user.validate('username');
      expect(usernameResult.success).toBe(false);

      // 验证密码应该失败
      const passwordResult = user.validate('password');
      expect(passwordResult.success).toBe(false);

      // 验证邮箱应该失败
      const emailResult = user.validate('email');
      expect(emailResult.success).toBe(false);

      // 验证手机号应该失败
      const mobileResult = user.validate('mobile');
      expect(mobileResult.success).toBe(false);

      // 验证年龄应该失败
      const ageResult = user.validate('age');
      expect(ageResult.success).toBe(false);

      // 验证姓名应该失败
      const nameResult = user.validate('name');
      expect(nameResult.success).toBe(false);
    });

    test('TestUser with nullable fields set to null', () => {
      const user = new TestUser();
      user.username = 'testuser';
      user.password = 'Password123!';
      user.name = '张三';
      // 其他nullable字段保持null

      // 验证必填字段
      const usernameResult = user.validate('username');
      expect(usernameResult.success).toBe(true);

      const passwordResult = user.validate('password');
      expect(passwordResult.success).toBe(true);

      const nameResult = user.validate('name');
      expect(nameResult.success).toBe(true);

      // 验证可空字段
      const emailResult = user.validate('email');
      expect(emailResult.success).toBe(true);

      const mobileResult = user.validate('mobile');
      expect(mobileResult.success).toBe(true);

      const ageResult = user.validate('age');
      expect(ageResult.success).toBe(true);
    });

    test('Enum validation with model', () => {
      const user = new TestUser();
      user.gender = 'FEMALE';
      user.status = 'PENDING';

      // 验证性别枚举
      const genderResult = user.validate('gender');
      expect(genderResult.success).toBe(true);

      // 验证状态枚举
      const statusResult = user.validate('status');
      expect(statusResult.success).toBe(true);

      // 测试无效枚举值
      user.gender = 'invalid';
      const invalidGenderResult = user.validate('gender');
      expect(invalidGenderResult.success).toBe(false);

      user.status = 'invalid';
      const invalidStatusResult = user.validate('status');
      expect(invalidStatusResult.success).toBe(false);
    });
  });

  describe('Context parameter validation', () => {
    test('Validation with owner context', () => {
      const result = Validator.email('invalid-email', {
        label: '邮箱',
        owner: '用户',
        nullable: false,
      });
      expect(result.success).toBe(false);
      expect(result.description).toContain('用户');
    });

    test('Validation without context', () => {
      const result = Validator.email('test@example.com');
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Validation with partial context', () => {
      const result = Validator.number(123.45, { nullable: false });
      expect(result).toEqual(new ValidationResult(true));
    });
  });

  describe('Range validation', () => {
    test('Number with valid range', () => {
      const result = Validator.number(50, {
        label: '年龄',
        nullable: false,
        start: 0,
        end: 100,
      });
      expect(result).toEqual(new ValidationResult(true));
    });

    test('Number below range', () => {
      const result = Validator.number(-10, {
        label: '年龄',
        nullable: false,
        start: 0,
        end: 100,
      });
      expect(result.success).toBe(false);
    });

    test('Number above range', () => {
      const result = Validator.number(150, {
        label: '年龄',
        nullable: false,
        start: 0,
        end: 100,
      });
      expect(result.success).toBe(false);
    });
  });
});
