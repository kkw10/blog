import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadImage,
  changeField,
} from '../../models/actions/write';
import ProfileSetting from '../../components/profile/ProfileSetting';

const ProfileSettingContainer = () => {
  const portraitEl = useRef();
  const dispatch = useDispatch();
  const userProfileData = useSelector(({ write }) => write.userProfile);

  const onClickPortrait = (e) => {
    e.preventDefault();
    portraitEl.current.click();
  };

  const onChangePortrait = (e) => {
    const portraitFile = e.target.files[0];

    if (!portraitFile) return;

    const formData = new FormData();
    formData.append('portrait', portraitFile);
    console.log(portraitFile);

    dispatch(uploadImage(formData));
  };

  const onChangeField = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({
      key: name,
      value,
    }));
  };

  return (
    <ProfileSetting
      portraitEl={portraitEl}
      userProfileData={userProfileData}
      onClickPortrait={onClickPortrait}
      onChangePortrait={onChangePortrait}
      onChangeField={onChangeField}
    />
  );
};

export default ProfileSettingContainer;