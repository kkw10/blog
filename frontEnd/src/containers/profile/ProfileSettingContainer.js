import React, { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadImage,
  changeField,
  setOriginProfile,
} from '../../models/actions/write';
import { uploadProfile } from '../../models/actions/user';
import ProfileSetting from '../../components/profile/ProfileSetting';

const ProfileSettingContainer = ({ match, onChangeMenu }) => {
  const targetId = match.params.UserId;
  const portraitEl = useRef();
  const dispatch = useDispatch();
  const writeProfileData = useSelector(({ write }) => ({
    userPortrait: write.user_portrait,
    userBackground: write.user_background,
    userTitle: write.user_title,
    userDescription: write.user_description,
    userLocation: write.user_location,
    userFavorite: write.user_favorite,
    userContact: write.user_contact,
  }));
  const { me, userProfileData } = useSelector(({ user }) => ({
    me: user.user,
    userProfileData: user.profile,
  }));

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

  const onUploadProfile = (e) => {
    e.preventDefault();
    dispatch(uploadProfile(writeProfileData));
  };

  useEffect(() => {
    dispatch(setOriginProfile(userProfileData));
  }, [dispatch]);

  return (
    <>
      {Number(targetId) === me.id ? (
        <ProfileSetting
          portraitEl={portraitEl}
          writeProfileData={writeProfileData}
          userProfileData={userProfileData}
          onClickPortrait={onClickPortrait}
          onChangePortrait={onChangePortrait}
          onChangeField={onChangeField}
          onUploadProfile={onUploadProfile}
          onChangeMenu={onChangeMenu}
        />
      ) : (
        <div>권한이 없는 유저입니다.</div>
      )}
    </>
  );
};

export default withRouter(ProfileSettingContainer);
