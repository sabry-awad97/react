import { Comment } from "semantic-ui-react";

interface Props {
  author: string;
  avatar: string;
  timeAgo: string;
  text: string;
}

const CommentDetail: React.FC<Props> = props => {
  return (
    <Comment>
      <Comment.Avatar src={props.avatar} />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{props.timeAgo}</div>
        </Comment.Metadata>
        <Comment.Text>{props.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default CommentDetail;
