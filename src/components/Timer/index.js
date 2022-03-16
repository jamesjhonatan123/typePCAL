import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Timer = ({type, setTimeRemain, isFinished}) => {
  const [start, setStart] = useState(false)
  const [count, setCount] = useState(600)
  const [timer, setTimer] = useState('')

  useEffect(()=>{
    if(start && count > 0 && !isFinished){
      setTimeout(() => {
        setCount(count - 1)
      }, 1000);
      setTimeRemain(600 - count)
    }
    if(count === 0){
      alert('time is out')
    }
    time()
    setStart(true)
  }, [type, count])


  function time(){
    const min = String((count/60).toFixed(2));
    const seconds = Math.round((Number(min.split('.')[1])*60/100))
    setTimer(`${min.split('.')[0]}:${(seconds > 9) ? seconds : '0'+seconds}`)
  }

  return <Flex margin={5} fontSize={20} padding={2} fontStyle={'oblique'} border={'3px solid black'} borderRadius={'md'} bg={'rgb(56 43 188 / 48%)'}>{timer}</Flex>

}