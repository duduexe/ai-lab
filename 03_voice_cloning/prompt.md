# Prompt to clone your own voice locally and for free

Paste the prompt below into a new Claude conversation and attach your voice recording or video to the same message. Claude will first ask you 4 questions about your computer and your recording, then prepare a WAV clip and one installer script for OmniVoice. The full walkthrough is in [guide.pdf](guide.pdf).

Note: Claude needs "Code execution and file creation" switched on (Settings > Capabilities) to convert your recording and write the installer file ([Anthropic](https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude)).

---

I want to run a free, local voice clone of my own voice on my computer, with no credit limits and no cloud service. I have no experience with this, so take care of as much of the setup as you can.

I am attaching a video or audio recording of me speaking. If I forgot to attach it, ask me for it before anything else.

Before you do anything else, ask me these questions and wait for my answers:
1. Which computer do I have (Mac, Windows or Linux) and which chip or processor? On a Mac: Apple menu, About This Mac.
2. How much memory (RAM) does it have, and does it have an NVIDIA graphics card?
3. Which language is spoken in my recording, and which language should the cloned voice speak?
4. If my recording is longer than 10 seconds, which part should you use (give me timestamps)? If I do not know, pick a clean stretch of only my voice and tell me what you chose.

Then:
1. Check the format of my file. If it is already a WAV file, keep it as it is and move on to step 2 (only cut it down to a clean 3 to 10 second clip of my voice if it is longer, and make sure it is mono and 16-bit). If it is another audio format (for example M4A or MP3) or a video (for example MP4 or MOV), extract the audio and convert it to a mono, 16-bit WAV file of a clean 3 to 10 second clip of only my voice. Either way, send me the WAV file you will use.
2. Use OmniVoice (github.com/k2-fsa/OmniVoice). Read its current README first and follow the instructions for my computer type. If my setup is not covered there, tell me.
3. Write me ONE installer script that sets up everything: Python environment, PyTorch, OmniVoice, and a small local web page with an upload box for my WAV clip, an optional reference text box, a text box and a Generate button. The page must run on my computer only, with no public share link, and must save each result as a new file so nothing is overwritten. Also write a launcher I can double-click. Name the files in the format YYMMDD_name_v01.
4. Check the script's syntax before giving it to me, and tell me clearly what you could not test on my computer type.
5. Give me the exact steps to run it, in order, with no jargon and with what I should see at each step.
6. After my first test, help me check whether my accent was kept and what to try if it was not.

Rules: link and quote your sources, do not guess, say when you do not know, and label any inference as your own.
