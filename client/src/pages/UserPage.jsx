import UserHeader from "../components/layout/UserHeader";
import UserPost from "../components/layout/UserPost";

export default function UserPage() {
    return (
        <>
            <UserHeader />
            <UserPost likes={1212} replies={468} postImg="/post1.png" postTitle="Let's talk about threads"/>
            <UserPost likes={638} replies={83} postImg="/post2.png" postTitle="Great tutorial"/>
            <UserPost likes={3695} replies={256} postImg="/post3.png" postTitle="Space X Announcement"/>
            <UserPost likes={1695} replies={217} postImg="" postTitle="Make my self at home"/>
        </>
    )
}