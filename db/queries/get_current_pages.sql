-- Get current pages for display
select *
  from pages p
  where
    -- Page is not marked for deletion
    p.is_marked_for_deletion = false
  or
    -- Page is marked for deletion and no entry exists in deletions
    p.is_marked_for_deletion = true and
    not exists (
      select 1
        from deletions d
        where d.page_id = p.id
    )
  or
    -- Page is marked for deletion and deletion date is in the future
    p.is_marked_for_deletion = true and
    now() < (
      select time_to_delete
        from deletions d
        where d.page_id = p.id
      )
  or
    -- Page is marked for SOFT deletion and deletion date is in the past
    p.is_marked_for_deletion = true and (
      select is_hard_delete
        from deletions d
        where d.page_id = p.id
    ) = false and
      now() > (
        select time_to_delete
          from deletions d
          where d.page_id = p.id
      );
