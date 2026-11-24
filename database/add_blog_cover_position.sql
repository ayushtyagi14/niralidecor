-- Cover image crop focus for blogs, chosen in the admin.
-- Values are CSS object-position strings like '50% 20%'; NULL means centered.
ALTER TABLE blogs
ADD COLUMN IF NOT EXISTS cover_position_list TEXT,
ADD COLUMN IF NOT EXISTS cover_position_detail TEXT;
