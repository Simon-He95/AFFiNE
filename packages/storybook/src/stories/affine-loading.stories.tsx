import { AffineLoading } from '@affine/component/affine-loading';
import type { StoryFn } from '@storybook/react';

export default {
  title: 'AFFiNE/Loading',
  component: AffineLoading,
};

export const Default: StoryFn = ({ width, loop, autoplay, autoReverse }) => (
  <div
    style={{
      width: width,
      height: width,
    }}
  >
    <AffineLoading loop={loop} autoplay={autoplay} autoReverse={autoReverse} />
  </div>
);
Default.args = {
  width: 100,
  loop: true,
  autoplay: true,
  autoReverse: true,
};
