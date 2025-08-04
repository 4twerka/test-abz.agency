import { useEffect, useState } from "react";
import { Text } from "./Text";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";
import { SentSuccess } from "./SentSuccess";

function Register() {
    const [positions, setPositions] = useState<{ id: number; name: string }[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{
        name?: string;
        email?: string;
        phone?: string;
        photo?: string;
        position?: string;
    }>({});

    useEffect(() => {
        fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
            .then((res) => res.json())
            .then((data) => setPositions(data.positions))
            .catch(() => {
                setFieldErrors((prev) => ({
                    ...prev,
                    position: "Failed to load positions",
                }));
            });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isValidType = file.type === "image/jpeg" || file.type === "image/jpg";
        const isValidSize = file.size <= 5 * 1024 * 1024;

        if (!isValidType || !isValidSize) {
            setFieldErrors((prev) => ({
                ...prev,
                photo: "Photo must be JPEG/JPG and not exceed 5MB.",
            }));
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width >= 70 && img.height >= 70) {
                setPhoto(file);
                setFieldErrors((prev) => ({ ...prev, photo: undefined }));
            } else {
                setFieldErrors((prev) => ({
                    ...prev,
                    photo: "Image must be at least 70x70px.",
                }));
            }
        };
    };

    const validateForm = () => {
        const newErrors: typeof fieldErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length < 2 || name.length > 60) {
            newErrors.name = "Name must be between 2 and 60 characters.";
        }
        if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!phone.startsWith("+380") || phone.length < 13) {
            newErrors.phone = "Phone must start with +380 and be at least 13 characters.";
        }
        if (!photo) {
            newErrors.photo = "Please upload a photo.";
        }
        if (selectedPositionId === null) {
            newErrors.position = "Please select a position.";
        }

        setFieldErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                setFieldErrors({});
            } else {
                setFieldErrors((prev) => ({
                    ...prev,
                    name: result.message || "Registration failed",
                }));
            }
        } catch {
            setFieldErrors((prev) => ({
                ...prev,
                name: "Network error",
            }));
        }
    };

    if (success) {
        return <SentSuccess />;
    }

    const isFormValid =
        name.length >= 2 &&
        name.length <= 60 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        phone.startsWith("+380") &&
        phone.length >= 13 &&
        selectedPositionId !== null &&
        photo !== null;

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
                    <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldErrors.name ? "border-red-500" : ""}
                    />
                    {fieldErrors.name && <p className="text-red-500 text-sm">{fieldErrors.name}</p>}

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldErrors.email ? "border-red-500" : ""}
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}

                    <Input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldErrors.phone ? "border-red-500" : ""}
                    />
                    {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}

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
                    {fieldErrors.position && <p className="text-red-500 text-sm">{fieldErrors.position}</p>}
                </div>

                <div className={`flex items-stretch border h-[54px] rounded-md overflow-hidden ${fieldErrors.photo ? "border-red-500" : "border-gray-300"}`}>
                    <label className="bg-white border flex items-center rounded-l-md justify-center h-full border-black px-4 py-2 cursor-pointer text-black text-sm hover:bg-gray-100 transition">
                        Upload
                        <input type="file" accept=".jpg, .jpeg" className="hidden" onChange={handleFileChange} />
                    </label>
                    <span className="flex-1 px-4 py-2 text-gray-400 text-sm flex items-center">
                        {photo?.name || "Upload your photo"}
                    </span>
                </div>
                {fieldErrors.photo && <p className="text-red-500 text-sm">{fieldErrors.photo}</p>}

                <Button
                    type="submit"
                    className={`${isFormValid ? "bg-[#00BDD3]" : "bg-[#B4B4B4] opacity-80"
                        } text-white py-2 px-7 text-nunito rounded-[30px] text-sm mx-auto`}
                    disabled={!isFormValid}
                >
                    Sign Up
                </Button>

            </form>
        </div>
    );
}

export { Register };