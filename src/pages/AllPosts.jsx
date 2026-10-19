import { Container, PostCard } from "../components/index.js";
import service from "../appwrite/config.js";
import { useEffect, useState } from "react";

function AllPosts(){

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        service.getPosts([]).then((response) => {
            if(response){
                setPosts(response.documents);
            }
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts

/*
posts starts as an empty array. When you call setPosts(...), React re-renders the component with the new data.
useEffect with an empty [] dependency array runs once, right after the component first appears on screen.
service.getPosts([]) asks Appwrite for posts. The empty array means “no filters/queries”, so it returns everything (not just active posts, for example).
Appwrite returns an object, and the actual list is inside posts.documents, so that’s what gets stored in state.
The if(posts) check guards against the call returning nothing (for example, on an error).
key={post.$id} gives React a unique ID per item, and {...post} passes all the post’s fields (title, image ID, etc.) as props to PostCard.
*/