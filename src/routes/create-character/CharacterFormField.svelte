<script>
    export let label = '';
    export let type = 'text';
    export let bindValue;
    export let placeholder = '';
    export let required = false;
    export let items = [];
    export let fieldClass = '';
    export let disabled = false; // Add disabled property


</script>

<div class="field">
    <div class="control">
        {#if type === 'select'}
            <select
                    class="input control {fieldClass}"
                    bind:value="{bindValue}"
                    required="{required}"
                    disabled="{disabled}"
            >
            {#each items as item}
                <option value="{item}">{item}</option>
            {/each}
            </select>
        {:else if type === 'number'}
            <input
                    class="input control {fieldClass}"
                    type="number"
                    bind:value="{bindValue}"
                    placeholder="{placeholder}"
                    required="{required}"
                    disabled="{disabled}"
            />
        {:else}
            <input
                    class="input {fieldClass}"
                    type="text"
                    bind:value="{bindValue}"
                    placeholder="{placeholder}"
                    required="{required}"
                    disabled="{disabled}"
            />
        {/if}
    </div>
</div>
