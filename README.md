# not-a-signal

Repository aims to explore possibilities on chat application with strong domain information.

- Conversation between multiple `User`s will be called `Thread`
- `Thread` can contain multiple `Message`s which are related to specified `Thread`.
- `Thread`s should not be duplicated, when one with same `User`s exists should be used again.
- `Message`s can be `PlainMessage` (for text-only messages), `AttachmentMessage` (for photo-only messages) and `CombinedMessage` (for photo with attachment messages)
- `Message`s should have tracked state (`SENT`, `DELIVERED`, `SEEN`).
- `Message`s should be end-to-end encrypted so such message must be readable only for `User`s directly related to it.

## Usage

Repository does not attempt to mimic a real-world application as it is merely a simple demonstration of chat functionality without real-world endpoints and controllers that would present the application to the presentation layer.

```
cp example.env .env
docker compose -f "docker-compose.yml" up -d --build
pnpm install
pnpm start
```
