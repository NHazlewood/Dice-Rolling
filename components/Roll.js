import React from 'react';
import { Button } from 'react-native';

const rollDice = props => {
    return (
        <Button title="Roll" onPress={props.onRoll} />
    );
};

export default rollDice;