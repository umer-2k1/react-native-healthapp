import {UserProfileUpdateRequest, UserProfileUpdateResponse} from '@types';
import {http, showError} from '@utils';
import {useMutation} from '@tanstack/react-query';

const useProfileUpdate = () => {
  return useMutation({
    mutationFn: async (body: UserProfileUpdateRequest) => {
      const res = await http.patch<UserProfileUpdateResponse>('/user', {
        ...body,
      });

      if ('success' in res) {
        throw new Error(res.message);
      }
      return res;
    },

    onError: error => {
      showError(error.message);
    },
  });
};

export {useProfileUpdate};
