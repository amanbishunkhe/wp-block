
export default function BookList({ books, attributes } ) {
  // const books = props.books;
    const { showContent, showImage } = attributes;
    if (!books) {
        return null;
    }
    return (
        <div>
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.title.rendered}</h2>
                    { showImage && <img src={book.featured_image_src} alt={book.title.rendered} /> }
                    { showContent && <div dangerouslySetInnerHTML={{ __html: book.content.rendered }}></div> }
                </div>
            ))}
        </div>
    );
}
