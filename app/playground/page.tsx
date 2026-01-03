'use client';

import React, { useState, useRef } from 'react';
import LiquidGlass from '@nkzw/liquid-glass';

type LiquidGlassMode = 'standard' | 'polar' | 'prominent' | 'shader';

export default function PlaygroundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  // Card Settings
  const [displacementScale, setDisplacementScale] = useState(100);
  const [blurAmount, setBlurAmount] = useState(0.5);
  const [saturation, setSaturation] = useState(140);
  const [aberrationIntensity, setAberrationIntensity] = useState(2);
  const [elasticity, setElasticity] = useState(0);
  const [cornerRadius, setCornerRadius] = useState(32);
  const [overLight, setOverLight] = useState(false);
  const [mode, setMode] = useState<LiquidGlassMode>('standard');

  // Button Settings
  const [btnDisplacementScale, setBtnDisplacementScale] = useState(64);
  const [btnBlurAmount, setBtnBlurAmount] = useState(0.1);
  const [btnSaturation, setBtnSaturation] = useState(130);
  const [btnAberrationIntensity, setBtnAberrationIntensity] = useState(2);
  const [btnElasticity, setBtnElasticity] = useState(0.35);
  const [btnCornerRadius, setBtnCornerRadius] = useState(100);
  const [btnOverLight, setBtnOverLight] = useState(false);
  const [btnMode, setBtnMode] = useState<LiquidGlassMode>('standard');

  const [activeTab, setActiveTab] = useState<'card' | 'button'>('card');

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      setScroll((event?.target as HTMLDivElement)?.scrollTop || 0);
    });
  };

  // 밝은 섹션: 첫 이미지(384px) 이후 시작, glass는 container 기준 상대 위치
  // glass top이 100px이면, 밝은 섹션이 glass 뒤로 오려면 scroll > 384 - 100 = 284
  const scrollingOverBrightSection = scroll > 150 && scroll < 450;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 shadow-2xl w-full max-w-6xl mx-auto h-[calc(100vh-8rem)] rounded-3xl overflow-hidden">
      {/* Left Panel - Glass Effect Demo */}
      <div
        className="relative overflow-auto lg:col-span-2 bg-gray-900"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {/* Debug Info */}
        <div className="fixed top-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded font-mono">
          scroll: {Math.round(scroll)} | overLight: {(scrollingOverBrightSection || overLight).toString()}
        </div>

        <div className="w-full min-h-[200vh] absolute top-0 left-0 pb-96">
          <img
            src="https://picsum.photos/2000/2000"
            alt="Background"
            className="w-full h-96 object-cover"
          />
          <div className="flex flex-col gap-2 bg-white text-black" id="bright-section">
            <h2 className="text-2xl font-semibold my-5 text-center">Bright Section (scroll 150-450)</h2>
            <p className="px-10 pb-8">
              Scroll here to see the overLight effect automatically activate.
              The glass will become darker to maintain visibility on bright backgrounds.
              <br /><br />
              This demonstrates how the LiquidGlass component adapts to different background colors.
              Keep scrolling to see when the overLight toggles on and off.
            </p>
          </div>
          <img
            src="https://picsum.photos/1200/1200"
            alt="Background"
            className="w-full h-80 object-cover my-10"
          />
          <img
            src="https://picsum.photos/1400/1300"
            alt="Background"
            className="w-full h-72 object-cover my-10"
          />
          <img
            src="https://picsum.photos/1100/1200"
            alt="Background"
            className="w-full h-96 object-cover my-10 mb-96"
          />
        </div>

        {/* Floating Glass Card */}
        {activeTab === 'card' && (
          <LiquidGlass
            displacementScale={displacementScale}
            blurAmount={blurAmount}
            saturation={saturation}
            aberrationIntensity={aberrationIntensity}
            elasticity={elasticity}
            borderRadius={cornerRadius}
            mouseContainer={containerRef}
            overLight={scrollingOverBrightSection || overLight}
            mode={mode}
            style={{
              position: 'fixed',
              top: '30%',
              left: '20%',
            }}
          >
            <div className="w-72 text-shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">User Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-black/10 backdrop-blur rounded-full flex items-center justify-center text-white font-semibold">
                    NP
                  </div>
                  <div>
                    <p className="font-medium text-white">Nuri Park</p>
                    <p className="text-sm text-white">Software Engineer</p>
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-white">Email:</span>
                    <span className="text-sm text-white">pnr9255@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white">Location:</span>
                    <span className="text-sm text-white">Seoul, Korea</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-white">GitHub:</span>
                    <span className="text-sm text-white">null2p</span>
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlass>
        )}

        {/* Floating Glass Button */}
        {activeTab === 'button' && (
          <LiquidGlass
            displacementScale={btnDisplacementScale}
            blurAmount={btnBlurAmount}
            saturation={btnSaturation}
            aberrationIntensity={btnAberrationIntensity}
            elasticity={btnElasticity}
            borderRadius={btnCornerRadius}
            mouseContainer={containerRef}
            overLight={scrollingOverBrightSection || btnOverLight}
            mode={btnMode}
            padding="12px 24px"
            onClick={() => alert('Button clicked!')}
            style={{
              position: 'fixed',
              top: '30%',
              left: '25%',
              cursor: 'pointer',
            }}
          >
            <span className="text-lg font-medium text-white text-shadow-lg">Click Me!</span>
          </LiquidGlass>
        )}
      </div>

      {/* Right Panel - Control Panel */}
      <div className="bg-gray-900/90 h-full overflow-y-auto backdrop-blur-md border-l border-white/10 p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Liquid Glass Playground</h2>
          <p className="text-white/60 text-sm">
            Adjust settings and see the glass effect in real-time.
          </p>
          <p className="font-semibold text-yellow-300 text-xs mt-2 leading-snug">
            ⚠️ Edge refraction may not work in Safari/Firefox (non-Chromium browsers).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex mb-6 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'card'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Card
          </button>
          <button
            onClick={() => setActiveTab('button')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'button'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Button
          </button>
        </div>

        <div className="space-y-5 flex-1 overflow-y-auto">
          {activeTab === 'card' ? (
            <>
              {/* Mode */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-2">Refraction Mode</span>
                <div className="space-y-1">
                  {(['standard', 'polar', 'prominent', 'shader'] as const).map((m) => (
                    <label key={m} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="cardMode"
                        value={m}
                        checked={mode === m}
                        onChange={() => setMode(m)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-sm text-white/90 capitalize">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Displacement Scale */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Displacement Scale: <span className="text-blue-300 font-mono">{displacementScale}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={displacementScale}
                  onChange={(e) => setDisplacementScale(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Blur Amount */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Blur Amount: <span className="text-green-300 font-mono">{blurAmount.toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={blurAmount}
                  onChange={(e) => setBlurAmount(Number(e.target.value))}
                  className="w-full accent-green-500"
                />
              </div>

              {/* Saturation */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Saturation: <span className="text-purple-300 font-mono">{saturation}%</span>
                </span>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="10"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* Chromatic Aberration */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Chromatic Aberration: <span className="text-cyan-300 font-mono">{aberrationIntensity}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={aberrationIntensity}
                  onChange={(e) => setAberrationIntensity(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Elasticity */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Elasticity: <span className="text-orange-300 font-mono">{elasticity.toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={elasticity}
                  onChange={(e) => setElasticity(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Corner Radius */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Corner Radius: <span className="text-pink-300 font-mono">{cornerRadius}px</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cornerRadius}
                  onChange={(e) => setCornerRadius(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              {/* Over Light */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={overLight}
                    onChange={(e) => setOverLight(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-sm text-white/90">Over Light (for bright backgrounds)</span>
                </label>
              </div>
            </>
          ) : (
            <>
              {/* Button Mode */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-2">Refraction Mode</span>
                <div className="space-y-1">
                  {(['standard', 'polar', 'prominent', 'shader'] as const).map((m) => (
                    <label key={m} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="btnMode"
                        value={m}
                        checked={btnMode === m}
                        onChange={() => setBtnMode(m)}
                        className="w-4 h-4 accent-blue-500"
                      />
                      <span className="text-sm text-white/90 capitalize">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Button Displacement Scale */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Displacement Scale: <span className="text-blue-300 font-mono">{btnDisplacementScale}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={btnDisplacementScale}
                  onChange={(e) => setBtnDisplacementScale(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              {/* Button Blur Amount */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Blur Amount: <span className="text-green-300 font-mono">{btnBlurAmount.toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={btnBlurAmount}
                  onChange={(e) => setBtnBlurAmount(Number(e.target.value))}
                  className="w-full accent-green-500"
                />
              </div>

              {/* Button Saturation */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Saturation: <span className="text-purple-300 font-mono">{btnSaturation}%</span>
                </span>
                <input
                  type="range"
                  min="100"
                  max="300"
                  step="10"
                  value={btnSaturation}
                  onChange={(e) => setBtnSaturation(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* Button Chromatic Aberration */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Chromatic Aberration: <span className="text-cyan-300 font-mono">{btnAberrationIntensity}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={btnAberrationIntensity}
                  onChange={(e) => setBtnAberrationIntensity(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              {/* Button Elasticity */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Elasticity: <span className="text-orange-300 font-mono">{btnElasticity.toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={btnElasticity}
                  onChange={(e) => setBtnElasticity(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Button Corner Radius */}
              <div>
                <span className="block text-sm font-semibold text-white/90 mb-1">
                  Corner Radius: <span className="text-pink-300 font-mono">{btnCornerRadius}px</span>
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={btnCornerRadius}
                  onChange={(e) => setBtnCornerRadius(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              {/* Button Over Light */}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={btnOverLight}
                    onChange={(e) => setBtnOverLight(e.target.checked)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-sm text-white/90">Over Light (for bright backgrounds)</span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
