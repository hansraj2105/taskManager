import React, {useState} from "react";
import Login from "./pages/Login";
import RouterCommon from "./components/Shared/RouterCommon";
import LogoutButton from "./components/Shared/LogoutButton";


function App() {


    return (
      <div className="App">
          <RouterCommon/>
          {/*<ManageUsers/>*/}
          {/*<TaskList/>*/}
      </div>
  );
}

export default App;
