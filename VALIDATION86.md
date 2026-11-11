# Auctions, rankings, travel and country boarding

- Eight monthly auction catalogs include schoolmasters, developing horses, green horses, youngstock, breeding horses, warmbloods, ponies and exotic breeds. Discipline-specific and mixed catalogs rotate independently.
- Starting prices follow current schooling: low $15–25k, medium $30–45k, high $50–100k. Normal bidding, premiums and delivery rules continue to apply.
- Current schooling and ranked competition eligibility use low levels through age five, low/medium at six, and any level from seven. Future potential is unchanged. All four disciplines use this limit.
- Ranking newcomers begin at zero without backdated circuit results. Their first four scoring meets earn 25%, 50%, 75%, then full points. Weekly publication remains seven days. Existing earned results remain intact.
- International circuit fields limit country concentration. New open-division circuit entrants have varied ages within their division. NPC names remain natural and unique while internal IDs remain stable.
- Ordinary development classes allow two eligible mounts per rider, with distinct entry IDs. Restricted championship/team classes retain their rules.
- Venue travel is domestic 1–2h, same geographic region 5h, another region on the same continent 12h, another continent 24h. A saved Skip Competition Travel switch uses the arena preparation workflow; equipment and entry requirements still apply.
- National-team applications show the active rider's age/country with an editable profile. Underage riders receive division restrictions rather than the misleading missing-profile message. Saved applications remain visible.
- Country boarding searches now populate actual listings for the All cities view across the full country directory.

## Validation

Focused Node checks cover auction populations, age/current schooling and prices, actual scored histories and earnings, save/bid preservation, name migration, geography and booking charges, new ranking ages, zero-point entry, weekly publication, profile normalization and all-country boarding. Existing update85 checks cover multiple eligible mounts, independent results, ownership and manager behavior. Federation selection checks cover application qualifications and actual trial outcomes.

Chromium checks cover eight auction catalogs, performance history, bidding without reserving funds, pony heights, the travel switch, settings, national-team profile display and Japanese boarding listings. Fresh auction generation produced 110 lots with 775 recorded scored starts; initial generation took approximately 4.7 seconds in the measured browser run. Catalog generation remains a synchronous operation and this is not a claim of eliminating all game lag.
