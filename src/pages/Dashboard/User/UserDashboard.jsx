import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";

export default function UserDashboard() {
  const { user } = useRecoilValue(authAtom);

  return (
    <div className=" border h-screen md:p-10 md:pl-20 flex flex-col backdrop-blur-3xl text-xs md:text-lg p-10 gap-2">
      <h1 className=" border-b md:pb-7 md:w-96 pb-5">Profile Details</h1>
      <h2 className=" md:pt-7 pt-5">Name: {user?.name}</h2>
      <p className="">Phone Number: {user?.number}</p>
      <p>Email Id: {user?.email}</p>
    </div>
  );
}
