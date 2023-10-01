﻿import React, { useContext, useEffect, useState } from 'react';
import { ICharacter, ILegendaryEventTrack } from '../../models/interfaces';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { LegendaryEvent } from '../../models/enums';
import { AutoTeamsSettingsContext } from '../../contexts';
import { CharacterTitle } from '../../shared-components/character-title';

export const LegendaryEventTrack = (props: { track: ILegendaryEventTrack, eventId: LegendaryEvent }) => {
    const [characters, setCharacters] = useState<ICharacter[]>(props.track.allowedUnits);
    const [restrictions, setRestrictions] = useState<string[]>([]);

    useEffect(() => {
        setCharacters(props.track.allowedUnits);
        setRestrictions([]);
    }, [props.eventId]);

    const autoTeamsPreferences = useContext(AutoTeamsSettingsContext);

    const handleChange = (selected: boolean, restrictionName: string) => {
        if (selected) {
            setRestrictions([...restrictions, restrictionName]);
        } else {
            setRestrictions(restrictions.filter(x => x !== restrictionName));
        }
    };

    useEffect(() => {
        setCharacters(props.track.suggestTeam(autoTeamsPreferences, restrictions));
    }, [restrictions, autoTeamsPreferences]);

    return (
        <div>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                {
                    props.track.unitsRestrictions.map(x => (<FormControlLabel key={x.name} control={<Checkbox
                        onChange={(event) => handleChange(event.target.checked, x.name)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label={`${x.name} (${x.points})`}/>))
                }
            </FormGroup>
            <ol>
                {characters.map(x => (<li key={x.name}
                    style={{ marginBottom: 10 }}><CharacterTitle character={x} imageSize={30}/> ({x.legendaryEvents[props.eventId].totalPoints} pts/ {x.legendaryEvents[props.eventId].totalSlots} slots)</li>))}
            </ol>
        </div>
    );
};