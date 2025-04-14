import { Link } from "react-router-dom"; 
const QuotesList = ({ quotes }) => {
return (
<div className="w-full p-4">
<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-
4">
{quotes.map((quote) => ( 
<li key={quote.id} className="p-4 border rounded-lg shadow bgwhite
flex flex-col justify-between">
<div>
<p className="text-lg font-bold text-gray-900">
{quote.quote}</p>
<span className="text-gray-600">- {quote.author}</span>
</div>
<div className="flex justify-between items-center mt-4 text-sm textgray-
600">
<Link
to={`/edit/${quote.id}`}
className="hover:underline transition-all"
>
✏ Edit
</Link>

<Link
to={`/delete/${quote.id}`}
className="hover:underline transition-all"
>
🗑 Delete
</Link>
</div>
</li>
))}
</ul>
</div>
);
};
export default QuotesList;