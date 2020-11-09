import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import { HostComponent } from "../../Libraries/Renderer/shims/ReactNativeTypes";
declare type Options = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
{
  interfaceOnly?: boolean;
  paperComponentName?: string;
  paperComponentNameDeprecated?: string;
  excludedPlatforms?: ReadonlyArray<"iOS" | "android">;
}>;
declare type NativeComponentType<T> = HostComponent<T>;
declare function codegenNativeComponent<Props>(componentName: string, options?: Options) => NativeComponentType<Props>;
export type { NativeComponentType };
declare export default $TypeOf<typeof codegenNativeComponent>;