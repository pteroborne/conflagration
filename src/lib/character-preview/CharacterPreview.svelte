<script>
    import PTGS from './PTGS.svelte';
    import ShadeExponent from "./ShadeExponent.svelte";
    import SkillPreview from "./SkillPreview.svelte";
    import WeaponPreview from "./WeaponPreview.svelte";
    import ArmorPreview from "./ArmorPreview.svelte";

    import {characterContext} from '$lib/contextStores.js';

    let character;

    $: {
        character = $characterContext;
    }

    let basicInfo = ['Name', 'Stock', 'Fate', 'Persona', 'Deed']
    let stats = ['Will', 'Power', 'Agility', 'Perception', 'Forte', 'Speed']
    let attributes = ['Health', 'Reflexes', 'Steel', 'Mortal_Wound']
</script>

{#if character}
    <div class="box">
        <div class="preview-section">
            <p class="title is-4">Character Information</p>
            <hr/>
            <div class="columns is-mobile">
                {#each basicInfo as basic}
                    <div class="column is-narrow">
                        <div class="field">
                            <label class="label">{basic}</label>
                            <div class="control">
                                <span class="content">{character[basic.toLowerCase()]}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
            <p class="title is-4">Stats</p>
            <hr/>
            <div class="columns is-mobile">
                {#each stats as stat}
                    <ShadeExponent field="{stat}"/>
                {/each}
            </div>
            <p class="title is-4">Attributes</p>
            <hr/>
            <div class="columns is-mobile">
                {#each attributes as attribute}
                    <ShadeExponent field="{attribute}"/>
                {/each}
                {#if character.emotional_attribute_exponent > 0}
                    <div class="column is-narrow">
                        <strong>{character.emotional_attribute_name} </strong><span
                            class="content">{character.emotional_attribute_shade}{character.emotional_attribute_exponent}</span>
                    </div>
                {/if}
                <div class="column is-narrow">
                    <strong>Hesitation </strong><span class="content">{character.hesitation}</span>
                </div>
            </div>
            <p class="title is-4">Skills</p>
            <hr/>
            <SkillPreview/>
        </div>

        <div class="preview-section">
            <p class="title is-4">Physical Tolerances Gray Scale (PTGS)</p>
            <hr/>
            <PTGS/>
        </div>
        <p class="title is-4">Weapons</p>
        <hr/>
        <WeaponPreview/>
        <p class="title is-4">Armor</p>
        <hr/>
        <ArmorPreview/>
    </div>
{:else}
    <p>Loading character data. . .</p>
{/if}
