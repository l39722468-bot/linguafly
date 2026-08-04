import {
  compareBlogCourseRelations,
  getDedicatedUnitFromArticle,
  getRelationRelevanceRank,
  type BlogCourseRelation,
} from '@/lib/blog-course-map';

function relation(
  partial: Partial<BlogCourseRelation> &
    Pick<BlogCourseRelation, 'articleSlug' | 'articleCategory' | 'courseId' | 'unitNumber' | 'articleTitle'>,
): BlogCourseRelation {
  return {
    articleUrl: `/blog/${partial.articleCategory}/${partial.articleSlug}`,
    topicId: 'tema',
    topicName: 'Tema',
    courseLabel: partial.courseId.toUpperCase(),
    unitTitle: `Unidad ${partial.unitNumber}`,
    unitUrl: `/curso-${partial.courseId}/unit-${partial.unitNumber}`,
    ...partial,
  };
}

describe('blog-course-map priority', () => {
  it('detects dedicated curso/unidad articles', () => {
    expect(
      getDedicatedUnitFromArticle({
        slug: 'unidad-8-preposiciones-tiempo-at-on-in',
        category: 'curso-a2',
      }),
    ).toEqual({ courseId: 'a2', unitNumber: 8 });

    expect(
      getDedicatedUnitFromArticle({
        slug: 'preposiciones-tiempo-guia',
        category: 'gramatica',
      }),
    ).toBeNull();
  });

  it('ranks dedicated unit articles above generic topic matches', () => {
    const dedicated = relation({
      articleSlug: 'unidad-8-preposiciones-tiempo-at-on-in',
      articleTitle: 'Preposiciones de tiempo A2',
      articleCategory: 'curso-a2',
      courseId: 'a2',
      unitNumber: 8,
    });
    const generic = relation({
      articleSlug: 'aptis-preposiciones',
      articleTitle: 'Aptis preposiciones',
      articleCategory: 'examenes',
      courseId: 'a2',
      unitNumber: 8,
    });

    expect(getRelationRelevanceRank(dedicated)).toBe(0);
    expect(getRelationRelevanceRank(generic)).toBe(4);
    expect(compareBlogCourseRelations(dedicated, generic)).toBeLessThan(0);
  });

  it('puts dedicated A2 unit articles first when sorting a filtered unit list', () => {
    const rows = [
      relation({
        articleSlug: 'errores-comunes-preposiciones',
        articleTitle: 'Errores comunes con preposiciones',
        articleCategory: 'gramatica',
        courseId: 'a2',
        unitNumber: 8,
      }),
      relation({
        articleSlug: 'unidad-8-preposiciones-tiempo-at-on-in',
        articleTitle: 'Preposiciones de tiempo A2: at, on, in',
        articleCategory: 'curso-a2',
        courseId: 'a2',
        unitNumber: 8,
      }),
      relation({
        articleSlug: 'como-usar-at-on-in',
        articleTitle: 'Cómo usar at on in',
        articleCategory: 'gramatica',
        courseId: 'a2',
        unitNumber: 8,
      }),
    ];

    const sorted = [...rows].sort(compareBlogCourseRelations);
    expect(sorted[0].articleSlug).toBe('unidad-8-preposiciones-tiempo-at-on-in');
  });
});
