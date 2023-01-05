# not-a-signal

Learning-like repository which aims to create back-end of
chat application which will include basic features such as
sending messages and communicating users. My time is limited
for this idea and I would like to keep everything simple.
This was purely for recriutation purposes as I do not will
to spend any more minute on recriutments task just to
validate my hello-world skills.

## Onboarding

Application introduces core modules like `User`, `Thread`
and `Message`. You start exploring functionality from
`User`, `Message` and end up on `Thread` which includes both
of previous modules.

## Technology Used

I'm all about giving people the freedom to choose and
customize, but that doesn't mean we should totally ditch the
rules. I'm always on the lookout for libraries and
frameworks that give us the best of both worlds - the
ability to bend and mold them to our needs, but with a solid
set of guidelines to follow.

-   [`tinyhttp`](https://tinyhttp.v1rtl.site) over
    `express`, not much innovative but I really like
    `ESNext` and `ESM` so `tinyhttp` seems like a perfect
    choice over there. Whole application server is based on
    this library with some additional generics such as
    `Controller` was written on my own to simplify
    application structure at scale.
-   `prisma`, one of my favourite tools for working with
    databases - a lot of modularity when it comes to
    migration from (for example) MySQL to CockroachDB.

## Concept

-   Conversation between multiple `User`s will be called
    `Thread`
-   `Thread` can contain multiple `Message`s which are
    related to specified `Thread`.
-   `Thread`s should not be duplicated, when one with same
    `User`s exists should be used again.
-   `Message`s can be `PlainMessage` (for text-only
    messages), `AttachmentMessage` (for photo-only messages)
    and `CombinedMessage` (for photo with attachment
    messages)
-   `Message`s should have tracked state (`SENT`,
    `DELIVERED`, `SEEN`).
-   `Message`s should be end-to-end encrypted so such
    message must be readable only for `User`s directly
    related to it.

## Usage

Repository does not attempt to mimic a real-world
application as it is merely a simple demonstration of chat
functionality without real-world endpoints and controllers
that would present the application to the presentation
layer.

```
cp example.env .env
docker compose -f "docker-compose.yml" up -d --build
pnpm install
pnpm start
```
