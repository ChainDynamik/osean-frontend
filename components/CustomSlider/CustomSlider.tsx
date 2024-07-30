// src/components/CustomSlider/CustomSlider.tsx
import React from "react";
import * as Slider from "@radix-ui/react-slider";
// import "./styles.css";

interface CustomSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number[];
  onValueChange: (value: number[]) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  step,
  defaultValue,
  onValueChange,
}) => {
  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Price" />
    </Slider.Root>
  );
};

export default CustomSlider;
