import "./App.css";
import AppRoutes from "./routes/AppRoutes";
// import useGetCurrentUser from "./hooks/UseGetCurrentUser";

export const serverUrl = "http://localhost:3000";

function App() {
  // useGetCurrentUser();
  return (
    <>
      <AppRoutes />
    </>
  );

}

export default App;
