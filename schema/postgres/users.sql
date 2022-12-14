CREATE TABLE IF NOT EXISTS users
(
    user_id     VARCHAR(30)  NOT NULL PRIMARY KEY,
    user_name   VARCHAR(30)  NOT NULL UNIQUE,
    full_name   VARCHAR(255) NOT NULL DEFAULT '',
    password    VARCHAR(255) NOT NULL DEFAULT '',
    is_admin    bool         NOT NULL DEFAULT false,
    create_time TIMESTAMP    NOT NULL DEFAULT NOW(),
    update_time TIMESTAMP
);

CREATE INDEX IF NOT EXISTS user_is_admin ON users (user_name, is_admin);

-- password : admintoko123
INSERT INTO users (user_id, user_name, full_name, password, is_admin, create_time, update_time)
VALUES ('admin', 'admin', 'Super Admin', '$2a$10$2fKbn9YBTMnLu.c5WhzjBOJAxlqcLUiznLHZ783zBE6TBmVvmasKG', true,
        '2022-07-22 02:36:31.189328', null)
ON CONFLICT DO NOTHING;
