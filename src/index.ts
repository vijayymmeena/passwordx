/*
MIT License

Copyright (c) 2021 Indian Ocean Roleplay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import crypto from "crypto";

/**
 * format password, used to check that password must have requested format
 * @param pattern
 * @param passwordLength
 * @param password
 * @returns password string
 */
function formatPassword(
  pattern: string,
  passwordLength: number,
  password: string
): string {
  const ramdomS = crypto.randomInt(pattern.length);
  const ramdomE = crypto.randomInt(passwordLength);
  const finalPassowrd =
    password.substring(0, ramdomE) +
    pattern.substring(ramdomS, ramdomS + 1) +
    password.substring(ramdomE, passwordLength);
  return finalPassowrd;
}

function PasswordX(options?: {
  /**
   * # Allow ambiguous characters
   * #### Default: ``false``
   * #### Pattern: ``{}[]()/'"`~,;:.<>\``
   */
  ambiguousCharacters?: boolean;

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
  const defaultPattern =
    "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let lowercase = "abcdefghjkmnpqrstuvwxyz";
  let uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let digits = "23456789";
  let symbols = "!#$%&*+-=?@^_";

  // when similar character allowed
  if (options?.similarCharacter) {
    lowercase += "ilo";
    uppercase += "IO";
    digits += "01";
    symbols += "|";
  }

  // when ambiguous character allowed
  if (options?.ambiguousCharacters) {
    symbols += "{}[]()/'\"`~,;:.<>\\";
  }

  // generate final pattern
  let pattern = "";
  let patternIncluded = 0;
  let passwordLength = options?.length ?? 8;

  // if uppercase allowed
  if (options?.uppercase ?? true) {
    pattern += uppercase;
    patternIncluded++;
  }

  // if lowercase allowed
  if (options?.lowercase ?? true) {
    pattern += lowercase;
    patternIncluded++;
  }

  // if digits allowed
  if (options?.digits ?? true) {
    pattern += digits;
    patternIncluded++;
  }

  // if symbols allowed
  if (options?.symbols) {
    pattern += symbols;
    patternIncluded++;
  }

  // if all options are false, that was unexpected
  if (patternIncluded === 0) {
    pattern = defaultPattern;
  }

  // if length is less than one character, that was unexpected
  if (isNaN(passwordLength) || passwordLength < 1) {
    passwordLength = 8;
  }

  let password = "";
  const patternlength = pattern.length;
  let finalPasswordLength = passwordLength - patternIncluded;

  // generate password
  for (let i = 0; i < finalPasswordLength; i++) {
    const b = crypto.randomInt(patternlength);
    password += pattern.substring(b, b + 1);
  }

  // if uppercase allowed
  if (options?.uppercase ?? true) {
    password = formatPassword(uppercase, finalPasswordLength, password);
    finalPasswordLength++;
  }

  // if lowercase allowed
  if (options?.lowercase ?? true) {
    password = formatPassword(lowercase, finalPasswordLength, password);
    finalPasswordLength++;
  }

  // if digits allowed
  if (options?.digits ?? true) {
    password = formatPassword(digits, finalPasswordLength, password);
    finalPasswordLength++;
  }

  // if symbols allowed
  if (options?.symbols) {
    password = formatPassword(symbols, finalPasswordLength, password);
    finalPasswordLength++;
  }

  return password;
}

export default PasswordX;
