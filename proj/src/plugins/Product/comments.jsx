import { useState } from "react";

const CommentsProduct = ({ comments }) => {
    const [visibleComments, setVisibleComments] = useState(3);

    const handleMoreComments = () => {
        setVisibleComments(visibleComments + 3);
    };
    return (
        <div id="comments" className="my-4">
            {comments.slice(0, visibleComments).map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-text">{comment.text}</div>
                    {comment.replies.length > 0 && (
                        <div className="replies">
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply">
                                    {reply.text}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            {visibleComments < comments.length && (
                <button onClick={handleMoreComments} className="more-button">
                    More
                </button>
            )}
        </div>
    );
};

export default CommentsProduct;
