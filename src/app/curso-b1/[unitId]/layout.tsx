import { assertCourseUnitAccess } from "@/lib/access/assert-course-unit-access";

export default async function CursoB1UnitLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  await assertCourseUnitAccess(unitId, "/curso-b1");
  return children;
}
