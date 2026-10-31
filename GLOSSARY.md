# Draidus

Draidus is the owner's personal plugin for acting on vault content: sending notes out to external systems, bringing content back in, and producing new artifacts from notes.

## Language

**Action**:
A user-triggered operation on one Note that sends its content out, changes it, or derives a new artifact from it; it may create the Note it targets.
_Avoid_: Mutation, command, job

**Integration**:
A configured connection to one external system, such as a Google account or an MCP server, that Actions may use.
_Avoid_: Connector, provider, service, plugin

**Note**:
A single markdown file in the vault; the only thing an Action targets.
_Avoid_: Object, document, file, page
