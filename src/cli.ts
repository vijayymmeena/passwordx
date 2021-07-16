#! /usr/bin/env node
import passwordX from "./index";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const usage =
  "\nUsage: passwordx -l 8" + //
  "\n" +
  "\nPatterns" +
  "\n   Lowercase         abcdefghjkmnpqrstuvwxyz" +
  "\n   Uppercase         ABCDEFGHJKLMNPQRSTUVWXYZ" +
  "\n   Digits            23456789" +
  "\n   Symbols           !#$%&*+-=?@^_" +
  "\n   Similar Symbols   ilI1|oO0" +
  "\n   Ambiguous char    {}[]()/'\"`~,;:.<>\\" +
  "";

async function executeCli(): Promise<unknown> {
  const args = await yargs(hideBin(process.argv))
    .scriptName("passwordx")
    .options("length", {
      alias: "l",
      demandOption: true,
      description: "length of password",
      type: "number",
    })
    .options("count", {
      alias: "c",
      description: "generate multiple passwords",
      type: "number",
    })
    .options("ambiguous", {
      alias: "a",
      description: "allow ambiguous char",
      type: "boolean",
    })
    .options("digit", {
      alias: "d",
      description: "allow digits",
      type: "boolean",
    })
    .options("symbol", {
      alias: "s",
      description: "allow symbols",
      type: "boolean",
    })
    .options("lowercase", {
      alias: "lc",
      description: "allow lowercase",
      type: "boolean",
    })
    .options("uppercase", {
      alias: "uc",
      description: "allow uppercase",
      type: "boolean",
    })
    .options("similar", {
      alias: "sm",
      description: "allow similar symbols",
      type: "boolean",
    })
    .usage(usage)
    .version()
    .help()
    .showHidden(false)
    .showHelpOnFail(true).argv;

  if (args.count && args.count > 1) {
    for (let index = 1; index <= args.count; index++) {
      console.info(
        `password ${index}:`,
        passwordX({
          ambiguousCharacters: args.ambiguous,
          digits: args.digit,
          length: args.length,
          lowercase: args.lowercase,
          similarCharacter: args.similar,
          symbols: args.symbol,
          uppercase: args.uppercase,
        })
      );
    }
  } else {
    console.info(
      `password:`,
      passwordX({
        ambiguousCharacters: args.ambiguous,
        digits: args.digit,
        length: args.length,
        lowercase: args.lowercase,
        similarCharacter: args.similar,
        symbols: args.symbol,
        uppercase: args.uppercase,
      })
    );
  }
  return;
}

executeCli();
