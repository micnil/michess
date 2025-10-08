CREATE
OR REPLACE FUNCTION set_default_username () RETURNS trigger AS '
DECLARE
  base_username TEXT;
  conflict_count INTEGER;
  final_username TEXT;
BEGIN
  -- Extract and clean username from email
  base_username := lower(regexp_replace(
    split_part(NEW.email, ''@'', 1),
    ''[^a-zA-Z0-9_]'',
    '''',
    ''g''
  ));

  -- Fallback to ''user'' if email prefix is empty
  IF base_username = '''' THEN
    base_username := ''user'';
  END IF;

  -- Try base username first
  BEGIN
    UPDATE users
    SET username = base_username,
        display_username = COALESCE(display_username, base_username)
    WHERE id = NEW.id;
    RETURN NEW;
  EXCEPTION
    WHEN unique_violation THEN
      -- Count existing variants and start from there
      SELECT COUNT(*) INTO conflict_count
      FROM users
      WHERE username ~ (''^'' || base_username || ''[0-9]*$'');
  END;

  -- Try numbered usernames starting from conflict count
  FOR attempt IN conflict_count..conflict_count + 99 LOOP
    final_username := base_username || attempt;

    BEGIN
      UPDATE users
      SET username = final_username,
          display_username = COALESCE(display_username, final_username)
      WHERE id = NEW.id;
      RETURN NEW;
    EXCEPTION
      WHEN unique_violation THEN
        -- Try next number
        NULL;
    END;
  END LOOP;

  -- If all attempts failed, username stays NULL
  RETURN NEW;
END
' LANGUAGE plpgsql;

CREATE TRIGGER set_default_username_trigger AFTER INSERT ON users FOR EACH ROW WHEN (
  NEW.username IS NULL
  AND NEW.is_anonymous IS DISTINCT
  FROM
    true
) EXECUTE FUNCTION set_default_username ();