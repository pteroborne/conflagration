<script>
    import {characterSkillsContext} from "$lib/contextStores.js";

    let martialSkills = [];
    let socialSkills = [];
    let otherSkills = [];

    $: {
        martialSkills = [];
        socialSkills = [];
        otherSkills = [];

        $characterSkillsContext.forEach(skill => {
            if (skill.type === "Martial") {
                martialSkills.push(skill);
            } else if (skill.type === "Social") {
                socialSkills.push(skill);
            } else {
                otherSkills.push(skill);
            }
        });
    }
</script>


{#if martialSkills.length > 0}
    <p class="title is-5">Martial Skills</p>
    <div class="columns is-mobile">
        {#each martialSkills as skill}
            <div class="column is-narrow">
                <strong>{skill.name} </strong><span class="content">{skill.shade}{skill.exponent}</span>
            </div>
        {/each}
    </div>
{/if}

{#if socialSkills.length > 0}
    <p class="title is-5">Social Skills</p>
    <div class="columns is-mobile">
        {#each socialSkills as skill}
            <div class="column is-narrow">
                <strong>{skill.name} </strong><span class="content">{skill.shade}{skill.exponent}</span>
            </div>
        {/each}
    </div>
{/if}

{#if otherSkills.length > 0}
    <p class="title is-5">Other Skills</p>
    <div class="columns is-mobile">
        {#each otherSkills as skill}
            <div class="column is-narrow">
                <strong>{skill.name} </strong><span class="content">{skill.shade}{skill.exponent}</span>
            </div>
        {/each}
    </div>
{/if}
