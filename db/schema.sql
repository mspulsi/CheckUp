-- ============================================================
-- CheckUp Database Schema (SQLite)
-- Run: sqlite3 db/checkup.db < db/schema.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- Drop tables in reverse dependency order (safe re-run)
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS post_categories;
DROP TABLE IF EXISTS post_saves;
DROP TABLE IF EXISTS post_likes;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
    user_id           INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email        VARCHAR(100) NOT NULL UNIQUE,
    user_display_name VARCHAR(50),
    password          VARCHAR(255) NOT NULL,
    user_dob          DATE,
    user_role         VARCHAR(50) DEFAULT 'user',
    medical_field     VARCHAR(100),
    is_verified       INTEGER DEFAULT 0,  -- 0 = false, 1 = true
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(50) NOT NULL,
    slug        VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================================
-- POSTS
-- ============================================================
CREATE TABLE posts (
    post_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content_text TEXT,
    view_count   INTEGER DEFAULT 0,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- POST LIKES
-- ============================================================
CREATE TABLE post_likes (
    user_id    INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    post_id    INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

-- ============================================================
-- POST SAVES
-- ============================================================
CREATE TABLE post_saves (
    user_id    INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    post_id    INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id)
);

-- ============================================================
-- MEDIA
-- ============================================================
CREATE TABLE media (
    media_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id    INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    media_type VARCHAR(20) CHECK (media_type IN ('image', 'video', 'document')),
    file_url   VARCHAR(255),
    sort_order INTEGER DEFAULT 0
);

-- ============================================================
-- POST CATEGORIES (junction)
-- ============================================================
CREATE TABLE post_categories (
    post_id     INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- ============================================================
-- QUIZZES
-- ============================================================
CREATE TABLE quizzes (
    quiz_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    title       VARCHAR(150) NOT NULL,
    description TEXT,
    difficulty  VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

-- ============================================================
-- QUESTIONS
-- ============================================================
CREATE TABLE questions (
    question_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id       INTEGER NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) CHECK (question_type IN ('multiple_choice', 'true_false')),
    sort_order    INTEGER DEFAULT 0
);

-- ============================================================
-- ANSWERS
-- ============================================================
CREATE TABLE answers (
    answer_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    answer_text VARCHAR(255) NOT NULL,
    is_correct  INTEGER DEFAULT 0  -- 0 = false, 1 = true
);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE quiz_attempts (
    attempt_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id            INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    quiz_id            INTEGER NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    score              INTEGER DEFAULT 0,
    max_possible_score INTEGER,
    completed_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);
