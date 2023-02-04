import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from './../queries/queries';
import { useState } from 'react';

const AddBook = () => {
    const { loading: loadingAuthorsQuery, error: errorAuthorsQuery, data: dataAuthorsQuery } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        if (loadingAuthorsQuery) return <option disabled className="text">Loading authors...</option>;
        if (errorAuthorsQuery) return <option disabled className="text">{errorAuthorsQuery.message}</option>;
        return dataAuthorsQuery.authors.map((author) => {
            return (
                <option key={author.id} value={author.id}>{ author.name }</option>
            );
        })
    }

    const submitForm = (e) => {
        e.preventDefault();

        addBook({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    };

    return (
        <form id="add-book" onSubmit={(e) => submitForm(e)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    { 
                        displayAuthors()
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    );
}
  
export default AddBook;
  