import './Blob.scss';

import React, { memo, useState } from 'react';

const ORB_COUNT = 20;

interface IBlobProps {
  set?: number;
  children?: React.ReactNode;
}

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const iterate = (count: number, mapper: (i: number) => React.ReactNode) =>
  [...new Array(count)].map((_, i) => mapper(i));

const distance = (a: [number, number], b: [number, number]) =>
  Math.hypot(a[0] - b[0], a[1] - b[1]);

interface OrbsProps {
  hue: number;
}

const Gooey: React.FC<{ id: string }> = ({ id }) => (
  <filter id={id}>
    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
    <feColorMatrix
      in="blur"
      mode="matrix"
      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -5"
      result="goo"
    />
    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
  </filter>
);

const Blur: React.FC<{ id: string }> = ({ id }) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
  </filter>
);

const Gradient: React.FC<{ id: string; hue: number }> = ({ id, hue }) => {
  const h = hue + random(-40, 40);
  const f = [h, 80, 60];
  const t = [h + 20, 100, 30];
  return (
    <linearGradient id={id} x1="70%" x2="0%" y1="70%" y2="0%">
      <stop
        offset="0%"
        stopColor={`hsl(${t[0]},${t[1]}%,${t[2]}%)`}
        stopOpacity="1"
      />
      <stop
        offset="100%"
        stopColor={`hsl(${f[0]},${f[1]}%,${f[2]}%)`}
        stopOpacity="1"
      />
    </linearGradient>
  );
};

const Orb: React.FC<{ hue: number }> = ({ hue }) => {
  const r = random(30, 100);
  const from: [number, number] = [
    random(0 - r, 1000 + r),
    random(0 - r, 1000 + r),
  ];
  const to: [number, number] = [
    random(0 - r, 1000 + r),
    random(0 - r, 1000 + r),
  ];
  const d = distance(from, to);
  const id = random(0, 1000);

  return (
    <>
      <circle
        cx={from[0]}
        cy={to[0]}
        r={r}
        fill={`url(#grad-${id})`}
        style={{
          transitionDuration: `${d / 15}s`,
          left: `${from[0]}px`,
          top: `${from[1]}px`,
          transform: `translate(${to[0]}px, ${to[1]}px)`,
        }}
      />
      <Gradient id={`grad-${id}`} hue={hue} />
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Orbs: React.FC<OrbsProps> = memo(({ hue }) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMinYMin slice"
      style={{
        background: `linear-gradient(hsl(${hue},${80}%,${90}%), hsl(${hue},${100}%,${80}%))`,
      }}
    >
      <g filter="url(#blur)">
        <g filter="url(#gooey)">
          {iterate(ORB_COUNT, (i) => (
            <Orb key={i} hue={hue} />
          ))}
        </g>
      </g>
      <defs>
        <Gooey id="gooey" />
        <Blur id="blur" />
      </defs>
    </svg>
  );
});

export const Blob: React.FC<IBlobProps> = ({ children }) => {
  const [hue, setHue] = useState<number>(random(0, 360));

  const buttonStyle: React.CSSProperties = {
    backgroundColor: `hsl(${hue}, 80%, 50%)`,
  };
  return (
    <div className="blob">
      {children}
      <Orbs hue={hue} />
      <div className="banner">
        <button
          className="my-button"
          style={buttonStyle}
          onClick={() => setHue(random(0, 360))}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};
