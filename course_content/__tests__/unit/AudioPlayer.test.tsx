import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AudioPlayer } from '@/components/course/preview/AudioPlayer';

const mockAudioUrl = 'https://example.com/audio.mp3';
const mockTranscript = 'This is a test transcript of the audio content.';

// Mock HTMLMediaElement methods
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();
});

describe('AudioPlayer Component', () => {
  test('renders audio controls correctly', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    expect(screen.getByLabelText('Play')).toBeInTheDocument();
    expect(screen.getByLabelText('Audio progress')).toBeInTheDocument();
    expect(screen.getByLabelText('Speed 0.75x')).toBeInTheDocument();
    expect(screen.getByLabelText('Speed 1x')).toBeInTheDocument();
    expect(screen.getByLabelText('Speed 1.25x')).toBeInTheDocument();
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
    expect(screen.getByLabelText('Mute')).toBeInTheDocument();
  });

  test('play/pause button toggles correctly', async () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    const playButton = screen.getByLabelText('Play');
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    });

    const pauseButton = screen.getByLabelText('Pause');
    fireEvent.click(pauseButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Play')).toBeInTheDocument();
    });
  });

  test('speed control buttons change playback rate', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;

    const speedButton = screen.getByLabelText('Speed 1.25x');
    fireEvent.click(speedButton);

    expect(audio.playbackRate).toBe(1.25);
  });

  test('speed control highlights active speed', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    const speed1x = screen.getByLabelText('Speed 1x');
    expect(speed1x).toHaveClass('bg-coral-500');

    const speed075x = screen.getByLabelText('Speed 0.75x');
    fireEvent.click(speed075x);

    expect(speed075x).toHaveClass('bg-coral-500');
    expect(speed1x).not.toHaveClass('bg-coral-500');
  });

  test('volume control changes audio volume', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;
    const volumeSlider = screen.getByLabelText('Volume') as HTMLInputElement;

    fireEvent.change(volumeSlider, { target: { value: '0.5' } });

    expect(audio.volume).toBe(0.5);
  });

  test('mute button toggles mute state', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;
    const muteButton = screen.getByLabelText('Mute');

    fireEvent.click(muteButton);

    expect(audio.volume).toBe(0);
    expect(screen.getByLabelText('Unmute')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Unmute'));

    expect(audio.volume).toBeGreaterThan(0);
  });

  test('transcript toggle button shows and hides transcript', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} transcript={mockTranscript} />);

    expect(screen.queryByText(mockTranscript)).not.toBeInTheDocument();

    const transcriptButton = screen.getByLabelText('Toggle transcript');
    fireEvent.click(transcriptButton);

    expect(screen.getByText(mockTranscript)).toBeInTheDocument();
    expect(screen.getByText('Transcript')).toBeInTheDocument();

    fireEvent.click(transcriptButton);

    expect(screen.queryByText(mockTranscript)).not.toBeInTheDocument();
  });

  test('does not render transcript button when no transcript provided', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    expect(screen.queryByLabelText('Toggle transcript')).not.toBeInTheDocument();
  });

  test('keyboard shortcut Space toggles play/pause', async () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} />);

    fireEvent.keyDown(window, { key: ' ' });

    await waitFor(() => {
      expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: ' ' });

    await waitFor(() => {
      expect(screen.getByLabelText('Play')).toBeInTheDocument();
    });
  });

  test('keyboard shortcut ArrowLeft seeks backward', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;

    Object.defineProperty(audio, 'duration', { value: 60, writable: false });
    fireEvent.loadedMetadata(audio);
    
    audio.currentTime = 10;
    fireEvent.timeUpdate(audio);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    expect(audio.currentTime).toBe(5);
  });

  test('keyboard shortcut ArrowRight seeks forward', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;

    Object.defineProperty(audio, 'duration', { value: 60, writable: false });
    fireEvent.loadedMetadata(audio);
    
    audio.currentTime = 10;
    fireEvent.timeUpdate(audio);

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(audio.currentTime).toBe(15);
  });

  test('progress bar click seeks to correct position', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;
    const progressBar = screen.getByLabelText('Audio progress');

    Object.defineProperty(audio, 'duration', { value: 100, writable: false });
    fireEvent.loadedMetadata(audio);

    Object.defineProperty(progressBar, 'offsetWidth', { value: 200 });
    Object.defineProperty(progressBar, 'getBoundingClientRect', {
      value: () => ({ left: 0 }),
    });

    fireEvent.click(progressBar, { clientX: 100 });

    expect(audio.currentTime).toBe(50);
  });

  test('has correct ARIA attributes', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} transcript={mockTranscript} />);

    const progressBar = screen.getByLabelText('Audio progress');
    expect(progressBar).toHaveAttribute('role', 'progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');

    const playButton = screen.getByLabelText('Play');
    expect(playButton).toHaveAttribute('aria-label', 'Play');

    const transcriptButton = screen.getByLabelText('Toggle transcript');
    expect(transcriptButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('applies custom className', () => {
    const { container } = render(
      <AudioPlayer audioUrl={mockAudioUrl} className="custom-class" />
    );

    const wrapper = container.querySelector('.custom-class');
    expect(wrapper).toBeInTheDocument();
  });

  test('formats time correctly', () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;

    Object.defineProperty(audio, 'duration', { value: 3665, writable: false });
    fireEvent.loadedMetadata(audio);

    audio.currentTime = 125;
    fireEvent.timeUpdate(audio);

    expect(screen.getByText('2:05')).toBeInTheDocument();
    expect(screen.getByText('61:05')).toBeInTheDocument();
  });

  test('handles audio ended event', async () => {
    const { container } = render(<AudioPlayer audioUrl={mockAudioUrl} />);
    const audio = container.querySelector('audio') as HTMLAudioElement;

    fireEvent.click(screen.getByLabelText('Play'));

    await waitFor(() => {
      expect(screen.getByLabelText('Pause')).toBeInTheDocument();
    });

    fireEvent.ended(audio);

    await waitFor(() => {
      expect(screen.getByLabelText('Play')).toBeInTheDocument();
    });
  });

  test('transcript toggle has correct aria-pressed state', () => {
    render(<AudioPlayer audioUrl={mockAudioUrl} transcript={mockTranscript} />);

    const transcriptButton = screen.getByLabelText('Toggle transcript');
    expect(transcriptButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(transcriptButton);

    expect(transcriptButton).toHaveAttribute('aria-pressed', 'true');
  });
});
