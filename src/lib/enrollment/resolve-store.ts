import { resolveCloudflareEnv } from "@/lib/db/client";
import {
  D1EnrollmentStore,
  getMemoryEnrollmentStore,
  type EnrollmentStore,
} from "./store";

export async function resolveEnrollmentStore(): Promise<EnrollmentStore> {
  try {
    const { env } = await resolveCloudflareEnv();
    if (env.DB) return new D1EnrollmentStore(env.DB);
  } catch {
    // Local `next dev` and unit tests fall back to an in-memory store.
  }
  return getMemoryEnrollmentStore();
}
