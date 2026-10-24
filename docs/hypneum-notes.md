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

- **NemotronLabs VoiceChat.** Balam et al. (NVIDIA), *NemotronLabs
  VoiceChat: An Open Full-duplex Speech-to-Speech Model with Tool
  Calling Capabilities*,
  [arXiv:2609.21967](https://arxiv.org/abs/2609.21967) (2026-09-18).
  It is an open full-duplex speech baseline with native tool calling
  and incremental user transcription, reported on Full-Duplex-Bench
  1.0/1.5/3.0 and VoiceBench. The abstract does not mention vision, so
  it is a speech-side comparator only.
- **DuplexOmni.** Huang et al., *DuplexOmni: Real-Time Listening,
  Seeing, Thinking, and Speaking for Full-Duplex Interaction*,
  [arXiv:2606.09186](https://arxiv.org/abs/2606.09186) (2026-06-08,
  before the window). It is end-to-end full-duplex over streaming
  speech **and video**, the video-capable successor to MoshiVis's
  still-image design.
- **FD-LHB.** *Why Full-Duplex Speech Models Collapse in Long
  Conversations*, ICLR 2027 submission
  [SbI8ap4e6o](https://openreview.net/forum?id=SbI8ap4e6o) (anonymous
  review stage). It introduces a long-horizon benchmark and reports
  that models exhaust context within minutes. It is a candidate for a
  moshivis long-horizon robustness check.
- **DuplexChat corpus.** Nakata, Saito, Saruwatari, *DuplexChat:
  Constructing Speaker-Separated Full-Duplex Dialogue Speech at Scale
  for Spoken Dialogue Language Models*,
  [arXiv:2607.04941](https://arxiv.org/abs/2607.04941) (2026-07-06).
  It is an open speaker-separated full-duplex corpus built from
  podcasts. Check the licence of each source podcast before any use.

### Kyutai release status

Kyutai released nothing new for vision-speech in the July to October
2026 window. Its site lists only speech-side and other items (for
example Pocket TTS updates on 2026-08-25, 2026-09-28 and 2026-10-20),
and no MoshiVis release was found. The vendored commit `8624f4e`
therefore remains upstream's latest.

## Supply-chain reminder

Any weight swap is a dependency bump. Under the workspace policy it
needs a pinned revision, a mirrored copy and a human-reviewed diff
before use. Check each licence before vendoring. The licences above
are those shown on the model cards on 2026-10-23.
