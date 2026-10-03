import { Client, Account, ID} from "appwrite";
import config from "../config/config.js"

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create({userId: ID.unique(), email, password, name});
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession({email, password});
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AppWrite Service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite Service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


// Client is the connection to the Appwrite project. The constructor points it at the project using the URL and project ID from the config file.
// Account is Appwrite's built-in tool for user accounts, and it uses that connection.
// createAccount: makes a new user with an email, password, and name. ID.unique() asks Appwrite to generate a unique ID. If the account is created, it immediately logs the user in so they don't have to sign in again.
// login: creates a session for the user (a "you're logged in" pass) using their email and password.
// getCurrentUser: asks Appwrite "who is logged in right now?" It returns the user's details, or null if nobody is logged in or something fails.
// logout: deletes all of the user's sessions, which signs them out.