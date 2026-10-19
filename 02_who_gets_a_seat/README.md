# 02 Who Gets a Seat

Video: <add TikTok link>  |  Try it: https://duduexe.github.io/ai-lab/02_who_gets_a_seat/  |  Guide: [guide.pdf](guide.pdf)

## What it does
A guest list alignment platform for two people planning a wedding. You each answer on your own first, then agree together, in seven steps:

1. **Hard bounds** (either of you): currency, food and drinks per guest, total budget and what the venue holds. The result is a hard maximum number of guests.
2. **Your bounds** (solo): when it stops feeling like your wedding, how to split the seats between your sides, and the family share of your side.
3. **Align bounds** (together): agree the guest cap, the split and the family shares.
4. **Your list** (solo): add your guests and rate each from 0 to 5 on "want them there" and "impact if not invited".
5. **Align the list** (together): combine people on both lists, then settle names where your ratings differ by 2 or more.
6. **Dashboard** (together): every guest on a want versus impact map, with a suggestion of invited, waitlisted or not invited. Change any suggestion, then both approve.
7. **RSVP tracker** (together): log replies and +1s. Declines free seats and the next guest on the waitlist moves up.

Everything can be exported to Excel. A built-in example couple (Mia and Leo) lets you look around first; nothing done there is saved.

## How to use it
The full walkthrough, with screenshots of every step, is in [guide.pdf](guide.pdf).

**To try it:** open the live link, or download `index.html` and open it in your browser. It then runs as a one-screen preview: the page shows "Saving isn't available in this view", nothing is shared between the two of you, and Download Excel is not available.

**To use it for real, as a couple:** you only need the HTML file.
1. Start a new chat in Claude, attach `index.html` and ask Claude to publish it as an Artifact, exactly as it is, with these capabilities: db, user, sample and downloads.
2. Open the link Claude gives you and check that the yellow bar "Saving isn't available in this view" is not there. If it is, ask Claude to republish the page with the same four capabilities.
3. Share the page with your partner from the Share menu, with access that lets them make changes. Your partner needs to be signed in to Claude.
4. Each of you opens the same link, types a first name and picks Bride, Groom or Partner.

## Recreate it yourself
Open [prompt.md](prompt.md), paste the prompt into Claude, and answer the 3 questions it asks first (the event and role labels, the currencies, and the full or lighter version).

## Built with
Claude.

## Limits
- Saving, sharing between two people, the smart file reader and the Excel download need the page to be published in Claude with four capabilities: db, user, sample and downloads. What a plan allows can differ by account; the publishing steps were only tested in the Claude session where the app was built.
- Only two people can join one page. For a new wedding, press Reset data or publish the file again as a separate page.
- Guest names and ratings are stored in that page's database. Share the link only with your partner. Your partner's answers stay hidden on screen until you have both submitted; that is a display rule in the app, not a technical lock.
- The page loads fonts from Google Fonts and its Excel and Word libraries from cdn.jsdelivr.net, so it needs the internet.
- PDFs are not supported as guest list uploads.
