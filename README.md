# Why passwordx?

Now days, everyone want to generate secure password, but if we go on internet it's hard to find a website that generate password but also does not collect data from you.
You can always trust browsers like edge, chrome etc. they generate passwords for only forms. so we came up with idea that we will provide a tool.
that you can use in your projects for random secure password generate with customized options. you can also install passwordx globally using `npm install -g passwordx`
then you can use in your command line interface (cmd) everywhere to get a secure token or password for personal use, without worry too much.
This is open source project so you can always check out our source code to feel secure about passwordx.

# Installation

## Direct Run

`npx passwordx@latest`

## For project

`npm install passwordx` or `yarn add passwordx`

## Global command

`npm install -g passwordx` or `yarn global add passwordx`

# Example for projects

```typescript
import passwordx from "passwordx";

// without customize it wil generate combination of [a-zA-Z0-9] with length of 16
const securePass = passwordx();
console.log(securePass);
```

# Example for command line usage

- make sure you have installed passwordx using `npm i -g passwordx`

```typescript
passwordx -l 32

// output
password: 5w9hfBjtttQFzYM27WKtxVxCJhvDDwpZ4J5jD4cCKAfbTgHbaPbc5hsd358k5X9J

// if you wish to generate multiple passwords than just pass -c

passwordx -l 32 -c 4
// output
password 1: sd358k55w9hfBjtttQFzYM27WKtxVxCJhvDDwpZ4J5jD4cCKAfbTgHbaPbc5hX9J
password 2: K7cBxYsadta5ra5tYhRpqzugM7FsfHjZbMseHCw6CNBu4HKPmrUsU5Bs5Neg9JP4
password 3: xGQzvjTdJbp7skAFLswDzJyuNEVbJHk5UMNawAqbLeh75LKVdSuLH6UWKN4Ugvrk
password 4: zkg2Zk9kFaPwPQCHGrf2Q4s33L3XXJb4Fyq89YgbPJuMrTbqRYcaBsVpGtmq5Gch
```

# Options

you can also read this info in `passwordx --help`

| Option      | Description                 | Value                      |
| ----------- | --------------------------- | -------------------------- |
| --ambiguous | Allow ambiguous characters  | `` {}[]()/'"`~,;:.<>\ ``   |
| --count     | Generate multiple passwords | 1                          |
| --digits    | Allow digits                | `23456789`                 |
| --length    | Password length             | 16                         |
| --lowercase | Allow lowercase characters  | `abcdefghjkmnpqrstuvwxyz`  |
| --pattern   | Custom pattern              | undefined                  |
| --similar   | Allow similar characters    | `i, l, I, 1, \|, o, O, 0`  |
| --symbol    | Allow symbols               | `!#$%&\*+-=?@^\_`          |
| --uppercase | Allow uppercase characters  | `ABCDEFGHJKLMNPQRSTUVWXYZ` |

# ☎️ Need help?

Create [GitHub issue](https://github.com/samarmeena/passwordx/issues)

# 💖 Thank you

You can support [passwordx](https://www.npmjs.com/package/passwordx) by giving it a [GitHub](https://github.com/discordx-ts/passwordx) star.
