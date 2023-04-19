<script>
    import { characterSkillsStore } from '$lib/characterStore.js';
    import Select from 'svelte-select';

    export let skillTypes = [];

    let skillName = '';
    let roots = [];
    let type = '';
    let shade = 'B';
    let exponent = 0;

    const statOptions = [
        'Will',
        'Agility',
        'Forte',
        'Power',
        'Perception',
        'Speed',
    ];

    function addCustomSkill() {
        const customSkill = {
            name: skillName,
            roots: { root1: roots[0], root2: roots[1] },
            type,
            shade,
            exponent,
        };
        characterSkillsStore.update((skills) => [...skills, customSkill]);
        skillName = '';
        roots = [];
        type = '';
        shade = 'B';
        exponent = 0;
    }
</script>
<hr>
<label class="label">Custom Skills</label>
<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label">Skill Name</label>
            <input
                    class="input"
                    type="text"
                    bind:value="{skillName}"
                    placeholder="Enter skill name"
            />
        </div>
    </div>

    <div class="column">
        <label class="label">Roots</label>
        <Select
                items="{statOptions}"
                bind:value="{roots}"
                multiple="{true}"
                max="{2}"
                placeholder="Select roots"
        />
    </div>
</div>

<div class="columns">
    <div class="column">
        <label class="label">Type</label>
        <Select
                items="{skillTypes}"
                bind:value="{type}"
                placeholder="Select type"
        />
    </div>

    <div class="column">
        <div class="field">
            <label class="label">Shade</label>
            <input
                    class="input"
                    type="text"
                    bind:value="{shade}"
                    maxlength="1"
                    placeholder="Enter shade"
            />
        </div>
    </div>

    <div class="column">
        <div class="field">
            <label class="label">Exponent</label>
            <input
                    class="input"
                    type="number"
                    bind:value="{exponent}"
                    min="0"
                    placeholder="Enter exponent"
            />
        </div>
    </div>
</div>

<div class="field">
    <button class="button" on:click="{addCustomSkill}">
        Add Custom Skill
    </button>
</div>

<style>
    /* Add any additional styling here */
</style>
