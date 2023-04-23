<script>
    import { characterArmor } from '$lib/characterStore.js';

    let armor = {};
    $: armor = $characterArmor;
</script>

<style>
    .armor-section {
        margin-bottom: 1rem;
    }
    .armor-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .armor-grid-header {
        font-weight: bold;
    }
</style>

<div class="armor-section">
    <div class="armor-grid armor-grid-header">
        <div>Location</div>
        <div>Armor Name</div>
        <div>Protection</div>
    </div>
    {#each Object.entries(armor) as [location, armorPiece]}
        {#if armorPiece}
            <div class="armor-grid">
                <div>{location}</div>
                <div>{armorPiece.isHalfArmor ? 'Half ' : ''}{armorPiece.name}</div>
                <div>B{armorPiece.isHalfArmor ? armorPiece.half_protection : armorPiece.protection}</div>
            </div>
        {/if}
    {/each}
</div>
