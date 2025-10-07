CREATE
OR REPLACE FUNCTION default_username () RETURNS trigger AS '
BEGIN
  NEW.username := concat(''user'', nextval(''username_seq''));
  NEW.display_username := NEW.username;

  RETURN NEW;
END
' LANGUAGE plpgsql;

CREATE TRIGGER default_username_trigger BEFORE INSERT ON users FOR EACH ROW WHEN (
  NEW.display_username IS NULL
  AND NEW.username IS NULL
  AND NEW.is_anonymous IS DISTINCT
  FROM
    true
) EXECUTE FUNCTION default_username ();