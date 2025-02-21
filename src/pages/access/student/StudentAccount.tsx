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
  CustomizedButtonOutline,
  CustomizedDeletaeButton,
  CustomizedDeletaeButtonRounded,
  CustomizedDisableButtonOutline,
} from "@/Compnents/UI/CustomizedButton"
import { formatDate } from "@/Compnents/DateFormater"
import { useNavigate } from "react-router-dom"
import Loading from "@/Compnents/UI/Loading"
import { useForm } from "react-hook-form"
import useUpdateStudentProfile from "@/hooks/mutations/useUpdateStudentProfile"
import { toast, ToastContainer } from "react-toastify"
import { FiAlertOctagon } from "react-icons/fi";


// ========= Beta UI =========
import { Modal } from '@brightcodeui/beta-ui';
import { UpdateProps } from "@/APIs/api/singleStudentProfile"
import useDeleteAccount from "@/hooks/mutations/useDeleteAccount"


type FormData = {
  email: string,
}

const StudentAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const toggleDrawer = () => setIsOpened(!isOpened)

  const { decodedToken, handleLogout } = useAuth()
  const { data, isLoading } = useGetSingleStudent(decodedToken?.profile_id ?? 0)
  const myData = data?.data

  console.log("My Data", myData)

  const { mutate, isPending } = useUpdateStudentProfile()
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateProps>()

  const onSubmit = (formData: UpdateProps) => {

        const updatedFormData = new FormData()
    
        Object.keys(formData).forEach((key) => {
          updatedFormData.append(key, formData[key as keyof UpdateProps] as string)
        })
    
        if (file) {
          updatedFormData.append("profile_pic", file)
        }
    mutate(
      { id: myData?.id, formData: updatedFormData },
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

  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteAccount()
  const {
    handleSubmit: handleDeleteSubmit,
    register: deleteRegister,
    formState: { errors:deleteError },
  } = useForm<FormData>()

  const deleteOnSubmit = (data: FormData) => {
    deleteMutate(data.email, {
      onSuccess: () => {
        handleLogout()
        toast.success("Account deleted successfully")
      },
      onError: (error) => {
        console.error("Account deletion failed:", error)
        toast.error("An error occurred while deleting the account")
      },
    })
  }


  return (
    <div className="flex relative w-full">
      <div className="w-full">
        <StudentTopNavbar isOpened={isOpened} toggleDrawer={toggleDrawer} />
        <StudentSideBar isOpened={isOpened} />

        <div className="pt-24 h-full lg:w-1/2 w-full lg:px-16 2xl:pl-80 xl:pl-72 lg:pl-72 px-5 overflow-y-scroll">
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

                  <div className="flex items-center justify-between lg:!w-1/2 w-full">
                    <div className="flex items-center gap-3 pt-5">
                      <div className="w-12 h-12 overflow-hidden bg-neutral-300 border border-neutral-200 rounded-full">
                        <img
                          className="w-full h-full object-cover"
                          src={myData?.profile_pic || profileImage?.porfileImg}
                          alt="Profile"
                        />
                      </div>

                      <div className="text-xs">
                        <h3 className="text-sm font-semibold">{myData?.user?.name}</h3>
                        <p>{myData?.user?.email}</p>
                      </div>
                    </div>

                    <div className="w-fit">
                      <CustomizedDeletaeButton text="Delete Account"/>
                      <CustomizedDeletaeButtonRounded onClick={() => setIsModalOpen(true)}/>
                    </div>
                  </div>

                  {!showForm ? (
                    <div className="border border-neutral-200 lg:!w-[50%] w-full p-5 rounded-md mt-5">
                      <h2 className="text-sm font-semibold">Edit Personal Info</h2>

                      <div className="flex flex-col gap-3 pt-5 w-full">
                        <div>
                          <label className="text-xs">Full Name</label>
                          <p className="bg-neutral-100 border border-neutral-200 text-sm mt-1 p-3 rounded-lg font-semibold">{myData?.user?.name}</p>
                        </div>

                        <div>
                          <label className="text-xs">Email</label>
                          <p className="bg-neutral-100 border border-neutral-200 text-sm mt-1 p-3 rounded-lg font-semibold">{myData?.user?.email}</p>
                        </div>

                        <div>
                          <label className="text-xs">Location</label>
                          <p className="bg-neutral-100 border border-neutral-200 text-sm mt-1 p-3 rounded-lg font-semibold">{myData?.location}</p>
                        </div>

                        <div>
                          <label className="text-xs">Date Joined</label>
                          <p className="bg-neutral-100 border border-neutral-200 text-sm mt-1 p-3 rounded-lg font-semibold">
                            {formatDate(myData?.user?.date_joined)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-10 lg:w-[50%] w-full">
                        <CustomizedButtonMain onClick={() => setShowForm(true)} text="Edit Profile" />
                      </div>
                    </div>
                  ) : (
                    <div className="border border-neutral-200 lg:!w-[50%] w-full p-5 rounded-md mt-5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold">Edit Info</h2>

                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                              className="object-cover w-full h-full"
                              src={file ? URL.createObjectURL(file) : myData?.profile_pic}
                              alt="Profile"
                            />
                          </div>
                          <div>
                            <label className="cursor-pointer bg-sky-100 border text-xs border-sky-500 text-sky-700 px-4 py-2 rounded-full">
                              Upload Image
                              <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <form className="flex flex-col gap-3 pt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <label className="text-xs">Full Name</label>
                          <p className="bg-neutral-100 text-sm border border-neutral-300 mt-1 p-3 rounded-lg">{myData?.user?.name}</p>
                        </div>

                        <div>
                          <label className="text-xs">Email</label>
                          <p className="bg-neutral-100 text-sm border border-neutral-300 mt-1 p-3 rounded-lg">{myData?.user?.email}</p>
                        </div>

                        <div>
                          <label className="text-xs">Gender</label>
                          <input
                            {...register("gender", { required: "Gender is required" })}
                            type="text"
                            placeholder="Enter Gender"
                            className="text-sm py-2 input input-bordered border border-neutral-300 w-full"
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
                            className="text-sm py-2 input input-bordered border border-neutral-300 w-full"
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

      <div>
        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Delete Account"
          className="lg:!w-[30%] w-full text-sm p-5 !rounded-3xl !relative"
        > 
          <form className="flex justify-center" onSubmit={handleDeleteSubmit(deleteOnSubmit)} >
            <div className="space-y-4 pt-6">
              <p className="bg-red-100 p-4 w-fit rounded-full text-center flex m-auto text-red-800 border border-red-300"><FiAlertOctagon className="text-2xl"/></p>
              <p className="text-center text-sm">Are you sure you want to delete <br /> your account? This action cannot be undone.</p>

              <div>
                <input
                  type="email"
                  {...deleteRegister("email", {
                    required: "Email is required",
                    value: myData?.user?.email || "",
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Confirm your email"
                />
                {deleteError.email && <p className="text-red-500 text-xs mt-1">{deleteError.email.message}</p>}
              </div>

              <div className="flex lg:flex-row flex-col justify-center gap-2 pt-3">
                <CustomizedButtonOutline onClick={() => setIsModalOpen(false)} text="Cancel" />
                  {isDeleting ? <CustomizedButtonLoading text="Deleting..." /> : <CustomizedButtonMain text="Delete Account" />}
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default StudentAccount