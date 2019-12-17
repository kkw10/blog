import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchType,
  changeField,
  initialize,
} from '../../models/actions/write';
import { clearToggle } from '../../models/actions/toggle';

// components...
import SearchBar from '../../components/common/SearchBar';

const SearchBarContainer = ({ history }) => {
  const dispatch = useDispatch();
  const {
    searchType,
    searchQuery,
  } = useSelector(({ write }) => ({
    searchType: write.search_type,
    searchQuery: write.search_query,
  }));

  const onChangeSearchType = useCallback((type) => {
    dispatch(changeSearchType(type));
    dispatch(clearToggle());
  }, [dispatch]);

  const onChangeSearchField = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      key: name,
      value,
    }));
  }, [dispatch]);

  const onSearch = useCallback((e) => {
    e.preventDefault();

    if (!searchQuery) return;

    if (searchType === 'tag') {
      history.push(`/posts/tagged/${searchQuery}`);
    } else {
      history.push(`/posts/search/?q=${searchQuery}`);
    }

    dispatch(initialize());
  }, [dispatch, searchType, searchQuery]);

  const onEnterKeyPress = useCallback((e) => {
    if (e.charCode === 13) {
      onSearch(e);
    }
  }, [dispatch, searchQuery]);

  return (
    <SearchBar
      searchType={searchType}
      searchQuery={searchQuery}
      onChangeSearchType={onChangeSearchType}
      onChangeSearchField={onChangeSearchField}
      onEnterKeyPress={onEnterKeyPress}
      onSearch={onSearch}
    />
  );
};

export default withRouter(SearchBarContainer);
