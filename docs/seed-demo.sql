-- Demo seed: one obviously-fake prospect so `npm run start` has something to
-- run against. This is placeholder data, not real business data. Apply after
-- docs/schema.sql:
--   psql forge -f docs/seed-demo.sql

INSERT INTO prospects (id, slug, business_name, vertical, city, phone, email, owner_name, website_url, status)
VALUES (
  1,
  'example-service-co',
  'Example Service Co',
  'local-service-business',
  'Anytown, USA',
  '000-000-0000',
  'demo@example.com',
  'Pat Example',
  NULL,
  'discovered'
)
ON CONFLICT (id) DO NOTHING;
