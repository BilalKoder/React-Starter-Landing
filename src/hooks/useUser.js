import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "../redux/userSlice";
import { useGetUserInfoQuery } from "../services/api";

const useUser = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetUserInfoQuery();
  useEffect(() => {
    if (isSuccess) {
      // dispatch(addUserData(data));
      if (data?.roles) {
        const user = { roles: data?.roles };
        localStorage.setItem("user", JSON.stringify(user));
      }
      return;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      dispatch(addUserData(data));
    }
  }, [data]);

  return { isSuccess, isLoading: isLoading ? isLoading : isFetching, isError };
};

export default useUser;
