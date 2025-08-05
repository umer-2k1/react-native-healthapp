import {SignInRequest, SignInResponse} from '@types';
import {http, showError} from '@utils';
import {useMutation} from '@tanstack/react-query';

const useSignIn = () => {
  return useMutation({
    mutationFn: async (body: SignInRequest) => {
      const res = await http.post<SignInResponse>('/auth/login', {...body});
      if ('success' in res) {
        throw new Error(res.message);
      }
      return res.data;
    },

    onError: error => {
      showError(error.message);
    },
  });
};

export {useSignIn};
