# Revised master expansion audit

Baseline: 30200a6. Source backup: outputs/oxer-before-major-expansion.zip (outside repository). No player save is reset.

Training: canonical original skills are h.stats.jumping (Striding, Confidence, Balance, Power, Speed, Structure) and h.stats.dressage (Collection, Balance, Connection, Gaits, Rhythm, Flowiness), 0–100. Hunters combine existing jumping/dressage values; Eventing likewise has no independent invented skill registry. t2gain currently awards one e.skill only, uses old .05/.10/.20/.28 bases and total 1.2 cap, and the later session-floor wrapper rounds genuine fractional progress up to at least 1. These paths prevent the requested primary/secondary mappings and truthful fractional progression. Riding attributes are separate h.training2.attributes, with canonical Focus=h.focus/10; t2xAttributeGain is authoritative and must be preserved.

t2attempt owns existing normalized quality and gated contextual interruptions; t2xBeforeAttempt/AfterAttempt own major behavior and conditional rider falls. Existing weather, shared daily stamina and scheduled 09:00 execution remain authoritative. There is no monthly progression cap.

Medical: addIllness creates named h.illnesses records, immediate soundness loss and recovery timers; visibleIllnesses and direct illness rendering expose them. Numerous eligibility/competition/care consumers read active legacy records. Replacement needs a compatibility projection of functional restrictions without leaking hidden diagnostic names, and chronological recovery instead of legacy timer cures. Save key is horse_game_save_v1. Migration must back up the original serialized save before adding schema fields.

Sales: renderMarket directly charges and creates horses; renderSales and horse-card actions have separate ownership shortcuts. A replacement must route all purchases/listings through one transaction engine, with once-only payment/transfer guards, rather than leaving old buy/sell handlers available.

Farrier and Vet renderers mix basic health services with reproduction. Reproduction must be retained while replacing only medical services. Rescue generation, original genetics/potential, inventory IDs, pasture relationships and histories remain intact. New health truth, pharmacy inventory, hoof records and transaction records must be versioned independently and migrated additively.
