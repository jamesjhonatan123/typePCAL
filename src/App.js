import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, useDisclosure, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createUser, getAllUsers } from './api';
import { Timer } from './components/Timer';
import './styles/app.css'
function App() {
  const [userFiltered, setUserFiltered] = useState([])
  const [searchUser, setSearchUser] = useState('')
  const [finalResult, setFinalResult] = useState(false)
  const [majorScore,setMajorScore] = useState(175)
  const [ntlpm, setNtlpm] = useState(0)
  const [user, setUser] = useState()
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [timeRemain, setTimeRemain] = useState(0)
  const [fullText,] = useState("Com isso, danem-se os objetivos da Rio-92, às favas com a Agenda 21 local. Desenvolvimento Sustentável é a forma harmônica de crescer, sem machucar a natureza e também sem machucar as criaturas que estão na natureza, saibam todos. Quando se fala em Rio-92, muita gente pensa que foi coisa de malucos que só pensam em proteger pássaros, jacarés e árvores... Nada disso. A conferência tratou de questões fundamentais da existência e uma das partes que mais interessa é, exatamente, o estabelecimento da AGENDA 21 LOCAL, infelizmente desprezada (porque desconhecida) por quase todos os políticos brasileiros! É preciso ler o documento, traçar diretrizes, sem as quais não chegaremos a um porto seguro no século 21, tanto em termos de proteção ecológica como de justiça social, habilitação, geração de empregos, saúde, escolaridade, cultura etc. ") 
  const [isFinished, setIsFinished] = useState(false)
  const [, setUltimate] = useState(0)
  const [grade, setGrade] = useState(0)
  const [type, setType] = useState('')
  const [test, setTest] = useState([])
  const [key, setKey] = useState(null)
  const [numberOfCharacteres, setNumberOfCharacteres] = useState(-1)
  const [lastPosition, setLastPosition] = useState(0);
  const [wrongCharacteres, setWrongCharacteres] = useState(0)
  const [alreadyTyped, setAlreadyTyped] = useState([])
  const [position, setPosition] = useState(0)
  const [phrase, setPhrase] = useState("Com isso, danem-se os objetivos da Rio-92, às favas com a Agenda 21 local.")
  const arrayPhrase = phrase.split('');
  const arrayType = type.split('');
  const arrayOfPhrasesWords = phrase.split(' ')
  const ArrayFullText = fullText.split('')
  const ArrayWordsFullText = fullText.split(' ')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    if(!finalResult){
      const compareArrays = ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position)).every((letter, index) => letter === arrayType[index])
      if(!arrayPhrase.find((value,index) => value === ' ' && index > position)){
        setUltimate(position)
      }

      if(test.length === arrayOfPhrasesWords.length && alreadyTyped.join('').split(' ').length < ArrayWordsFullText.length){
        console.log(alreadyTyped.join('').split(' ').length)
        console.log(ArrayWordsFullText.length);
        const PartOfFullTextArray = ArrayFullText.slice(lastPosition, ArrayFullText.findIndex((value,index) => value === '.' && index > lastPosition) + 1)
        setPhrase(PartOfFullTextArray.join(''))
      }

      if(key === ' '){
        const newArray = arrayType.filter(type => type !== ' ')
        setAlreadyTyped([...alreadyTyped, ...ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position) + 1)])
        setTest([...test, newArray.join('')])
        setPosition(ArrayFullText.findIndex((value,index) => value === ' ' && index > position) + 1)
        setLastPosition(lastPosition + ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position) + 1).length)
        setType('')

        if(compareArrays){
          setNumberOfCharacteres(numberOfCharacteres + ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position) + 1).length)
        }else{
          setNumberOfCharacteres(numberOfCharacteres + ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position) + 1).length)
          const lettersWrong = ArrayFullText.slice(position, ArrayFullText.findIndex((value,index) => value === ' ' && index > position)).filter((letter, index) => letter !== arrayType[index])
          setWrongCharacteres(wrongCharacteres + lettersWrong.length)
        }
        setKey('')
      }

      if(alreadyTyped.length === ArrayFullText.length){
        setIsFinished(true)
      }

      if((test.length === arrayOfPhrasesWords.length)){
        setTest([])
      } 
    }
  }, [type])

 useEffect(() => {
  if(!finalResult){
  setNtlpm(((numberOfCharacteres - 3 * wrongCharacteres)/((timeRemain + 1)/60)).toFixed(2))
  if(isFinished){
    setGrade(5 + 5*(((numberOfCharacteres - 3* wrongCharacteres)/((timeRemain + 1)/60) - 100)/((((numberOfCharacteres - 3* wrongCharacteres)/((timeRemain + 1)/60)) > majorScore) ? (((numberOfCharacteres - 3 * wrongCharacteres)/((timeRemain + 1)/60)) - 100) : (majorScore - 100))))
  }
  if(isFinished && grade){
    createUser({
      name: name,
      ntlpm: ((numberOfCharacteres - 3 * wrongCharacteres)/((timeRemain + 1)/60)).toFixed(2),
      characters: numberOfCharacteres,
      wrongCharacteres: wrongCharacteres,
      timeRemain: timeRemain
    })
    setAlreadyTyped([...alreadyTyped, 'finish'])
    setFinalResult(true)
    if(ntlpm >= 100){
      toast({
        title: `Parabéns, você passou!!!`,
        description: `Você precisava de 100 de toques de líquidos e tirou ${ntlpm} `,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          width: '1500px',
        }
      })
    }else if(ntlpm < 100){
      toast({
        title: `Lamento, não foi dessa vez. Tente mais uma vez.`,
        description: `Você precisava de 100 de toques de líquidos e tirou ${ntlpm} `,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
        containerStyle: {
          width: '1500px',
        }
      })
    }
  }
}
 }, [isFinished, grade])

 useEffect(() => {
  onOpen()
 }, [])

 useEffect(() => {
  setUserFiltered(users.filter(user => user.data.name === searchUser))
 }, [searchUser])

 useEffect(async () => {
   if(!finalResult){
  const listUsers = await getAllUsers()
  console.log('listUsers', listUsers)
 const listSorted = listUsers.sort((a,b) => {
  if(Number(a.data.ntlpm) > Number(b.data.ntlpm)){
    return -1
  }else{
    return 1
  }
})
  setUsers(listSorted)
  if (listSorted[0].data.ntlpm > majorScore){
    setMajorScore(((listSorted[0].data.characters - 3 * listSorted[0].data.wrongCharacteres)/((listSorted[0].data.timeRemain + 1)/60)).toFixed(2))
  }
}
  }, [isFinished])

  function nextPage(){
    if(page + 5 < users.length){
      setPage(page + 5)
    }else{
      setPage(users.length)
    }
  }

  function previousPage(){
    if(page > 5){
      setPage(page - 5)
    }else{
      setPage(0)
    }
  }
  return (
      <div className='page' >
        <Progress backgroundSize={'cover'} isAnimated style={{transform: 'rotate(270deg)', borderRadius: '10px'}} hasStripe className='progress' width={300} backgroundPosition={'center'} backgroundImage={require('./assets/image.png')} height={300} marginBottom={-50} marginTop={50} value={100 - (alreadyTyped.length/ArrayFullText.length)*100}/>
      <div style={{marginTop: '50px'}} className="App">
        <div className='container'>
          <div className='text'>{(test) ? arrayOfPhrasesWords.map((word, index) => {
          if (test.some((value, i) => value === word && i === index)){
          return <p key={word + Math.random()} style={{color: 'green', display: 'inline'}}>{word + ' '}</p>
          }else if (test.some((value, i) => value !== word && i === index)){
          return <p key={word + Math.random()} style={{color: 'red', display: 'inline'}}>{word + ' '}</p>
          }else{
            return <p key={word + Math.random()} style={{color: 'black', display: 'inline'}}>{word + ' '}</p>
          }
        }) : phrase}
        </div>
        <Timer isFinished={isFinished} setTimeRemain={setTimeRemain} type={type} />
        <Input color={'white'} isDisabled={isFinished} colorScheme={'blue'} bg={'gray.600'} placeholder='Digite para começar' type="text" name="type" id="type" value={type} onKeyDown={(e) => {
          setKey(e.key)
        }} onChange={(e) => {
          setType(e.target.value)
          }} />
        <div className='scores'>
        <table>
        <tr>
          <td style={{textAlign: 'center'}} colSpan={5}>Resultados</td>
        </tr>
        <tr>
          <td>palavras</td>
          <td>caracteres</td>
          <td>caracteres errados</td>
          <td>NTL por minuto</td>
          <td>Nota</td>
        </tr>
        <tr style={{textAlign: 'center'}}>
          <td>{alreadyTyped.join('').split(' ').length - 1}</td>
          <td>{(numberOfCharacteres > 0) ? numberOfCharacteres : 0}</td>
          <td>{wrongCharacteres}</td>
          <td>{Math.trunc((timeRemain) ? (numberOfCharacteres - 3 * wrongCharacteres)/((timeRemain + 1)/60) : 0)}</td>
          <td>{grade.toFixed(2)}</td>
        </tr>
        </table>
        </div>
        <>
      <Modal bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'  closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Olá, amigos.</ModalHeader>
          <ModalBody>
            Essa é uma aplicação feita somente para fins educacionais.<br/>
            Por favor, insira seu nome para continuarmos:
            <Input bg={'gray.600'} color={'white'}   value={name} marginTop={5} onChange={(e) => {
              setName(e.currentTarget.value)
            }}/>
          </ModalBody>

          <ModalFooter display={'flex'} flexDir={'column'} justify={'center'} align={'center'}>
            {(name) 
            ?
            <Button marginBottom={5} colorScheme='blue' mr={3} onClick={onClose}>
              Enviar
            </Button>
            :
            ''
            }
            Atualmente o máximo número de toques líquidos considerado pro cálculo é do usuário(a):
             <strong>{users[0]?.data.name}</strong>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
        <Input color={'white'}  marginTop={10} w={80} colorScheme={'blue'} bg={'gray.600'} value={searchUser} placeholder='procure um usuário pelo nome' onChange={(e) => setSearchUser(e.currentTarget.value)}/>
        <div className='scores'>
        <table>
          <tr>
            <td>usuário</td>
            <td>toques líquidos por minuto</td>
            <td>nota</td>
          </tr>
          {(!searchUser) ? users.map(user =>
          <tr>
            <td>{user.data.name}</td>
            <td>{user.data.ntlpm}</td>
            <td>{(5 + 5*(((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60) - 100)/((((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60)) > majorScore) ? (((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60)) - 100) : (majorScore - 100)))).toFixed(2)}</td>
          </tr>).slice(page, page + 5)
          :
          userFiltered.map(user =>
            <tr>
              <td>{user.data.name}</td>
              <td>{user.data.ntlpm}</td>
              <td>{(5 + 5*(((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60) - 100)/((((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60)) > majorScore) ? (((user.data.characters - 3 * user.data.wrongCharacteres)/((user.data.timeRemain + 1)/60)) - 100) : (majorScore - 100)))).toFixed(2)}</td>
            </tr>).slice(page, page + 5)
          }
        </table>
        </div>
        <span style={{marginTop: '5px'}}>{`página ${Math.ceil(page/5) + 1} de ${(users.length/5 > 1) ? Math.ceil(users.length/5) : 1}`}</span>
        <Flex marginTop={5} gap={5}>
          <Button color={'white'}  onClick={previousPage} bg={'gray.600'}>Anterior</Button>
          <Button color={'white'} onClick={nextPage} bg={'gray.600'}>Próxima</Button>
        </Flex>
        </div>
      </div>
      </div>
  );
}

export default App;
