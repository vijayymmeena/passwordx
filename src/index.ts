/*
 * --------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com>. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */
import crypto from "crypto";

/**
 * format password, used to check that password must have requested format
 * @param pattern
 * @param passwordLength generated password length
 * @param password
 * @returns password string
 */
function formatPassword(
  password: string,
  passwordLength: number,
  pattern: string
): string {
  if (password.length >= passwordLength) {
    return password;
  }

  const start = crypto.randomInt(pattern.length);
  const end = crypto.randomInt(passwordLength);
  const newPassword =
    password.substring(0, end) +
    pattern.substring(start, start + 1) +
    password.substring(end, passwordLength);
  return newPassword;
}

export function generate(options?: {
  /**
   * # Allow ambiguous characters
   * #### Default: ``false``
   * #### Pattern: ``{}[]()/'"`~,;:.<>\``
   */
  ambiguousCharacters?: boolean;

  /**
   * # Custom pattern
   * #### Default: undefined
   */
  customPattern?: string;

  /**
   * # Allow digits
   * #### Default: ``true``
   * #### Pattern: ``23456789``
   */
  digits?: boolean;

  /**
   * # Password length
   * #### Default: ``8``
   */
  length?: number;

  /**
   * # Allow lowercase characters
   * #### Default: ``true``
   * #### Pattern: ``abcdefghjkmnpqrstuvwxyz``
   */
  lowercase?: boolean;

  /**
   * # Allow similar characters
   * #### Default: ``false``
   * #### Characters: ``i, l, I, 1, |, o, O, 0``
   */
  similarCharacter?: boolean;

  /**
   * # Allow symbols
   * #### Default: ``false``
   * #### Pattern: ``!#$%&*+-=?@^_``
   */
  symbols?: boolean;

  /**
   * # Allow uppercase characters
   * #### Default: ``true``
   * #### Pattern: ``ABCDEFGHJKLMNPQRSTUVWXYZ``
   */
  uppercase?: boolean;
}): string {
  /**
   * Constants
   */
  let lowercase = "abcdefghjkmnpqrstuvwxyz";
  let uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let digits = "23456789";
  let symbols = "!#$%&*+-=?@^_";
  const defaultPattern = lowercase + uppercase + digits;

  /**
   * Add similar character if allowed
   */
  if (options?.similarCharacter) {
    lowercase += "ilo";
    uppercase += "IO";
    digits += "01";
    symbols += "|";
  }

  /**
   * Add ambiguous character if allowed
   */
  if (options?.ambiguousCharacters) {
    symbols += "{}[]()/'\"`~,;:.<>\\";
  }

  /**
   * Generate final pattern
   */
  let pattern = "";
  let patternIncluded = 0;
  let passwordLength = options?.length ?? 16;

  /**
   * if uppercase allowed
   */
  if (options?.customPattern) {
    pattern += options.customPattern;
    patternIncluded++;
  }

  /**
   * if uppercase allowed
   */
  if (options?.uppercase) {
    pattern += uppercase;
    patternIncluded++;
  }

  /**
   * if lowercase allowed
   */
  if (options?.lowercase) {
    pattern += lowercase;
    patternIncluded++;
  }

  /**
   * if digits allowed
   */
  if (options?.digits) {
    pattern += digits;
    patternIncluded++;
  }

  /**
   * if symbols allowed
   */
  if (options?.symbols) {
    pattern += symbols;
    patternIncluded++;
  }

  /**
   * Fallback to default pattern if no option pattern included
   */
  if (patternIncluded === 0) {
    pattern = defaultPattern;
  }

  /**
   * Fallback password length to one if less than one
   */
  if (isNaN(passwordLength) || passwordLength < 1) {
    passwordLength = 8;
  }

  /**
   * Generate password
   */
  let password = "";
  const patternLength = pattern.length;
  const finalPasswordLength =
    passwordLength <= patternIncluded
      ? passwordLength
      : passwordLength - patternIncluded;

  for (let i = 0; i < finalPasswordLength; i++) {
    const b = crypto.randomInt(patternLength);
    password += pattern.substring(b, b + 1);
  }

  if (options?.customPattern) {
    password = formatPassword(password, passwordLength, options.customPattern);
  }

  if (options?.uppercase) {
    password = formatPassword(password, passwordLength, uppercase);
  }

  if (options?.lowercase) {
    password = formatPassword(password, passwordLength, lowercase);
  }

  if (options?.digits) {
    password = formatPassword(password, passwordLength, digits);
  }

  if (options?.symbols) {
    password = formatPassword(password, passwordLength, symbols);
  }

  return password;
}
