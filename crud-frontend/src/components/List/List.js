// Components
import ListItem from '../ListItem'

// Styles
import './List.scss'

const List = ({ list }) => {
  if (list && list.length === 0) {
    return (
      <div>
        No results found!
      </div>
    )
  }

  return list && list.length > 0 && list.map((l) => (
    <div key={l.id} className="list">
      <ListItem listItem={l} />
    </div>
  ))
}

export default List
