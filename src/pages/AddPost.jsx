import { Container } from "../components/index.js";
import { PostForm } from "../components/index.js";

function AddPost(){
    return (
        <div className = "py-6">
            <Container>
                <PostForm/>
            </Container>
        </div>
    )
}

export default AddPost