import './InfiniteScroll.scss';

import React from 'react';

type CustomStyles = {
  '--duration'?: string;
  '--direction'?: string;
  [key: string]: string | undefined;
};

const TAGS = [
  'React',
  'Redux',
  'Husky',
  'GitHub',
  'Jest',
  'Eslint',
  'prettier',
  'useForm',
  'MUI',
  'Magnifier',
];
const DURATION = 21000;
const ROWS = 3;
const TAGS_PER_ROW = 6;

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr: string[]) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider: React.FC<{
  children: React.ReactNode;
  duration: number;
  reverse?: boolean;
}> = ({ children, duration, reverse = false }) => {
  const customStyles: CustomStyles = {
    '--duration': `${duration}ms`,
    '--direction': reverse ? 'reverse' : 'normal',
  };

  return (
    <div className="loop-slider" style={customStyles as React.CSSProperties}>
      <div className="inner">
        {children}
        {children}
      </div>
    </div>
  );
};

const Tag: React.FC<{ text: string }> = ({ text }) => (
  <div className="tag">{text}</div>
);

export const InfiniteLoop: React.FC = () => (
  <div className="app">
    <div className="tag-list">
      {[...new Array(ROWS)].map((_, i) => (
        <InfiniteLoopSlider
          key={i}
          duration={random(DURATION - 5000, DURATION + 5000)}
          reverse={i % 2 === 1}
        >
          {shuffle(TAGS)
            .slice(0, TAGS_PER_ROW)
            .map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
        </InfiniteLoopSlider>
      ))}
      <div className="fade" />
    </div>
  </div>
);
