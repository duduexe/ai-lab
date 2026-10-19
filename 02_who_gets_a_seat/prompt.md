# Prompt to recreate Who Gets a Seat

Two ways to get the app:

- **Quickest:** attach `index.html` from this folder in a new Claude chat and ask Claude to publish it as an Artifact, exactly as it is, with these capabilities: db, user, sample and downloads. See the [README](README.md#how-to-use-it).
- **From scratch:** paste the prompt below into Claude. It will first ask you 3 questions, then build the app around your answers.

Notes:
- The app needs Claude's published Artifact pages with a shared database. Saving and sharing only work once the page is published; in a preview nothing is saved.
- This prompt describes how the version in this folder works. Claude builds its own code from it, so your result will look and behave a bit differently.

---

Build a single self-contained HTML file that I can publish as a Claude Artifact. It's a guest list alignment platform for two people planning one event together (a wedding by default). Each of them answers on their own first, then they agree together, step by step, until they have one final guest list.

Before building anything, ask me these questions and wait for the answers:
1. What is the event? (A wedding unless I say otherwise.) Which role labels should people pick from when they join? (Default: Bride, Groom, Partner. Two of the same role must be allowed.)
2. Which currencies should the budget offer? (Default: CHF, EUR, USD.)
3. Do you want the full seven steps below, or a lighter version? (Default: all seven.)

Build the app around my answers.

RUNTIME AND STORAGE
Publish it as an Artifact that declares these runtime capabilities, and load the artifact capabilities guidance before writing the code:
- db: a shared database. Every answer, list, rating and RSVP is saved there, and both people see each other's changes as they happen.
- user: who is viewing, and whether they may make changes. A viewer without edit access sees "You can view this page but not change it. Ask the owner to share it with you as an Editor."
- sample: lets Claude read uploaded guest lists that are not the Excel template, and check for duplicate names. Without it, fall back to a simple reader (one name per line or per row).
- downloads: lets people save the Excel export and the Excel template.
When the page runs without these (for example the file is opened directly in a browser), it must still work as a one-screen preview and show "Saving isn't available in this view. Changes stay on this screen until you close it." Save each change as its own small write so two people editing at once do not overwrite each other, retry failed saves a few times, and show a clear message if saving fails or the connection is lost.

JOINING
Only two people can join. Each types a first name and picks a role. The first person to join gets a deep pink color, the second a light pink, and guests on both lists show in purple everywhere. A third person gets no join form and sees "Two people have already joined." Add a Switch person button so one device can act as either person when they sit side by side.

START HERE TAB AND EXAMPLE
The first tab explains the three kinds of steps (Solo: on your own device, your partner sees your answers only after you have both submitted; Together: side by side; Either of you: facts one enters and the other confirms), lists the seven steps with an Open button and a tick when done, and has a button to the next open step. Add "See the example couple": a full worked example with two made-up people and about 50 made-up guests, held in memory only and never saved, with "Back to your list" to return.

STEP 1, HARD BOUNDS (either of you)
Sliders for: average food and drinks budget per guest (drinks included), total food and drinks budget, and the most guests the venue holds. Show the hard maximum = the lower of (total budget divided by budget per guest, rounded down) and the venue capacity, and say which one is the limit. Both people press Confirm; a tick shows who confirmed, and "Undo my confirmation" takes it back. Changing any number, or the currency, removes both confirmations.

STEP 2, YOUR BOUNDS (solo)
Three sliders, answered alone:
- Above how many guests does it stop feeling like our wedding? (10 to 300)
- How should the seats be split between your two sides? (20/80 to 80/20, middle = equal). This splits the seats left after guests on both lists are placed.
- What share of your side's seats should be kept for family? Each person answers for their own side.
"Submit my answers" and "Edit my answers". Hide the partner's answers until both have submitted.

STEP 3, ALIGN BOUNDS (together)
Four values to lock: the hard bounds, the total number of guests, the split, and the family share of each side. Show both answers with a "Close" or "Discuss" tag (Discuss when they differ by more than 15%). Suggest a starting value: for the guest total, the midpoint of the two "stops feeling like our wedding" answers; for the split, the average. The guest total can range from the lower of the two "feel" answers up to the hard maximum; say so when a pick stretches above the lower answer. One Confirm locks a value (they may share one screen), "Unlock to change" takes it back. Show the seats per side and how they split into family and others. When all four are locked, show "All bounds locked" and point to the list.

STEP 4, YOUR LIST (solo)
Four ways to add guests: a downloadable Excel template (First name, Last name, Number of +1, Guest type: Family, Friend, Colleague, Other), upload of any other file (.xlsx, .xls, .csv, .docx, .txt, .ods; not PDF), paste one name per line, or add one by one. Uploads and pastes first go to a review table where names, types and +1s can be fixed and rows unticked; flag and untick "Repeated in this file" and "Already in your list". Each guest has a +1 stepper (0 to 5, every +1 takes a seat) and two sliders from 0 to 5:
- Want them there: 0 = fine without them, 5 = can't imagine the day without them.
- Impact if not invited: 0 = nobody would notice, 5 = lasting hurt or family fallout.
A rating of 2.5 or more counts as high. Rating can wait: unrated guests show "Not rated" and stay out of the invited suggestion; the submit button then reads "Submit my list, rating later". Show seats used against the side's seats.

STEP 5, ALIGN THE LIST (together)
Opens once both lists are submitted.
1. Combine people on both lists: suggest pairs (same name, same name in another order, same surname with one first name short for the other, same surname and first initial) with "Same person" and "Different people", allow combining by hand, and a "Check with Claude" button for nicknames and typos. Combined guests count as coming from both and use a shared pool of seats taken off the top before the two sides split the rest.
2. Settle ratings: flag a shared guest when the two ratings differ by 2 or more on either question. Options: agree on the average, use one partner's grades, choose new grades together, or agree later (no grade on the dashboard yet). With no choice, use the average. Both press "Submit the table".

STEP 6, DASHBOARD (together)
Four cards: guest cap, invited seats, waitlist, not invited. A 2x2 want versus impact map with one dot per guest (Must invite: high want, high impact; Obligation: low want, high impact; Joy list: high want, low impact; Skip: both low). A dotted ring means waitlisted, faded means not invited, transparent means declined; tapping a dot changes that guest. Seat meters per side, must invites, family against others. A table with a Final column (Invited, Waitlist, Not invited), "Use all suggestions", and filters by group, side and decision. "Approve this list" needs both; any later change asks both again.

The suggestion follows these rules, in order, and each rule only fills seats while the guest's side has room:
1. Must invite (impact and want both 2.5 or more), higher impact first.
2. Impact of 4 or 5 with low want, once every must invite has a seat; a 5 before a 4; otherwise waitlist.
3. Other high impact or high want, highest total rating first; otherwise waitlist.
4. Both ratings under 2.5: not invited.
Guests on both lists use the shared pool first. Each side then fills its family and others shares; if a share is full but the side still has seats, the next guest still gets one. A guest is waitlisted only when their side has no seat left. Manual choices in the Final column always win; if they free seats, a waitlist note lists who now fits and one tap moves them up.

STEP 7, RSVP TRACKER (together)
List invited guests with the waitlist below. For each: reply (Waiting, Coming, Declined), how many +1s are actually coming ("?" until known, holding the allowed seats), a note, and "To waitlist". Counters: expected seats against the cap, coming, waiting to hear, seats freed by declines. A decline frees seats on that guest's side (or in the shared pool), and the next guest on that side's waitlist moves up to Invited automatically; a "Next up" card lists anyone else who fits. Declines can be undone.

EXCEL, RESET, PHONE
A Download Excel button on every tab exports everything as one file with sheets for Summary and Bounds, each partner's answers, Alignment, Guests, Final list, RSVP tracker and Waitlist. A red Reset data button deletes everything for both people after a confirmation that offers Download Excel first. Design for phones first: one column, step tabs that scroll sideways, tables that turn into cards.

RULES
- Name the file YYMMDD_name_v01.
- Never put real names in the example data.
- Verify your own work before showing it to me: run the logic with two simulated people sharing one database, check the hard maximum, the seat plan rules, the waitlist moving up after a decline, and that the Excel file opens with a real spreadsheet parser. List anything that failed and fix it before delivering.
- After publishing, tell me how to share the page with my partner with edit access.
