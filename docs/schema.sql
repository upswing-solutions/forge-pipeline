-- ============================================================================
-- FORGE pipeline -- reference database schema (DDL only)
-- ----------------------------------------------------------------------------
-- Schema for the FORGE pipeline reference implementation. Postgres is the
-- source of truth for business data; the Temporal workflow engine owns runtime
-- workflow state. These tables hold the business rows and the hash-addressed
-- artifacts that flow between pipeline stages.
--
-- Apply with:
--   psql "$DATABASE_URL" -f docs/schema.sql
--
-- This file is DDL only -- no seed data, no INSERT statements. Every statement
-- uses IF NOT EXISTS so it is safe to apply repeatedly.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- prospects
-- ----------------------------------------------------------------------------
-- A discovered, enriched business that the pipeline researches and builds a
-- spec website for. One row per business. The `scoring` JSONB holds the six
-- 0-10 scoring dimensions; `research_data` accumulates the free-form payload
-- gathered by the FIND stage.
--
-- Six scoring dimensions (each 0-10), stored in `scoring` JSONB:
--   website_quality      -- REVERSED: no website at all = 10, polished modern
--                           site = 0. A missing/weak site is the opportunity.
--   social_proof         -- review count + average. Many strong reviews = high.
--   contact_confidence   -- how reachable the owner is (phone/email/name/addr).
--   market_opportunity   -- demand vs. saturation in the local market.
--   business_maturity    -- tenure, licensing, bonded/insured = high.
--   competitive_position -- weak/few local competitors = high.
--
-- tier: 1 (lowest priority) .. 3 (best prospect, e.g. no site + strong reviews).
-- status: pipeline progression, see CHECK constraint below.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS prospects (
    id            SERIAL PRIMARY KEY,
    slug          TEXT NOT NULL UNIQUE,
    business_name TEXT NOT NULL,
    vertical      TEXT NOT NULL,
    city          TEXT,
    phone         TEXT,
    email         TEXT,
    owner_name    TEXT,
    website_url   TEXT,
    status        TEXT NOT NULL DEFAULT 'discovered',
    tier          SMALLINT,
    scoring       JSONB,
    research_data JSONB,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT prospects_tier_check
        CHECK (tier IS NULL OR tier BETWEEN 1 AND 3),
    CONSTRAINT prospects_status_check
        CHECK (status = ANY (ARRAY[
            'discovered',
            'researching',
            'dossier_compiled',
            'copy_written',
            'site_built',
            'qa_complete',
            'approved',
            'outreach_drafted',
            'outreach_sent',
            'payment_pending',
            'client_active',
            'disqualified',
            'escalated',
            'archived'
        ]))
);

CREATE INDEX IF NOT EXISTS prospects_status_idx   ON prospects (status);
CREATE INDEX IF NOT EXISTS prospects_tier_idx     ON prospects (tier);
CREATE INDEX IF NOT EXISTS prospects_vertical_idx ON prospects (vertical);


-- ----------------------------------------------------------------------------
-- artifacts
-- ----------------------------------------------------------------------------
-- Hash-addressed pipeline outputs. Every stage writes its output (dossier,
-- copy package, built site, build notes, etc.) keyed by a content hash so that
-- writes are idempotent on retry. This keeps Postgres the single record of
-- "what the pipeline produced" without duplicating it into workflow history.
--
-- `content_hash` is UNIQUE: the storeArtifact upsert does
--   ON CONFLICT (content_hash) DO UPDATE SET data = EXCLUDED.data
-- `data` holds the JSON payload (markdown body, parsed dossier, notes, etc.);
-- `file_path` optionally points at where the bytes live on disk (the workspace).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artifacts (
    id           SERIAL PRIMARY KEY,
    prospect_id  INTEGER NOT NULL REFERENCES prospects (id) ON DELETE CASCADE,
    kind         TEXT NOT NULL,
    content_hash TEXT NOT NULL UNIQUE,
    data         JSONB,
    stage        TEXT NOT NULL,
    activity     TEXT NOT NULL,
    file_path    TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS artifacts_prospect_id_idx ON artifacts (prospect_id);
CREATE INDEX IF NOT EXISTS artifacts_kind_idx        ON artifacts (kind);


-- ----------------------------------------------------------------------------
-- agent_learnings
-- ----------------------------------------------------------------------------
-- Append-only intelligence. After a build or outreach completes, capture what
-- was learned so it can be mined later (which templates convert, which copy
-- angles land). One row per learning, deliberately simple.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agent_learnings (
    id          SERIAL PRIMARY KEY,
    prospect_id INTEGER REFERENCES prospects (id) ON DELETE SET NULL,
    stage       TEXT,
    note        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_learnings_prospect_id_idx ON agent_learnings (prospect_id);
CREATE INDEX IF NOT EXISTS agent_learnings_stage_idx       ON agent_learnings (stage);


-- ----------------------------------------------------------------------------
-- sends
-- ----------------------------------------------------------------------------
-- Outreach delivery records. One row per delivery attempt per channel per
-- prospect. Tracks the destination address and the current delivery status.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sends (
    id          SERIAL PRIMARY KEY,
    prospect_id INTEGER NOT NULL REFERENCES prospects (id) ON DELETE CASCADE,
    channel     TEXT NOT NULL,
    to_address  TEXT,
    status      TEXT NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT sends_channel_check
        CHECK (channel = ANY (ARRAY['email', 'sms', 'phone'])),
    CONSTRAINT sends_status_check
        CHECK (status = ANY (ARRAY['pending', 'sent', 'delivered', 'failed', 'bounced']))
);

CREATE INDEX IF NOT EXISTS sends_prospect_id_idx ON sends (prospect_id);
CREATE INDEX IF NOT EXISTS sends_status_idx       ON sends (status);


-- ----------------------------------------------------------------------------
-- do_not_contact
-- ----------------------------------------------------------------------------
-- Suppression list. A phone, email, or business name on this list must never
-- be contacted. Checked before every outreach send.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS do_not_contact (
    id            SERIAL PRIMARY KEY,
    phone         TEXT,
    email         TEXT,
    business_name TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS do_not_contact_phone_idx ON do_not_contact (phone);
CREATE INDEX IF NOT EXISTS do_not_contact_email_idx ON do_not_contact (email);


-- ----------------------------------------------------------------------------
-- build_fingerprints
-- ----------------------------------------------------------------------------
-- Per-build design fingerprint, for design-convergence observability. Captures
-- the template, palette family, fonts, hero strategy, and section count of each
-- generated site so a convergence monitor can detect the builder homogenizing
-- (every site starting to look the same).
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS build_fingerprints (
    id             SERIAL PRIMARY KEY,
    prospect_id    INTEGER NOT NULL REFERENCES prospects (id) ON DELETE CASCADE,
    template       TEXT,
    palette_family TEXT,
    fonts          TEXT,
    hero_strategy  TEXT,
    section_count  INTEGER,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS build_fingerprints_prospect_id_idx ON build_fingerprints (prospect_id);
