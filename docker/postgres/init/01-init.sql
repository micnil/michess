-- This file will be executed when the PostgreSQL container starts for the first time
-- You can add any initial database setup here

-- Example: Create additional databases if needed
-- CREATE DATABASE michess_test;

-- Example: Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
