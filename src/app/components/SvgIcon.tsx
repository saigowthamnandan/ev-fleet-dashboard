'use client';
import dynamic from 'next/dynamic';
import {IconProps} from './SvgLoad';

const LoadSVG = dynamic(() => import('./SvgLoad'), {
  ssr: false,
  loading: () => <div className="w-1 h-1"></div>,
});

export default function SvgIcon({name, ...rest}: IconProps) {
  if (!name) {
    return <></>;
  }
  return (
    <>
      <LoadSVG name={name} {...rest} />
    </>
  );
}
