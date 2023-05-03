Here's a brief summary of the documentation so far:

- `getLobby(id)`: Fetches a lobby with a given ID from the `lobbies` table in Supabase.
- `characterStore`, `characterSkillsStore`, `characterArrowheads`, `chosenWeaponsStore`, `characterArmor`: Svelte writable stores that hold character-related data.
- `key`: An empty object with no current usage.
- `saveCharacterToDB(character, user)`: Saves a character to the database using the Supabase client.
- `GET` and `POST` route functions in `src/routes/index.js`: Handle user login functionality.
- `GET` and `POST` route functions in `src/routes/signup.js`: Handle user signup functionality.
- `src/routes/conflict/[id]/+page.svelte`: A Svelte route component that fetches data for a conflict with a given ID and renders the `Conflict` component.
- `src/routes/create-character/+page.svelte`: A Svelte route component that renders a form for creating a character, composed of several subcomponents.
- `src/routes/dashboard/+page.svelte`: A Svelte route component that renders the user dashboard and fetches user's characters from the database.

# Project Documentation

## `src/routes/api/get-lobby.js`

- `getLobby(id)`: Fetches a lobby with a given ID from the `lobbies` table in Supabase.

## `lib/characterStore.js`

- `initialCharacter`: An object containing the initial character data.
- `characterStore`: A Svelte writable store holding character data.
- `characterSkillsStore`: A Svelte writable store holding character skills data.
- `characterArrowheads`: A Svelte writable store holding character arrowheads data.
- `chosenWeaponsStore`: A Svelte writable store holding chosen weapons data.
- `characterArmor`: A Svelte writable store holding character armor data.

## `contextSetup.js`

- Imports and exports the following contexts:
  - `characterContext`
  - `characterSkillsContext`
  - `characterArrowheadsContext`
  - `chosenWeaponsContext`
  - `characterArmorContext`

## `src/lib/saveCharacter.js`

- `saveCharacterToDB(character, user)`: Saves character data to the database using Supabase.
  - Inserts a character and its related data (skills, weapons, armor, and arrowheads) into their respective tables.
  - Logs any errors that occur during the insertion process.

### Functions

#### `saveCharacterToDB(character, user)`

- Parameters:
  - `character`: An object containing the character's data, skills, weapons, armor, and arrowheads.
  - `user`: The current user object.

- Functionality:
  1. Inserts the character data into the `characters` table.
  2. Inserts the character skills data into the `character_skills` table.
  3. Inserts the character weapons data into the `character_weapons` table.
  4. Inserts the character armor data into the `character_armor` table.
  5. Inserts the character arrowheads data into the `character_arrowheads` table.
  6. Logs any errors that occur during the insertion process.

## `src/routes/conflict/[id]/+page.svelte`

- Displays the `Conflict` component with the fetched game data.
- Fetches game data from the `lobbies` table in Supabase using the given `id`.

### Lifecycle

- `onMount`: Fetches game data and sets it to the `gameData` variable.

## `src/routes/dashboard/+page.svelte`

- Displays a dashboard for the user with a list of their characters and a preview of the selected character.
- Fetches character data from various tables in Supabase.

### Functions

- `fetchCharacters()`: Fetches the characters associated with the current user and sets them to the `characters` variable.
- `setSelectedCharacter(char)`: Sets the selected character and updates the context with the character's data.
- `handleError(e)`: Handles errors and sets the `errorMessage` variable.

### Lifecycle

- `onMount`: Sets the document title and fetches the characters.

## `src/routes/+layout.svelte`

- Contains the common layout for all routes, including the navigation menu.
- Handles the user authentication state changes.

### Functions

- `load({ page, session })`: Loads the current user and sets it to the `user` store if they are authenticated.
- `signout()`: Signs the user out using Supabase authentication.

### Lifecycle

- `onMount`: Sets up an event listener for authentication state changes.

## `src/routes/+page.svelte`

- Displays a login form if the user is not authenticated, otherwise displays a welcome message.

### Imports

- `Login`: The `Login` component from `src/lib/login.svelte`.

### `/lobby/+page.svelte`
This file is a Svelte component that handles the logic for the lobby page, allowing users to create and join lobbies.

#### `Imports`
- `onMount`: Svelte lifecycle method
- `supabase`: Supabase client
- `user`: User store
- `goto`: Sapper navigation method

#### `State`
- `lobbies`: An array of available lobbies
- `currentUser`: The current user object
- `code`: Lobby code for joining a lobby
- `playerName`: Placeholder for user-entered player name

#### `Methods`
- `generateLobbyCode(length = 6)`: Generates a random lobby code
- `createLobby()`: Creates a lobby and adds the creator to the lobby_members table
- `joinLobby(code)`: Allows a user to join an existing lobby using a code

### `/src/routes/lobby/[id]/+page.js`
This file is a Sapper page for handling lobby details.

#### `Imports`
- `getLobby`: API call to get a lobby by ID

#### `Functions`
- `load({ params })`: Async function that fetches lobby data using the `getLobby` API call

### `/src/routes/lobby/[id]/+page.svelte`
This file is a Svelte component for rendering and managing a specific lobby.

#### `Imports`
- `onMount`: Svelte lifecycle method
- `supabase`: Supabase client
- `user`: User store
- `Select`: Svelte-Select component
- `CharacterPreview`: Custom Svelte component
- `goto`: Sapper navigation method
- `updateContext`: Context setup helper function
- `writable`: Svelte writable store
- `lobbyMembers`, `fetchLobbyMembers`: Lobby store

#### `Props`
- `data`: The data prop passed from the parent component

#### `State`
- `lobby`: The lobby object
- `selectedSystem`: The selected game system
- `selectedCharacter`: A writable store for the selected character
- `characters`: A list of characters available to the user

#### `Methods`
- `init()`: Initializes the component
- `startGame()`: Starts the game if the current user is the lobby creator
- `selectSystem(system)`: Allows the lobby creator to select a game system
- `updateSelectedCharacter(char)`: Updates the selected character and context
- `onCharacterChange(character)`: Updates the selected character when it changes
- `updateLobbyMember(characterId)`: Updates the lobby member with the selected character ID

#### `Reactivity`
- Fetch characters for the user and update the lobby member when a character is selected

### +page.svelte
- Imports:
  - CharacterForm, CharacterPreview components
  - saveCharacterToDB function
  - user store
  - character-related stores
  - updateContext function
- Variables:
  - None
- Methods:
  - onMount: Updates context mode to 'create'
  - saveToDB: Saves character data to the database
- Components Usage:
  - CharacterForm
  - CharacterPreview

### ArmorSelect.svelte
- Imports:
  - createEventDispatcher from Svelte
- Props:
  - label
  - options
  - defaultOption
  - position
  - showHalfArmorCheckbox
- Variables:
  - selectedOption
  - halfArmorCheckboxDisabled
  - dispatch
- Methods:
  - handleArmorChange: Handles armor selection change
  - handleHalfArmorChange: Handles half armor checkbox change

### ArmorTab.svelte
- Imports:
  - onMount from Svelte
  - supabase
  - ArmorSelect component
  - characterArmor store
- Variables:
  - armors
  - helmets
  - shields
- Methods:
  - fetchArmorData: Fetches armor, helmets, and shields data from the database
  - onMount: Fetches armor data on mount
  - handleArmorSelected: Updates characterArmor store on armor selection

### Arrowheads.svelte
- Imports:
  - createEventDispatcher from Svelte
  - supabase
  - characterArrowheads store
- Props:
  - weapon
- Variables:
  - arrowheads
  - filteredArrowheads
  - selectedArrowhead
  - dispatch
- Methods:
  - fetchArrowheads: Fetches arrowheads from the database
  - filterArrowheads: Filters arrowheads based on weapon type
  - closeModal: Closes the modal
  - addArrowhead: Adds arrowhead to characterArrowheads store and closes modal

# Character Form

This component is responsible for rendering and managing the character form for the application.

## Components

- `CharacterFormField.svelte`: A reusable component for rendering input fields.
- `CharacterFormShadedField.svelte`: A reusable component for rendering shaded input fields.
- `SkillsTab.svelte`: A component that handles the skills tab.
- `WeaponsTab.svelte`: A component that handles the weapons tab.
- `ArmorTab.svelte`: A component that handles the armor tab.

## Dependencies

- `characterStore.js`: A writable store to manage character data.

## Functionality

1. Define stat fields, attribute fields, and physical tolerance fields.
2. Create a function to handle the calculation of tolerances.
3. Create a function to update dependent values.
4. Toggle between tabs: Basic Info, Stats, Attributes, Physical Tolerances, Skills, Weapons, and Armor.
5. Enforce rules for input fields.
6. Render the form fields for each tab.

## CSS

- `.tabs`: Applies a margin to the tabs container.
- `fieldset`: Hides fieldsets by default.
- `.is-active fieldset`: Displays the active fieldset.

# CharacterFormField.svelte

This Svelte component allows users to input character details, such as name, stock, and attributes. It handles user input events and updates the character store accordingly. The component includes a set of numberFields and stockItems for input fields and select options.

## Features

- Name input field
- Stock selection dropdown
- Number input fields for Fate, Persona, and Deed attributes

# CharacterFormShadedField.svelte

This Svelte component displays a horizontally-aligned form field with a label, a dropdown selection for shades (B, G, or W), and an input field for the exponent. The component exports multiple properties for customization, including disabling the input fields.

## Exports

- `label`: The label text for the form field
- `shadeKey`: The key to identify the shade value
- `exponentKey`: The key to identify the exponent value
- `bindShade`: The bound shade value
- `bindExponent`: The bound exponent value
- `disabled`: A boolean value to enable or disable the input fields


# Conflict.svelte

This component is responsible for the conflict portion of the app. It provides the following functionalities:

1. Fetches and displays the lobby members.
2. Pairs opponents and creates engagements between them.
3. Displays the list of engagements when they are ready.
4. Renders the appropriate conflict type component (`Fight`, `RangeAndCover`, or `DuelOfWits`) based on the selected game system.

## Imports

- Three conflict types: `Fight`, `RangeAndCover`, and `DuelOfWits`.
- The `lobbyMembers` store and `fetchLobbyMembers` function for managing lobby members.
- `dndzone` for drag-and-drop support in selecting characters for conflict.

## Key Functions

- `onMount`: Fetches the lobby members for the given game ID.
- `pairOpponents`: Creates fights and engagements between pairs of players in the lobby, and adds each pair to the `engagements` table in Supabase.

## Conditional Rendering

- When `isEngagementsReady` is true, the list of engagements is displayed.
- Depending on `gameData.game_system`, the appropriate conflict type component is rendered.
