import { Client, ID, Databases, Storage, Query} from "appwrite";
import conf from "../conf/conf.js"

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId,
                }
            )
        } catch (error) {
            console.log("AppWrite Service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("AppWrite Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("AppWrite Service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch(error){
            console.log("AppWrite Service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("AppWrite Service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("AppWrite Service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("AppWrite Service :: deleteFile :: error", error);
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("AppWrite Service :: getFilePreview :: error", error);
            return false;
        }
    }
}

const service = new Service();

export default service

// Client is the connection to the Appwrite project, set up with the URL and project ID from the conf file.
// Databases is Appwrite's tool for storing documents (like rows in a table). Storage is its tool for files like images. Both reuse the same connection.

// createPost: saves a new post document in the database. The slug is used as the document ID, so each post is found by its slug. It stores the title, content, featuredImage (the file ID of the image), status ("active" or "inactive"), and userId (who wrote it).
// updatePost: finds the post by its slug and changes its fields. userId is left out on purpose, so ownership can't change by accident.
// deletePost: removes the post with that slug. Returns true if it worked and false if it failed, so the caller can check.
// getPost: fetches one post by slug. Returns the post, or false if it isn't found or something fails.
// getPosts: fetches a list of posts. By default it only returns posts where status is "active", so drafts stay hidden. You can pass your own queries to filter differently.

// uploadFile: uploads a file to the bucket. ID.unique() generates the file's ID. It returns the file's details, including the ID you save in the post as featuredImage.
// deleteFile: deletes a file from the bucket by its ID. Returns true or false.
// getFilePreview: gives you a preview (thumbnail) of the stored image so you can show it with an <img> tag.

// The class is created once at the bottom (new Service()) and exported, so every component shares one connection.