import { LocationOn as LocationOnIcon } from '@mui/icons-material'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/joy/IconButton'
import {
  useRef,
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler
} from 'react'
import useSWR from 'swr'
import { useAuth } from '../lib/auth'
import { useChat, type Message } from '../lib/chat'

function MessageContainer({ threadId }: { threadId: number }) {
  const { typing, messages, sendMessage, message, setMessage } =
    useChat(threadId)
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (file != null) {
      setMessage((message) => ({ ...message, attachment: file }))
    }
  }

  const handleLocationButton: MouseEventHandler = (e) => {
    const isLocationAvailable = 'geolocation' in navigator
    if (!isLocationAvailable) {
      throw new Error('Location services are not available')
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      setMessage((message) => ({ ...message, latitude, longitude }))
    })
  }

  const handleUploadButton: MouseEventHandler = (e) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    sendMessage(message)
      .then(() => {
        setMessage({
          content: '',
          attachment: undefined,
          latitude: undefined,
          longitude: undefined
        })
        ;(fileInputRef.current as HTMLInputElement).value = ''
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <div className="chatMessages">
        <ul>
          {messages
            .map((message) => ({
              message,
              isMe: message.user.id === user?.id
            }))
            .map(({ message, isMe }) => (
              <MessageRow message={message} isMe={isMe} key={message.id} />
            ))}
          {typing && <TypingIndicator user={typing} />}
        </ul>
      </div>
      <div className="chatInputs">
        <form onSubmit={handleSubmit}>
          <input
            accept="image/*"
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleFileInputChange}
          />
          <div className="attachFileButton">
            <IconButton type="button" onClick={handleUploadButton}>
              <AttachFileIcon />
            </IconButton>
          </div>
          <div className="shareLocationButton">
            <IconButton type="button" onClick={handleLocationButton}>
              <LocationOnIcon />
            </IconButton>
          </div>
          <input
            type="text"
            value={message.content}
            onChange={(event) => {
              setMessage((message) => ({
                ...message,
                content: event.target.value
              }))
            }}
            required
            placeholder="Enter message"
          />
          <div className="sendButton">
            <button type="submit">
              <SendIcon
                sx={{
                  height: 0.8,
                  width: 0.9,
                  minHeight: 20,
                  minWidth: 20
                }}
              />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

const TypingIndicator = ({ user }: { user: { name: string } }) => {
  return (
    <div className="message message--left">
      <div className="message__name">{user.name}</div>
      <div className="message__bubble">
        <MoreHorizIcon />
      </div>
    </div>
  )
}

const MessageRow = ({ message, isMe }: { message: Message; isMe: boolean }) => {
  return (
    <div className={`message ${isMe ? 'message--right' : 'message--left'}`}>
      <div className="message__name">{message.user.name}</div>
      {message.attachmentUrl != null && (
        <img
          src={message.attachmentUrl}
          alt=""
          width={200}
          className="message__image"
        />
      )}
      {message.latitude != null && message.longitude != null && (
        <LocationPreview
          latitude={message.latitude}
          longitude={message.longitude}
        />
      )}
      <div className="message__bubble">{message.content}</div>
    </div>
  )
}

const LocationPreview = ({
  latitude,
  longitude
}: {
  latitude: number
  longitude: number
}) => {
  const { data: location } = useSWR(
    `/api/location/geocode?latitude=${latitude}&longitude=${longitude}`,
    async (url) => await fetch(url).then(async (res) => await res.json())
  )

  return (
    <a
      href={`https://www.google.com/maps?q=${latitude},${longitude}`}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={`/api/location/map?latitude=${latitude}&longitude=${longitude}`}
        alt="Location Preview"
        className="message__location-preview"
      />
      <div className="message__location-text">
        {location?.address ?? 'Waiting for Location'}
      </div>
    </a>
  )
}

export default MessageContainer
