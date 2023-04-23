<script>
    import { characterStore } from "$lib/characterStore.js";

    let character;

    $: character = $characterStore;

    function handleChange(e, key) {
        characterStore.update((character) => {
            character[key] = e.target.value;
            return character;
        });
    }

    const numberFields = [
        { label: 'Fate', type: 'number', key: 'fate' },
        { label: 'Persona', type: 'number', key: 'persona' },
        { label: 'Deed', type: 'number', key: 'deed' },
    ];

    const stockItems = ['man', 'orc', 'troll', 'wolf', 'dwarf', 'elf', 'rat'];
</script>

<div class="columns is-multiline">
    <div class="column is-half">
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input
                        class="input"
                        type="text"
                        bind:value="{character.name}"
                        placeholder="Name"
                        on:input="{(e) => handleChange(e, 'name')}"
                />
            </div>
        </div>
    </div>

    <div class="column is-half">
        <div class="field">
            <label class="label">Stock</label>
            <div class="control">
                <select
                        class="input control"
                        bind:value="{character.stock}"
                        on:input="{(e) => handleChange(e, 'stock')}"
                >
                    {#each stockItems as item}
                        <option value="{item}">{item}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    {#each numberFields as field}
        <div class="column is-half">
            <div class="field">
                <label class="label">{field.label}</label>
                <div class="control">
                    <input
                            class="input control"
                            type="number"
                            bind:value="{character[field.key]}"
                            placeholder="{field.label}"
                            on:input="{(e) => handleChange(e, field.key)}"
                    />
                </div>
            </div>
        </div>
    {/each}
</div>
