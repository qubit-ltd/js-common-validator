# @qubit-ltd/common-validator

[![npm package](https://img.shields.io/npm/v/@qubit-ltd/common-validator.svg)](https://npmjs.com/package/@qubit-ltd/common-validator)
[![License](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![中文文档](https://img.shields.io/badge/文档-中文版-blue.svg)](README.zh_CN.md)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/qubit-ltd/js-common-validator/tree/master.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/qubit-ltd/js-common-validator/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/qubit-ltd/js-common-validator/badge.svg?branch=master)](https://coveralls.io/github/qubit-ltd/js-common-validator?branch=master)

[@qubit-ltd/common-validator] is a JavaScript ES6 library of common field validators and validation rules. It provides a comprehensive set of validators for various data types and fields commonly used in web applications.

## Installation

```bash
# Using npm
npm install @qubit-ltd/common-validator

# Using yarn
yarn add @qubit-ltd/common-validator
```

## Features

- Validators for common field types (email, URL, phone, etc.)
- Validators for data types (number, integer, boolean, etc.)
- Date, time and timestamp validation
- Password validation with customizable rules
- Username, personal name validation
- Support for both synchronous and asynchronous validation
- Comprehensive error messages in both English and Chinese
- Support for custom validation rules and error messages

## Usage

The library provides two ways to use validators:

1. **Individual validator functions**: Import specific validation functions
2. **Validator class**: Use the static `Validator` class with all validation methods

### Basic Usage

```javascript
// Method 1: Import individual validators
import { validateEmailField, validatePasswordField } from '@qubit-ltd/common-validator';

// Method 2: Import the Validator class (recommended)
import Validator from '@qubit-ltd/common-validator';

// Validate an email address
const emailResult = validateEmailField('user@example.com');
console.log(emailResult.success);  // true if valid, false if invalid
console.log(emailResult.description);  // Error message if invalid

// Validate a password
const passwordResult = validatePasswordField('Password123!');
console.log(passwordResult.success);
console.log(passwordResult.description);
```

### Validation with Context

```javascript
const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

// Validate with owner name (useful for generating more specific error messages)
const result = validateEmailField(user.email, { 
  instance: user, 
  owner: user.name 
});

if (!result.success) {
  console.log(result.description); // "Please enter John Doe's email address" if empty
}
```

### Using Validator Class

The `Validator` class provides static validation methods for all validators. Each static property references a validation function and can be used directly:

```javascript
import Validator from '@qubit-ltd/common-validator';

// Direct validation using static methods
const emailResult = Validator.email('user@example.com');
const numberResult = Validator.number('123.45');
const boolResult = Validator.bool(true);

// Validate form data
const formData = {
  username: 'johndoe',
  email: 'john.doe@example.com',
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

// Check if all validations passed
const isFormValid = Object.values(validationResults).every(result => result.success);

if (isFormValid) {
  console.log('Form is valid');
} else {
  // Show specific error messages
  Object.entries(validationResults).forEach(([field, result]) => {
    if (!result.success) {
      console.log(`${field}: ${result.description}`);
    }
  });
}
```

### Validator Fields Reference

The `Validator` class provides the following static validation methods:

| Field | Description | Example |
|-------|-------------|---------|
| `alphaNum` | Alphanumeric strings | `Validator.alphaNum('abc123')` |
| `bool` | Boolean values | `Validator.bool(true)` |
| `date` | Date strings (YYYY-MM-DD) | `Validator.date('2023-12-25')` |
| `time` | Time strings (HH:mm:ss) | `Validator.time('14:30:00')` |
| `datetime` | DateTime strings | `Validator.datetime('2023-12-25 14:30:00')` |
| `email` | Email addresses | `Validator.email('user@example.com')` |
| `enum` | Enumeration values | `Validator.enum('ACTIVE', { enumClass: Status })` |
| `number` | Numeric values | `Validator.number('123.45')` |
| `id` | Integer IDs (alias for `int`) | `Validator.id('12345')` |
| `int` | Integer values | `Validator.int('123')` |
| `mobile` | Mobile phone numbers | `Validator.mobile('+1234567890')` |
| `money` | Money amounts (alias for `number`) | `Validator.money('99.99')` |
| `password` | Password validation | `Validator.password('SecurePass123!')` |
| `personName` | Person names | `Validator.personName('John Doe')` |
| `phone` | Phone numbers (alias for `mobile`) | `Validator.phone('+1234567890')` |
| `timestamp` | Unix timestamps | `Validator.timestamp('1640419200')` |
| `upperAlphaNum` | Uppercase alphanumeric | `Validator.upperAlphaNum('ABC123')` |
| `username` | Usernames | `Validator.username('johndoe')` |
| `url` | URLs | `Validator.url('https://example.com')` |

### Advanced Usage with Context

All validators accept an optional context parameter for customizing validation behavior and error messages:

```javascript
// Using context for field labeling
const user = { name: 'John Doe', email: '' };
const emailResult = Validator.email(user.email, {
  instance: user,
  owner: user.name
});
// Result description: "Please enter John Doe's email address"

// Using context for range validation
const ageResult = Validator.int('150', {
  min: 0,
  max: 120
});
// Will fail if age is outside the range

// Using context for enum validation
const statusResult = Validator.enum('ACTIVE', {
  enumClass: {
    ACTIVE: { name: 'Active', value: 1 },
    INACTIVE: { name: 'Inactive', value: 0 }
  }
});
```

### Validation with Decorators

The library integrates with `@Model` and `@Validatable` decorators:

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
user.username = 'johndoe';
user.email = 'invalid-email';
user.age = 25;

// Validate the model
const result = user.validate();
console.log(result.success); // false
console.log(result.description); // Details about email validation failure
```

## Available Validators

- `validateAlphaNumberField`: Validates alphanumeric strings
- `validateBoolField`: Validates boolean values
- `validateDateField`: Validates date strings
- `validateTimeField`: Validates time strings
- `validateDateTimeField`: Validates datetime strings
- `validateEmailField`: Validates email addresses
- `validateEnumField`: Validates values in an enumeration
- `validateNumberField`: Validates numeric values
- `validateIntegerField`: Validates integer values
- `validateMobileField`: Validates mobile phone numbers
- `validatePasswordField`: Validates passwords
- `validatePersonNameField`: Validates person names
- `validatePhoneField`: Validates phone numbers
- `validateTimestampField`: Validates timestamps
- `validateUppercaseAlphaNumberField`: Validates uppercase alphanumeric strings
- `validateUrlField`: Validates URLs
- `validateUsernameField`: Validates usernames
- `validateFieldByRule`: Validates a field based on a validation rule

## <span id="contributing">Contributing</span>

If you find any issues or have suggestions for improvements, please feel free
to open an issue or submit a pull request to the [GitHub repository].

## <span id="license">License</span>

[@qubit-ltd/common-validator] is distributed under the Apache 2.0 license.
See the [LICENSE](LICENSE) file for more details.

[@qubit-ltd/common-validator]: https://npmjs.com/package/@qubit-ltd/common-validator
[GitHub repository]: https://github.com/qubit-ltd/js-common-validator
