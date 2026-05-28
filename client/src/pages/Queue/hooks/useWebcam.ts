import { useCallback, useEffect, useRef, useState } from "react";

// Live webcam access for the vision input. MoshiVis consumes a single still
// image per conversation (cross-attention), so we expose a `capture()` that
// snapshots the current frame as a data URL usable directly as `imageUrl`.
export const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const start = useCallback(async () => {
    if (streamRef.current) {
      return true;
    }
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setReady(true);
      setError(null);
      return true;
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.name : "camera error");
      setReady(false);
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setReady(false);
  }, []);

  // Snapshot the current frame as a JPEG data URL (fetchable as imageUrl).
  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      return null;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.92);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { videoRef, ready, error, start, stop, capture };
};
