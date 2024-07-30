declare module 'react-color' {
    import { ComponentType } from 'react';

    export interface ColorResult {
      hex: string;
      rgb: { r: number; g: number; b: number; a?: number };
      hsl: { h: number; s: number; l: number; a?: number };
    }

    export interface ColorPickerProps {
      color?: string | { r: number; g: number; b: number; a?: number } | { h: number; s: number; l: number; a?: number };
      onChange?: (color: ColorResult) => void;
      onChangeComplete?: (color: ColorResult) => void;
    }

    export const SketchPicker: ComponentType<ColorPickerProps>;
  }
