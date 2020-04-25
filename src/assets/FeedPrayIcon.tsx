import * as React from "react"

export const FeedPrayIcon: React.FC = (props) => {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
    <rect width="24" height="28" rx="3" fill="#E7F9FE"/>
    <path d="M6 19.84H18V7.84H6V19.84Z" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlinkHref="#image0" transform="scale(0.015625)"/>
    </pattern>
    <image id="image0" width="64" height="64" xlinkHref="data:image/png;base64,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"/>
    </defs>
    </svg>
  );
}
