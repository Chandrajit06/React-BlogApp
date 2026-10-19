import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import conf from "../conf/conf.js"

function RTE({name, control, label, defaultValue=""}){
    
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'> {label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({field: {onChange}}) => (
                    <Editor
                        apiKey={conf.tinyMCEApiKey}
                        initialValue={defaultValue}
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
                            ],
                            toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: 
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RTE

/*
Editor is the TinyMCE editor itself, the actual text box with the toolbar.
Controller is a bridge from React Hook Form. TinyMCE isn’t a plain <input>, so React Hook Form can’t track it automatically. Controller connects the two.
name: the field name in the form (falls back to "content")
control is an object returned by React Hook Form’s useForm() hook that acts as the form’s internal registry, tracking every field’s value, errors, and state. Because TinyMCE aren’t native inputs, register can’t attach them to the form, so you wrap them in Controller and pass it control, which tells Controller which form to report to. When the editor’s content changes, Controller uses control to update that form’s state through onChange, so the value is already available when handleSubmit runs.
label: optional text shown above the editor
defaultValue: the starting content (useful when editing an existing post)
Whenever the content in the editor changes, onEditorChange={onChange} calls the form’s onChange, so the head office always has the latest text. When submiting the form, content is already there.
initialValue={defaultValue}, This sets the content only once, when the editor loads. After that, TinyMCE manages its own content.
*/