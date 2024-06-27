import {rest} from "msw";
import {setupServer} from "msw/node";

export function createServer(handleConfig) {
    const handlers = handleConfig.map((config) => {
        return rest[config.method || 'get'](config.path, (req, res, ctx) => {
            return res(ctx.json(config.res(req, res, ctx)));
        });
    });

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
}