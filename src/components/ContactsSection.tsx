import React, { useEffect, useState } from "react";

import { Contact } from "./Contact";
import type { ContactType } from "./types";

import { Button } from "./Button";
import { Text } from "./Text";

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: number;
    registration_timestamp: number;
    photo: string;
}

function ContactsSection() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<User[]>([]);
    const [isShow, setIsShow] = useState<Boolean>(true);

    const BASE_URL = `https://frontend-test-assignment-api.abz.agency/api/v1`;
    const USERS_URL = `/users`;

    useEffect(() => {
        let ignore = false;

        setIsLoading(true)
        const searchParams = new URLSearchParams({
            page: String(page),
            count: "6",
        });
        fetch(`${BASE_URL}${USERS_URL}?${searchParams.toString()}`).then(response => {
            if (!response) {
                throw new Error("Something went wrong");
            }
            return response.json();
        }).then(data => {
            if (data.success && !ignore) {
                setUsers(prev => [...prev, ...data.users]);

                if (data.users.length < 6) {
                    return setIsShow(false)
                }
            } else throw new Error("Something went wrong");
        }).catch(error => {
            console.error("Problem:", error);
        }).finally(() => {
            setIsLoading(false);
        })

        return () => {
            ignore = true;
        };
    }, [page]);
    return (
        <section className="flex bg-bgColor flex-col items-center justify-center">
            <Text className="text-center" variant="heading">Working with GET request</Text>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[29px] w-full max-w-[1200px] mx-auto px-4">
                {users.map((item, index) => {
                    return (
                        <Contact key={index} email={item.email} phoneNumber={item.phone} job={item.position} photo={item.photo} name={item.name} />
                    )
                })}
            </div>

            <div className="flex justify-center items-center my-10">
                {isShow && (
                    <Button onClick={() => setPage(prev => prev + 1)} className="px-7 py-2">Show more</Button>
                )}
            </div>
        </section>
    );
}

export { ContactsSection }