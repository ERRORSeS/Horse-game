# Responsive gameplay and time skipping

The previous update reduced simulation time, but the skip buttons still ran every computation on the browser's UI thread. Autosaving also performed large JSON encodings on that thread. Both could visibly stop the page even when the total simulation was relatively fast.

## Changes

- Hour/day/month buttons run the existing simulation functions in an isolated Web Worker using the same game scripts, state and rules. An accessible progress dialog remains responsive and offers cancellation. Consecutive skips reuse the initialized worker for up to 60 seconds, avoiding repeated engine loading; cancellation/errors terminate it.
- The live game changes only after successful completion and validation. Cancellation and worker errors leave the original state intact. Repeated clicks share the existing task.
- Recent generated horse names are transferred with the state so naming remains consistent. The active save identity and most recent save metadata are preserved when applying the result.
- Automatic save JSON encoding runs in a separate worker. Its payload matches the existing codec, including delivered-horse references, auction seller references and queued catalogs.
- The save queue retains edits made while encoding. Loading, importing or creating a save waits for in-flight writes. Unsaved status includes pending work, and failed encoding retains the previous verified save and allows retry.
- The month benchmark now waits for the asynchronous skip before measuring the result.

## Validation

`npm run test:responsive-time-browser` passed in Chromium:

- Complete normalized game-state comparisons for hour, day, month and year rollover matched the original synchronous simulation under identical random seeds. The fixture includes Rider Realism, Career Progression, rankings, a diagnosed injury with a care plan, and a hired manager with vet/farrier/treatment/training enabled. Only save feedback/identity timestamps are excluded from comparison.
- A 16 ms UI heartbeat continued during every simulation. In the final isolated run, maximum observed heartbeat gaps were approximately 83 ms (hour), 80 ms (day), 85 ms (month) and 324 ms (larger year-rollover state). The year-rollover computation itself took about 3.3 seconds in the worker while the UI heartbeat ran 187 times.
- Cancellation, duplicate requests and worker import failure retained the original state.
- Background save payload was byte-identical to the existing codec with delivered horses, queued catalogs and seller references.
- Edits during an in-flight save produced a second snapshot with the latest money value; no queued edit was dropped.
- Encoder failure retained the previous verified snapshot, left progress dirty and successfully saved on retry.
- Loading waited for an in-flight save and restored its latest value. Actual device save/reload preserved the final date and money.

Additional passing checks: four month-performance tests, six single-save regression tests, auction save/import/delivery regressions, and rider/time-profile regressions. Syntax and whitespace checks pass. The full npm test suite was not run.

## Limits

This removes simulation and JSON encoding from the UI thread; it does not promise zero frame delays on every device. State cloning, rendering and IndexedDB verification still use some main-thread work. Larger year-rollover saves showed a brief copying/rendering pause, and total elapsed time still includes the actual simulation, worker setup and verified saving. Modern browser Worker and dialog support is required for background time skipping. Worker failure never silently reruns or partially applies a skip.
