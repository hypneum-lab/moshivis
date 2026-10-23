# Hypneum Lab notes on the moshivis fork

This file is Hypneum Lab-authored. It is not part of upstream
[kyutai-labs/moshivis](https://github.com/kyutai-labs/moshivis). Keep it
out of any upstream sync.

## Fork status (2026-10-23)

- The fork is unmodified upstream code plus `CLAUDE.md` and this note.
  The vendored upstream head is commit `8624f4e` (2025-03-26), which
  is also the latest commit on upstream `main`. Upstream has no tags.
  When citing this fork from other repos, pin to `8624f4e`.
- Upstream releases inference code only. The training code is not
  released.
- Kyutai's papers page lists the MoshiVis paper, *Vision-Speech
  Models: Teaching Speech Models to Converse about Images* (Royer et
  al., [arXiv:2503.15633](https://arxiv.org/abs/2503.15633)), as
  **CVPR 2026** ([kyutai.org/papers](https://kyutai.org/papers)). The
  arXiv page carries no venue comment.

## 2026 work relevant to this fork

None of the items below has been integrated here. Each is a
candidate for evaluation.

### Upstream lineage (Kyutai)

- **Interactivity post-training of Moshi.** Ohashi, Zeghidour,
  Défossez, Kharitonov, *Multi-Faceted Interactivity Alignment in
  Full-Duplex Speech Models*,
  [arXiv:2606.11167](https://arxiv.org/abs/2606.11167) (EMNLP 2026
  main conference). It applies reinforcement-learning post-training
  with rewards for pauses, turn-taking, backchannels and
  interruptions. Released weights include
  [`kyutai/moshika-rl-seamless`](https://huggingface.co/kyutai/moshika-rl-seamless),
  licensed **CC-BY-NC-4.0**, which is non-commercial and differs from
  the CC-BY-4.0 Moshika weights used by MoshiVis. The weights are
  part of the
  [Interactivity Alignment collection](https://huggingface.co/collections/kyutai/interactivity-alignment-6a1fe5f14879ce66956362e2).
  This is a possible replacement for the speech trunk. However, the
  MoshiVis cross-attention adapters and gate were trained on the
  original Moshika, so any swap needs re-validation of visual
  grounding and of the gate.
- **MoshiRAG.** Chien, Orsini, Kharitonov, Zeghidour, Livescu,
  Défossez, *MoshiRAG: Asynchronous Knowledge Retrieval for
  Full-Duplex Speech Language Models*,
  [arXiv:2604.12928](https://arxiv.org/abs/2604.12928) (ICML 2026;
  code: [kyutai-labs/moshi-rag](https://github.com/kyutai-labs/moshi-rag),
  Apache-2.0). It retrieves knowledge asynchronously in the gap
  between response onset and response content. This is a pattern for
  attaching an external memory to a full-duplex speaker without adding
  latency.

### Alternative substrate and evaluation

- **MiniCPM-o 4.5.** Cui et al. (OpenBMB), *MiniCPM-o 4.5: Towards
  Real-Time Full-Duplex Omni-Modal Interaction*,
  [arXiv:2604.27393](https://arxiv.org/abs/2604.27393). Weights:
  [`openbmb/MiniCPM-o-4_5`](https://huggingface.co/openbmb/MiniCPM-o-4_5)
  (Apache-2.0). The model is a full-duplex vision+speech model that
  handles live video. MoshiVis takes a single still image.
  Whether it runs on Apple Silicon (an MLX port, and memory on a
  32 GB machine) has not been checked.
- **VideoFDB.** Mazumdar et al. (NVIDIA), *VideoFDB: Evaluating
  Full-Duplex Vision-Speech Capabilities in Conversational Agents*,
  [arXiv:2605.30256](https://arxiv.org/abs/2605.30256). It is a
  benchmark of full-duplex audio-visual conversation that includes
  nonverbal dynamics. It is a candidate harness for comparing
  MoshiVis (MLX backend) with MiniCPM-o 4.5 on latency and response
  behaviour.

## Supply-chain reminder

Any weight swap is a dependency bump. Under the workspace policy it
needs a pinned revision, a mirrored copy and a human-reviewed diff
before use. Check each licence before vendoring. The licences above
are those shown on the model cards on 2026-10-23.
