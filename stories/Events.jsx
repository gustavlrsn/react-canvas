import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Group, Surface } from '../src/index'

storiesOf('Events', module).add('mouse events', () => {
  return (
    <div>
      <Surface top={0} left={0} width={400} height={400}>
        <Group
          onClick={action('onClick')}
          style={{
            backgroundColor: 'red',
            top: 0,
            left: 0,
            width: 50,
            height: 50
          }}
        />
      </Surface>
    </div>
  )
})
