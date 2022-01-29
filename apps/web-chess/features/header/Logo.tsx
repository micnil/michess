import { FC } from "react";
import Image from 'next/image'

export const Logo: FC = () => {
  return (
    <div className="flex items-center text-xl space-x-0.5">
      <Image src="/knightv2.svg" height={30} width={30} alt="logo" />
      <span className="text-xl ">michess</span>
    </div>
  );
}