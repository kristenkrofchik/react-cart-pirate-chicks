\echo 'Delete and recreate pirateChicks db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE piratechicks;
CREATE DATABASE piratechicks;
\connect piratechicks

\i piratechicks-schema.sql
\i piratechicks-seed.sql

\echo 'Delete and recreate piratechicks_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE piratechicks_test;
CREATE DATABASE piratechicks_test;
\connect piratechicks_test

\i piratechicks-schema.sql