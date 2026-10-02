"use client";

import { Button } from "@/components/ui/button";

// Lab playback: teal "Run it" (§6.4), ghost "Reset". Copy keeps its name through
// the state: Run it → Running… is handled by callers that track the run.
export function PlaybackControls({
  playing,
  onPlayPause,
  onReset,
}: {
  playing: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex gap-2">
      <Button variant="signal" onClick={onPlayPause}>
        {playing ? "Pause" : "Run it"}
      </Button>
      <Button variant="ghost-lab" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
