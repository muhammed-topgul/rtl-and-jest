import UserForm from "./UserForm";
import {useState} from "react";
import UserList from "./UserList";
import RoleExample from "./component/RoleExample";

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
        </div>
    );
}

export default App;
