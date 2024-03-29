import { useState, useEffect, useContext } from 'react'
import Commentdisplay from './Commentdisplay';

export default function Comments ({post, loggeduser, setPosts, posts, token}) {
  const [ comments, setComments ] = useState([])
  const [ showComments, setShowComments ] = useState([])
  const [next, setNext] = useState(2)
  const [replyComments, setReplyComments] = useState([])

  useEffect( () => {
    const newCm = post.comments.filter( (cm) => !cm.reply )
    setComments(newCm)
    setShowComments(newCm.slice(newCm.length - next))
  },[post.comments, next] )

  useEffect( () => {
    const newRep = post.comments.filter( (cm) => cm.reply )
    setReplyComments(newRep)
  },[post.comments] )

  return (
    <>  
      <div className='comments' >
         {
            showComments.map( (comment, index) => (
               <Commentdisplay key={ comment._id ? comment._id : index } comment={comment} post={post} loggeduser={loggeduser} setPosts={setPosts} posts={posts} token={token} replyCm={replyComments.filter( (cm) => cm.reply === comment._id )} />
            ) )
         }
         {
            comments.length - next > 0
            ? <div className='p-2 border-top' style={{cursor: 'pointer', color: 'crimson'}}
              onClick={ () => { setNext(next + 10) } } >
                 See more comments...
              </div>
            : comments.length > 2 && <div className='p-2 border-top' style={{cursor: 'pointer', color: 'crimson'}} 
            onClick={ () => { setNext(2) } } >
                 Hide comments...
              </div>  
         }
      </div>
    </>
  )
}
