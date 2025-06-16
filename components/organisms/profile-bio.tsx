import { ServiceProviderVM } from "@/lib/data/models/vm/service-provider";
import { IconMedalStar } from "../icons";
import { ProfileBioField } from "../molecules/profile/bio/profile-bio-field";
import { Suspense } from "react";
import { ProfileServiceDescriptionField } from "../molecules/profile/bio/profile-service-description-field";
interface Props {
  serviceProvider: ServiceProviderVM;
  [key: string]: any; // Allow additional props if needed
}

export default function ProfileBio({
  serviceProvider,
}: Props): React.ReactNode {
  return (
    <div className="flex flex-col gap-6">
      <Suspense>
        <ProfileBioField bio={serviceProvider.bio} />
      </Suspense>
      <Suspense>
        <ProfileServiceDescriptionField
          service_description={serviceProvider.service_description}
        />
      </Suspense>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl text-bold">{"سنوات الخبرة"}</h3>
        <div className="p-4 text-gray-800 text-sm bg-white rounded-2xl">
          <span className="flex gap-3">
            <span>
              <IconMedalStar />
            </span>
            <div className="span">
              +{serviceProvider.years_of_experience?.toString()}{" "}
              <bdi>سنوات خبرة</bdi>
            </div>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl text-bold">{"خدماتي"}</h3>
        {(serviceProvider.services ?? "")?.split(",").length > 0 ? (
          <div className="flex flex-wrap gap-2 ">
            {(serviceProvider.services ?? "")
              .split(",")
              .map((service, index) => (
                <div
                  className="p-4 text-gray-800 text-sm bg-white rounded-2xl "
                  key={index}
                >
                  {service.trim()}
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
