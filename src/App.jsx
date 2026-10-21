import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer} from "./components/index.js"
import { Outlet } from "react-router-dom";

function App() {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .catch(() => dispatch(logout()))
    .finally(() => setLoading(false))
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-sky-50">
          <div className="w-full block">
              <Header />
              <main>
                  <Outlet />
              </main>
          </div>
          <div className="w-full block">
              <Footer />
          </div>
      </div>
  ) : null
}

export default App


/*
Gets the dispatch function from React-Redux, which is how you send actions to your Redux store.
Runs the code inside useEffect after the first render. The empty [] dependency array means “only once, on mount.”
Calls Appwrite auth service, which asks the server “is there an active session for this browser?” It returns a Promise.When the answer comes back:
If there’s a user, dispatch the login action with their data, so the store knows they’re logged in.
If not, dispatch logout, so the store knows nobody is logged in.
Whether it succeeded or not, take the “Please wait” sign down by setting loading to false
*/