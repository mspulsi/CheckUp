-- ============================================================
-- CheckUp Seed Data (SQLite)
-- Run: sqlite3 db/checkup.db < db/seed.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============================================================
-- USERS
-- passwords are plaintext here for dev purposes only
-- replace with hashed values when you add bcrypt
-- ============================================================
INSERT INTO users (user_email, user_display_name, password, user_dob, user_role, medical_field, is_verified) VALUES
('aiden@checkup.com',   'Aiden Clark',    'password123', '1998-04-12', 'admin',    'General Practice',    1),
('sarah@checkup.com',   'Sarah Nguyen',   'password123', '1995-07-23', 'user',     'Cardiology',          1),
('marcus@checkup.com',  'Marcus Bell',    'password123', '2000-01-05', 'user',     'Neurology',           0),
('priya@checkup.com',   'Priya Sharma',   'password123', '1993-11-30', 'user',     'Pediatrics',          1),
('jordan@checkup.com',  'Jordan Lee',     'password123', '1997-03-18', 'user',     'Emergency Medicine',  1);

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug) VALUES
('Cardiology',         'cardiology'),
('Neurology',          'neurology'),
('Pharmacology',       'pharmacology'),
('Anatomy',            'anatomy'),
('Emergency Medicine', 'emergency-medicine'),
('Pediatrics',         'pediatrics');

-- ============================================================
-- POSTS
-- ============================================================
INSERT INTO posts (user_id, content_text, view_count) VALUES
(1, 'Quick tip: when assessing chest pain always rule out ACS first. Use the HEART score to stratify risk — it''s fast and reliable in the ED.', 142),
(2, 'New study out of Mayo links elevated troponin levels with long-COVID cardiac complications. Worth reading if you''re in cardio.', 87),
(3, 'Anyone else find the Glasgow Coma Scale inconsistent for intubated patients? There are better tools for sedated ICU patients.', 55),
(4, 'Reminder that fever in a neonate under 28 days is a full sepsis workup — no exceptions, no matter how well they look.', 201),
(5, 'Just ran my first solo code blue. ACLS algorithms are second nature now. Practice them until they''re automatic.', 319);

-- ============================================================
-- POST LIKES
-- ============================================================
INSERT INTO post_likes (user_id, post_id) VALUES
(2, 1), (3, 1), (4, 1), (5, 1),
(1, 2), (3, 2),
(1, 3), (4, 3),
(1, 4), (2, 4), (5, 4),
(1, 5), (2, 5), (3, 5), (4, 5);

-- ============================================================
-- POST SAVES
-- ============================================================
INSERT INTO post_saves (user_id, post_id) VALUES
(2, 1),
(3, 4),
(5, 2),
(1, 5),
(4, 3);

-- ============================================================
-- MEDIA
-- ============================================================
INSERT INTO media (post_id, media_type, file_url, sort_order) VALUES
(1, 'image',    '/uploads/heart-score-chart.png', 1),
(2, 'document', '/uploads/mayo-troponin-study.pdf', 1),
(5, 'image',    '/uploads/acls-algorithm.png', 1);

-- ============================================================
-- POST CATEGORIES
-- ============================================================
INSERT INTO post_categories (post_id, category_id) VALUES
(1, 1), -- post 1 → Cardiology
(1, 5), -- post 1 → Emergency Medicine
(2, 1), -- post 2 → Cardiology
(3, 2), -- post 3 → Neurology
(4, 6), -- post 4 → Pediatrics
(5, 5); -- post 5 → Emergency Medicine

-- ============================================================
-- QUIZZES
-- ============================================================
INSERT INTO quizzes (title, description, difficulty) VALUES
('Cardiac Emergencies 101',  'Test your knowledge of ACS, arrhythmias, and cardiac arrest protocols.', 'medium'),
('Neurological Assessment',  'GCS, stroke recognition, and cranial nerve evaluation.',                   'hard'),
('Pediatric Vitals & Dosing','Normal ranges and weight-based dosing for pediatric patients.',            'easy');

-- ============================================================
-- QUESTIONS
-- ============================================================
INSERT INTO questions (quiz_id, question_text, question_type, sort_order) VALUES
-- Quiz 1
(1, 'What is the first-line treatment for ventricular fibrillation?',           'multiple_choice', 1),
(1, 'ST elevation in leads II, III, and aVF indicates an inferior MI.',         'true_false',      2),
(1, 'Which drug is used to chemically cardiovert atrial fibrillation?',         'multiple_choice', 3),
-- Quiz 2
(2, 'A GCS score of 8 or below generally indicates the need for intubation.',   'true_false',      1),
(2, 'Which finding is associated with uncal herniation?',                       'multiple_choice', 2),
-- Quiz 3
(3, 'Normal resting heart rate for a 2-year-old is 60–100 bpm.',               'true_false',      1),
(3, 'What is the pediatric dose of epinephrine during cardiac arrest?',         'multiple_choice', 2);

-- ============================================================
-- ANSWERS
-- ============================================================
INSERT INTO answers (question_id, answer_text, is_correct) VALUES
-- Q1: VFib treatment
(1, 'Defibrillation',    1),
(1, 'Amiodarone',        0),
(1, 'Atropine',          0),
(1, 'Cardioversion',     0),
-- Q2: Inferior MI (true)
(2, 'True',              1),
(2, 'False',             0),
-- Q3: Afib cardioversion drug
(3, 'Amiodarone',        1),
(3, 'Adenosine',         0),
(3, 'Lidocaine',         0),
(3, 'Metoprolol',        0),
-- Q4: GCS intubation (true)
(4, 'True',              1),
(4, 'False',             0),
-- Q5: Uncal herniation
(5, 'Ipsilateral fixed and dilated pupil', 1),
(5, 'Bilateral pinpoint pupils',           0),
(5, 'Contralateral pupil dilation',        0),
-- Q6: Pediatric HR (false — normal is 80–130)
(6, 'True',              0),
(6, 'False',             1),
-- Q7: Pediatric epi dose
(7, '0.01 mg/kg IV/IO',  1),
(7, '0.1 mg/kg IV/IO',   0),
(7, '1 mg flat dose',    0);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
INSERT INTO quiz_attempts (user_id, quiz_id, score, max_possible_score) VALUES
(1, 1, 3, 3),
(2, 1, 2, 3),
(3, 2, 1, 2),
(4, 3, 2, 2),
(5, 1, 3, 3),
(1, 3, 1, 2);
