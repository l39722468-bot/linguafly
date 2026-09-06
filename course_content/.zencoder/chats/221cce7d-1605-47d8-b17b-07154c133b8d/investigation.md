# Investigation: Open Ports and Security

## Bug Summary
The user reported a concern about open ports on their computer. Investigation reveals that the Next.js development server is configured to run on port 5436 and, by default, binds to all network interfaces (`0.0.0.0`), making it accessible from other devices on the same network.

## Root Cause Analysis
The `dev` script in `package.json` uses `next dev -p 5436`. Without the `-H` (or `--hostname`) flag, Next.js binds to `0.0.0.0`. While convenient for testing on multiple devices, it exposes the development environment to the local network by default.

## Affected Components
- `package.json`: The `dev` script configuration.
- System Security: Exposure of local development server to the network.

## Proposed Solution
Modify the `dev` script in `package.json` to explicitly bind to `127.0.0.1` (localhost). This ensures that the port is only accessible from the local machine, effectively "blocking" external access to it.

New script command: `next dev -p 5436 -H 127.0.0.1`

## Implementation Notes
I have updated the `dev` script in `package.json` to include the `-H 127.0.0.1` flag. This ensures that the Next.js development server only binds to the loopback interface, making it inaccessible from the network.

## Verification Results
- Command `lsof -i :5436 -P -n | grep LISTEN` confirms the process is now only listening on `127.0.0.1:5436`.
- Previously, it was listening on `*:5436` (IPv6) or all interfaces.
- The change effectively blocks external access to the development port.
