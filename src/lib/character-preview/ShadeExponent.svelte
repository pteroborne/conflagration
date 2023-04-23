<script>
    import {characterStore} from "$lib/characterStore.js";
    export let field = ''
    let character;

    $: character = $characterStore;
</script>

<div class="column is-narrow">
    <strong>{field} </strong><span class="content">{character[field.toLowerCase() + '_shade']}{character[field.toLowerCase() + '_exponent']}</span>
</div>