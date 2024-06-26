import {render} from "@testing-library/react";
import RepositoriesListItem from "../components/repositories/RepositoriesListItem";
import {MemoryRouter} from "react-router";

function renderComponent() {
    const repository = {
        full_name: "facebook/react",
        language: "Javascript",
        description: "A js library",
        owner: "facebook",
        name: "react",
        html_url: "https://github.com/facebook/react"
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository}/>
        </MemoryRouter>
    );
}

test("Shows a link to the github homepage for this repository", () => {
    renderComponent();


});