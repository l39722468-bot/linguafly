import { render, screen, waitFor } from '@testing-library/react';
import WorldMapPanel from '@/components/panel/WorldMapPanel';

describe('WorldMapPanel', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('muestra el nivel y el CTA al cargar el mapa', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        level: 'A2',
        nextExerciseId: 'a2-exercise-1-1',
        worlds: [
          {
            id: 'a2-world-1',
            title: 'Mundo inicial',
            description: 'Primer bloque',
            worldOrder: 1,
            status: 'unlocked',
            progressPercent: 0,
            completedExercises: 0,
            totalExercises: 8,
            exercises: [
              {
                id: 'a2-exercise-1-1',
                title: 'Ejercicio 1',
                description: 'Desc',
                exerciseOrder: 1,
                status: 'unlocked',
                bestScore: 0,
                attempts: 0,
              },
            ],
          },
        ],
      }),
    });

    render(<WorldMapPanel />);

    await waitFor(() => {
      expect(screen.getByText(/Ruta de nivel A2/i)).toBeInTheDocument();
      expect(screen.getByText(/Continuar ejercicio/i)).toBeInTheDocument();
      expect(screen.getByText(/Mundo 1: Mundo inicial/i)).toBeInTheDocument();
    });
  });
});
