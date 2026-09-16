-- Matrícula de alumnos en cursos. Idempotente por (email, course_id).
-- El workflow n8n lee/replica estos datos; D1 es la fuente de verdad de la app.

CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    current_level TEXT NOT NULL DEFAULT 'unknown',
    marketing_consent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at);

CREATE TABLE IF NOT EXISTS course_enrollments (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    email TEXT NOT NULL,
    course_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    source TEXT NOT NULL DEFAULT 'web',
    idempotency_key TEXT UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(email, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_email ON course_enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON course_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_created_at ON course_enrollments(created_at);

CREATE TABLE IF NOT EXISTS enrollment_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enrollment_id TEXT,
    email TEXT NOT NULL,
    course_id TEXT,
    event_type TEXT NOT NULL,
    payload TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_enrollment_events_email ON enrollment_events(email, created_at);
CREATE INDEX IF NOT EXISTS idx_enrollment_events_type ON enrollment_events(event_type, created_at);

CREATE TABLE IF NOT EXISTS enrollment_outbox (
    id TEXT PRIMARY KEY,
    enrollment_id TEXT NOT NULL,
    destination TEXT NOT NULL,
    payload TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    attempts INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    sent_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_outbox_status ON enrollment_outbox(status, created_at);

CREATE TABLE IF NOT EXISTS enrollment_rate_limits (
    key TEXT PRIMARY KEY,
    window_start TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0
);
