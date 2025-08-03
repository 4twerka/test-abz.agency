import { useEffect, useState } from "react";
import { Text } from "./Text";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";

function Register() {
    const [positions, setPositions] = useState<{ id: number; name: string }[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);

    const [errors, setErrors] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
            .then((res) => res.json())
            .then((data) => setPositions(data.positions))
            .catch(() => setErrors("Failed to load positions"));
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isValidType = file.type === "image/jpeg" || file.type === "image/jpg";
        const isValidSize = file.size <= 5 * 1024 * 1024;

        if (!isValidType || !isValidSize) {
            setErrors("Photo must be JPEG/JPG and not exceed 5MB.");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width >= 70 && img.height >= 70) {
                setPhoto(file);
                setErrors(null);
            } else {
                setErrors("Image must be at least 70x70px.");
            }
        };
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            name.length >= 2 &&
            name.length <= 60 &&
            emailRegex.test(email) &&
            phone.startsWith("+380") &&
            phone.length >= 13 &&
            selectedPositionId !== null &&
            photo !== null
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setErrors("Please fill out the form correctly.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("position_id", selectedPositionId!.toString());
        formData.append("photo", photo!);

        try {
            const tokenRes = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token");
            const { token } = await tokenRes.json();

            const res = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
                method: "POST",
                headers: {
                    Token: token,
                },
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess(true);
                setErrors(null);
            } else {
                setErrors(result.message || "Registration failed");
            }
        } catch (err) {
            setErrors("Network error");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col px-4 py-10">
            <Text variant="heading" className="text-center text-[40px] mb-8">
                Working with POST request
            </Text>

            <form
                className="w-full max-w-[380px] flex flex-col gap-5"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="flex flex-col gap-4">
                    <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <label className="text-nunito text-xs text-customGrey">+38 (XXX) XXX - XX - XX</label>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-black text-nunito text-base mb-1">Select your position</p>
                    {positions.map((pos) => (
                        <Checkbox
                            key={pos.id}
                            value={pos.name}
                            name="position"
                            checked={selectedPositionId === pos.id}
                            onChange={() => setSelectedPositionId(pos.id)}
                        />
                    ))}
                </div>

                <div className="flex items-stretch border h-[54px] border-gray-300 rounded-md overflow-hidden">
                    <label className="bg-white border flex items-center rounded-l-md justify-center h-full border-black px-4 py-2 cursor-pointer text-black text-sm hover:bg-gray-100 transition">
                        Upload
                        <input type="file" accept=".jpg, .jpeg" className="hidden" onChange={handleFileChange} />
                    </label>
                    <span className="flex-1 px-4 py-2 text-gray-400 text-sm flex items-center">
                        {photo?.name || "Upload your photo"}
                    </span>
                </div>

                {errors && <p className="text-red-500 text-sm">{errors}</p>}
                {success && <p className="text-green-600 text-sm">Registration successful!</p>}

                <Button
                    className={`${validateForm() ? "bg-[#00BDD3]" : "bg-[#B4B4B4] opacity-80"
                        } text-white py-2 px-7 text-nunito rounded-[30px] text-sm mx-auto`}
                    type="submit"
                >
                    Sign up
                </Button>
            </form>
        </div>
    );
}

export { Register };