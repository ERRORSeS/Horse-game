# Additive training extension audit

Authoritative implementation: training2.js. t2gain owns earned progression; Focus maps to h.focus/10, other attributes to h.training2.attributes. t2attempt owns the single interruption distribution, resistance and normalized quality outcomes. t2finish owns session history and the separate horse-health exposure. New rider falls must not duplicate that health pipeline.

Main goal currently stores free text without a gain multiplier. Lunging uses Groundwork exercises and currently shares leg/rein education, which needs separation. Refusals currently use generic resistance, not per-obstacle counts. Spooks currently use the interruption distribution, with no severity or rider stability outcome. No rider-stat subsystem exists.

Weather already generates persistent daily seasonal draws and time skips visit chronological hours. Arena activity is currently player selected. The extension will retain seasonal weights, refresh dated daily records and replace selection with persistent randomized session conditions.

Extension hooks: replace only attribute-award portion of t2gain; contextual spook/refusal profile hooks within existing checks; one pre-resolution major incident slot; one post-resolution rider stability decision; report augmentation and literal supplemental narratives. Existing core scene text, lesson and course structures, clinic, tack and veterinary systems remain authoritative.
