import { redirect } from "next/navigation";
import { getViewerCourseSequentialState } from "@/lib/access/get-viewer-course-sequential-state";

/** Suscriptores van directo a su unidad activa, sin ver el listado. */
export async function maybeRedirectSequentialSubscriber(
  coursePath: string,
  courseId: string,
  totalUnits: number
) {
  const state = await getViewerCourseSequentialState(courseId, totalUnits);
  if (state.sequentialMode) {
    redirect(`${coursePath}/unit-${state.currentUnitNumber}`);
  }
  return state;
}
