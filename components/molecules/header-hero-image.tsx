import Image from "next/image";
import { IconMembers, IconNote } from "../icons";
import { Separator } from "../ui/separator";

export default function HeaderHeroImage() {
  return (
    <div className="relative mt-10 lg:mt-0">
      <div className="relative">
        <Image
          src={"/lahuna.svg"}
          alt="lahuna"
          width={300}
          height={300}
          className="absolute -top-10 md:top-0 lg:-top-8 md:left-20 left-0 lg:-left-15"
          style={{ zIndex: 0 }}
        />
        <Image
          src={"/huna.svg"}
          alt="huna"
          width={300}
          height={300}
          className="absolute -bottom-17 right-0 md:right-20 lg:-bottom-20  lg:-right-1/5"
          style={{ zIndex: 0 }}
        />
        <Image
          src="/home/hero.png"
          alt="Hero Woman"
          width={450}
          height={500}
          className="rounded-lg mx-auto relative"
        />
      </div>
      <div className="absolute top-1/4 right-0 lg:-right-10  text-primary-dark bg-white p-3 rounded-lg shadow-lg flex min-h-18 ">
        <div className="flex items-center space-x-2">
          <IconMembers />
          <Separator orientation="vertical" className="bg-primary" />
          <div>
            <p className="font-bold text-2xl text-brand-text-dark">20k</p>
            <p className="text-xs text-brand-text-light font-medium">
              عضو في المنصة
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-0 lg:-left-10 text-primary-dark bg-white p-3 rounded-lg shadow-lg flex min-h-18">
        <div className="flex items-center space-x-2">
          <IconNote />
          <Separator orientation="vertical" className="bg-primary" />
          <div>
            <p className="font-bold text-2xl  text-brand-text-dark">60+</p>
            <p className="text-xs text-brand-text-light font-medium">
              إستشارة متاحة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
