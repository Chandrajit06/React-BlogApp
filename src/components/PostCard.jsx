import { Link } from "react-router-dom"
import service from "../appwrite/config.js"

function PostCard({$id, title, featuredImage}){
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex justify-center mb-4'>
                    <img src={service.getFileView(featuredImage)} alt={title}
                        className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard

/*
The component receives three values from its parent:
$id: the post’s unique ID (Appwrite adds the $ prefix to its built-in fields)
title: the post’s headline, featuredImage: the ID of the image file stored in Appwrite
<Link to={/post/{ id}}> wraps the whole card, so clicking it goes to a URL like /post/abc123. That route would show the full post.
service.getFilePreview(featuredImage) asks Appwrite for a displayable image URL from that file ID and puts it in the <img> src.
*/