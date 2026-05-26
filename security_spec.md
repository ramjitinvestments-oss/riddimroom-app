# Security Specification - Private Access & Admin Control

## Data Invariants
1. A user profile (`/users/{uid}`) must exist for any authenticated access.
2. New users are created with `status: "PENDING"` and `role: "USER"`.
3. Only an Admin (defined in `/admins/{uid}`) can modify a user's `status` or `role`.
4. Users can only read/update their own profile if they are `APPROVED` (except for basic session tracking if permitted, but the requirement says block access if not approved).
5. Admins have full read/write access to all collections for management purposes.

## Dirty Dozen Payloads (Rejection Targets)
1. **Self-Approval**: User attempts to update their own `status` to `APPROVED`.
2. **Promote to Admin**: User attempts to update their own `role` to `ADMIN`.
3. **Impersonation**: User A attempts to write to User B's profile.
4. **Bypass Approval**: User with `status: "PENDING"` attempts to read global `branding` config (if gated).
5. **Ghost Field**: User attempts to add `isAdmin: true` to a profile document.
6. **Admin Spoofing**: User attempts to create a document in `/admins/` for themselves.
7. **Malicious ID**: User attempts to use a 1MB string as a `userId`.
8. **Invalid Status**: Admin attempts to set `status` to `SUPER_USER` (not in enum).
9. **Creation Hijack**: User attempts to create their profile with `status: "APPROVED"` from the client.
10. **Resource Exhaustion**: User attempts to set `displayName` to 1MB string.
11. **Stale Data**: User attempts to update `createdAt`.
12. **Unauthorized List**: Non-admin attempts to list all users in `/users`.

## Test Runner Logic
- `match /users/{userId}`: `allow create: if isSelf() && incoming().status == 'PENDING' && incoming().role == 'USER'`.
- `match /users/{userId}`: `allow update: if isSelf() && isAdminUpdate() == false`.
- `match /admins/{userId}`: `allow read, write: if false;` (Only manageable via Backend/Console or existing Admin).
