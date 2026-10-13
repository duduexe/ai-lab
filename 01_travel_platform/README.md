# 01 Travel planning platform

Video: <add TikTok link>  |  Try it: <[live example link](https://duduexe.github.io/ai-lab/01_travel_platform/)>

## What it does
A single HTML page where friends who leave from different cities choose a one-week holiday in Europe together: filters, a map, a group shortlist, a plan (accommodation, itinerary, travel logistics, tasks) and an Excel export.

## How to use it
1. Open the live link, or download `index.html` and open it in your browser.
2. Pick what you want (kind of place, activities, budget, maximum travel time).
3. Star up to five favourites and build the plan.
Note: This was made for our specific use case, you'll have to adapt the cities and source data to your specific use case

## Recreate it yourself
Open `prompt.md`, paste it into Claude, and answer the 4 questions it asks first (departure points, travel limits, places to avoid, month).

## Built with
Claude, from one prompt.

## Limits
- This version uses the example departure points London, Berlin and Geneva (with a dog). Travel times and prices are estimates, and the page labels each fact as verified or estimated.
- A shared live board for several people needs the Claude artifact version. Outside it, the page keeps the board in the link (the part after #).
- The page loads two fonts from Google Fonts.
