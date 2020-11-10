import { $TypeOf } from "flow2dts-flow-types-polyfill";
import $1 from "./AnimatedEvent";
import $9 from "./AnimatedEvent";
import $3 from "./AnimatedImplementation";
import $4 from "./nodes/AnimatedInterpolation";
import $5 from "./nodes/AnimatedNode";
import $6 from "./nodes/AnimatedProps";
import $7 from "./nodes/AnimatedValue";
import $8 from "./nodes/AnimatedValueXY";
import $11 from "./createAnimatedComponent";
import { EndCallback } from "./animations/Animation";
import { TimingAnimationConfig } from "./animations/TimingAnimation";
import { DecayAnimationConfig } from "./animations/DecayAnimation";
import { SpringAnimationConfig } from "./animations/SpringAnimation";
import { Mapping } from "./AnimatedEvent";
import { EventConfig } from "./AnimatedEvent";
declare type CompositeAnimation = {
  start: (callback?: null | undefined | EndCallback) => void;
  stop: () => void;
  reset: () => void;
  _startNativeLoop: (iterations?: number) => void;
  _isUsingNativeDriver: () => boolean;
};
declare var spring: (value: $7 | $8, config: SpringAnimationConfig) => CompositeAnimation;
declare var timing: (value: $7 | $8, config: TimingAnimationConfig) => CompositeAnimation;
declare var decay: (value: $7 | $8, config: DecayAnimationConfig) => CompositeAnimation;
declare var sequence: (animations: CompositeAnimation[]) => CompositeAnimation;
declare type ParallelConfig = {
  stopTogether?: boolean;
};
declare var parallel: (animations: CompositeAnimation[], config?: null | undefined | ParallelConfig) => CompositeAnimation;
declare var delay: (time: number) => CompositeAnimation;
declare var stagger: (time: number, animations: CompositeAnimation[]) => CompositeAnimation;
declare type LoopAnimationConfig = {
  iterations: number;
  resetBeforeIteration?: boolean;
};
declare var loop: (animation: CompositeAnimation, _?: LoopAnimationConfig) => CompositeAnimation;
declare var event: (argMapping: (null | undefined | Mapping)[], config: EventConfig) => any;
export type { CompositeAnimation };
declare const $f2tExportDefault:
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  Value: $7;
  ValueXY: $8;
  Interpolation: $4;
  Node: $5;
  decay: $TypeOf<typeof decay>;
  timing: $TypeOf<typeof timing>;
  spring: $TypeOf<typeof spring>;
  add: $3.add;
  subtract: $3.subtract;
  divide: $3.divide;
  multiply: $3.multiply;
  modulo: $3.modulo;
  diffClamp: $3.diffClamp;
  delay: $TypeOf<typeof delay>;
  sequence: $TypeOf<typeof sequence>;
  parallel: $TypeOf<typeof parallel>;
  stagger: $TypeOf<typeof stagger>;
  loop: $TypeOf<typeof loop>;
  event: $TypeOf<typeof event>;
  createAnimatedComponent: $11;
  attachNativeEvent: $9.attachNativeEvent;
  forkEvent: $3.forkEvent;
  unforkEvent: $3.unforkEvent;
  Event: $1.AnimatedEvent;
  __PropsOnlyForTests: $6;
};
export default $f2tExportDefault;