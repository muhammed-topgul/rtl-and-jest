import {render, screen} from "@testing-library/react";
import DataForm from "../component/DataForm";

test('Selecting different elements', () => {
   render(<DataForm/>);

   const elements = [
       screen.getByRole("button"),
       screen.getByLabelText("Email"),
       screen.getByPlaceholderText("Red"),
       screen.getByText("Enter Data"),
       screen.getByDisplayValue("jane@jane.com"),
       screen.getByAltText("data"),
       screen.getByTitle("Click when ready to submit"),
       screen.getByTestId("image_warpper")
   ];

   for (let element of elements) {
       expect(element).toBeInTheDocument();
   }
});