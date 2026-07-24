import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";

export default async function CursoA2UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-a2");
  return children;
}
