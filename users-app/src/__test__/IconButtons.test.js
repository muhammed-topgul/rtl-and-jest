import {render, screen} from "@testing-library/react";
import IconButtons from "../component/IconButtons";

test('Find elements based on label', () => {
   render(<IconButtons/>);

   const input = screen.getByRole("textbox", {name: "input-field"});
   const signInButton = screen.getByRole("button", {name: "sign-in"});
   const signOutButton = screen.getByRole("button", {name: "sign-out"});

   expect(input).toBeInTheDocument();
   expect(signInButton).toBeInTheDocument();
   expect(signOutButton).toBeInTheDocument();
});