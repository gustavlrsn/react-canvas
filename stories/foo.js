import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Gradient } from '../src/index'

storiesOf('Gradient', module)
    .add('transparent-grey', () => {
        console.log(Gradient);
        return (
            <div>
            hello
            </div>
        );
    })
