export type MobileCourseUnitSummary = {
  unitId: string;
  unitNumber: number;
  title: string;
  exerciseCount: number;
  estimatedDuration?: number;
};

export type MobileCourseCatalog = {
  courseId: string;
  totalUnits: number;
  units: MobileCourseUnitSummary[];
  sequential: {
    enabled: boolean;
    currentUnitNumber: number;
    completedUnits: number;
  };
};

export type MobileUnitPayload = {
  courseId: string;
  unitId: string;
  unitNumber: number | null;
  title: string;
  exerciseCount: number;
  exercises: unknown[];
  layout: 'six-lesson';
  validation: {
    ok: boolean;
    errorCount: number;
  };
};

export type MobileMeResponse = {
  user: {
    id: string;
    email?: string;
  };
  profile: {
    role?: string;
    subscriptionStatus?: string | null;
    subscriptionPlan?: string | null;
    languageLevel?: string | null;
  };
  entitlements: {
    isPaid: boolean;
    officialCourses: boolean;
    tier: string;
  };
};

export type MobileProgressUnit = {
  unit_id: number;
  status: 'not_started' | 'in_progress' | 'completed';
  exercises_completed: number;
  exercises_total: number;
  accuracy_percent?: number;
  last_activity_at?: string | null;
};

export type MobileProgressResponse = {
  courseId: string;
  progress: MobileProgressUnit[];
  summary: {
    totalUnitsStarted: number;
    totalUnitsCompleted: number;
    overallAccuracy: number;
  };
};

export type MobileRecordProgressBody = {
  courseId: string;
  unitId: number;
  lessonKey: string;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  expectedExercisesTotal?: number;
  timeSpentSeconds?: number;
};

export type MobileApiError = {
  error: string;
  code?: string;
  currentUnitNumber?: number;
};
