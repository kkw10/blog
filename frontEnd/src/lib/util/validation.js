const makeForm = (result, message) => {
  return { result, message };
};

export const initForm = {
  result: null,
  message: null,
};

export const emailValidate = (value) => {
  const result = value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  if (result) return makeForm(false, null);
  if (value === '') return makeForm(true, '이메일을 입력해주세요');
  if (!result) return makeForm(true, '이메일 형식이 아닙니다.');
};

export const nickValidate = (value) => {
  if (value === '') return makeForm(true, '닉네임을 입력해주세요.');
  return makeForm(false, null);
};

export const passwordValidate = (value) => {
  if (value === '') return makeForm(true, '비밀번호를 입력해주세요.');
  if (value.length < 3) return makeForm(true, '최소3글자 이상을 입력해주세요.');
  return makeForm(false, null);
};

export const passwordCheckValidate = (value, password) => {
  if (value === '') return makeForm(true, '비밀번호를 입력해주세요.');
  if (value !== password) return makeForm(true, '비밀번호가 일치하지 않습니다.');
  if (value === password) return makeForm(false, null);
};
