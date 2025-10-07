CREATE
OR REPLACE FUNCTION default_display_username () RETURNS trigger AS '
BEGIN
   NEW.display_username := NEW.username;
   RETURN NEW;
END
' LANGUAGE plpgsql;

CREATE TRIGGER default_display_username_trigger BEFORE INSERT ON users FOR EACH ROW WHEN (
  NEW.display_username IS NULL
  AND NEW.username IS NOT NULL
) EXECUTE FUNCTION default_display_username ();