import { useState } from "react"
import useShowToast from "./useShowToast"
import { useUserContext } from "../contexts/UserContext";

const useFollowUnfollow = (user) => {
    const { userData } = useUserContext();
    const currentUser = userData;
    const [updating, setUpdating] = useState(false);
    const [follow, setFollow] = useState(user.followers.includes(currentUser?._id))
    const showToast = useShowToast();

    const handleFollowUnfollow = async () => {
        if (!currentUser) {
            showToast(false, "Please login to follow")
            return
        }
        setUpdating(true)

        if (updating) {
            return
        }

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const data = await res.json();
            if (data.error) {
                showToast(false, data.error)
                return
            };

            if (follow) {
                user.followers.pop()
            } else {
                user.followers.push(userData._id)
            }
            setFollow(!follow);
            showToast(true, data.message);

        } catch (error) {
            showToast(false, data.error)
        } finally {
            setUpdating(false);

        }
    }

    return { handleFollowUnfollow, follow, updating }

}

export default useFollowUnfollow