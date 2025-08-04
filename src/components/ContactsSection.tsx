import { useEffect, useState } from "react";

import { Contact } from "./Contact";

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
};

function ContactsSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const BASE_URL = `https://frontend-test-assignment-api.abz.agency/api/v1`;
  const USERS_URL = `/users`;

  useEffect(() => {
    let ignore = false;

    setIsLoading(true);
    const searchParams = new URLSearchParams({
      page: String(page),
      count: "6",
    });

    fetch(`${BASE_URL}${USERS_URL}?${searchParams.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        if (data.success && !ignore) {
          setUsers((prev) => [...prev, ...data.users]);
          setTotalUsers(data.total_users);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Problem:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [page]);

  const isShow = users.length < totalUsers;

  if (isLoading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-2xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <section className="flex bg-bgColor flex-col items-center justify-center">
      <Text className="text-center" variant="heading">
        Working with GET request
      </Text>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[29px] w-full max-w-[1200px] mx-auto px-4">
        {users.map((item, index) => (
          <Contact
            key={index}
            email={item.email}
            phoneNumber={item.phone}
            job={item.position}
            photo={item.photo}
            name={item.name}
          />
        ))}
      </div>

      <div className="flex justify-center items-center my-10">
        {isShow && (
          <Button onClick={() => setPage((prev) => prev + 1)} className="px-7 py-2">
            {isLoading ? "Loading..." : "Show more"}
          </Button>
        )}
      </div>
    </section>
  );
}

export { ContactsSection };