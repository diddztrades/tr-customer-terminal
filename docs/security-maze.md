# Security Maze

Frontend hiding is not security. If premium fields are sent to a browser, the user can inspect the JavaScript payload, React props, network responses, or serialized page data even when the UI visually hides the content.

Setup payloads must use allowlist projection. Each tier receives a deliberately shaped object containing only fields that tier is allowed to know. This is safer than denylist redaction because new premium fields do not leak by default.

Premium setup data must never reach the client for low-tier users. Fields such as exact entries, stops, targets, execution notes, Tino notes, elite desk notes, chart URLs, and real-time timestamps must be omitted before rendering reaches client components.

The `/demo` route must wait until safe payloads exist because demos often reuse production-like UI. Building it before server-side projection would spread the existing leak pattern into another surface.

The current session is intentionally mocked by `getMockServerUser()`. Real auth and subscription logic should later replace that function with a server-derived user from the authenticated session and billing source, while keeping `getSafeSetupsForUser()` as the server-side projection boundary.

TODO: Briefings currently need the same safe-payload pattern before premium briefing body text or Tino notes are used in client components.

TODO: Alerts currently need the same safe-payload pattern before premium alert messages are used in client components.
