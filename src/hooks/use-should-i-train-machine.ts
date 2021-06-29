import shouldITrainMachine from 'machines/should-i-train-machine'
import {useMachine} from '@xstate/react'

const useShouldITrainMachine = () => {
  const machineServices = useMachine(shouldITrainMachine, {devTools: true})
  return machineServices
}

export default useShouldITrainMachine
