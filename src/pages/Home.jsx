import { Container, PostCard } from "../components/index.js";
import service from "../appwrite/config.js";
import { useEffect, useState } from "react";

function Home(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
    }, [])

    if(posts.length === 0){
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap">
                    <h1>Login to read posts</h1>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home

/*
This creates a variable posts, starting as an empty array, plus setPosts to update it. When setPosts is called, React re-renders the component with the new data.
useEffect runs code after the component first appears on screen.
The empty [] at the end means “run this only once,” when the component mounts.
service.getPosts([]) asks Appwrite for posts. The [] is the list of query filters, and empty means no filters.
.then(...) waits for the response. If it exists, posts.documents (Appwrite returns the actual posts inside a documents array) is saved into state.
If there are no posts, it returns early with the message. This is what shows on the very first render too, before the fetch finishes.
.map() loops through every post and creates a card for each.
key={post.$id} gives React a unique ID per item so it can track them efficiently.
{...post} spreads all the post’s fields (title, image, $id, etc.) as props into PostCard.
*/