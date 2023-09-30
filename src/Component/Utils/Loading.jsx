import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Loading = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#fff">
    <div className="flex gap-[20px] overflow-hidden">
      <Skeleton height={300} width={170} duration={2} />
      <Skeleton height={300} width={170} duration={2} />
      <Skeleton height={300} width={170} duration={2} />
      <Skeleton height={300} width={170} duration={2} />
      <Skeleton height={300} width={170} duration={2} />
      <Skeleton height={300} width={170} duration={2} />
    </div>
  </SkeletonTheme>
  )
}

export default Loading