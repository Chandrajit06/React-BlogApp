import { Container, PostForm } from "../components/index.js";
import service from "../appwrite/config.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){

    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const {slug} = useParams();

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post) => {
                if(post)
                    setPost(post);
                else
                    navigate("/");
            })
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-6'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost

/*
post starts as null because nothing has been fetched yet.
useParams() reads the dynamic part of the URL. If the route is /edit-post/:slug and the user visits /edit-post/my-first-blog, then slug is "my-first-blog".
navigate is a function that redirects the user to another page.
It runs after the component renders, and again if slug or navigate changes. That’s what the dependency array [slug, navigate] means.
If a slug exists, it calls getPost(slug), which returns a promise.
When the promise resolves, there are two cases. If a post came back, it’s saved into state, which triggers a re-render. If nothing came back (a wrong or deleted slug), the user is redirected to /.
This is a conditional render. While post is null (still loading, or redirecting), the component renders nothing.
Once post has data, it renders PostForm and passes the post as a prop. The form uses it to pre-fill the fields, so the user edits instead of starting blank
*/