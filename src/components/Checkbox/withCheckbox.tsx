import React from 'react'

import { CheckboxProps } from './interface'

function withCheckbox(Component: React.FC<CheckboxProps>) {
  function WithCheckbox(props: CheckboxProps) {
    return <Component {...props} />
  }
  return WithCheckbox
}

export { withCheckbox }
