'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { UnitMetadata } from '@/types/premium-course';
import { UnitCard } from './UnitCard';
import { UnitCardSkeleton } from './UnitCardSkeleton';

interface LazyUnitGridProps {
  units: UnitMetadata[];
  initialLoadCount?: number;
  loadMoreCount?: number;
  coursePath?: string;
  hasFullAccess?: boolean;
}

export function LazyUnitGrid({ 
  units, 
  initialLoadCount = 20,
  loadMoreCount = 20,
  coursePath = '/curso-a1',
  hasFullAccess = false,
}: LazyUnitGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const visibleUnits = useMemo(() => units.slice(0, visibleCount), [units, visibleCount]);
  const hasMore = visibleCount < units.length;

  useEffect(() => {
    setVisibleCount(initialLoadCount);
  }, [units, initialLoadCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + loadMoreCount, units.length));
            setIsLoading(false);
          }, 100);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMoreCount, units.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleUnits.map((unit) => (
          <UnitCard key={unit.unitId} unit={unit} coursePath={coursePath} hasFullAccess={hasFullAccess} />
        ))}
      </div>

      {hasMore && (
        <div ref={observerTarget} className="mt-6">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: Math.min(loadMoreCount, units.length - visibleCount) }).map((_, i) => (
                <UnitCardSkeleton key={`skeleton-${i}`} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
