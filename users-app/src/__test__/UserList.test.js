import {render, screen, within} from "@testing-library/react";
import UserList from "../UserList";

function renderComponent() {
    const users = [
        {name: "jane", email: "jane@jane.com"},
        {name: "sam", email: "sam@sam.com"},
    ]
    render(<UserList users={users}/>);
    return {users};
}

test('Render one row per user', () => {
    renderComponent();

    const rows = within(screen.getByTestId("tbody_id")).getAllByRole("row");
    expect(rows).toHaveLength(2);
});

test('Render the name and email of each user', () => {
    const {users} = renderComponent();

    for (let user of users) {
        const name = screen.getByRole("cell", {name: user.name});
        const email = screen.getByRole("cell", {name: user.email});

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});