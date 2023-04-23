// $lib/saveCharacter.js
import {supabase} from './supabaseClient.js';

export async function saveCharacterToDB(character, user) {
    const {
        characterData,
        characterSkills,
        characterWeapons,
        characterArmor,
        characterArrowheads,
    } = character;

    characterData.user_id = user.id;

    const {data: insertedCharacter, error: insertError} = await supabase
        .from('characters')
        .insert([characterData])
        .single()
        .select();

    if (insertError) {
        console.error('Error inserting character:', insertError);
        return;
    }

    const characterId = insertedCharacter.id;

    // Insert characterSkills
    const characterSkillsData = characterSkills.map((skill) => {
        const { id, name, type: skill_type, shade, exponent, roots } = skill;
        return {
            character_id: characterId,
            name,
            skill_type,
            shade,
            exponent,
            roots,
        };
    });


    const {error: skillsError} = await supabase.from('character_skills').insert(characterSkillsData);

    if (skillsError) {
        console.error('Error inserting character skills:', skillsError);
    }

    // Insert characterWeapons
    const characterWeaponsData = characterWeapons.map(({type, weapon}) => {
        const {id, weapon: weaponName, ...rest} = weapon;
        const keyMap = {
            ws: 'weapon_speed',
            wl: 'weapon_length',
            add: 'add_value',
            I: 'i_value',
            M: 'm_value',
            S: 's_value',
            DOF_I: 'dof_i_range',
            DOF_M: 'dof_m_range',
            DOF_S: 'dof_s_range',
            dof_i: 'dof_i_range',
            dof_m: 'dof_m_range',
            dof_s: 'dof_s_range',
        };


        const mappedProperties = Object.entries(rest).reduce((acc, [key, value]) => {
            const newKey = keyMap[key] || key;
            return { ...acc, [newKey]: value };
        }, {});

        return {
            character_id: characterId,
            weapon_type: type,
            weapon_name: weaponName,
            ...mappedProperties,
        };
    });

    const {error: weaponsError} = await supabase.from('character_weapons').insert(characterWeaponsData);

    if (weaponsError) {
        console.error('Error inserting character weapons:', weaponsError);
    }


    // Insert characterArmor
    const characterArmorData = Object.entries(characterArmor).map(([location, armor]) => {
        const { id, name, isHalfArmor: is_half_armor, ...rest } = armor;
        return {
            character_id: characterId,
            location,
            name,
            is_half_armor,
            ...rest
        };
    });



    const {error: armorError} = await supabase.from('character_armor').insert(characterArmorData);

    if (armorError) {
        console.error('Error inserting character armor:', armorError);
    }

    // Insert characterArrowheads
    const characterArrowheadsData = characterArrowheads.map((arrowhead) => {
        const { name, i: i_value, m: m_value, s: s_value, va, dof, ob, type: arrowhead_type, note, weaponId: weapon_id } = arrowhead;
        return {
            character_id: characterId,
            name,
            i_value,
            m_value,
            s_value,
            va,
            dof,
            ob,
            arrowhead_type,
            note,
        };
    });

    const {error: arrowError} = await supabase.from('character_arrowheads').insert(characterArrowheadsData);

    if (arrowError) {
        console.error('Error inserting character arrowheads:', arrowError);
    }

}
