import { config } from '../config';

export type MobileCourseCatalog = {
  courseId: string;
  totalUnits: number;
  sequential: {
    enabled: boolean;
    currentUnitNumber: number;
    completedUnits: number;
  };
};

export type MobileUnitPayload = {
  courseId: string;
  unitId: string;
  title: string;
  exerciseCount: number;
  exercises: unknown[];
};

export type MobileMeResponse = {
  user: { id: string; email?: string };
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

export type MobileRecordProgressBody = {
  courseId: string;
  unitId: number;
  lessonKey: string;
  exerciseId: string;
  exerciseType: string;
  isCorrect: boolean;
  expectedExercisesTotal?: number;
};

export class FocusEnglishApi {
  constructor(
    private readonly getAccessToken: () => Promise<string | null>
  ) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = await this.getAccessToken();
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error((payload as { error?: string }).error ?? `HTTP ${response.status}`);
    }
    return payload as T;
  }

  getCourseCatalog(courseId: string) {
    return this.request<MobileCourseCatalog>(`/api/mobile/v1/course/${courseId}`);
  }

  getUnit(courseId: string, unitId: string) {
    return this.request<MobileUnitPayload>(
      `/api/mobile/v1/course/${courseId}/units/${encodeURIComponent(unitId)}`
    );
  }

  getMe() {
    return this.request<MobileMeResponse>('/api/mobile/v1/me');
  }

  recordProgress(body: MobileRecordProgressBody) {
    return this.request<{ ok: boolean }>('/api/mobile/v1/progress/record', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}
