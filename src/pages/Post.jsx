import service from '../appwrite/config.js'
import { Container, Button } from "../components/index.js"
import {useEffect, useState} from 'react'
import {useSelector } from "react-redux"
import parse from "html-react-parser"
import { Link, useNavigate, useParams} from "react-router-dom"

function Post(){

    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if(slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
                else {
                    navigate("/")
                }
            })
        }
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img src={service.getFileView(post.featuredImage)} alt={post.title}  className='rounded-xl' 
                    />
                    { isAuthor && (
                        <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
                        </Link>
                        <Button bgColor="bg-red-500" 
                            onClick={deletePost}
                            >Delete</Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null
}

export default Post

/*
post starts as null because the data hasn’t arrived yet.
slug is pulled from the URL (the route is probably /post/:slug).
userData is the currently logged-in user from the Redux store.
isAuthor is true only if both the post and a user exist and the post’s userId matches the logged-in user’s ID. This is the “is this my post?” check.
When the component loads (or the slug changes), it asks Appwrite for that post. If found, it saves it to state. If not, it redirects to the home page.
It deletes the post document, and if that succeeds, it also deletes the post’s image file from storage, then sends the user home.
post ? (...) : null means: show nothing until the post has loaded.
It shows the featured image using getFilePreview.
If isAuthor is true, the Edit button (links to /edit-post/<id>) and Delete button appear over the image.
Below that, the title is shown, and parse(post.content) renders the post body. parse(post.content) takes a string of HTML and turns it into real React elements so the browser displays it as formatted content instead of raw text.
*/