export type ViewerCourseSequentialState = {
  isPaid: boolean;
  isAdmin: boolean;
  /** Suscripción activa: una unidad a la vez. */
  sequentialMode: boolean;
  currentUnitNumber: number;
  completedUnits: number;
  totalUnits: number;
};

/** Blog gratuito: sin modo secuencial ni gates de pago. */
export async function getViewerCourseSequentialState(
  _courseId: string,
  totalUnits: number
): Promise<ViewerCourseSequentialState> {
  return {
    isPaid: true,
    isAdmin: false,
    sequentialMode: false,
    currentUnitNumber: 1,
    completedUnits: 0,
    totalUnits,
  };
}

export async function assertSequentialUnitAccess(_params: {
  unitId: string;
  courseId: string;
  coursePath: string;
  totalUnits: number;
}): Promise<void> {
  return;
}
