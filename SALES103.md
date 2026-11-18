# Sales profiles and auction movement quality

Movement suitability is nested inside each matching sale profile instead of being emitted as a sibling card in the listing grid. Collapsed sale profiles now include the horse name, and movement section headings repeat that name. Existing discipline, location, name and breed filters therefore remove the entire profile and its movement information together.

Auction View Horse profiles now include a named Movement quality disclosure using the same innate gait quality, rhythm training and potential summary as sales and owned profiles. Compact lot cards remain compact. Existing bidding, watchlist, contract, payment, delivery and auction rules are unchanged. No horse movement values are regenerated.

Native Chromium checks: every sale listing has exactly its matching horse movement section inside its profile; no orphan grid panels; profile disclosure and seller movement inquiry; exact auction horse movement values; watchlist actions and saved reload preserve those values; mobile viewport fits; no browser errors. Full appearance navigation/theme/purchase browser regression also passes.

Run `npm run test:sales-profiles-browser` with a static server on port 8113, or set GAME_URL.
