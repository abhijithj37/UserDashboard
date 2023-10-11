import axios from "axios";
import { useEffect, useRef } from "react";
import { useUserContext } from "../Context/UserDataProvider";
import { db } from "../DB/db";

const fetchData = () => {
  return axios.get("https://randomuser.me/api/?results=50");
};

export const useGetData = () => {
  const { setUsers, setTotalUsers, setLoading } = useUserContext();
  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const dataFetched = localStorage.getItem("dataFetched");
      db.users.toArray().then((usersList) => {
        if (!usersList.length && !dataFetched) {
          fetchData().then(async ({ data }) => {
            await db.users.bulkAdd(data.results);
            setUsers(data.results);
            setTotalUsers(data.results.length);
            setLoading(false);
            localStorage.setItem("dataFetched", "true");
          });
        } else {
          setUsers(usersList);
          setTotalUsers(usersList.length);
          setLoading(false);
        }
      });

      return () => {
        effectRan.current = true;
      };
    }
  }, []);
};

export const useDelete = () => {
  const { users, setUsers, setTotalUsers } = useUserContext();

  const deleteUser = (email: string) => {
    db.users
      .where("email")
      .equals(email)
      .delete()
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
      .then(() => {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        setTotalUsers(updatedUsers.length);
      })
      .catch((err) => {
        console.log("Error Deleting the User:", err);
      });
  };

  return deleteUser;
};

export const useRefresh = () => {
  const { setTotalUsers, setUsers, setLoading } = useUserContext();

  const refreshPage = () => {
    setLoading(true);

    db.users.clear().then(() => {
      fetchData().then(async ({ data }) => {
        await db.users.bulkAdd(data.results);
        setUsers(data.results);
        setTotalUsers(data.results.length);
        setLoading(false);
      });
    });
  };
  return refreshPage;
};
