import { useState } from "react"
import StudentTopNavbar from "./StudentTopNavbar"
import StudentSideBar from "./StudentSideBar"
import useGetSingleStudent from "@/hooks/queries/useGetSingleStudent"
import { useAuth } from "@/Providers/AuthContext"
import { profileImage } from "@/Compnents/images/imagePath"
import { FaChevronLeft } from "react-icons/fa6"
import {
  CustomizedButtonLoading,
  CustomizedButtonMain,
  CustomizedDisableButtonOutline,
} from "@/Compnents/UI/CustomizedButton"
import { formatDate } from "@/Compnents/DateFormater"
import { useNavigate } from "react-router-dom"
import Loading from "@/Compnents/UI/Loading"
import { useForm } from "react-hook-form"
import useUpdateStudentProfile from "@/hooks/mutations/useUpdateStudentProfile"
import { toast, ToastContainer } from "react-toastify"

interface StudentUpdateProps {
  gender: string
  location: string
}

const StudentAccount = () => {
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  const { decodedToken } = useAuth()
  const { data, isLoading } = useGetSingleStudent(decodedToken?.profile_id ?? 0)
  const myData = data?.data

  console.log("My Data", myData)

  const { mutate, isPending } = useUpdateStudentProfile()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StudentUpdateProps>()

  const onSubmit = (formData: StudentUpdateProps) => {
    mutate(
      { id: myData?.id, formData },
      {
        onSuccess: () => {
          console.log("Student profile updated successfully")
          setShowForm(false)
          toast.success("Profile updated successfully")
        },
        onError: (error) => {
          console.log("Student profile update failed:", error)
          toast.error("An error occurred while updating the profile")
        },
      },
    )
  }

  return (
    <div className="flex relative">
      <div className="w-full">
        <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer} />
        <StudentSideBar isOpened={isOpened} />

        <div className="pt-24 h-full w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
          <ToastContainer theme="light" autoClose={4000} />

          <p onClick={() => navigate(-1)} className="cursor-pointer text-lg rounded-full p-2 bg-neutral-100 w-fit">
            <FaChevronLeft />
          </p>

          <div>
            <div className="lg:pt-10 pt-5">
              <h2 className="text-sm font-semibold">Account</h2>

              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="flex items-center gap-3 pt-5">
                    <div className="w-12 h-12 overflow-hidden bg-neutral-300 border border-neutral-200 rounded-full">
                      <img
                        className="w-full h-full"
                        src={myData?.profile_pic || profileImage?.porfileImg}
                        alt="Profile"
                      />
                    </div>

                    <div className="text-xs">
                      <h3 className="text-sm font-semibold">{myData?.user?.name}</h3>
                      <p>{myData?.user?.email}</p>
                    </div>
                  </div>

                  {!showForm ? (
                    <div className="border border-neutral-200 lg:w-[50%] w-full p-5 rounded-md mt-10">
                      <h2 className="text-sm font-semibold">Edit Personal Info</h2>

                      <div className="flex flex-col gap-3 pt-5 w-full">
                        <div>
                          <label className="text-xs">Full Name</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">{myData?.user?.name}</p>
                        </div>

                        <div>
                          <label className="text-xs">Email</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">{myData?.user?.email}</p>
                        </div>

                        <div>
                          <label className="text-xs">Location</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">{myData?.location}</p>
                        </div>

                        <div>
                          <label className="text-xs">Date Joined</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">
                            {formatDate(myData?.user?.date_joined)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-10 lg:w-[50%] w-full">
                        <CustomizedButtonMain onClick={() => setShowForm(true)} text="Edit Profile" />
                      </div>
                    </div>
                  ) : (
                    <div className="border border-neutral-200 lg:w-[50%] w-full p-5 rounded-md mt-10">
                      <h2 className="text-sm font-semibold">Edit Personal Info</h2>

                      <form className="flex flex-col gap-3 pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <label className="text-xs">Full Name</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">{myData?.user?.name}</p>
                        </div>

                        <div>
                          <label className="text-xs">Email</label>
                          <p className="bg-neutral-100 text-sm mt-1 p-3 rounded-lg">{myData?.user?.email}</p>
                        </div>

                        <div>
                          <label className="text-xs">Gender</label>
                          <input
                            {...register("gender", { required: "Gender is required" })}
                            type="text"
                            placeholder="Enter Gender"
                            className="text-sm py-2 input input-bordered w-full"
                            defaultValue={myData?.gender}
                          />
                          {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                        </div>

                        <div>
                          <label className="text-xs">Location</label>
                          <input
                            {...register("location", { required: "Location is required" })}
                            type="text"
                            placeholder="Enter Location"
                            className="text-sm py-2 input input-bordered w-full"
                            defaultValue={myData?.location}
                          />
                          {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                        </div>

                        <div className="pt-5 lg:w-[50%] flex gap-2 w-full">
                          <CustomizedDisableButtonOutline text="Back" onClick={() => setShowForm(false)} />
                          {isPending ? (
                            <CustomizedButtonLoading text="Saving..." />
                          ) : (
                            <CustomizedButtonMain text="Save Changes" />
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAccount