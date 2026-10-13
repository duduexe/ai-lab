# Prompt to recreate the travel planning platform

Paste this into Claude. It will first ask you 4 questions (departure points, travel limits, excluded regions, month), then build the page around your answers.

Note: the page uses `window.storage` with `shared:true`, which is a Claude artifact feature. It only works once the page is published as a Claude artifact.

---

Build a single self-contained HTML file that I can publish as a Claude artifact. It's a travel planning platform for a group of friends who are choosing a one-week holiday somewhere in Europe. The group may be spread across different departure points, so every option has to be checked against all of them.

Before building anything, ask me these questions and wait for the answers:
1. Where is each person travelling from? Ask for every departure point, and for each one whether they fly, drive, or take the train. If anyone is travelling with a pet or has other constraints on how they travel, ask about that too.
2. How far are you willing to go from each departure point? Ask for a limit in hours door-to-door, separately for flying and for ground travel, and whether an overnight train is acceptable even if it runs longer.
3. Which countries or regions are off the table, if any?
4. Which month and roughly how many days? (Use a one-week trip unless I say otherwise.)

Build the platform around my answers. Do not assume a departure city, a country, or a travel constraint.

STORAGE
Use window.storage with shared:true so everyone opening the published artifact sees the same board. Persistent storage only activates after the artifact is published, not in preview, so tell me that in your reply and show a status badge that says exactly which state storage is in. Poll every few seconds, and on every save do read-merge-write so edits from one person appear on everyone else's screen. Merge by ownership: each person owns their own answers and picks, and other people can add items but cannot overwrite someone else's answers. Do not add a copy-paste export or import fallback, and do not call any external API from the page.

DESTINATIONS
Include roughly 40 to 60 destinations that fit the travel limits from my answers. Include overnight-train destinations even when they are further away, as long as the trip is one night plus a short onward leg. Exclude countries outside the EU unless I say otherwise. For each destination record:
- landscape type (coast, mountains, lakes, countryside, city)
- activities (I'll supply the list, with a free-text option so people can add their own)
- an estimated nightly bed price per person
- travel time from each departure point
- the nearest airport each departure point would fly into

Mark every fact as either verified (from a source you checked) or estimated (your own calculation or judgement). Show that label in the interface, not just in your reply. For flight times, compute them from great-circle distance plus a fixed allowance for taxi and climb, and label them as estimates.

ALIGN TAB
Ask the questions in this order: departure point, kind of place, what you want to do there (chips, plus a field to add your own that everyone then sees), bed budget per person per night, and the maximum travel time from each departure point. Only show each travel-time question for departure points where the answer is relevant, for example skip a rail limit for someone who flies.

Filtering must be additive. If someone picks Coast and Party, show every coastal place and every party place, never only the ones that have both. Selecting more options only ever grows the list. Rank places by how many of a person's selections they match, and show "matches 3 of what you picked" on the card.

Never hide anything silently. Show three groups in order:
1. Full matches
2. "Close, one thing off", dimmed, with the specific reason stated
3. "Added by us", for places someone typed in by hand. These are never dimmed or filtered out.

Each card shows the travel times, the airport, the bed price, the sleeper routing if there is one, and the flying times.

Everyone can star up to five favourites. Stars save immediately without waiting for anyone else.

MAP
A real map, not a scatter plot on a plain rectangle. Draw actual country boundaries from Natural Earth or a similar public dataset, project them properly, and bake the paths into the file. Do not load tiles or scripts from a CDN. Fix the projection to a window that covers the departure points and all the destinations, so the map does not rescale when filters change. Place labels using a collision test: try a few positions around each dot, drop the label if none is free, and never draw connector lines.

Colour code the dots: departure points, full matches, close matches, the group's picks, and hand-added places (in pink, so they are easy to spot).

HAND-ADDED PLACES
Let anyone add a place with only a town name and country (description optional). Build the country field as a type-to-filter menu of the countries that appear in the destination list. Do not use an HTML datalist, because it is unreliable on iOS Safari. Plot the place at the centre of its country and say clearly that the dot marks the country, not the town.

SHORTLIST TAB
Show the same group shortlist from the Align tab, so nobody has to scroll to see it. Both copies render from one function so they cannot drift apart.

PLAN TAB, WITH SUB-PAGES
- Destination: lock in one option
- Accommodation: name, link, price, number of beds, dog policy, votes
- Itinerary: seven days, with suggestions from anyone
- Getting there: the travel times per departure point, followed by a section where each person logs their arrival and departure date, time and station or airport, sorted by arrival
- Tasks: owner, deadline with a real date picker, sorted by deadline

EXPORT
An "Export to Excel" button that produces a real .xlsx file with one sheet per section, containing everything anyone has entered. Write the zip container and CRC32 yourself so the export does not depend on a library loaded from a CDN.

RULES
- Design for phones first.
- Name the file YYMMDD_name_v01.
- Verify your own work before showing it to me. Open the file in a headless DOM, click the buttons, check that filters change the counts, check that the export opens with a real spreadsheet parser, and check that two simulated users sharing the same storage both see each other's changes. List anything that failed, and fix it before delivering.
- Don't invent facts. State what is verified and what is estimated.
