import UserForm from "./UserForm";
import {useState} from "react";
import UserList from "./UserList";
import RoleExample from "./component/RoleExample";
import ColorList from "./component/ColorList";
import LoadableColorList from "./component/LoadableColorList";

function App() {
    const [users, setUsers] = useState([]);

    const onUserAdd = (user) => {
        setUsers([...users, user]);
    }

    return (
        <div>
            <UserForm onUserAdd={onUserAdd}/>
            <hr/>
            <UserList users={users}/>
            <hr/>
            <hr/>
            <RoleExample/>
            <hr/>
            <hr/>
            <ColorList/>
            <hr/>
            <hr/>
            <LoadableColorList/>
        </div>
    );
}

export default App;
