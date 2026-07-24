import type {
  MobileApiError,
  MobileCourseCatalog,
  MobileMeResponse,
  MobileProgressResponse,
  MobileRecordProgressBody,
  MobileUnitPayload,
} from './types';

export type MobileApiClientOptions = {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null> | string | null;
};

export class MobileApiClient {
  constructor(private readonly options: MobileApiClientOptions) {}

  private async headers(): Promise<HeadersInit> {
    const token =
      typeof this.options.getAccessToken === 'function'
        ? await this.options.getAccessToken()
        : this.options.getAccessToken ?? null;

    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers: {
        ...(await this.headers()),
        ...(init?.headers ?? {}),
      },
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const err = payload as MobileApiError;
      throw new Error(err.error || `API error ${response.status}`);
    }
    return payload as T;
  }

  getMe() {
    return this.request<MobileMeResponse>('/api/mobile/v1/me');
  }

  getCourseCatalog(courseId: string) {
    return this.request<MobileCourseCatalog>(`/api/mobile/v1/course/${courseId}`);
  }

  getUnit(courseId: string, unitId: string) {
    return this.request<MobileUnitPayload>(
      `/api/mobile/v1/course/${courseId}/units/${encodeURIComponent(unitId)}`
    );
  }

  getProgress(courseId: string) {
    return this.request<MobileProgressResponse>(
      `/api/mobile/v1/progress?courseId=${encodeURIComponent(courseId)}`
    );
  }

  recordProgress(body: MobileRecordProgressBody) {
    return this.request<{ ok: boolean }>('/api/mobile/v1/progress/record', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}
