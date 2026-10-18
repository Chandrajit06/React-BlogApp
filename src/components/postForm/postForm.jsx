import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import service from "../../appwrite/config.js";
import React, { useCallback } from "react";
import { Button, Input, Select, RTE } from "../index.js"

function PostForm({post}){

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
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
                    console.log("PostForm :: submit :: error", "Image is required for new post");
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
            console.log("PostForm :: submit :: error", error);
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string"){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]/g, "").replace(/\s+/g, "-");
        }
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === "title"){
                setValue("slug", slugTransform(value.title), {shouldValidate: true});
            }
        })
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {required: true})}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {required: true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                    }}
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={service.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-lg"
                        />
                        
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {required: true})}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500": undefined}
                    className="w-full"
                    >{post ? "Update": "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm

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

useForm gives a toolbox for managing the form:
register connects an input to the form, handleSubmit wraps your submit function, watch lets you observe field changes, setValue sets a field’s value from code, control is used by components like a rich text editor (RTE), getValues reads current values
defaultValues pre-fills the form. If a post prop exists (editing), it uses that post’s data. Otherwise (creating), the fields start empty.
slugTransform turns a title into a URL-friendly slug. useCallback is there to keep slugTransform as the same function between renders, instead of creating a brand new one every time.

This is a React effect that automatically fills in the “slug” field as the user types in the “title” field
watch((value, {name}) => { ... })
Normally watch("title") just reads a value. But when you pass it a callback function, it creates a subscription: function runs every time any field in the form changes.
value is an object with all current form values, such as { title: "...", slug: "...", content: "..." }
name tells you which field just changed, It only care when the title changed.
slugTransform(value.title) converts the title into a slug
setValue("slug", ...) puts that result into the slug field programmatically
shouldValidate: true runs the validation rules on the slug field right after it’s set.
return () => { subscription.unsubscribe(); }
This is the cleanup function. React runs it when the component unmounts, or before the effect re-runs. It stops the listener so you don’t get memory leaks or duplicate subscriptions.
*/