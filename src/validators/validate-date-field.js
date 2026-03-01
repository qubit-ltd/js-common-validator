////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { LocalDateRule } from '@qubit-ltd/validation-rule';
import validateFieldByRule from './validate-field-by-rule';
import compareDate from './impl/date-comparator';

/**
 * Verify whether a field value of an object represents a valid local date.
 *
 * @param {string} value
 *     The field value to be verified must be of string type; for other types,
 *     an error will be reported in the returned verification result.
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
function validateDateField(value, context = {}) {
  context.label ??= '日期';
  context.nullMessage ??= '请选择或填写{whose}{label}';
  context.beforeStartMessage ??= '{whose}{label}不能早于{start}';
  context.afterEndMessage ??= '{whose}{label}不能晚于{end}';
  context.outOfRangeMessage ??= '{whose}{label}必须在{start}和{end}之间';
  context.comparator = compareDate;
  return validateFieldByRule(value, LocalDateRule, context);
}

export default validateDateField;
