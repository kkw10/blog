import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaHashtag } from 'react-icons/fa';
import { brandingColor } from '../../lib/styles/branding';

const TagBoxWrap = styled.div`
  margin-top: 1rem;
  
  & fieldset {
    position: relative;
    border: none;
    display: inline-block;
  }

  & input {
    padding: 0 1rem;
    width: 240px;
    height: 36px;
    border-radius: 5px;
    border: none;
    color: ${brandingColor.common[5]};
    font-weight: bold;

    &::placeholder {
      color: ${brandingColor.common[5]};
    }    
  }

  & button {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    
    & svg {
      color: ${brandingColor.point[7]};
      font-size: 14px;
    }
  }
`;

const TagListWrap = styled.div`
  margin-top: 0.7rem;
  padding: 0 1rem;
  display: flex;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background: ${brandingColor.main[7]};
  padding: 5px 7px;
  border-radius: 3px;

  & svg {
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
  }
`;

const TagItem = memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>
    <FaHashtag />
    {tag}
  </Tag>
));

const TagList = memo(({ tags, onRemove }) => (
  <TagListWrap>
    {tags.map((tag) => (
      <TagItem tag={tag} key={tag} onRemove={onRemove} />
    ))}
  </TagListWrap>
));

const TagBox = () => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const insertTag = useCallback((tag) => {
    if (!tag) return;
    if (localTags.includes(tag)) return;
    setLocalTags([...localTags, tag]);
  }, [localTags]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    insertTag(input.trim());
    setInput('');
  }, [input, insertTag]);

  const onRemove = useCallback((tag) => {
    setLocalTags(localTags.filter((t) => t !== tag));
  }, [localTags]);

  return (
    <TagBoxWrap>
      <form onSubmit={onSubmit}>
        <fieldset>
          <input
            type="text"
            placeholder="태그"
            onChange={onChange}
            value={input}
          />
          <button type="submit">
            <FaHashtag />
          </button>
        </fieldset>
      </form>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxWrap>
  );
};
export default TagBox;
