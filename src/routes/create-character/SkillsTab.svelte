<script>
    import {onMount} from 'svelte';
    import {writable} from "svelte/store";
    import Select from 'svelte-select';
    import SkillForm from "./SkillForm.svelte";
    import {supabase} from "$lib/supabaseClient.js";
    import {characterStore, characterSkillsStore} from '$lib/characterStore.js';

    import {fetchSkills} from "./skills.js";

    let skills = [];
    let selectedSkill = null;


    onMount(async () => {
        try {
            const fetchedSkills = await fetchSkills();
            skills = fetchedSkills;
            console.log('Fetched skills:', skills);
        } catch (err) {
            console.error('Error in onMount:', err);
        }
    });

    const selectedCategories = writable(new Set(["All"]));

    let uniqueCategories = [];

    $: uniqueCategories = ['All', ...getUniqueCategories(skills)];

    function getUniqueCategories(skills) {
        const categories = new Set();
        skills.forEach(skill => categories.add(skill.type));
        return Array.from(categories);
    }

    function handleCategoryChange(e, category) {
        selectedCategories.update((currentCategories) => {
            if (category === "All") {
                if (e.target.checked) {
                    currentCategories.clear();
                    currentCategories.add(category);
                } else {
                    currentCategories.delete(category);
                }
            } else {
                if (e.target.checked) {
                    currentCategories.delete("All");
                    currentCategories.add(category);
                } else {
                    currentCategories.delete(category);
                    if (currentCategories.size === 0) {
                        currentCategories.add("All");
                    }
                }
            }
            return currentCategories;
        });
        allChecked = $selectedCategories.has("All");
    }

    $: {
        if ($selectedCategories.has("All")) {
            filteredSkills = skills;
        } else {
            filteredSkills = skills.filter(skill => {
                for (const category of $selectedCategories) {
                    if (skill.type === category) {
                        return true;
                    }
                }
                return false;
            });
        }
    }

    let filteredSkills = [];

    let allChecked = true;

    function addSkill() {
        console.log('skill button clicked: ' + selectedSkill)
        if (selectedSkill) {
            const skill = {...selectedSkill, shade: 'B', exponent: calculateInitialExponent(selectedSkill)};
            characterSkillsStore.update(currentSkills => [...currentSkills, skill]);
        }
    }

    function calculateInitialExponent(skill) {
        const roots = [];

        if (skill.roots.root1) {
            roots.push(skill.roots.root1);
        }

        if (skill.roots.root2) {
            roots.push(skill.roots.root2);
        }

        if (roots.length === 0) {
            console.error('No roots found for skill:', skill);
            return 0;
        }

        const sum = roots.reduce((acc, root) => {
            return acc + $characterStore[`${root.toLowerCase()}_exponent`];
        }, 0);

        return Math.floor(sum / roots.length);
    }



</script>

{#if skills.length === 0}
    <p>Loading skills...</p>
{:else}
    <div class="field category-filter">
        <label class="label">Skill Filter(s)</label>
        <div class="category-grid">
            {#each uniqueCategories as category}
                <label class="toggle-wrapper">
                    <input class="toggle-checkbox" type="checkbox"
                           checked="{category === 'All' ? allChecked : $selectedCategories.has(category)}"
                           on:change="{(e) => handleCategoryChange(e, category)}"/>
                    <span class="toggle"></span>
                    {category}
                </label>
            {/each}
        </div>
    </div>
{/if}


<div class="field">
    <label class="label">Skills</label>
    <Select
            items="{filteredSkills}"
            bind:value="{selectedSkill}"
            label="name"
            placeholder="Select a skill"
            searchable="{true}"
            itemFilter="{(label, filterText) => label.toLowerCase().includes(filterText.toLowerCase())}"
    />
    <button class="button" on:click="{addSkill}">Add</button>
</div>


<!-- Manually enter a new skill -->
<SkillForm skillTypes="{uniqueCategories}" />


<!-- Character skills list -->
<div class="field">
    <label class="label">Chosen Skills</label>
    <ul>
        {#each $characterSkillsStore as {name, shade, exponent}}
            <li>
                {name}: {shade}{exponent}
            </li>
        {/each}
    </ul>
</div>

<style>
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
        gap: 1rem;
    }


</style>