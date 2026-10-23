# moshivis

**Vendored fork of [kyutai-labs/moshivis](https://github.com/kyutai-labs/moshivis)** — a Vision-Speech Model (Moshi speech-text foundation + frozen PaliGemma2 vision encoder via cross-attention). Part of the Hypneum vision-speech exploration; treat as upstream, not first-party code.

Hypneum-specific notes (fork status, 2026 upstream-relevant work):
[`docs/hypneum-notes.md`](docs/hypneum-notes.md).

## Licensing — differs from workspace default

Not the workspace MIT default. Code: `LICENSE-APACHE` / `LICENSE-MIT` (upstream). Model weights: CC-BY-4.0; bundled PaliGemma2 vision encoder: **Gemma license**. Don't relicense or strip headers.

## Backends

Three inference stacks (pick per platform):

- `kyuteye_pt/` — PyTorch (BF16).
- `kyuteye_rs/` — Rust / Candle (powers the live demo; BF16, Q8_0).
- `kyuteye_mlx/` — MLX, **the Apple-Silicon-relevant one** (tested on MBP M3).

`ssvd/` = upstream synthetic-visual-dialogues generation pipeline (preprint §3.3 / App. E). `client/` = web UI frontend.

## Setup

`uv` for the PyTorch and MLX backends; `cargo` for Rust. The `pyproject` here follows **upstream's** Python pin — do NOT force the workspace `>=3.12` requirement onto it.

## Anti-patterns

- Don't reformat / restyle upstream code — it inflates merge cost against `kyutai-labs/moshivis`. Keep diffs surgical and documented.
- Don't pin cross-repo citations to `HEAD`; pin to an upstream tag.
- Don't assume the MLX backend runs anywhere but Apple Silicon (M-series).
- Don't bundle or commit downloaded checkpoints — fetch via the HuggingFace flow in the README.
