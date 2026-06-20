# Security Maze

Frontend hiding is not security. If premium fields are sent to a browser, the user can inspect the JavaScript payload, React props, network responses, or serialized page data even when the UI visually hides the content.

Setup payloads must use allowlist projection. Each tier receives a deliberately shaped object containing only fields that tier is allowed to know. This is safer than denylist redaction because new premium fields do not leak by default.

Premium setup data must never reach the client for low-tier users. Fields such as exact entries, stops, targets, execution notes, Tino notes, elite desk notes, chart URLs, and real-time timestamps must be omitted before rendering reaches client components.

The `/demo` route must wait until safe payloads exist because demos often reuse production-like UI. Building it before server-side projection would spread the existing leak pattern into another surface.

The current session is intentionally mocked by `getMockServerUser()`. Real auth and subscription logic should later replace that function with a server-derived user from the authenticated session and billing source, while keeping `getSafeSetupsForUser()` as the server-side projection boundary.

## Briefing and Alert Protection

Briefings and alerts now follow the same server-side payload boundary as setups. Server helpers project full mock records into safe tier-specific payloads before page rendering.

Bronze briefing payloads include public title, summary, market state, threat headline, and public narrative only. They omit full content, Tino notes, execution focus, premium analysis, and elite commentary.

Bronze alert payloads include public headline, asset, alert type, and timestamp only. They omit full message, execution details, real-time context, premium commentary, and elite commentary.

Gold payloads may include delayed or partial context. Platinum payloads may include full briefing and alert context, including Tino notes and execution context. Black payloads may add elite commentary and priority context.

The remaining replacement work is to connect `getMockServerUser()` to real server-derived auth and subscription state later. The allowlist projection functions should remain the boundary even after real auth is introduced.
