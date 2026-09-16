-- Esquema de matrículas para la instancia Postgres de n8n (ops / CRM copy).
-- La app Next.js usa D1 como fuente de verdad; n8n replica aquí para
-- reintentos, reporting y el propio workflow.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    current_level TEXT NOT NULL DEFAULT 'unknown',
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_enrollments (
    id UUID PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES students(id),
    email TEXT NOT NULL,
    course_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    source TEXT NOT NULL DEFAULT 'web',
    idempotency_key TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (email, course_id)
);

CREATE INDEX IF NOT EXISTS idx_n8n_enrollments_email ON course_enrollments (email);
CREATE INDEX IF NOT EXISTS idx_n8n_enrollments_course ON course_enrollments (course_id);

CREATE TABLE IF NOT EXISTS enrollment_events (
    id BIGSERIAL PRIMARY KEY,
    enrollment_id UUID,
    email TEXT NOT NULL,
    course_id TEXT,
    event_type TEXT NOT NULL,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS failed_enrollments (
    id BIGSERIAL PRIMARY KEY,
    execution_id TEXT,
    workflow_name TEXT,
    email TEXT,
    course_id TEXT,
    error_message TEXT,
    payload JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
