import { getInteractiveUnitVideo } from '@/lib/course/unit-videos';
import { UnitVideoLauncher } from './UnitVideoLauncher';

interface InteractiveUnitVideoProps {
  courseSlug: string;
  unitId: string;
}

export function InteractiveUnitVideo({ courseSlug, unitId }: InteractiveUnitVideoProps) {
  const video = getInteractiveUnitVideo(courseSlug, unitId);
  if (!video) return null;

  const unitNumber = unitId.replace('unit-', '');
  return (
    <UnitVideoLauncher
      youtubeId={video.youtubeId}
      title={video.title || `Vídeo-clase · Unidad ${unitNumber}`}
    />
  );
}
