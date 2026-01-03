'use client';

import { useState, useEffect, useRef } from 'react';

interface BackgroundTextureResult {
  image: HTMLImageElement | null;
  width: number;
  height: number;
  loaded: boolean;
  error: string | null;
}

// Global cache for background image
let cachedImage: HTMLImageElement | null = null;
let imageLoadPromise: Promise<HTMLImageElement> | null = null;

export function useBackgroundTexture(
  imagePath: string = '/images/space-bg.jpg'
): BackgroundTextureResult {
  const [result, setResult] = useState<BackgroundTextureResult>({
    image: cachedImage,
    width: cachedImage?.naturalWidth ?? 0,
    height: cachedImage?.naturalHeight ?? 0,
    loaded: cachedImage !== null,
    error: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If already cached, use it
    if (cachedImage) {
      setResult({
        image: cachedImage,
        width: cachedImage.naturalWidth,
        height: cachedImage.naturalHeight,
        loaded: true,
        error: null,
      });
      return;
    }

    // If loading is in progress, wait for it
    if (imageLoadPromise) {
      imageLoadPromise
        .then((img) => {
          setResult({
            image: img,
            width: img.naturalWidth,
            height: img.naturalHeight,
            loaded: true,
            error: null,
          });
        })
        .catch((err) => {
          setResult((prev) => ({
            ...prev,
            error: err.message,
          }));
        });
      return;
    }

    // Start loading
    imageLoadPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        cachedImage = img;
        resolve(img);
      };

      img.onerror = () => {
        imageLoadPromise = null;
        reject(new Error(`Failed to load background image: ${imagePath}`));
      };

      img.src = imagePath;
    });

    imageLoadPromise
      .then((img) => {
        setResult({
          image: img,
          width: img.naturalWidth,
          height: img.naturalHeight,
          loaded: true,
          error: null,
        });
      })
      .catch((err) => {
        setResult((prev) => ({
          ...prev,
          error: err.message,
        }));
      });
  }, [imagePath]);

  return result;
}

// Function to preload the background
export function preloadBackgroundTexture(
  imagePath: string = '/images/space-bg.jpg'
): Promise<HTMLImageElement> {
  if (cachedImage) return Promise.resolve(cachedImage);

  if (imageLoadPromise) return imageLoadPromise;

  imageLoadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      cachedImage = img;
      resolve(img);
    };

    img.onerror = () => {
      imageLoadPromise = null;
      reject(new Error(`Failed to load background image: ${imagePath}`));
    };

    img.src = imagePath;
  });

  return imageLoadPromise;
}
