import type { ContactType } from "./types";
import { Text } from "./Text";

interface Props extends ContactType {}

function Contact({photo, name, job, email, phoneNumber} : Props) {
    return (
        <div className="rounded-[10px] py-6 px-5 gap-3 text-[16px] bg-white flex flex-col font-nunito items-center justify-center text-black">
            <div className="flex gap-3 flex-col justify-center items-center">
                <img src={photo} alt="avatar" className="rounded-full"/>
                <Text variant="label" className="text-center max-w-xs overflow-hidden text-ellipsis break-words">{name}</Text>
            </div>

            <div className="flex gap-1 flex-col justify-center items-center">
                <Text variant="label" className="text-center max-w-xs overflow-hidden text-ellipsis break-words">{job}</Text>
                <Text variant="label" className="text-center max-w-xs overflow-hidden text-ellipsis break-words">{email}</Text>
                <Text variant="label" className="text-center max-w-xs overflow-hidden text-ellipsis break-words">{phoneNumber}</Text>
            </div>
        </div>
    );
}

export { Contact }