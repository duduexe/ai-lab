# 06 Dudu Experiments' Reel Library

Video: <add TikTok link>  |  Try it: https://duduexe.github.io/ai-lab/06_reel_library/  |  Guide: [guide.pdf](guide.pdf), or [How to use it](https://duduexe.github.io/ai-lab/06_reel_library/#how-to) on the site

## What it does
A library of more than 300 ready-made elements for short vertical videos (1080 x 1920), with a live preview of each one. It is in 7 categories:

1. **Text:** text animations (in, out, loop), caption animations and animated titles.
2. **Video transitions:** AI transitions and standard transitions.
3. **Video effects:** AI effects, standard effects and zooms.
4. **Graphics animations:** charts and numbers, cards and notes, lists and plans, app windows and screens, files and folders, hand-drawn marks, characters and reactions, motion animations.
5. **Filters:** movies, retro, portrait, clean and vivid, mono.
6. **Lights.**
7. **Videography styles:** visual styles and ways of filming.

Every element says what it does, when to use it, and gives a prompt to make it from scratch with Claude.

## How to use it
1. **Look and copy:** open the live link, search or browse the categories, and hover over a card to see it move (on a phone, tap it). Click a card for its details and press **Copy** on the prompt.
2. **Make a reel step by step:** the guide page of the site ("How to use it") explains how to make a reel with Claude, with prompts to start with.
3. **Everything in one file:** [library.md](library.md) has every element as text (no pictures). Give it to Claude and ask for the elements you want.
4. **Skill for Claude:** [the skill (ZIP)](video-animation-library-skill.zip), also as a folder in [skill/video-animation-library](skill/video-animation-library). Upload the zip as a skill in the Claude app, or put the folder in `~/.claude/skills/` for Claude Code.

## Recreate it yourself
Each element has its own prompt in the "Prompt" column of [library.md](library.md). Paste the prompt into Claude, with the tool you use (for example Remotion), your colours, your fonts and your text. Remotion's own skill helps when you build with Remotion (`npx skills add remotion-dev/skills`). See also [04 Animate your videos with Claude and Remotion](../04_remotion_animation/guide.md).

## Built with
Claude and Remotion. The previews are drawn live in your browser with Remotion.

## Limits
- Opening `index.html` straight from your computer does not work, because the page loads its library text and media files. Use the live link, or put the folder on any web server.
- Fonts, music and sounds are not included (the fonts used in the previews are free fonts, listed in [LICENCES.md](LICENCES.md)).
- The demo person in the previews is AI-generated and does not exist.
- The previews are made for vertical videos. Some elements need your own footage, your face or a cut-out of you to work in your video.

## Copyright and use
© 2026 Dudu.exe. Compiled and made by Dudu.exe. All rights reserved. You may use the previews, prompts and skill to make your own videos, and post the videos you make. You may not sell, copy, republish or share the library or its content. The Dudu.exe logo and name may not be reused. Fonts, emoji and Remotion keep their own licences: see [LICENCES.md](LICENCES.md).
