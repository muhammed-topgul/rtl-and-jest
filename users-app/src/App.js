import UserForm from "./UserForm";
import {useState} from "react";
import UserList from "./UserList";
import RoleExample from "./component/RoleExample";
import ColorList from "./component/ColorList";

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
        </div>
    );
}

export default App;
