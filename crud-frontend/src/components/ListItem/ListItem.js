// Styles
import './ListItem.scss'

const ListItem = ({ listItem }) => {
  return (
    <div>
      <a className="link" href={listItem.url}>{listItem.name}</a>
      <p>{listItem.snippet}</p>
    </div>
  )
}

export default ListItem
