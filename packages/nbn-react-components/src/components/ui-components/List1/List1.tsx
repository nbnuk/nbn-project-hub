import '../../../index.css'


export interface List1Props {
  width?: string;
  items: any[];
  renderItem?: (item: any, index: number) => JSX.Element; // Function to render each item
}

export const List1 = ({
  width = 'auto',
  items,
  renderItem,
}: List1Props) => { 

 

  // Render the data resources
  return (<>
   

<ul className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-lg">
  {items?.map((item, index) => (
    <li
      key={index}
      className="py-2 px-4 bg-white rounded shadow transform transition duration-200 hover:scale-105"
    >
      {renderItem ? renderItem(item, index) : item}
    </li>

  ))}
</ul>


    </>
);

};

export default List1;
