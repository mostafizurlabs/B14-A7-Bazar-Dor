import { ProgressCircle } from "@heroui/react";

const Loading = () => {
  return (
    <ProgressCircle isIndeterminate aria-label="Loading">
      <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
      </ProgressCircle.Track>
    </ProgressCircle>
  );
};

export default Loading;