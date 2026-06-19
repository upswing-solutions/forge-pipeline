# Brand assets

Visual identity for **FORGE**, an Upswing system. A single ember orange on a navy-steel ground, machined display type, and a faceted forge-core mark with a node-graph glyph set, one glyph per pipeline stage.

## Files

| File | Use |
|---|---|
| `logo.svg` | Forge-core mark on a dark rounded tile. Favicon, avatar, app icon. Pure vector. |
| `logo-mark.svg` | Forge-core glyph, transparent background. Inline/compact lockups. Pure vector. |
| `pipeline.svg` | The Find → Outfit → Reach → Grow → Embark stage diagram. Pure vector. |
| `banner.png` | 1280×320 README hero. |
| `social-preview.png` | 1280×640 GitHub Open Graph card. Set under **Settings → Social preview**. |
| `tile.png` | 600×600 square link tile. |

The SVGs are self-contained (no external fonts or scripts) and render on GitHub. Text in `pipeline.svg` falls back to the system geometric sans when Chakra Petch is unavailable.

## Color

| Token | Hex | Role |
|---|---|---|
| Ember | `#F0833A` | Primary accent |
| Ember Deep | `#CE6B26` | Hover / pressed, gradient start |
| Ember Soft | `#F6A871` | Glow / highlight, gradient end |
| Ink | `#0F1217` | Deepest ground |
| Ground | `#14171C` | Page background |
| Surface | `#1B2027` | Panels / cards |
| Line | `#2C333D` | Hairlines |
| Bright | `#EDF1F5` | Headings |
| Text | `#C9D1DA` | Body copy |
| Slate | `#7C8694` | Muted / mono / inactive |

Signature gradient: `linear-gradient(98deg, #CE6B26 0%, #F0833A 46%, #F6A871 100%)` — a single-hue ember ramp, used sparingly, never as a flat background.

## Type

- **Chakra Petch** (600/700) — display / headings / wordmark, with `+0.07em` tracking on the wordmark.
- **Inter** (400) — running text.
- **JetBrains Mono** (500, uppercase) — labels, stats, the engineering voice.

## Usage notes

- One hue does all the accent work. There is no second color; depth comes from the ember ramp and the slate/ground neutrals.
- The mark is built for dark grounds. On light or accent grounds, recolor the forge-core stroke to ink (`#0F1217` / `#1a1915`) as in the brand board.
- EMBARK is rendered in slate, not ember, wherever it appears — it is a future stage, deliberately unbuilt. Keep that distinction in any derived diagram.

Derived from the FORGE brand board. Released under the repository's [MIT license](../../LICENSE).
