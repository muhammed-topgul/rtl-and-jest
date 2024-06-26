import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "../UserForm";

test('It shows two inputs and a button', () => {
    // Render the component
    render(<UserForm/>);

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    // Assertion - make sure the component is doing what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

const testForm = (nameInput, emailInput, mock) => {
    // Simulate typing in a name
    user.click(nameInput);
    user.keyboard("jane");

    // Simulate typing in an email
    user.click(emailInput);
    user.keyboard("jane@jane.com");

    // Find the button
    const button = screen.getByRole("button");

    // Simulate clicking the button
    user.click(button);

    // Assertion to make sure 'onUserAdd' gets called with name/email
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({
        name: "jane",
        email: "jane@jane.com"
    });
}

test('It calls onUserAdd when the form is submitted (Querying by role)', () => {
    // Render the component
    const mock = jest.fn();
    render(<UserForm onUserAdd={mock}/>)

    // Find the two inputs
    const [nameInput, emailInput] = screen.getAllByRole("textbox");
    testForm(nameInput, emailInput, mock);
});

test('It calls onUserAdd when the form is submitted (Querying by label)', () => {
    // Render the component
    const mock = jest.fn();
    render(<UserForm onUserAdd={mock}/>)

    // Find the two inputs
    const nameInput = screen.getByRole("textbox", {
        name: /name/i
    });
    const emailInput = screen.getByLabelText(/email/i);
    testForm(nameInput, emailInput, mock);
});

test('Empties the two inputs when form is submitted', () => {
    render(<UserForm onUserAdd={() => {}}/>);

    const nameInput = screen.getByRole("textbox", {name: /name/i});
    const emailInput = screen.getByRole("textbox", {name: /email/i});
    const button = screen.getByRole("button");

    user.click(nameInput);
    user.keyboard("jane");
    user.click(emailInput);
    user.keyboard("jane@jane.com");

    user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
});