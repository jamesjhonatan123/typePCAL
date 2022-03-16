import {client, q} from '../config/db'
import {v4 as uuidv4} from 'uuid'

export const createUser = async ({name, ntlpm, characters, wrongCharacteres, timeRemain}: any) => {
  await client.query(
    q.Create(q.Collection('users'), {
      data: {
      id: uuidv4(),
      name: name,
      ntlpm: ntlpm,
      characters: characters,
      wrongCharacteres: wrongCharacteres,
      timeRemain: timeRemain
      }
    })
  )
}

export const getAllUsers = async () => {
  const users = await client.query(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index(
            'id'
          )
        ),
      ),
      q.Lambda((ref) => q.Get(ref))
    )
  )
  return users.data
}