# flow2dts

This tool aims to convert [Flow](TODO) [declaration files](TODO) to [TypeScript](TODO) declaration files. This means that the tool does **not** convert implementation code written in the Flow language, but solely library API signatures.

The primary goal is to provide up-to-date and high-quality TypeScript typings for [React Native](TODO), which can be found in the [DefinitelyTyped](TODO) repository. These have historically been maintained in a manual fashion, which is labor intensive, have lagged behind React Native releases, and have been incomplete at best.

### Limitations

Ideally the tool would be usable with _any_ library implemented using the Flow language, however at this time the Flow compiler does not make the ability to generate declaration files available to the general public. (For React Native we rely on Facebook to generate these declaration files for us.) Until then, this tool should theoretically be able to convert manually maintained Flow declaration files, such as those in the [flow-typed](TODO) repository.

Even though we explicitly aim to convert declaration files only, it should theoretically be possible to generate TypeScript declaration files from Flow implementation code when _all_ APIs are typed **explicitly**. This would likely require _some_ alteration to this tool, but not in any significant way. (Please let us know if you end up making these changes.)

### Acknowledgements

We would like to point out that while our project only targets declaration files, there are other active efforts that aim to convert Flow implementation code. Because of the different stated goals our project makes some different trade-offs than these; for instance, typically their aim is to convert one’s own project implemented in Flow to TypeScript far enough such that converting the remaining bits can be performed manually. Having said that, if the goal is to convert a codebase you should absolutely take a look at these:

- https://github.com/Khan/flow-to-ts
- https://github.com/bcherny/flow-to-typescript
- Is this the one that's being used to convert Babel?

### React Native specific considerations

- Migration path
- How to deal with different RN platforms

## Usage of the tool

```
flow2dts --root path/to/flow/inputs --out path/to/ts/outputs [FILES]

FILES can be a list of include patterns or exclude by prepending the ! operator.

Options:
  --version    Show version number                                     [boolean]
  --rootDir    The root directory of the Flow sources        [string] [required]
  --outDir     Where the TS sources should be written        [string] [required]
  --platform   Determines which platform specific files to include
                                 [string] [required] [choices: "ios", "android"]
  --cwd        The working directory from which to expand relative paths[string]
  --overrides  A file that exports a OverridesVisitor object used to provide
               project specific overrides where conversion cannot accurately be
               made                                                     [string]
  --help       Show help                                               [boolean]
```

### Workbench

For the time being, examples of using the tool to convert React Native typings can be found in the `workbench` directory.

- `react-native`: Contains Flow declaration dumps for React Native v0.63.3 and a recent main-line commit.
- `artsy-eigen`: Contains the TypeScript sources of a OSS iOS application by [Artsy Inc.](https://github.com/artsy/eigen). This application uses React Native v0.63.3 + TypeScript and thus serves as a good real-world test-bed.

## Development of the tool

We greatly appreciate bug reports and pull-requests.

### Setup

```
git clone https://github.com/microsoft/flow2dts.git
cd flow2dts
yarn install
```

### When needing to patch a package

We make liberal use of [patch-package](https://github.com/ds300/patch-package#usage) to make local changes to packages that **need** to be sent upstream before a new release of the tool can be made. (Or, worst case, it should alternatively be decided to make use of a forked package instead.)

### Helpful resources

- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) which documents how to use Babel's tooling to transform AST.
- [AST Explorer](https://astexplorer.net) which allows you to easily inspect the Babel AST of both Flow and TypeScript code, making it trivial to know what AST node types to visit and what AST node types to transform it to.
  For instance, [here’s some Flow source](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/6280b99ca19bcde8b5e7304b14271085cbcc46e8) and the expected converted [TypeScript ambient declaration](https://astexplorer.net/#/gist/5d27669987216a0746d90a6b6c42c8c7/848c3e201e6ba3614f5a96d42fc14da6d7b0a393).
  1. Select language `JavaScript`
  2. Select parser `@babel/parser`
  3. Select from the parser’s settings either `Flow` or `TypeScript`.
