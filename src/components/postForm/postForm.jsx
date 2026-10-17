import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import service from "../../appwrite/config.js";

// useCallback, button, input, select, rte

function postForm({post}){

    const {register, handleSubmit, watch, setvalue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "",
        }
    })

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        try {
            if(post){
                const newFile = data.image[0] ? await service.uploadFile(data.image[0]) : null;
                const dbPost = await service.updatePost(post.$id, {
                    ...data, featuredImage: newFile ? newFile.$id : post.featuredImage
                })
                if(dbPost){
                    if(newFile)
                        await service.deleteFile(post.featuredImage);
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            else {
                if(!data.image[0]){
                    console.log("postForm :: submit :: error", "Image is required for new post");
                    return;
                }
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    const dbPost = await service.createPost({
                        ...data, userId: userData.$id, featuredImage: file.$id
                    })

                    if (dbPost)
                        navigate(`/post/${dbPost.$id}`)
                }
            }
        } catch (error) {
            console.log("postForm :: submit :: error", error);
        }
    }


    return (
        <div>

        </div>
    )
}

export default postForm

/*
Editing an existing post (if (post))
Upload new image, if any. If the user picked a new image (data.image[0]), it uploads that newFile to Appwrite storage. If not, newFile is null.
Update the post in the database. It spreads all the form data (...data) and sets featuredImage to the new file’s ID if there is one, or keeps the old post.featuredImage if not.
If the update succeeded, delete the old image from storage (only if a new one was uploaded, so you don’t leave unused files behind), then navigate to the post’s page.
Creating a new post (else)
Require an image. If no file was chosen, log an error and return early, so nothing gets created.
Upload the image, which gives back a file object with an ID.
Create the post, combining the form data, the logged-in user’s ID (userData.$id) so the post knows who wrote it., and the uploaded file’s ID as featuredImage.
If creation succeeded, navigate to the new post’s page.
*/