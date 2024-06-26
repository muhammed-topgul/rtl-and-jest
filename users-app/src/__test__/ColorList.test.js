import {render, screen} from "@testing-library/react";
import ColorList from "../component/ColorList";
import LoadableColorList from "../component/LoadableColorList";

test('getBy, queryBy, findBy finding 0 elements', async () => {
    render(<ColorList/>);

    expect(() => screen.getByRole("textbox")).toThrow();
    expect(screen.queryByRole("textbox")).toEqual(null);

    let errorThrown = false;
    try {
        await screen.findByRole("textbox");
    } catch (err) {
        errorThrown = true;
    }
    expect(errorThrown).toEqual(true);
});

test('getBy, queryBy, findBy when they find 1 element', async () => {
    render(<ColorList/>);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeInTheDocument();
    expect(await screen.findByRole("list")).toBeInTheDocument();
});

test('getBy, queryBy, findBy when they finding > 1 elements', async () => {
    render(<ColorList/>);

    expect(() => screen.getByRole("listitem")).toThrow();
    expect(() => screen.queryByRole("listitem")).toThrow();
    let errorThrown = false;
    try {
        await screen.findByRole("listitem");
    } catch (err) {
        errorThrown = true;
    }
    expect(errorThrown).toEqual(true);
});

test('getAllBy, queryAllBy, findAllBy', async () => {
    render(<ColorList/>);

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});

test('Favor using getBy to prove an element exists', () => {
    render(<ColorList/>);

    const element = screen.getByRole("list");
    expect(element).toBeInTheDocument();
});

test('Favor using queryBy to prove an element does not exists', () => {
    render(<ColorList/>);

    const element = screen.queryByRole("textbox");

    expect(element).toEqual(null);
    expect(element).not.toBeInTheDocument();
});

test('Favor findBy or findAllBy when data fetching', async () => {
    render(<LoadableColorList/>);

    const elements = await screen.findAllByRole("listitem");

    expect(elements).toHaveLength(3);
});