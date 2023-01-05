# `Message`

`Message` is core entity in our application, it stands from
single message sent by one `User` to another `User`
(communication between them is called `Thread`). `Message`
can be multiple instances such as `PlainMessage` for
messages without attachments (just a little bit of text),
`AttachmentMessage` for messages with text (just a single
photo for example) and `CombinedMessage` where `User`
decided to add attachment and text as well.
