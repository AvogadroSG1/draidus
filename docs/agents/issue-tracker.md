# Issue tracker: Beads

Issues and specs for this repo live in [Beads](https://github.com/gastownhall/beads) (local Dolt database under `.beads/`). Use the `bd` CLI for all operations. Pass `--json` whenever you need to parse output.

## Conventions

- **Create an issue**: `bd create "<title>" -t <bug|feature|task|epic|chore|spike> --body-file - <<'EOF' ... EOF`. Add `-l <label,label>` for labels, `-p <0-4>` for priority (0 = highest), and `--parent <id>` for a child.
- **Read an issue**: `bd show <id> --json --include-comments`.
- **List issues**: `bd list --status open --json`, filtered with `-l <label>` (AND), `--label-any <label>` (OR), or `--parent <id>`. `bd list --all` includes closed issues.
- **Make an issue a sub-issue of a parent**: `bd create --parent <parent> ...`, or `bd update <child> --parent <parent>` afterwards.
- **Comment on an issue**: `bd comment <id> "..."`. For multi-line comments, pipe to `bd comment <id> --stdin`. List comments with `bd comments <id>`.
- **Apply / remove labels**: `bd update <id> --add-label "..."` / `--remove-label "..."`.
- **Blocking**: `bd dep add <blocked-id> <blocker-id>`. `bd ready` shows only issues with no open blockers.
- **Close**: `bd close <id> --reason "..."`.

Beads tracks issues, not pull requests. There is no PR triage surface.

## When a skill says "publish to the issue tracker"

Create a bead with `bd create`. A spec is an `epic`. Its implementation tickets are child beads created with `--parent <epic-id>`, one bead per ticket.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above. The user will normally pass the bead ID directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single epic, and each **child** bead is one ticket.

- **Map**: an epic labelled `wayfinder:map`, with the Notes / Decisions-so-far / Fog body as its description. `bd create "<effort>" -t epic -l wayfinder:map --body-file -`.
- **Child ticket**: `bd create "<question>" --parent <map-id> -l wayfinder:<type>`, where `<type>` is `research`/`prototype`/`grilling`/`task`. The question goes in the body.
- **Blocking**: `bd dep add <child-id> <blocker-id>`. A ticket is unblocked when every blocker is closed.
- **Frontier query**: `bd ready --parent <map-id> --unassigned --json`. This excludes blocked, in-progress, and claimed beads. The first result wins.
- **Claim**: `bd update <id> --claim`, the session's first write. It sets the assignee and moves the status to `in_progress`.
- **Resolve**: `bd comment <id> --stdin` with the answer, then `bd close <id> --reason "..."`, then append a context pointer (gist + bead ID) to the map's Decisions-so-far with `bd update <map-id> --body-file -`.
