<!--<script>-->
<!--    import {supabase} from "$lib/supabaseClient.js";-->

<!--    export let userEngagement;-->
<!--    export let userCharacterId;-->

<!--    let isPlayer1;-->
<!--    let isPlayer2;-->

<!--    $: {-->
<!--        isPlayer1 = userEngagement.player1_character_id === userCharacterId;-->
<!--        isPlayer2 = userEngagement.player2_character_id === userCharacterId;-->
<!--    }-->

<!--    // Subscribe function-->
<!--    export async function subscribe(tableName, filters, onUpdate) {-->
<!--        return supabase-->
<!--            .channel('custom-filter-channel')-->
<!--            .on(-->
<!--                'postgres_changes',-->
<!--                filters,-->
<!--                (payload) => {-->
<!--                    console.log('Received Payload', payload);-->
<!--                    onUpdate(payload.new, payload.eventType);-->
<!--                }-->
<!--            )-->
<!--            .subscribe();-->
<!--    }-->

<!--    // Handle updates-->
<!--    const handleUpdate = (newData, eventType) => {-->
<!--        const {player1_roll, player2_roll} = newData;-->

<!--        if (player1_roll !== null && player2_roll !== null) {-->
<!--            // Perform comparison-->
<!--            const winner = player1_roll > player2_roll ? 'Player 1' : 'Player 2';-->

<!--            // Reset rolls-->
<!--            supabase-->
<!--                .from('engagements')-->
<!--                .update({player1_roll: null, player2_roll: null})-->
<!--                .match({ /* match conditions */});-->

<!--            console.log(`\${winner} wins!`);-->
<!--        }-->
<!--    };-->

<!--    // Subscribe to the engagements table-->
<!--    const unsubscribe = subscribe('engagements', { /* filters */}, handleUpdate);-->

<!--    // Update player's roll-->
<!--    const {data, error} = await supabase-->
<!--        .from('engagements')-->
<!--        .update({player1_roll: diceRollValue})-->
<!--        .match({player1_character_id: characterId});-->

<!--</script>-->
<h1 class="title is-1">You've made it to the fight</h1>

