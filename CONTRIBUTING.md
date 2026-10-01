# Contributing to Kerala Vasthu Calculator

Thanks for your interest in contributing. The project is open to public
contributions — bug reports, feature requests, documentation, and code are all
welcome.

## Getting started

```bash
git clone https://github.com/vineethkv96/kerala-vasthu.git
cd kerala-vasthu
pnpm install
pnpm dev        # start the dev server
pnpm build      # typecheck + production build
pnpm typecheck  # typecheck only
```

The app is a client-side React + TypeScript + Vite project using Tailwind CSS.
There is no backend — all calculations run in the browser and persist via
`localStorage`.

## Reporting issues

- Search [existing issues](https://github.com/vineethkv96/kerala-vasthu/issues)
  first to avoid duplicates.
- Open a new issue with a clear title, steps to reproduce, expected vs actual
  behavior, and your browser/OS where relevant.
- For calculation questions, include the units and values you entered.

## Contributing code

1. Fork the repository and create a branch from `main`.
2. Make focused, minimal changes and follow the existing code style.
3. Run `pnpm build` (which runs typecheck) before committing.
4. Open a pull request against `main` with a clear description of what changed
   and why.

## Guidelines

- Keep UI text bilingual: add new user-facing strings as `t("English text")` keys
  and provide the Malayalam translation in `src/i18n.tsx`.
- Keep measurement logic deterministic and fully client-side.
- Preserve the disclaimer language around Vasthu guidance — results are
  educational planning aids, not engineering or legal advice.

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](./LICENSE).
