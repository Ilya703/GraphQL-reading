import { useQuery } from '@apollo/client';
import { getBookQuery } from './../queries/queries';
import { useEffect } from 'react';

const BookDetails = ({ bookId }) => {
    const { loading, data, refetch } = useQuery(getBookQuery, {
        variables: {
            id: bookId
        }
    });

    useEffect(() => {
        refetch({
            id: bookId
        });
    }, [bookId, refetch]);

    const DisplayBook = () => {
        if (loading) return <div className="text">Loading book...</div>;
        if (data && data.book) {
            return (
                <div>
                    <h2>{data.book.name}</h2>
                    <p>{data.book.genre}</p>
                    <p>{data.book.author.name}</p>
                    <p>All books by this author</p>
                    <ul>
                        {
                            data.book.author.books.map((book) => {
                                return <li key={book.id}>{book.name}</li>;
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="text">No book selected...</div>
            )
        }
    }

    return (
      <div id="book-details">
        {DisplayBook()}
      </div>
    );
}
  
export default BookDetails;
  