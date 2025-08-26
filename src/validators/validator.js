////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import validateAlphaNumberField from './validate-alphanumber-field';
import validateBoolField from './validate-bool-field';
import validateDateField from './validate-date-field';
import validateDateTimeField from './validate-date-time-field';
import validateEmailField from './validate-email-field';
import validateEnumField from './validate-enum-field';
import validateNumberField from './validate-number-field';
import validateIntegerField from './validate-integer-field';
import validateMobileField from './validate-mobile-field';
import validatePasswordField from './validate-password-field';
import validatePersonNameField from './validate-person-name-field';
import validatePhoneField from './validate-phone-field';
import validateTimeField from './validate-time-field';
import validateTimestampField from './validate-timestamp-field';
import validateUppercaseAlphaNumberField from './validate-uppercase-alphanumber-field';
import validateUppercaseUnderscoreField from './validate-uppercase-underscore-field';
import validateLowercaseHyphenField from './validate-lowercase-hyphen-field';
import validateLowercaseUnderscoreField from './validate-lowercase-underscore-field';
import validateUrlField from './validate-url-field';
import validateUsernameField from './validate-username-field';

/**
 * The validator class providing static validation methods.
 *
 * @class
 * @author Haixing Hu
 */
class Validator {
  /**
   * Validates whether a field value is a string composed of numbers and letters.
   *
   * @static
   * @see {@link validateAlphaNumberField}
   */
  static alphaNum = validateAlphaNumberField;

  /**
   * Validates whether a field value is a boolean value or string representation of a boolean.
   *
   * @static
   * @see {@link validateBoolField}
   */
  static bool = validateBoolField;

  /**
   * Validates whether a field value represents a valid local date.
   *
   * @static
   * @see {@link validateDateField}
   */
  static date = validateDateField;

  /**
   * Validates whether a field value represents a valid local time.
   *
   * @static
   * @see {@link validateTimeField}
   */
  static time = validateTimeField;

  /**
   * Validates whether a field value represents a valid local date time.
   *
   * @static
   * @see {@link validateDateTimeField}
   */
  static datetime = validateDateTimeField;

  /**
   * Validates whether a field value is a valid email address.
   *
   * @static
   * @see {@link validateEmailField}
   */
  static email = validateEmailField;

  /**
   * Validates whether a field value is a valid enumeration type or string representation.
   *
   * @static
   * @see {@link validateEnumField}
   */
  static enum = validateEnumField;

  /**
   * Validates whether a field value is a number or string representation of a number.
   *
   * @static
   * @see {@link validateNumberField}
   */
  static number = validateNumberField;

  /**
   * Validates whether a field value is an integer or string representation of an integer.
   *
   * @static
   * @see {@link validateIntegerField}
   */
  static id = validateIntegerField;

  /**
   * Validates whether a field value is an integer or string representation of an integer.
   *
   * @static
   * @see {@link validateIntegerField}
   */
  static int = validateIntegerField;

  /**
   * Validates whether a field value is a valid mobile phone number.
   *
   * @static
   * @see {@link validateMobileField}
   */
  static mobile = validateMobileField;

  /**
   * Validates whether a field value is a number or string representation of a number.
   *
   * @static
   * @see {@link validateNumberField}
   */
  static money = validateNumberField;

  /**
   * Validates whether a field value is a valid password.
   *
   * @static
   * @see {@link validatePasswordField}
   */
  static password = validatePasswordField;

  /**
   * Validates whether a field value is a valid person name.
   *
   * @static
   * @see {@link validatePersonNameField}
   */
  static personName = validatePersonNameField;

  /**
   * Validates whether a field value is a valid phone number.
   *
   * @static
   * @see {@link validatePhoneField}
   */
  static phone = validatePhoneField;

  /**
   * Validates whether a field value is a valid timestamp.
   *
   * @static
   * @see {@link validateTimestampField}
   */
  static timestamp = validateTimestampField;

  /**
   * Validates whether a field value is a string composed of uppercase letters and numbers.
   *
   * @static
   * @see {@link validateUppercaseAlphaNumberField}
   */
  static upperAlphaNum = validateUppercaseAlphaNumberField;

  /**
   * Validates whether a field value is a string composed of uppercase letters and underscores.
   *
   * @static
   * @see {@link validateUppercaseUnderscoreField}
   */
  static upperUnderscore = validateUppercaseUnderscoreField;

  /**
   * Validates whether a field value is a string composed of lowercase letters and hyphens.
   *
   * @static
   * @see {@link validateLowercaseHyphenField}
   */
  static lowerHyphen = validateLowercaseHyphenField;

  /**
   * Validates whether a field value is a string composed of lowercase letters and underscores.
   *
   * @static
   * @see {@link validateLowercaseUnderscoreField}
   */
  static lowerUnderscore = validateLowercaseUnderscoreField;

  /**
   * Validates whether a field value is a valid username.
   *
   * @static
   * @see {@link validateUsernameField}
   */
  static username = validateUsernameField;

  /**
   * Validates whether a field value is a valid URL.
   *
   * @static
   * @see {@link validateUrlField}
   */
  static url = validateUrlField;
}

export default Validator;
