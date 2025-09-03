import { useState } from "react";
import UserHeader from "../components/layout/UserHeader";
import UserPost from "../components/layout/UserPost";
import { useEffect } from "react";
import { data, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

export default function UserPage() {
    const [user, setUser] = useState(null);
    const { username } = useParams()
    const showToast = useShowToast()


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                console.log(data);
                if (data.error) {
                    showToast(false, data.error)
                    return;
                };

                setUser(data)
            } catch (error) {
                showToast(false, data.error)

            }
        }

        getUser()

    }, [username])

    if (!user) return null

    return (
        <>
            <UserHeader user={user} />
            <UserPost likes={1212} replies={468} postImg="/post1.png" postTitle="Let's talk about threads" />
            <UserPost likes={638} replies={83} postImg="/post2.png" postTitle="Great tutorial" />
            <UserPost likes={3695} replies={256} postImg="/post3.png" postTitle="Space X Announcement" />
            <UserPost likes={1695} replies={217} postImg="" postTitle="Make my self at home" />
        </>
    )
}