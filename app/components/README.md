Purpose
- Central place for presentational and shared components used by the `app/` routes.

Conventions
- Keep small, focused components in this folder.
- Co-locate tests next to components (`Component.test.tsx`).
- Use `app/components/index.ts` barrel for importing multiple components:

  import { Logo, Header } from 'app/components';

When to split
- If a component grows large or requires many subcomponents (e.g., forms),
  create a subfolder like `app/components/form/` and move related files there.
