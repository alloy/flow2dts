import { $TypeOf } from "flow2dts-flow-types-polyfill";
// @flow
import * as React from "react";
import { HostComponent } from "../../Renderer/shims/ReactNativeTypes";
import { ViewProps } from "../View/ViewPropTypes";
declare type Props = Readonly<
/*[FLOW2DTS - Warning] This type was an exact object type in the original Flow source.*/
ViewProps & {
  emulateUnlessSupported?: boolean;
}>;
declare var exported: React.AbstractComponent<Props, React.ElementRef<HostComponent<unknown>>>;
declare const $f2tExportDefault: $TypeOf<typeof exported>;
export default $f2tExportDefault;