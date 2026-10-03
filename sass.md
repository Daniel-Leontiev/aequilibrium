# Sass notes for this Angular project

This project uses Sass helpers and mixins in `src/sass/`. A common issue is missing `@use` imports for helper files, which can make Sass resolve to the wrong `rem()`/`em()` implementation or fail with argument-count errors.

## Common Sass commands

### 1) Compile a single Sass file

```bash
npx sass src/sass/styles.scss dist/styles.css --load-path=src/sass
```

Use this when you want to test whether a stylesheet compiles without running the whole Angular app.

### 2) Compile with a load path

```bash
npx sass src/sass/styles.scss --load-path=src/sass
```

This is useful when Sass files use relative imports like `@use "helpers/utils" as *;` or `@use "variables" as *;`.

### 3) Watch for file changes

```bash
npx sass --watch src/sass/styles.scss:dist/styles.css --load-path=src/sass
```

This is a quick way to debug Sass live while editing styles.

### 4) Validate the Angular app build

```bash
npm run build
```

This runs the Angular compiler and confirms the app can bundle stylesheets correctly in the real project pipeline.

### 5) Run the Angular dev server

```bash
npm start
```

This is useful for visual validation of Sass changes in the browser.

## Useful debugging checks

### Confirm the right helper file is loaded

Check the top of your SCSS file:

```scss
@use "helpers/utils" as *;
@use "helpers/mixins" as *;
```

If a helper like `rem()` is defined in `src/sass/helpers/utils.scss`, it must be imported before using it.

### Validate function signatures

A function like this:

```scss
@function rem($pixels, $context: $browser-context) {
  @return math.div($pixels, $context) * 1rem;
}
```

must be called with either one or two arguments, for example:

```scss
font-size: rem(10px);
font-size: rem(12px, 16px);
```

If you accidentally call the built-in Sass `rem()` instead of your custom helper, you can get errors like:

```text
2 arguments required, but only 1 was passed.
```

### Inspect the generated CSS

```bash
npx sass src/sass/styles.scss dist/styles.css --load-path=src/sass --verbose
```

The verbose output helps confirm which files were processed and whether Sass is resolving your custom mixins/functions as expected.

### Get a stack trace on failure

```bash
npx sass src/sass/styles.scss --load-path=src/sass --trace
```

This is especially helpful when Sass errors are not obvious or when imports are nested across multiple helper files.

## Quick sanity checklist

- Verify every helper is imported with `@use`.
- Confirm the file path matches the actual Sass folder structure.
- Use `npx sass` to test a single file before running the full Angular build.
- Run `npm run build` after fixes to validate the application pipeline.
- Use `npm start` for browser-based debugging.

## Typical Sass problem patterns

### Missing import

```scss
font-size: rem(10px);
```

If `rem()` is defined in `helpers/utils.scss` and not imported, Sass will try to use the built-in function instead.

### Wrong load paths

If the compiler cannot find `helpers/variables`, `helpers/mixins`, or `helpers/utils`, add the project Sass folder as a load path:

```bash
--load-path=src/sass
```

### Deprecated built-ins

The project currently uses `unitless()` in the helper functions. Sass may warn about this as a deprecation. It is valid for now, but newer Sass versions prefer `math.is-unitless($value)`.

## Recommended workflow

1. Test a single file with `npx sass`.
2. Fix import/load-path issues first.
3. Validate the Angular build with `npm run build`.
4. Use `npm start` to visually verify styling.
5. Use `--trace` or `--verbose` when the error is unclear.

This approach makes it much easier to isolate Sass compilation issues from Angular runtime problems.
