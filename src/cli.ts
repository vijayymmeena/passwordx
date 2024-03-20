#! /usr/bin/env node

/*
 * --------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com>. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */
import * as passwordx from "./index.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const usage =
  "# Usage: passwordx -l 8" +
  "\n" +
  "\nPatterns" +
  "\n: Default           lowercase + uppercase + digits" +
  "\n: Lowercase         abcdefghjkmnpqrstuvwxyz" +
  "\n: Uppercase         ABCDEFGHJKLMNPQRSTUVWXYZ" +
  "\n: Digits            23456789" +
  "\n: Symbols           !#$%&*+-=?@^_" +
  "\n: Similar Symbols   ilI1|oO0" +
  "\n: Ambiguous char    {}[]()/'\"`~,;:.<>\\" +
  "";

async function executeCli(): Promise<void> {
  const args = await yargs(hideBin(process.argv))
    .scriptName("passwordx")
    .options("length", {
      alias: "l",
      description: "Length of password",
      type: "number",
    })
    .options("count", {
      alias: "c",
      description: "Generate multiple passwords",
      type: "number",
    })
    .options("pattern", {
      alias: "p",
      description: "Define custom pattern",
      type: "string",
    })
    .options("ambiguous", {
      alias: "a",
      description: "Allow ambiguous char",
      type: "boolean",
    })
    .options("digit", {
      alias: "d",
      description: "Allow digits",
      type: "boolean",
    })
    .options("symbol", {
      alias: "s",
      description: "Allow symbols",
      type: "boolean",
    })
    .options("lowercase", {
      alias: "lc",
      description: "Allow lowercase",
      type: "boolean",
    })
    .options("uppercase", {
      alias: "uc",
      description: "Allow uppercase",
      type: "boolean",
    })
    .options("similar", {
      alias: "sm",
      description: "Allow similar symbols",
      type: "boolean",
    })
    .usage(usage)
    .version()
    .help()
    .showHidden(false)
    .showHelpOnFail(true).argv;

  const options = {
    ambiguousCharacters: args.ambiguous,
    customPattern: args.pattern,
    digits: args.digit,
    length: args.length,
    lowercase: args.lowercase,
    similarCharacter: args.similar,
    symbols: args.symbol,
    uppercase: args.uppercase,
  };

  if (args.count && args.count > 1) {
    for (let index = 1; index <= args.count; index++) {
      console.info(`password ${index}:`, passwordx.generate(options));
    }
  } else {
    console.info(`password:`, passwordx.generate(options));
  }
}

executeCli();
