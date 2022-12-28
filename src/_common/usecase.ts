export abstract class Usecase<Request, Response> {
  abstract execute(request: Request): Promise<Response>;
}
