<script>
    import {characterContext} from "$lib/contextStores.js";
    import {onMount} from "svelte";

    let character;

    $: character = $characterContext;


    let isLarge = false;
    let mediaQuery;

    onMount(() => {
        mediaQuery = window.matchMedia("(min-width: 1200px)");
        mediaQuery.addEventListener("change", updateIsLarge);
        updateIsLarge();

        return () => {
            mediaQuery.removeEventListener("change", updateIsLarge);
        };
    });

    function updateIsLarge() {
        isLarge = mediaQuery.matches;
    }

    function textColor(value) {
        return value <= 8 ? 'white' : 'black';
    }
</script>

{#if isLarge}
    <div class="ptgs-container">
        <div class="gradient-background"></div>
        {#each Array.from({length: 16}, (_, i) => i + 1) as value}
            <div class="ptgs-cell" style="color: {textColor(value)};">
                B{value}
            </div>
        {/each}
        {#each ['su', 'li', 'mi', 'se', 'tr', 'mo'] as label, index}
            <div
                    class="ptgs-cell ptgs-labels"
                    style="background: white; color: black; grid-column: {character[`${label}_exponent`]};"
            >
                {label}
            </div>
        {/each}
    </div>
{:else}
    <div class="ptgs-container">
        <div class="gradient-background"></div>
        {#each Array.from({length: 8}, (_, i) => i + 1) as value}
            <div class="ptgs-cell" style="color: {textColor(value)};">
                B{value}
            </div>
        {/each}
        {#each ['su', 'li', 'mi', 'se', 'tr', 'mo'] as label, index}
            {#if character[`${label}_exponent`] <= 8}
                <div
                        class="ptgs-cell ptgs-labels"
                        style="background: white; color: black; grid-column: {character[`${label}_exponent`]};"
                >
                    {label}
                </div>
            {/if}
        {/each}
    </div>
    <div class="ptgs-container">
        <div class="gradient-background-bottom"></div>
        {#each Array.from({length: 8}, (_, i) => i + 9) as value}
            <div class="ptgs-cell" style="color: {textColor(value)};">
                B{value}
            </div>
        {/each}
        {#each ['su', 'li', 'mi', 'se', 'tr', 'mo'] as label, index}
            {#if character[`${label}_exponent`] > 8}
                <div
                        class="ptgs-cell ptgs-labels"
                        style="background: white; color: black; grid-column: {character[`${label}_exponent`] - 8};"
                >
                    {label}
                </div>
            {/if}
        {/each}
    </div>
{/if}

<style>
    .ptgs-container {
        position: relative;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
    }

    .gradient-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2rem;
        background: linear-gradient(to right, black 0%, #eee 100%);
        z-index: 0;
    }

    .ptgs-cell {
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    .ptgs-labels {
        grid-row: 2;
    }

    @media (max-width: 1199px) {
        .ptgs-container {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: auto auto;
        }


        .gradient-background {
            background: linear-gradient(to right, black 0%, #777 100%);
        }

        .gradient-background-bottom {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2rem;
            background: linear-gradient(to right, #777 0%, #eee 100%);
        }
    }
</style>
