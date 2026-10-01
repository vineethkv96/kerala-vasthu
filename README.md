# Kerala Vasthu Calculator

A modern, mobile-first web app to plan house and room dimensions using
traditional Kerala Vasthu measurement concepts (Kol, Viral, Ayadi) alongside
practical modern units (feet, inches, centimetres, metres).

All calculations run entirely in the browser — no backend, no network calls.

Open source and open to public contributions — see the
[contributing guide](./CONTRIBUTING.md) or the
[GitHub repository](https://github.com/vineethkv96/kerala-vasthu).

## Features

- **Room Size Calculator** — enter length, width and optional height in any unit,
  see instant conversions to Kol, Viral, Kol+Viral, cm, m, ft and ft+in, plus area
  and a traditional dimension alignment check.
- **Ayadi Calculator** — transparent, configurable Ayadi calculations (Aaya, Vyaya,
  Yoni, Nakshatra, Vara, Tithi, Amsa) with editable divisors, multipliers and
  interpretation labels.
- **Unit Converter** — single-value converter plus a feet/metre/Kol/Viral quick
  calculator with a combined Kol + Viral input.
- **Traditional Reference** — educational reference for Kerala units and Ayadi notes.
- **Saved Calculations** — local-storage persistence with reopen, duplicate, delete,
  print view and JSON export/import.

## Measurement system

The internal base unit is the **centimetre**. Conversions use these exact rules:

| Relationship | Value |
| --- | --- |
| 1 Viral | 3 cm |
| 24 Viral | 1 Kol |
| 1 Kol | 72 cm |
| 1 metre | 100 cm |
| 1 foot | 30.48 cm |
| 1 inch | 2.54 cm |
| 1 foot | 12 inches |

- 1 Kol = 72 cm ≈ 2.3622 feet
- 1 Viral = 3 cm ≈ 1.1811 inches

Values are kept at full precision internally and rounded only for display
(cm/m to 2 decimals, ft/in to 2 decimals, Kol/Viral to 2 decimals when fractional).

## Configurable Ayadi formulas

Ayadi factors are defined in a JSON configuration object
(`src/lib/ayadi.ts`, `defaultAyadiSettings`). Each factor stores a `multiplier`,
`divisor`, output `label`, and a per-remainder `interpretation` list. The UI lets
users edit these values and reset to defaults. A remainder of `0` is displayed as
the highest divisor value (e.g. remainder 0 of divisor 12 shows as 12), per
traditional display convention.

Default starter template:

| Factor | Formula | Divisor |
| --- | --- | --- |
| Aaya | base × 8 ÷ 12 | 12 |
| Vyaya | base × 3 ÷ 8 | 8 |
| Yoni | base × 3 ÷ 8 | 8 |
| Rksha / Nakshatra | base × 8 ÷ 27 | 27 |
| Vara | base × 9 ÷ 7 | 7 |
| Tithi | base × 9 ÷ 30 | 30 |
| Amsa | base × 9 ÷ 12 | 12 |

Ayadi formulas and interpretations vary by Kerala Vasthu tradition, region, lineage
and consultant. The calculator is deliberately transparent and editable, and does
not present any score as guaranteed or absolute.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Client-side only (localStorage for persistence)
- pnpm package manager

## Running the project

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # typecheck + production build
pnpm preview    # preview the production build
```

> The project uses [pnpm](https://pnpm.io) (v11+). The `pnpm-workspace.yaml`
> file lists `esbuild` under `allowBuilds` so its native binary is linked on
> install — this is pnpm's default security behavior of not running untrusted
> postinstall scripts.

## Project structure

```
src/
  lib/            # conversion, Ayadi, storage and formatting utilities
  components/     # reusable UI and feature components
  pages/          # the six main sections
  App.tsx         # navigation + language + seed wiring
  types.ts        # shared TypeScript types
```

## Contributing

Contributions are welcome — bug reports, feature requests, docs, and pull
requests.

- **Report issues or suggest features** via
  [GitHub Issues](https://github.com/vineethkv96/kerala-vasthu/issues).
- **Contribute code** by forking the repo and opening a pull request against
  `main`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the workflow.

The project is MIT-licensed and runs fully client-side, so there's no backend to
set up — just `pnpm install && pnpm dev`.

## Disclaimer

This tool provides traditional Kerala Vasthu calculation guidance for planning
purposes. Consult a qualified Kerala Vasthu expert, architect, and structural
engineer before finalizing a building plan.
