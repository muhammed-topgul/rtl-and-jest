import {rest} from "msw";
import {setupServer} from "msw/node";
import {render, screen} from "@testing-library/react";
import HomeRoute from "../routes/HomeRoute";
import {MemoryRouter} from "react-router";

const handlers = [
    rest.get("/api/repositories", (req, res, ctx) => {
        const language = req.url.searchParams.get('q').split("language:")[1];
        return res(
            ctx.json({
                items: [
                    {id: 1, full_name: `${language}_one`},
                    {id: 2, full_name: `${language}_two`},
                ]
            })
        );
    })
];

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});

test("Renders two links for each language", async () => {
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