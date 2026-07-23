import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";

export default async function CursoC1UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-c1");
  return children;
}
