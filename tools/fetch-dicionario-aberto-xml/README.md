# Fetch Dicionário Aberto XML Tool

## Description

This utility is intended to facilitate the fetching and local storage of XML
definitions from dicionário aberto.  I haven't found documentation on their XML
schema, so my plan is to obtain and analyze a number of examples to infer what
there is that I can rely on.

## Design

### Objective

Story: As a definir-pt developer, I can run a single script with a one-word
input, and then find the XML files returned by dicionário aberto for that word
within their own directory.

### Design Decisions / Decisions Likely to Change

- Where to write the output files
- Tool for fetches
- How to parse the response body
- Directory names
- File names
- Sequential vs Async
- User Interface

### Modules and Hierarchy

#### Top Level

- main: Hides the app's implementation

#### Level 1

- Bootstrap: Hides the bootstrapping of the dependency graph
- Interface: Hides the nature of the user interface
- Coordinator: Hides the coordination of business logic components

#### Level 2: Coordinator

- OutputService: Hides where and how output files are written
- ResourceFetcher: Hides how the user-provided word becomes XML content

#### Level 2: Interface

I don't think that further decomposition is needed here.  I'll use argparse to
fetch the arguments from the user:

- word: The word for which to fetch the XML files
- path: (*optional*) Where to write the output files

#### Level 3: ResourceFetcher

- ResponseFetcher: Hides how the response body is obtained
- ResponseParser: Hides how the body is parsed to return the XML files

#### Level 3: OutputService

I'm not sure that further decomposition is needed here.  If ResourceFetcher
returns a list of the XML contents, OutputService just needs to iterate through
each and write them.  Perhaps the writer should be decomposed, but I'll
consider that when I get there.
