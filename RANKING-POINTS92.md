# Eligible ranking points

Sanctioned custom shows at tiers 5–11 used an undefined national base: the tier table defines national values only for tiers 0–4. Their completed results therefore earned zero. They now use the existing non-world fallback of 45 base points, consistent with career catalogue classes. Already-booked snapshots receive the same fallback when scored. Schooling tier 0 remains a zero-point class.

Designated official calendar results also depended on the optional career progression toggle. Completing an eligible player entry now awards its ranking points independently of background progression settings. Local calendar shows remain unranked.

Loading an affected save restores qualifying player points from the stored official result, field size and field strength. This one-time repair uses retained completed ranking-show snapshots, a matching ranking class in the career catalogue, or the stored high-tier sanctioned national/division custom result. Local-show records are excluded. It retains nonzero awards and excludes sandbox, unofficial, eliminated and undersized results. It does not replay show prizes, training or sponsorships. The repaired points enter the applicable published ranking period or remain pending the next weekly release.

A separate release boundary bug excluded results ending exactly at the release hour. Computation now includes that hour, excludes future results, and the board view uses the same cutoff. Published boundary results are no longer labelled pending. Releases still occur every seven game days.

Validation: all twelve sanctioned custom tiers, designated ranking classes across four calendar years and all four disciplines, local-show exclusion, optional-progression independence, old booked snapshots, exact release boundary and future exclusion, save repair/idempotence, existing competition history/custom show/ranking-pool checks, and a Chromium live-completion plus verified save/reload test. Evidence is in validation92. The complete historical suite was not rerun.

The older career-expansion suite still stops at its existing “qualified youth blocked” Games fixture. The same failure was reproduced before these changes; both logs are retained. The separate federation progression suite passes. The live-result assertion in career-expansion now checks that eligible competition points are independent of the optional progression toggle.

The broader cached-worker comparison also encountered the existing final-reset clinical observation mismatch (`npcSales.2.medicalMoodObservation`). The same mismatch was captured before this change in PR217 testing; that baseline log is included. Ranking result/save-repair browser checks pass. No medical simulation changes are included here.
