# @qubit-ltd/common-validator

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/common-validator.svg)](https://npmjs.com/package/@qubit-ltd/common-validator)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![English](https://img.shields.io/badge/docs-English-blue.svg)](README.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/js-common-validator/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/js-common-validator/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/qubit-ltd/js-common-validator/badge.svg?branch=master)](https://coveralls.io/github/qubit-ltd/js-common-validator?branch=master)

[@qubit-ltd/common-validator] 是一个JavaScript ES6库，提供常用字段验证器和验证规则。它为Web应用中常用的各种数据类型和字段提供了全面的验证功能。

## 安装

```bash
# 使用 npm
npm install @qubit-ltd/common-validator

# 使用 yarn
yarn add @qubit-ltd/common-validator
```

## 特性

- 常见字段类型验证器（电子邮件、URL、电话等）
- 数据类型验证器（数字、整数、布尔值等）
- 日期、时间和时间戳验证
- 带有可自定义规则的密码验证
- 用户名、个人姓名验证
- 支持同步和异步验证
- 全面的中英文错误提示信息
- 支持自定义验证规则和错误信息

## 使用方法

该库提供两种使用验证器的方式：

1. **单独的验证器函数**：导入特定的验证函数
2. **Validator类**：使用包含所有验证方法的静态 `Validator` 类

### 基本用法

```javascript
// 方法1：导入单独的验证器
import { validateEmailField, validatePasswordField } from '@qubit-ltd/common-validator';

// 方法2：导入Validator类（推荐）
import Validator from '@qubit-ltd/common-validator';

// 验证电子邮件地址
const emailResult = validateEmailField('user@example.com');
console.log(emailResult.success);  // 验证通过为true，失败为false
console.log(emailResult.description);  // 验证失败时的错误信息

// 验证密码
const passwordResult = validatePasswordField('Password123!');
console.log(passwordResult.success);
console.log(passwordResult.description);
```

### 带上下文的验证

```javascript
const user = {
  name: '张三',
  email: 'zhangsan@example.com',
};

// 使用所有者名称进行验证（用于生成更具体的错误信息）
const result = validateEmailField(user.email, { 
  instance: user, 
  owner: user.name 
});

if (!result.success) {
  console.log(result.description); // 如果为空，将显示"请填写张三的电子邮件地址"
}
```

### 使用Validator类

`Validator` 类提供了所有验证器的静态方法。每个静态属性都引用一个验证函数，可以直接使用：

```javascript
import Validator from '@qubit-ltd/common-validator';

// 使用静态方法直接验证
const emailResult = Validator.email('user@example.com');
const numberResult = Validator.number('123.45');
const boolResult = Validator.bool(true);

// 验证表单数据
const formData = {
  username: 'zhangsan',
  email: 'zhangsan@example.com',
  password: 'Password123!',
  age: '25',
  gender: 'MALE'
};

const validationResults = {
  username: Validator.username(formData.username),
  email: Validator.email(formData.email),
  password: Validator.password(formData.password),
  age: Validator.int(formData.age),
  gender: Validator.enum(formData.gender, { enumClass: ['MALE', 'FEMALE'] })
};

// 检查所有验证是否通过
const isFormValid = Object.values(validationResults).every(result => result.success);

if (isFormValid) {
  console.log('表单验证通过');
} else {
  // 显示具体的错误信息
  Object.entries(validationResults).forEach(([field, result]) => {
    if (!result.success) {
      console.log(`${field}: ${result.description}`);
    }
  });
}
```

### Validator字段参考

`Validator` 类提供以下静态验证方法：

| 字段 | 描述 | 示例 |
|------|------|------|
| `alphaNum` | 字母数字字符串 | `Validator.alphaNum('abc123')` |
| `bool` | 布尔值 | `Validator.bool(true)` |
| `date` | 日期字符串 (YYYY-MM-DD) | `Validator.date('2023-12-25')` |
| `time` | 时间字符串 (HH:mm:ss) | `Validator.time('14:30:00')` |
| `datetime` | 日期时间字符串 | `Validator.datetime('2023-12-25 14:30:00')` |
| `email` | 电子邮件地址 | `Validator.email('user@example.com')` |
| `enum` | 枚举值 | `Validator.enum('ACTIVE', { enumClass: Status })` |
| `number` | 数字值 | `Validator.number('123.45')` |
| `id` | 整数ID (`int`的别名) | `Validator.id('12345')` |
| `int` | 整数值 | `Validator.int('123')` |
| `mobile` | 手机号码 | `Validator.mobile('+1234567890')` |
| `money` | 金额 (`number`的别名) | `Validator.money('99.99')` |
| `password` | 密码验证 | `Validator.password('SecurePass123!')` |
| `personName` | 个人姓名 | `Validator.personName('张三')` |
| `phone` | 电话号码 (`mobile`的别名) | `Validator.phone('+1234567890')` |
| `timestamp` | Unix时间戳 | `Validator.timestamp('1640419200')` |
| `upperAlphaNum` | 大写字母数字 | `Validator.upperAlphaNum('ABC123')` |
| `username` | 用户名 | `Validator.username('zhangsan')` |
| `url` | URL地址 | `Validator.url('https://example.com')` |

### 高级用法与上下文

所有验证器都接受可选的上下文参数，用于自定义验证行为和错误信息：

```javascript
// 使用上下文进行字段标记
const user = { name: '张三', email: '' };
const emailResult = Validator.email(user.email, {
  instance: user,
  owner: user.name
});
// 结果描述："请填写张三的电子邮件地址"

// 使用上下文进行范围验证
const ageResult = Validator.int('150', {
  min: 0,
  max: 120
});
// 如果年龄超出范围将验证失败

// 使用上下文进行枚举验证
const statusResult = Validator.enum('ACTIVE', {
  enumClass: {
    ACTIVE: { name: '激活', value: 1 },
    INACTIVE: { name: '未激活', value: 0 }
  }
});
```

### 装饰器验证

该库与 `@Model` 和 `@Validatable` 装饰器集成：

```javascript
import { Model, Validatable } from '@qubit-ltd/common-decorator';

@Model
class User {
  @Validatable(Validator.username)
  username = '';
  
  @Validatable(Validator.email)
  email = '';
  
  @Validatable(Validator.int, { min: 0, max: 120 })
  age = 0;
  
  @Validatable(Validator.enum, { enumClass: Gender })
  gender = '';
}

const user = new User();
user.username = 'zhangsan';
user.email = 'invalid-email';
user.age = 25;

// 验证模型
const result = user.validate();
console.log(result.success); // false
console.log(result.description); // 关于邮件验证失败的详细信息
```

## 可用的验证器

- `validateAlphaNumberField`: 验证字母数字字符串
- `validateBoolField`: 验证布尔值
- `validateDateField`: 验证日期字符串
- `validateTimeField`: 验证时间字符串
- `validateDateTimeField`: 验证日期时间字符串
- `validateEmailField`: 验证电子邮件地址
- `validateEnumField`: 验证枚举值
- `validateNumberField`: 验证数字值
- `validateIntegerField`: 验证整数值
- `validateMobileField`: 验证手机号码
- `validatePasswordField`: 验证密码
- `validatePersonNameField`: 验证个人姓名
- `validatePhoneField`: 验证电话号码
- `validateTimestampField`: 验证时间戳
- `validateUppercaseAlphaNumberField`: 验证大写字母数字字符串
- `validateUrlField`: 验证URL
- `validateUsernameField`: 验证用户名
- `validateFieldByRule`: 基于验证规则验证字段

## <span id="contributing">贡献</span>

如果您发现任何问题或有改进建议，请随时在[GitHub仓库]中提出issue或提交pull request。

## <span id="license">许可证</span>

[@qubit-ltd/common-validator] 采用 Apache 2.0 许可证分发。
有关更多详细信息，请参阅 [LICENSE](LICENSE) 文件。

[@qubit-ltd/common-validator]: https://npmjs.com/package/@qubit-ltd/common-validator
[GitHub仓库]: https://github.com/qubit-ltd/js-common-validator 