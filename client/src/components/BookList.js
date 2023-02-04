import { useQuery } from '@apollo/client';
import { getBooksQuery } from './../queries/queries';
import BookDetails from '../components/BookDetails';
import { useState } from 'react';

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null);

    const DisplayBooks = () => {
        if (loading) return <div className="text">Loading books...</div>;
        if (error) return <div className="text">Error : {error.message}</div>;
        return data.books.map((book) => {
            return (
                <li key={book.id} onClick={(e) => setSelected(book.id)}>{ book.name }</li>
            );
        })
    }
    return (
      <div>
        <ul id="book-list">
            <DisplayBooks/>
        </ul>
        <BookDetails bookId={selected}/>
      </div>
    );
}
  
export default BookList;
  