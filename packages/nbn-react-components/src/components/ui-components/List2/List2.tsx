import '../../../index.css'


export interface List2Props {
  width?: string;
  items: any[];
  renderItem?: (item: any, index: number) => JSX.Element; // Function to render each item
}

export const List2 = ({
  width = 'auto',
  items,
  renderItem,
}: List2Props) => { 

 

  // Render the data resources
  return (<>

<ul>
  {items?.map((item, index) => (
    <li
      key={index}
      className="mb-2"
    >
      {renderItem ? renderItem(item, index) : item}
    </li>

  ))}
</ul>


    </>
);

};

export default List2;
