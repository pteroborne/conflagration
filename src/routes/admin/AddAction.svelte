<script>
    import {supabase} from '$lib/supabaseClient';
    import Select from 'svelte-select';
    import {createEventDispatcher} from 'svelte';

    export let user;

    let systems = [];
    let selectedSystem = null;
    let actionName = '';
    let category = '';
    let testDescription = '';
    let effectDescription = '';
    let special = '';

    async function loadSystems() {
        const {data, error} = await supabase.from('systems').select('*');

        if (error) {
            console.error('Error loading systems:', error.message);
        } else {
            systems = data;
        }
    }

    async function addAction() {
        const {data, error} = await supabase.from("actions").insert([
            {
                name: actionName,
                test_description: testDescription,
                effect_description: effectDescription,
                special: special,
                system_id: selectedSystem.id,
                category: category,
            },
        ]);

        if (data) {
            alert("Action added successfully!");
            // Reset form values
            actionName = "";
            testDescription = "";
            effectDescription = "";
            special = "";
            selectedSystem = null;
            category = "";
        } else {
            alert(`Error adding action: ${error.message}`);
        }
    }


    loadSystems();
</script>

<div>
    <h2>Add Action</h2>

    <div class="field">
        <label class="label" for="system">System:</label>
        <div class="control">
            <Select
                    items="{systems}"
                    bind:value="{selectedSystem}"
                    placeholder="Select a system"
                    itemId="id"
                    label="name"
            />


        </div>
    </div>

    <div class="field">
        <label class="label" for="actionName">Action Name:</label>
        <div class="control">
            <input class="input" type="text" id="actionName" bind:value="{actionName}"/>
        </div>
    </div>

    <div class="field">
        <label class="label" for="category">Category:</label>
        <div class="control">
            <input class="input" type="text" id="category" bind:value="{category}"/>
        </div>
    </div>

    <div class="field">
        <label class="label" for="testDescription">Test Description:</label>
        <div class="control">
            <input class="input" type="text" id="testDescription" bind:value="{testDescription}"/>
        </div>
    </div>

    <div class="field">
        <label class="label" for="effectDescription">Effect Description:</label>
        <div class="control">
            <input class="input" type="text" id="effectDescription" bind:value="{effectDescription}"/>
        </div>
    </div>

    <div class="field">
        <label class="label" for="special">Special:</label>
        <div class="control">
            <input class="input" type="text" id="special" bind:value="{special}"/>
        </div>
    </div>

    <div class="field">
        <div class="control">
            <button class="button is-primary" on:click="{addAction}">Add Action</button>
        </div>
    </div>


</div>
