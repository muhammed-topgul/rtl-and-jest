import {render, screen} from "@testing-library/react";
import HomeRoute from "../routes/HomeRoute";
import {MemoryRouter} from "react-router";
import {createServer} from "./server";

createServer([
    {
        path: "/api/repositories",
        res: (req) => {
            const language = req.url.searchParams.get('q').split("language:")[1];
            return {
                items: [
                    {id: 1, full_name: `${language}_one`},
                    {id: 2, full_name: `${language}_two`},
                ]
            }
        }
    }
]);
test("Renders two links for each language 2", async () => {
    render(
        <MemoryRouter>
            <HomeRoute/>
        </MemoryRouter>
    );

    // Loop over each language
    const languages = [
        "javascript",
        "typescript",
        "rust",
        "go",
        "python",
        "java"
    ];

    for (let lang of languages) {
        const links = await screen.findAllByRole("link", {
            name: new RegExp(`${lang}_`)
        });

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${lang}_one`);
        expect(links[1]).toHaveTextContent(`${lang}_two`);
        expect(links[0]).toHaveAttribute("href", `/repositories/${lang}_one`)
        expect(links[1]).toHaveAttribute("href", `/repositories/${lang}_two`)
    }
});