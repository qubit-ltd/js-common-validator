////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { ValidationResult } from '@qubit-ltd/validation-rule';
import checkLength from './impl/check-length';
import withinRange from './impl/within-range';

/**
 * Use the specified validation rule to validate a field.
 *
 * @param {any} value
 *     The field value to be verified.
 * @param {object} rule
 *     The rule object used for verification. The object must provide a
 *     `isValid()` function to verify whether a string value conforms to the
 *     rule.
 * @param {Object} context
 *     The validation context, which is the context object provided by the
 *     second argument of the validator function. It may have the following
 *     properties:
 *     - `instance: object`: the object to which the field belongs.
 *     - `owner: string|undefined`: the name of the owner (a person) of the field.
 *     - `field: string`: the name of the field to be validated.
 *     - `type: function`: the constructor of the field to be validated. If the
 *        field is decorated by the `@Type` decorator, this property is the
 *        argument of the decorator, otherwise it is the constructor of the
 *        default value of the field. If the default value of the field is
 *        `null` or `undefined`, this property is set to `undefined`.
 *     - `label: string`: the display label of the field to be validated.
 *     - `nullable: boolean`: whether the field to be validated is nullable.
 *     - `nonEmpty: boolean`: whether the field to be validated is non-empty.
 *     - `minLength: number`: the optional minimum length of the field value.
 *       If this property is provided, the field value must have at least this
 *       length.
 *     - `maxLength: number`: the optional maximum length of the field value.
 *       If this property is provided, the field value must have at most this
 *       length.
 *     - `start: any`: the optional start value of the field to be validated. If
 *        this property is provided, the field value must be greater than or equal
 *        to this value.
 *     - `end: any`: the optional end value of the field to be validated. If this
 *        property is provided, the field value must be less than or equal to this
 *        value.
 *     - `comparator: function`: the optional comparison function used to compare the
 *       field value with the `start` and `end` values. If this property is provided,
 *       the `start` and `end` properties will be compared with the field value by
 *       this function. The comparison function must have the following signature:
 *       `function compare(lhs: any, rhs: any): number`, and it must return a negative
 *       number if `lhs` is less than `rhs`, a positive number if `lhs` is greater
 *       than `rhs`, or zero if `lhs` is equal to `rhs`. If this property is not
 *       provided, the default less than operator will be used.
 *     - `nullMessage`: the error message to display if the field value is nullish
 *       but it is not nullable. This could be a message template, containing the
 *       `${whose}` and `${label}` placeholders. If it is not provided, the default
 *       message will be used.
 *     - `invalidMessage`: the error message to display if the field value is invalid
 *       according to the validation rule. This could be a message template, containing
 *       the `{whose}` and `{label}` placeholders. If it is not provided, the default
 *       message will be used.
 *     - `tooShortMessage`: the error message to display if the field value is shorter
 *       than the specified minimum length. This could be a message template, containing
 *       the `{whose}`, `{label}`, and `{min}` placeholders. If it is not provided, the
 *       default message will be used.
 *     - `tooLongMessage`: the error message to display if the field value is longer
 *       than the specified maximum length. This could be a message template, containing
 *       the `{whose}`, `{label}`, and `{max}` placeholders. If it is not provided, the
 *       default message will be used.
 *     - `outOfRangeMessage`: the error message to display if the field value is out of
 *       the specified range. This could be a message template, containing the `{whose}`,
 *       `{label}`, `{start}`, and `{end}` placeholders. If it is not provided, the default
 *       message will be used.
 *     - `beforeStartMessage`: the error message to display if the field value is less than
 *       the specified start value. This could be a message template, containing the `{whose}`,
 *       `{label}`, and `{start}` placeholders. If it is not provided, the default message
 *       will be used.
 *     - `afterEndMessage`: the error message to display if the field value is greater than
 *       the specified end value. This could be a message template, containing the `{whose}`,
 *       `{label}`, and `{end}` placeholders. If it is not provided, the default message will
 *       be used.
 * @return {ValidationResult}
 *     The validation result.
 * @author Haixing Hu
 */
function validateFieldByRule(value, rule, context = {}) {
  if (typeof rule?.isValid !== 'function') {
    throw new Error('The rule object must provide a isValid() function');
  }
  const whose = (context.owner ? `${context.owner}的` : '');
  const label = context.label ?? '';
  // check the nullish value
  if (value === undefined || value === null || value === '') {
    if (context.nullable) {
      return new ValidationResult(true);
    } else {
      const message = (context.nullMessage ?? '请填写{whose}{label}')
        .replaceAll('{whose}', whose)
        .replaceAll('{label}', label);
      return new ValidationResult(false, message);
    }
  }
  // check the length of the value
  const lengthValid = checkLength(value, context.minLength, context.maxLength);
  if (lengthValid < 0) {
    const message = (context.tooShortMessage ?? '{whose}{label}长度必须至少是{min}')
      .replaceAll('{whose}', whose)
      .replaceAll('{label}', label)
      .replaceAll('{min}', context.minLength);
    return new ValidationResult(false, message);
  } else if (lengthValid > 0) {
    const message = (context.tooLongMessage ?? '{whose}{label}长度不能超过{max}')
      .replaceAll('{whose}', whose)
      .replaceAll('{label}', label)
      .replaceAll('{max}', context.maxLength);
    return new ValidationResult(false, message);
  }
  // check the value by the rule
  if (rule.isValid(value, context)) {
    // check the value is within the specified range
    const { start, end, comparator } = context;
    if (withinRange(value, rule, start, end, comparator)) {
      // the value is valid and within the specified range
      return new ValidationResult(true);
    } else if (start && end) {
      const message = (context.outOfRangeMessage ?? '{whose}{label}必须在{start}和{end}之间')
        .replaceAll('{whose}', whose)
        .replaceAll('{label}', label)
        .replaceAll('{start}', start)
        .replaceAll('{end}', end);
      return new ValidationResult(false, message);
    } else if (start) {
      const message = (context.beforeStartMessage ?? '{whose}{label}必须大于或等于{start}')
        .replaceAll('{whose}', whose)
        .replaceAll('{label}', label)
        .replaceAll('{start}', start);
      return new ValidationResult(false, message);
    } else {
      const message = (context.afterEndMessage ?? '{whose}{label}必须小于或等于{end}')
        .replaceAll('{whose}', whose)
        .replaceAll('{label}', label)
        .replaceAll('{end}', end);
      return new ValidationResult(false, message);
    }
  }
  // the value is invalid according to the rule
  const message = (context.invalidMessage ?? '{whose}{label}格式不正确')
    .replaceAll('{whose}', whose)
    .replaceAll('{label}', label);
  return new ValidationResult(false, message);
}

export default validateFieldByRule;
