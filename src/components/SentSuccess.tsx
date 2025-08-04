import { Text } from "./Text";
import successPhoto from "../assets/success-image.svg";

function SentSuccess() {
    return (
        <div className="flex items-center justify-center h-screen flex-col text-center">
            <Text variant="heading">User successfully registered</Text>
            <img src={successPhoto} alt="success" className="mt-6 max-w-sm w-full" />
        </div>
    );
}

export { SentSuccess };
