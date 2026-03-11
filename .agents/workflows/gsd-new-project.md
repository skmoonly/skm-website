---
description: Initialize GSD for an existing project — sets up STATE.md and .planning/ without scaffolding
---

# /gsd:new-project

Run this once to initialize the GSD project governance system against an existing codebase.

## Steps

1. Read the project source-of-truth documents in order:
   - `PROJECT.md` — Vision, aesthetic, tech stack
   - `REQUIREMENTS.md` — Feature list, open questions
   - `ROADMAP.md` — Phase-by-phase plan with checkboxes

2. Create `STATE.md` in the project root using the template below.

3. Create the `.planning/` directory in the project root.

4. Confirm initialization to the user and ask them to run `/gsd:discuss-phase 0`.

## STATE.md Template

```markdown
# SKM Project State

**Last Updated**: [DATE]
**Active Phase**: None — run /gsd:discuss-phase 0 to begin
**Phase Status**: All phases Not Started

## Phase Registry

| Phase | Name                  | Status      | Planning Doc              |
|-------|-----------------------|-------------|---------------------------|
| 0     | Foundation            | Not Started | .planning/phase-0.md      |
| 1     | Core Wiki (MVP)       | Not Started | .planning/phase-1.md      |
| 2     | Immersion Layer       | Not Started | .planning/phase-2.md      |
| 3     | Interactive Map       | Not Started | .planning/phase-3.md      |
| 4     | Expansion & Polish    | Not Started | .planning/phase-4.md      |

## Active Decisions
(populated by /gsd:discuss-phase)

## Blockers
(populated as needed)
```
