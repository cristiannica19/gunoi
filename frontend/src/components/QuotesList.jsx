import { Link } from "react-router-dom";

const QuotesList = ({ quotes }) => { 
 return (
 <div className="w-full px-4">
 <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap6 w-full">
  
  {quotes.map((quote) => ( 
 <li key={quote.id} className="p-4 border rounded-lg shadow bgwhite">
 <p className="text-lg font-bold text-gray-900">{quote.quote}
</p>
 <span className="text-gray-600">- {quote.author}</span>
 </li>
 ))}
 </ul>
 </div>
 );
};
export default QuotesList;