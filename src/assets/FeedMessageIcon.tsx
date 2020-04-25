import * as React from "react"

export const FeedMessageIcon: React.FC = (props) => {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
    <rect width="24" height="28" rx="3" fill="#FCF0D9"/>
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
