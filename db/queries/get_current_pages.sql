-- TODO: This is no longer used in the GET /api/pages/all route, but I'm leaving
--       it here until the delete function is mature (especially the lack of an
--       explicit "soft" delete that a user selects).

-- Get current pages for display
select *
  from pages p
  where
    -- Page is not marked for deletion
    p.is_marked_for_deletion = false
  or
    -- Page is marked for deletion and no entry exists in page_deletions
    p.is_marked_for_deletion = true and
    not exists (
      select 1
        from page_deletions d
        where d.page_id = p.id
    )
  or
    -- Page is marked for deletion and deletion date is in the future
    p.is_marked_for_deletion = true and
    now() < (
      select time_to_delete
        from page_deletions d
        where d.page_id = p.id
      )
  or
    -- Page is marked for SOFT deletion and deletion date is in the past
    p.is_marked_for_deletion = true and (
      select is_hard_delete
        from page_deletions d
        where d.page_id = p.id
    ) = false and
      now() > (
        select time_to_delete
          from page_deletions d
          where d.page_id = p.id
      );
