# Security Policy

## Reporting a vulnerability

Please report security vulnerabilities **privately**. Do **not** open a public GitHub issue, pull request, or discussion for a security problem — public disclosure before a fix is available puts users at risk.

Email **security@example.com** with:

- A description of the vulnerability and its impact.
- Steps to reproduce, or a proof of concept.
- Any affected files, versions, or configurations.

You can expect an acknowledgement of your report and, where appropriate, coordination on a fix and disclosure timeline.

## Scope

This repository is an architecture reference whose external integrations ship as stubs. The most relevant security considerations are:

- **Secrets handling.** Never commit a real `.env`. Credentials belong in environment variables / a secrets manager, never in source. `.gitignore` already excludes `.env` and key files.
- **Adapter implementations.** When you replace a stub adapter with a real one, you own the security of that integration (auth, input validation, rate limiting, compliance). The `messaging` adapter in particular must only be wired against a compliant, opted-in channel.
- **The creative-agent runner** shells out to a CLI with `--dangerously-skip-permissions`. Only run it in an environment you trust, against inputs you control.

Thank you for helping keep the project and its users safe.
