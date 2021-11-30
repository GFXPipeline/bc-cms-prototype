-- Get a hierarchical page tree of all current pages
-- (pages with `is_marked_for_deletion` = false)

-- Build a `parents` column that holds an array of a page's parents
-- ex: {4a0f3606-26a1-44e6-ad46-1ff53dd8384f,0b2a7d41-d67f-4e54-a51f-b5f69967c33e}
with recursive
pages_from_parents as
(
  select id, parent_page_id, title, '{}'::uuid[] as parents, 0 as level
    from pages
    where parent_page_id is NULL
      and is_marked_for_deletion = false

  union all

  select c.id, c.parent_page_id, c.title, parents || c.parent_page_id, level + 1
    from pages_from_parents p
    join pages c
      on c.parent_page_id = p.id
    where not c.id = any(parents)
      and is_marked_for_deletion = false
),
-- Find the max level (depth) of the page tree
maxlvl as (
  select max(level) maxlvl
    from pages_from_parents
),
-- Build the page tree from the max level
page_tree as (
  select level, title, id, parent_page_id, jsonb '{}' children
    from pages_from_parents, maxlvl
    where level = maxlvl

  union
  (
    select
      (branch_parent).level,
      (branch_parent).title,
      (branch_parent).id,
      (branch_parent).parent_page_id,
      jsonb_object_agg((branch_child).id, branch_child) as children
    from (
      select branch_parent, branch_child
      from pages_from_parents branch_parent
      join page_tree branch_child
        on branch_child.parent_page_id = branch_parent.id
    ) branch
    group by branch.branch_parent

    union

    select
      c.level, c.title, c.id, c.parent_page_id, jsonb '{}' children
    from pages_from_parents c
    where not exists (
      select 1 from pages_from_parents hypothetical_child
        where hypothetical_child.parent_page_id = c.id
    )
  )
)
-- Return a JSON tree from the root
select jsonb_object_agg(page_tree.id, page_tree)::jsonb as tree
  from page_tree
  where level = 0;
